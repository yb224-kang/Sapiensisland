# 🏝️ SAPIENS ISLAND - 전문가 강연 예약 플랫폼

> **모노레포 구조의 풀스택 프로젝트**  
> 프론트엔드(Figma Make) + 백엔드(Node.js) + 문서 통합 관리

**최종 업데이트**: 2026-01-06

---

## 📚 문서 구조

### **🚀 시작하기**
- **[MONOREPO_SETUP.md](./docs/MONOREPO_SETUP.md)** - 프로젝트 구조 및 역할 분담 (필독!)

### **🎨 프론트엔드 개발자**
- **[FRONTEND_CODE_GENERATION.md](./docs/FRONTEND_CODE_GENERATION.md)** - Cursor로 API 코드 자동 생성

### **🔧 백엔드 개발자**
- **[API_SPECIFICATION.md](./docs/API_SPECIFICATION.md)** - 백엔드 API 명세서

---

## 🎯 프로젝트 개요

### **핵심 개념**

```
하나의 Git 레포, 두 개의 앱:

sapiens-island/
├─ frontend/     → Figma Make가 푸시 (UI/컴포넌트)
├─ backend/      → 백엔드 개발자가 푸시 (API/DB)
├─ shared/       → 타입 공유 (협의 후 수정)
└─ docs/         → 모든 문서 통합
```

### **기술 스택**

| 구분 | 기술 |
|------|------|
| **프론트엔드** | Vite + React + TypeScript + Tailwind CSS |
| **백엔드** | Node.js + Express + PostgreSQL |
| **상태관리** | React Query v5 |
| **라우팅** | React Router DOM v6 |
| **디자인** | Pretendard Variable, Sapiens Navy (#000050) |

---

## 🚀 빠른 시작

### **1. 프로젝트 클론**

```bash
git clone https://github.com/yourname/sapiens-island.git
cd sapiens-island
```

### **2. 모노레포 설정** (처음 1회만)

```bash
# 루트 스크립트로 모든 의존성 설치
npm run install:all
```

### **3. 개발 서버 실행**

```bash
# 프론트 + 백엔드 동시 실행
npm run dev

# 또는 따로 실행
npm run dev:frontend  # localhost:5173
npm run dev:backend   # localhost:3001
```

### **4. 환경 변수 설정**

#### `frontend/.env`
```bash
VITE_API_URL=http://localhost:3001/api
```

#### `backend/.env`
```bash
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/sapiens_island
JWT_SECRET=your-secret-key
NODE_ENV=development
```

---

## 📁 프로젝트 구조

```
sapiens-island/
│
├─ frontend/                 🎨 프론트엔드 (Figma Make 작업 영역)
│  ├─ components/            ✅ Figma가 생성/수정
│  ├─ pages/                 ✅ Figma가 생성/수정
│  ├─ styles/                ✅ Figma가 생성/수정
│  ├─ api/                   🤖 Cursor가 자동 생성 (건드리지 않음)
│  ├─ hooks/                 🤖 Cursor가 자동 생성 (건드리지 않음)
│  └─ data/mockData.ts       📊 Mock 데이터
│
├─ backend/                  🔧 백엔드 (백엔드 개발자 작업 영역)
│  └─ src/
│     ├─ routes/             ✅ API 라우터
│     ├─ controllers/        ✅ 비즈니스 로직
│     ├─ models/             ✅ DB 모델
│     └─ server.ts           ✅ 서버 엔트리
│
├─ shared/                   🔄 공유 리소스
│  └─ types/                 ⚠️ 프론트/백엔드 협의 후 수정
│
├─ docs/                     📚 모든 문서
│  ├─ MONOREPO_SETUP.md      🚀 프로젝트 구조 가이드
│  ├─ FRONTEND_CODE_GENERATION.md  🎨 Cursor 코드 생성 가이드
│  └─ API_SPECIFICATION.md   🔧 백엔드 API 명세
│
└─ package.json              📦 루트 스크립트
```

---

## 👥 역할 분담

### **Figma Make (프론트엔드)** 🎨

**작업 폴더:**
```
✅ frontend/components/      (React 컴포넌트)
✅ frontend/pages/           (페이지)
✅ frontend/styles/          (CSS)
✅ frontend/public/          (이미지/아이콘)
✅ frontend/App.tsx
✅ frontend/main.tsx
```

**금지 폴더:**
```
❌ frontend/api/             (Cursor가 자동 생성)
❌ frontend/hooks/           (Cursor가 자동 생성)
❌ backend/                  (백엔드 전용)
```

**푸시 예시:**
```bash
git add frontend/components/ frontend/pages/
git commit -m "feat(frontend): Add new components"
git push
```

---

### **백엔드 개발자** 🔧

**작업 폴더:**
```
✅ backend/src/routes/       (API 엔드포인트)
✅ backend/src/controllers/  (비즈니스 로직)
✅ backend/src/models/       (데이터베이스)
✅ backend/src/middleware/   (인증/에러 처리)
```

**금지 폴더:**
```
❌ frontend/                 (프론트엔드 전용)
```

**푸시 예시:**
```bash
git add backend/src/
git commit -m "feat(backend): Add reservation API"
git push
```

---

### **Cursor AI (자동 생성)** 🤖

**자동 생성 폴더:**
```
🤖 frontend/api/             (API 호출 함수)
🤖 frontend/hooks/           (React Query 훅)
```

**사용 방법:**
1. `docs/FRONTEND_CODE_GENERATION.md` 열기
2. Cursor 프롬프트 복사
3. Cursor에 붙여넣기
4. 자동 생성 완료!

---

## 🔄 워크플로우

### **1단계: Figma에서 UI 생성** 🎨

```bash
# Figma Make에서 디자인 → 코드 생성
# frontend/components/, frontend/pages/ 생성됨
```

### **2단계: Cursor로 API 코드 생성** 🤖

```bash
# Cursor에서 프롬프트 실행
# frontend/api/, frontend/hooks/ 자동 생성
```

### **3단계: Mock 데이터로 개발** 📊

```typescript
// frontend/api/reservations.ts
const USE_MOCK = true;  // Mock 데이터 사용

// 개발하면서 실시간으로 확인 가능!
```

### **4단계: 백엔드 API 구현** 🔧

```bash
# 백엔드 개발자가 API 구현
# docs/API_SPECIFICATION.md 참고
```

### **5단계: 실제 API 연결** 🔗

```typescript
// frontend/api/reservations.ts
const USE_MOCK = false;  // 실제 API 호출

// .env
VITE_API_URL=https://api.sapiens-island.com/api
```

---

## 📋 NPM 스크립트

### **개발**
```bash
npm run dev                  # 프론트 + 백엔드 동시 실행
npm run dev:frontend         # 프론트엔드만
npm run dev:backend          # 백엔드만
```

### **빌드**
```bash
npm run build                # 전체 빌드
npm run build:frontend       # 프론트엔드 빌드 → dist/
npm run build:backend        # 백엔드 빌드 → dist/
```

### **설치**
```bash
npm run install:all          # 모든 의존성 설치
npm run install:frontend     # 프론트엔드만
npm run install:backend      # 백엔드만
```

### **테스트**
```bash
npm run test                 # 전체 테스트
npm run test:frontend        # 프론트엔드 테스트
npm run test:backend         # 백엔드 테스트
```

### **정리**
```bash
npm run clean                # node_modules, dist 삭제
```

---

## 🎨 디자인 시스템

### **컬러**
- **Sapiens Navy**: `#000050` (메인 컬러)
- **Sapiens Black**: `#1e1e1e` (텍스트)

### **타이포그래피**
- **폰트**: Pretendard Variable
- **단위**: rem (px 사용 금지)

### **예약 상태**
```typescript
type ReservationStatus = 
  | 'pending'      // 대기중
  | 'confirmed'    // 확정
  | 'completed'    // 완료
  | 'cancelled';   // 취소
```

### **문구 통일**
```
❌ 강연예약 → ✅ 강연문의
❌ 전문가 예약하기 → ✅ 강연문의하기
❌ 예약하기 → ✅ 문의하기
```

---

## 📖 추가 문서

각 역할별로 필요한 문서를 참고하세요:

### **프로젝트 설정** (전체)
- **[MONOREPO_SETUP.md](./docs/MONOREPO_SETUP.md)**
  - 프로젝트 구조 설정
  - Figma/백엔드 폴더 역할 분담
  - Git 워크플로우
  - 배포 설정

### **프론트엔드 개발** (Figma + Cursor)
- **[FRONTEND_CODE_GENERATION.md](./docs/FRONTEND_CODE_GENERATION.md)**
  - Cursor로 API 코드 자동 생성
  - React Query 훅 자동 생성
  - Mock ↔ Real API 전환
  - 코드 예시

### **백엔드 개발** (백엔드 개발자)
- **[API_SPECIFICATION.md](./docs/API_SPECIFICATION.md)**
  - 전체 API 엔드포인트 명세
  - 요청/응답 형식
  - 에러 처리
  - 인증 방법

---

## 🚨 주의사항

### **절대 규칙** ❌

```
❌ Figma → backend/ 폴더 수정 금지
❌ Figma → frontend/api/ 폴더 수정 금지
❌ Figma → frontend/hooks/ 폴더 수정 금지

❌ 백엔드 → frontend/ 폴더 수정 금지
```

### **협의 필요** ⚠️

```
⚠️ shared/types/ 폴더 수정 시:
   → 팀원과 협의 후 수정
   → 변경 사항 문서화
   → 양쪽 모두 테스트
```

---

## 🎯 체크리스트

### **초기 설정**
- [ ] Git 클론 완료
- [ ] `npm run install:all` 실행
- [ ] 환경 변수 설정 (`frontend/.env`, `backend/.env`)
- [ ] `npm run dev` 실행 확인
- [ ] localhost:5173 접속 확인 (프론트)
- [ ] localhost:3001 접속 확인 (백엔드)

### **개발 시작**
- [ ] `docs/MONOREPO_SETUP.md` 읽기
- [ ] 역할 분담 확인 (Figma/백엔드)
- [ ] Cursor로 API 코드 생성 (프론트)
- [ ] Mock 데이터로 개발 시작

### **배포 전**
- [ ] `USE_MOCK = false` 변경
- [ ] 실제 API 연동 테스트
- [ ] 빌드 오류 확인 (`npm run build`)
- [ ] 환경 변수 확인 (운영 환경)

---

## 🤝 협업 가이드

### **Figma 개발자**

```bash
# 1. 브랜치 생성
git checkout -b feature/frontend-ui

# 2. Figma에서 작업
# frontend/components/, frontend/pages/ 수정

# 3. 커밋
git add frontend/
git commit -m "feat(frontend): Update UI"

# 4. 푸시
git push origin feature/frontend-ui
```

### **백엔드 개발자**

```bash
# 1. 브랜치 생성
git checkout -b feature/backend-api

# 2. 백엔드 작업
# backend/src/ 수정

# 3. 커밋
git add backend/
git commit -m "feat(backend): Add API"

# 4. 푸시
git push origin feature/backend-api
```

**충돌 없음!** ✅ 서로 다른 폴더에서 작업하므로 Git 충돌이 발생하지 않습니다.

---

## 📞 문의 및 지원

- **프로젝트 구조**: `docs/MONOREPO_SETUP.md`
- **API 코드 생성**: `docs/FRONTEND_CODE_GENERATION.md`
- **백엔드 API**: `docs/API_SPECIFICATION.md`

---

## 🎉 시작하기

```bash
# 1. 클론
git clone https://github.com/yourname/sapiens-island.git
cd sapiens-island

# 2. 설치
npm run install:all

# 3. 실행
npm run dev

# 4. 브라우저 열기
http://localhost:5173
```

**Happy Coding! 🚀**

---

**Last Updated**: 2026-01-06  
**Version**: 2.0.0  
**Architecture**: Monorepo (Frontend + Backend)
