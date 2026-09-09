# Portfolio 2026

Vue 3 + Vite + TypeScript 기반의 새 포트폴리오입니다.

## 실행

Node.js 24 LTS를 권장합니다 (`.nvmrc`: 24). Vite 실행 조건은 Node.js `^20.19.0 || >=22.12.0`입니다.

```sh
npm ci
npm run dev
```

개발 서버가 출력하는 로컬 주소로 접속하세요.

## 명령어

| 명령어                 | 용도                                  |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | 개발 서버                             |
| `npm run build`        | 타입 검사 후 `dist/`에 배포 파일 생성 |
| `npm run preview`      | 빌드 결과 로컬 미리보기               |
| `npm run typecheck`    | TypeScript 및 Vue 타입 검사           |
| `npm run format`       | Prettier 포맷 적용                    |
| `npm run format:check` | 포맷 검사                             |

## 구조

- `src/App.vue`: 공통 헤더, 메뉴, 푸터
- `src/router/index.ts`: 홈(`/`), 커리어(`/Career`), 프로젝트(`/Project`) 라우팅
- `src/views/`: 메뉴별 페이지
- `src/assets/styles/main.css`: 공통 스타일
- `src/main.ts`: 앱 진입점
- `public/`: 가공 없이 배포할 정적 파일
- `vite.config.ts`: Vue 플러그인과 배포 경로

Vue Router로 페이지를 전환하며, 선택된 메뉴를 표시합니다. 프로젝트는 `src/data/projects.json`에서 읽어 회사별 필터와 상세 펼치기를 제공합니다. 커리어는 `src/data/careers.json`에서 회사별 재직 기간·담당 업무·기술을 읽어 타임라인으로 표시합니다. 데이터 작성 방법은 `src/data/README.md`를 참고하세요. 빌드 시 각 경로에 `index.html`을 생성하여 GitHub Pages에서도 직접 접속과 새로고침을 지원합니다.

## 소스 관리와 GitHub Pages

기존 주소 `https://jfkdls0620.github.io/`에 맞춰 `base: '/'`로 설정했습니다.

소스는 `jfkdls0620/portfolio2026` 저장소에서 관리합니다. `main`에 push하거나 PR을 생성하면 GitHub Actions가 포맷 검사와 타입 검사, 빌드를 수행합니다. 현재 워크플로는 검사만 수행하며 배포하지 않습니다.

배포 시에는 다음 절차를 사용합니다.

1. `npm run build`로 배포 파일을 생성합니다.
2. `dist/` 내부 파일만 `jfkdls0620/jfkdls0620.github.io` 저장소의 `main` 브랜치 루트에 반영합니다. 소스와 `node_modules/`는 올리지 않습니다.
3. 배포 저장소의 **Settings → Pages → Build and deployment → Source**를 **Deploy from a branch**, 브랜치를 **main**, 폴더를 **/ (root)**로 설정합니다.

`public/.nojekyll`은 빌드 시 배포 루트로 복사됩니다. 이미지는 `public/images/`에 추가하고 `/images/파일명` 경로로 참조할 수 있습니다. 저장소 간 자동 배포는 추후 설정합니다.

프로젝트 저장소 주소(`https://사용자.github.io/저장소명/`)로 배포할 경우 `vite.config.ts`의 `base`를 `'/저장소명/'`으로 변경하세요.

설정 참고: [Vite GitHub Pages 배포 가이드](https://vite.dev/guide/static-deploy#github-pages)

로컬 세팅만으로 기존 사이트가 변경되지는 않습니다. 배포 전 `index.html`의 제목과 설명, `src/App.vue`의 임시 화면을 실제 콘텐츠로 교체하세요.
