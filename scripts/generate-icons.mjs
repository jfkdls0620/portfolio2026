import {deflateSync} from "node:zlib"
import {readFileSync, writeFileSync} from "node:fs"
import {pathToFileURL} from "node:url"

// public/favicon.svg를 원본으로 삼아 같은 도형의 래스터 아이콘을 만든다.
// 로고를 고치려면 favicon.svg만 수정하고 이 스크립트를 다시 실행한다.
const hexToRgb = (hex) =>
  hex
    .replace("#", "")
    .match(/../g)
    .map((v) => parseInt(v, 16))

// 도형과 색을 모두 favicon.svg에서 읽는다. 색을 여기 적어두면
// SVG만 고쳤을 때 래스터 아이콘과 색이 어긋난다.
export function readMark() {
  const svg = readFileSync(new URL("../public/favicon.svg", import.meta.url), "utf8")
  const outline = /<path[^>]*\sd="([^"]+)"/.exec(svg)?.[1]
  const face = /<circle[^>]*fill="(#[0-9a-fA-F]{6})"/.exec(svg)?.[1]
  const letter = /<path[^>]*fill="(#[0-9a-fA-F]{6})"/.exec(svg)?.[1]
  if (!outline || !face || !letter) throw new Error("favicon.svg에서 도형이나 색을 찾지 못했습니다.")
  return {outline, face: hexToRgb(face), letter: hexToRgb(letter)}
}

// M/H/V/L/C/Z만 쓰는 절대 좌표 경로를 폴리곤 목록으로 편다.
export function flatten(d, steps = 48) {
  const tokens = d.match(/[MHVLCZ]|-?\d*\.?\d+/gi) ?? []
  const rings = []
  let ring = []
  let x = 0
  let y = 0
  let command = ""
  const num = () => Number(tokens.shift())
  while (tokens.length) {
    const token = tokens.shift()
    if (/[MHVLCZ]/i.test(token)) command = token.toUpperCase()
    else tokens.unshift(token)
    if (command === "Z") {
      if (ring.length) rings.push(ring)
      ring = []
      continue
    }
    if (command === "M") {
      if (ring.length) rings.push(ring)
      x = num()
      y = num()
      ring = [[x, y]]
    } else if (command === "H") {
      x = num()
      ring.push([x, y])
    } else if (command === "V") {
      y = num()
      ring.push([x, y])
    } else if (command === "L") {
      x = num()
      y = num()
      ring.push([x, y])
    } else if (command === "C") {
      const [x1, y1, x2, y2, x3, y3] = [num(), num(), num(), num(), num(), num()]
      const [x0, y0] = [x, y]
      for (let i = 1; i <= steps; i++) {
        const t = i / steps
        const u = 1 - t
        ring.push([
          u ** 3 * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t ** 3 * x3,
          u ** 3 * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t ** 3 * y3,
        ])
      }
      x = x3
      y = y3
    } else throw new Error(`지원하지 않는 경로 명령: ${command}`)
  }
  if (ring.length) rings.push(ring)
  return rings
}

// even-odd 규칙으로 글자 내부를 판정한다.
const makeInLetter = (rings) => (px, py) => {
  let inside = false
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i]
      const [xj, yj] = ring[j]
      if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside
    }
  }
  return inside
}
const inCircle = (px, py) => (px - 32) ** 2 + (py - 32) ** 2 <= 32 ** 2

const SS = 6 // 픽셀당 6x6 슈퍼샘플링으로 곡선의 계단 현상을 줄인다.

function render(mark, size) {
  const {outline, face, letter} = mark
  const rings = flatten(outline)
  const inLetter = makeInLetter(rings)
  const data = Buffer.alloc(size * size * 4)
  const unit = 64 / size
  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      let disc = 0
      let hit = 0
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const x = (px + (sx + 0.5) / SS) * unit
          const y = (py + (sy + 0.5) / SS) * unit
          if (!inCircle(x, y)) continue
          disc++
          if (inLetter(x, y)) hit++
        }
      }
      if (!disc) continue
      const i = (py * size + px) * 4
      // 원판 안에서 글자가 차지한 비율만큼 원판색과 글자색을 섞는다.
      const ratio = hit / disc
      for (let c = 0; c < 3; c++) data[i + c] = Math.round(face[c] + (letter[c] - face[c]) * ratio)
      data[i + 3] = Math.round((disc / (SS * SS)) * 255)
    }
  }
  return data
}

const CRC = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return (buf) => {
    let c = -1
    for (const b of buf) c = table[(c ^ b) & 0xff] ^ (c >>> 8)
    return (c ^ -1) >>> 0
  }
})()

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, "ascii"), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(CRC(body))
  return Buffer.concat([length, body, crc])
}

export function png(mark, size) {
  const pixels = render(mark, size)
  const stride = size * 4 + 1
  const raw = Buffer.alloc(size * stride)
  for (let y = 0; y < size; y++) {
    raw[y * stride] = 0 // 필터 없음
    pixels.copy(raw, y * stride + 1, y * size * 4, (y + 1) * size * 4)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // 채널당 8비트
  ihdr[9] = 6 // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, {level: 9})),
    chunk("IEND", Buffer.alloc(0)),
  ])
}

function ico(mark, sizes) {
  const images = sizes.map((size) => png(mark, size))
  const header = Buffer.alloc(6 + 16 * images.length)
  header.writeUInt16LE(1, 2) // 아이콘 타입
  header.writeUInt16LE(images.length, 4)
  let offset = header.length
  images.forEach((image, index) => {
    const entry = 6 + 16 * index
    header[entry] = sizes[index]
    header[entry + 1] = sizes[index]
    header.writeUInt16LE(1, entry + 4) // plane
    header.writeUInt16LE(32, entry + 6) // 픽셀당 비트
    header.writeUInt32LE(image.length, entry + 8)
    header.writeUInt32LE(offset, entry + 12)
    offset += image.length
  })
  return Buffer.concat([header, ...images])
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const mark = readMark()
  const out = new URL("../public/", import.meta.url)
  writeFileSync(new URL("favicon.ico", out), ico(mark, [16, 32, 48]))
  writeFileSync(new URL("apple-touch-icon.png", out), png(mark, 180))
  console.log("generated favicon.ico, apple-touch-icon.png")
}
