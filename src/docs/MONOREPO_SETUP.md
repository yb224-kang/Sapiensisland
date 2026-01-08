# 🏗️ 모노레포 구조 설정 가이드

> **프론트엔드 + 백엔드를 하나의 Git 레포에서 관리하세요!**  
> Figma/백엔드 역할 분담 명확, Cursor 협업 쉬움

**최종 업데이트**: 2026-01-06  
**대상**: 전체 개발팀  
**목적**: 프로젝트를 모노레포 구조로 설정하고 역할 분담 명확화

---

## 📋 목차

1. [왜 모노레포인가?](#왜-모노레포인가)
2. [프로젝트 구조](#프로젝트-구조)
3. [역할 분담 (Figma/백엔드)](#역할-분담-figma백엔드)
4. [설정 방법](#설정-방법)
5. [개발 워크플로우](#개발-워크플로우)
6. [Git 협업](#git-협업)
7. [충돌 방지 규칙](#충돌-방지-규칙)
8. [배포 설정](#배포-설정)

---

## 왜 모노레포인가?

### **현재 구조 (분리된 레포)** ❌

```
레포 1: sapiens-island-frontend/
├─ api/
├─ components/
└─ ...

레포 2: sapiens-island-backend/
├─ routes/
├─ controllers/
└─ ...

문제점:
❌ 문서 관리 분산 (어디에 둘까?)
❌ 타입 공유 불가능
❌ Git 브랜치 관리 복잡
❌ Cursor 협업 어려움
❌ 버전 관리 어려움
```

### **모노레포 구조** ✅

```
sapiens-island/
├─ frontend/
├─ backend/
├─ shared/
└─ docs/

장점:
✅ 문서 한 곳에서 관리
✅ 타입 공유 가능
✅ Git 브랜치 간단
✅ Cursor 협업 쉬움
✅ 버전 관리 간단
✅ 동시 개발 가능
```

---

## 프로젝트 구조

### **완전한 모노레포 구조**

```
sapiens-island/                    # 📦 루트 디렉토리
│
├─ frontend/                       # 🎨 프론트엔드 (Vite + React)
│  │
│  ├─ api/                         # API 호출 함수 (Cursor 자동 생성)
│  │  ├─ client.ts
│  │  ├─ types.ts
│  │  ├─ reservations.ts
│  │  ├─ settlements.ts
│  │  ├─ inquiries.ts
│  │  └─ dashboard.ts
│  │
│  ├─ hooks/                       # React Query 훅 (Cursor 자동 생성)
│  │  ├─ useReservationQueries.ts
│  │  ├─ useSettlementQueries.ts
│  │  ├─ useInquiryQueries.ts
│  │  └─ useDashboardQueries.ts
│  │
│  ├─ components/                  # React 컴포넌트 (Figma 생성)
│  │  ├─ Header.tsx
│  │  ├─ Footer.tsx
│  │  └─ ...
│  │
│  ├─ pages/                       # 페이지 컴포넌트
│  │  ├─ HomePage.tsx
│  │  ├─ AdminPage.tsx
│  │  └─ ...
│  │
│  ├─ data/                        # Mock 데이터
│  │  └─ mockData.ts
│  │
│  ├─ styles/                      # 스타일
│  │  └─ globals.css
│  │
│  ├─ public/                      # 정적 파일
│  │  └─ ...
│  │
│  ├─ .env                         # 환경변수
│  ├─ package.json                 # 프론트엔드 의존성
│  ├─ vite.config.ts
│  ├─ tsconfig.json
│  └─ index.html
│
├─ backend/                        # 🔧 백엔드 (Node.js + Express)
│  │
│  ├─ src/
│  │  ├─ routes/                   # API 라우터 (Cursor 자동 생성)
│  │  │  ├─ reservations.ts
│  │  │  ├─ settlements.ts
│  │  │  ├─ inquiries.ts
│  │  │  ├─ dashboard.ts
│  │  │  └─ index.ts
│  │  │
│  │  ├─ controllers/              # 비즈니스 로직
│  │  │  ├─ reservationController.ts
│  │  │  ├─ settlementController.ts
│  │  │  └─ ...
│  │  │
│  │  ├─ models/                   # 데이터베이스 모델
│  │  │  ├─ Reservation.ts
│  │  │  ├─ Settlement.ts
│  │  │  └─ ...
│  │  │
│  │  ├─ middleware/               # 미들웨어 (인증 등)
│  │  │  ├─ auth.ts
│  │  │  └─ errorHandler.ts
│  │  │
│  │  ├─ config/                   # 설정 파일
│  │  │  ├─ database.ts
│  │  │  └─ ...
│  │  │
│  │  └─ server.ts                 # 서버 엔트리포인트
│  │
│  ├─ .env                         # 환경변수
│  ├─ package.json                 # 백엔드 의존성
│  ├─ tsconfig.json
│  └─ nodemon.json
│
├─ shared/                         # 🔄 공유 리소스 (선택)
│  ├─ types/                       # 프론트/백엔드 공유 타입
│  │  ├─ reservation.ts
│  │  ├─ settlement.ts
│  │  ├─ inquiry.ts
│  │  └─ index.ts
│  │
│  └─ constants/                   # 공유 상수
│     ├─ status.ts                 # 예약 상태 등
│     └─ index.ts
│
├─ docs/                           # 📚 문서 (모두 한 곳에!)
│  ├─ API_SPECIFICATION.md         # 백엔드 API 명세
│  ├─ FRONTEND_CODE_GENERATION.md  # 프론트 코드 생성 가이드
│  ├─ MONOREPO_SETUP.md            # 이 문서
│  └─ DOCUMENTATION.md             # 전체 프로젝트 문서
│
├─ .gitignore                      # Git 무시 파일
├─ package.json                    # 루트 스크립트
├─ README.md                       # 프로젝트 소개
└─ .cursorrules                    # Cursor AI 설정 (선택)
```

---

## 역할 분담 (Figma/백엔드)

### **Figma 역할**

- **UI/UX 디자인**: 프론트엔드 컴포넌트 및 페이지 디자인
- **컴포넌트 생성**: Figma에서 컴포넌트 생성 후 코드로 변환
- **API 호출 함수 생성**: Cursor를 사용하여 API 호출 함수 생성

### **백엔드 역할**

- **API 구현**: Express를 사용하여 API 구현
- **비즈니스 로직**: 컨트롤러에서 비즈니스 로직 구현
- **데이터베이스 모델**: 모델 정의 및 관계 설정
- **미들웨어**: 인증, 에러 핸들링 등 미들웨어 구현

---

## 설정 방법

### **Step 1: 백업**

```bash
# 현재 프로젝트 백업
cp -r 현재프로젝트 현재프로젝트_backup
```

---

### **Step 2: 새 모노레포 생성**

```bash
# 루트 디렉토리 생성
mkdir sapiens-island
cd sapiens-island

# Git 초기화
git init

# 서브 디렉토리 생성
mkdir frontend backend shared docs
```

---

### **Step 3: 기존 코드 이동**

```bash
# 프론트엔드 코드 이동
mv ../현재프로젝트/* frontend/

# 백엔드 코드 생성 (아직 없다면 빈 폴더)
cd backend
npm init -y
```

---

### **Step 4: 루트 package.json 생성**

```bash
cd ..
npm init -y
```

#### `package.json` 내용:

```json
{
  "name": "sapiens-island",
  "version": "1.0.0",
  "private": true,
  "description": "Sapiens Island - 전문가 강연 예약 플랫폼",
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "cd frontend && npm run build",
    "build:backend": "cd backend && npm run build",
    
    "install:all": "npm install && npm run install:frontend && npm run install:backend",
    "install:frontend": "cd frontend && npm install",
    "install:backend": "cd backend && npm install",
    
    "test": "npm run test:frontend && npm run test:backend",
    "test:frontend": "cd frontend && npm test",
    "test:backend": "cd backend && npm test",
    
    "clean": "rm -rf frontend/node_modules backend/node_modules frontend/dist backend/dist"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  },
  "workspaces": [
    "frontend",
    "backend"
  ]
}
```

---

### **Step 5: .gitignore 설정**

```bash
# /.gitignore
# Node modules
frontend/node_modules/
backend/node_modules/
shared/node_modules/
node_modules/

# Build outputs
frontend/dist/
backend/dist/
frontend/build/
backend/build/

# Environment variables
frontend/.env
frontend/.env.local
backend/.env
backend/.env.local
.env

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/

# Temporary
*.tmp
.cache/
```

---

### **Step 6: 공유 타입 설정 (선택)**

#### `/shared/types/reservation.ts`

```typescript
/**
 * 예약 타입 (프론트/백엔드 공유)
 */
export interface Reservation {
  id: number;
  reservationDate: string;
  reservationTime: string;
  expert: string;
  expertField: string;
  locationType: 'online' | 'offline';
  location: string;
  region: string;
  agency: string;
  client: string;
  topic: string;
  audience: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  fee: number;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
}

/**
 * 예약 생성 DTO
 */
export interface CreateReservationDTO {
  reservationDate: string;
  reservationTime: string;
  expert: string;
  expertField: string;
  locationType: 'online' | 'offline';
  location: string;
  region: string;
  agency: string;
  client: string;
  topic: string;
  audience: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  fee: number;
  message?: string;
}
```

#### `/shared/types/index.ts`

```typescript
export * from './reservation';
export * from './settlement';
export * from './inquiry';
```

#### 프론트엔드에서 사용:

```typescript
// frontend/api/types.ts
export * from '../../shared/types';
```

#### 백엔드에서 사용:

```typescript
// backend/src/types/index.ts
export * from '../../shared/types';
```

---

### **Step 7: 환경변수 설정**

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

### **Step 8: 의존성 설치**

```bash
# 루트에서 모든 의존성 한 번에 설치
npm run install:all
```

---

## 개발 워크플로우

### **1. 개발 서버 실행**

#### 프론트 + 백엔드 동시 실행
```bash
npm run dev
```

이 명령어는:
- `frontend/` 폴더에서 Vite 개발 서버 실행 (localhost:5173)
- `backend/` 폴더에서 Express 서버 실행 (localhost:3001)

#### 따로 실행
```bash
# 터미널 1: 프론트엔드만
npm run dev:frontend

# 터미널 2: 백엔드만
npm run dev:backend
```

---

### **2. Cursor로 코드 생성**

#### 프론트엔드 API 코드 생성

```bash
# Cursor에서 열기
cursor .

# 프롬프트:
docs/FRONTEND_CODE_GENERATION.md를 읽고
frontend/api/ 폴더에 API 호출 코드를 생성해주세요.

모든 파일은 frontend/ 폴더 안에 생성해야 합니다:
- frontend/api/client.ts
- frontend/api/types.ts
- frontend/api/reservations.ts
- frontend/hooks/useReservationQueries.ts
```

#### 백엔드 API 코드 생성

```bash
# 프롬프트:
docs/API_SPECIFICATION.md를 읽고
backend/src/ 폴더에 Express API를 생성해주세요.

모든 파일은 backend/src/ 폴더 안에 생성해야 합니다:
- backend/src/routes/reservations.ts
- backend/src/controllers/reservationController.ts
- backend/src/models/Reservation.ts
```

---

### **3. 빌드**

```bash
# 프론트 + 백엔드 동시 빌드
npm run build

# 결과:
# frontend/dist/  ← 프론트 빌드
# backend/dist/   ← 백엔드 빌드
```

---

## Git 협업

### **브랜치 전략**

```bash
# 메인 브랜치
main                        # 운영 배포
develop                     # 개발 통합

# 기능 브랜치
feature/frontend-xxx        # 프론트엔드 기능
feature/backend-xxx         # 백엔드 기능
feature/fullstack-xxx       # 프론트+백엔드 기능

# 예시
feature/frontend-reservation-form
feature/backend-reservation-api
feature/fullstack-reservation-feature
```

---

### **커밋 메시지 규칙**

```bash
# 프론트만 변경
git add frontend/
git commit -m "feat(frontend): Add reservation form component"

# 백엔드만 변경
git add backend/
git commit -m "feat(backend): Add reservation API endpoint"

# 문서만 변경
git add docs/
git commit -m "docs: Update API specification"

# 전체 변경
git add .
git commit -m "feat: Add reservation feature (frontend + backend)"
```

**커밋 접두사:**
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅
- `refactor`: 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드/설정 변경

---

### **풀 리퀘스트 (PR)**

```bash
# 1. 브랜치 생성
git checkout -b feature/frontend-dashboard

# 2. 작업 후 커밋
git add frontend/pages/DashboardPage.tsx
git commit -m "feat(frontend): Add dashboard page"

# 3. 푸시
git push origin feature/frontend-dashboard

# 4. GitHub에서 PR 생성
제목: [Frontend] Add dashboard page
내용:
- 대시보드 페이지 추가
- 월별 통계 차트 구현
- 전문가별 성과 테이블 추가

변경 파일:
- frontend/pages/DashboardPage.tsx (신규)
- frontend/components/StatsChart.tsx (신규)
```

---

## 충돌 방지 규칙

### **Figma/백엔드 분리**

- **Figma**: 프론트엔드 컴포넌트 및 페이지 디자인, API 호출 함수 생성
- **백엔드**: API 구현, 비즈니스 로직, 데이터베이스 모델, 미들웨어 구현

### **브랜치 관리**

- **Figma 개발자**: `feature/frontend-xxx` 브랜치에서 작업
- **백엔드 개발자**: `feature/backend-xxx` 브랜치에서 작업

### **커밋 규칙**

- **Figma 개발자**: `frontend/` 폴더만 수정 후 커밋
- **백엔드 개발자**: `backend/` 폴더만 수정 후 커밋

---

## 배포 설정

### **Vercel (프론트엔드)**

#### `vercel.json`

```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist",
  "devCommand": "cd frontend && npm run dev",
  "installCommand": "npm run install:frontend",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.sapiens-island.com/api/:path*"
    }
  ]
}
```

---

### **Heroku (백엔드)**

#### `Procfile`

```
web: cd backend && npm start
```

#### `package.json` (백엔드)

```json
{
  "scripts": {
    "start": "node dist/server.js",
    "build": "tsc",
    "dev": "nodemon src/server.ts"
  }
}
```

---

### **Docker (선택)**

#### `docker-compose.yml`

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:3001/api

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/sapiens_island
      - JWT_SECRET=your-secret-key

  db:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=sapiens_island
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### 사용법:

```bash
# 모든 서비스 실행
docker-compose up

# 백그라운드 실행
docker-compose up -d

# 중지
docker-compose down
```

---

## 🎯 최종 체크리스트

### **모노레포 설정 완료**

- [ ] 루트 `package.json` 생성됨
- [ ] `frontend/` 폴더 설정됨
- [ ] `backend/` 폴더 설정됨
- [ ] `shared/` 폴더 설정됨 (타입 공유)
- [ ] `docs/` 폴더에 모든 문서 모음
- [ ] `.gitignore` 설정됨
- [ ] `npm run dev` 작동
- [ ] `npm run build` 작동
- [ ] Git 초기화됨
- [ ] 환경변수 설정됨

---

## 🚀 다음 단계

### **1. 프론트엔드 API 코드 생성**

```bash
# Cursor 프롬프트
docs/FRONTEND_CODE_GENERATION.md의 프롬프트를 사용하여
frontend/api/ 폴더에 API 코드를 생성해주세요.
```

### **2. 백엔드 API 구현**

```bash
# Cursor 프롬프트
docs/API_SPECIFICATION.md를 읽고
backend/src/ 폴더에 Express API를 생성해주세요.
```

### **3. 통합 테스트**

```bash
# 프론트엔드에서 USE_MOCK = false로 변경
# 백엔드 서버 실행 확인
# API 연동 테스트
```

### **4. 배포**

```bash
# 프론트엔드: Vercel
# 백엔드: Heroku 또는 AWS
```

---

## 💡 팁

### **VSCode 워크스페이스 설정**

`sapiens-island.code-workspace`:

```json
{
  "folders": [
    {
      "name": "Frontend",
      "path": "frontend"
    },
    {
      "name": "Backend",
      "path": "backend"
    },
    {
      "name": "Shared",
      "path": "shared"
    },
    {
      "name": "Docs",
      "path": "docs"
    }
  ],
  "settings": {
    "typescript.tsdk": "node_modules/typescript/lib"
  }
}
```

사용법:
```bash
code sapiens-island.code-workspace
```

---

## 🎉 완료!

이제 모노레포 구조가 완성되었습니다!

**장점:**
- ✅ 프론트/백엔드 한 레포에서 관리
- ✅ 문서 한 곳에 모음
- ✅ Cursor 협업 쉬움
- ✅ Git 브랜치 간단
- ✅ 타입 공유 가능
- ✅ 동시 개발 가능

**다음:**
1. `docs/FRONTEND_CODE_GENERATION.md` 읽기
2. Cursor로 프론트 API 코드 생성
3. `docs/API_SPECIFICATION.md` 읽기
4. Cursor로 백엔드 API 코드 생성
5. 통합 테스트
6. 배포!

---

**Happy Coding! 🚀**