import { copyFile, mkdir } from 'node:fs/promises'

// GitHub Pages에서 각 메뉴 주소로 직접 접속하거나 새로고침할 수 있도록 한다.
for (const route of ['Career', 'Project']) {
  const directory = new URL(`../dist/${route}/`, import.meta.url)
  await mkdir(directory, { recursive: true })
  await copyFile(
    new URL('../dist/index.html', import.meta.url),
    new URL('index.html', directory),
  )
}
