# 📚 SAPIENS ISLAND 문서 가이드

> **모든 문서가 역할별로 정리되어 있습니다!**

**최종 업데이트**: 2026-01-06

---

## 🎯 역할별 문서

### **🚀 모든 팀원 (필독!)**
**[MONOREPO_SETUP.md](./MONOREPO_SETUP.md)**
- 프로젝트 구조 이해
- Figma/백엔드 폴더 역할 분담
- Git 워크플로우
- 환경 설정 방법

**읽어야 할 사람:**
- ✅ 프론트엔드 개발자
- ✅ 백엔드 개발자
- ✅ 프로젝트 매니저

---

### **🎨 프론트엔드 개발자**
**[FRONTEND_CODE_GENERATION.md](./FRONTEND_CODE_GENERATION.md)**
- Cursor로 API 코드 자동 생성
- 5분 만에 모든 API 함수 생성
- React Query 훅 자동 생성
- Mock ↔ Real API 전환 방법

**작업 폴더:**
```
✅ frontend/components/    (Figma가 생성)
✅ frontend/pages/         (Figma가 생성)
✅ frontend/styles/        (Figma가 생성)
```

**금지 폴더:**
```
❌ frontend/api/           (Cursor가 자동 생성)
❌ frontend/hooks/         (Cursor가 자동 생성)
❌ backend/                (백엔드 전용)
```

---

### **🔧 백엔드 개발자**
**[API_SPECIFICATION.md](./API_SPECIFICATION.md)**
- 완전한 백엔드 API 명세서
- 모든 엔드포인트 정의
- 요청/응답 형식
- 에러 처리 가이드
- 인증 방법

**작업 폴더:**
```
✅ backend/src/routes/       (API 엔드포인트)
✅ backend/src/controllers/  (비즈니스 로직)
✅ backend/src/models/       (데이터베이스)
✅ backend/src/middleware/   (인증/에러)
```

**금지 폴더:**
```
❌ frontend/                 (프론트엔드 전용)
```

---

## 📖 문서 읽는 순서

### **1단계: 프로젝트 이해** (필수)

```
1. 루트 README.md 읽기
   ↓
2. docs/MONOREPO_SETUP.md 읽기
   ↓
3. 역할에 맞는 문서로 이동
```

### **2단계: 프론트엔드 개발자**

```
1. MONOREPO_SETUP.md 읽기
   ↓
2. FRONTEND_CODE_GENERATION.md 읽기
   ↓
3. Cursor 프롬프트 복사
   ↓
4. API 코드 자동 생성
   ↓
5. 개발 시작!
```

### **3단계: 백엔드 개발자**

```
1. MONOREPO_SETUP.md 읽기
   ↓
2. API_SPECIFICATION.md 읽기
   ↓
3. Cursor로 백엔드 코드 생성
   ↓
4. 데이터베이스 연결
   ↓
5. API 구현 시작!
```

---

## 🗂️ 문서 구조

```
docs/
│
├─ README.md                       # 📍 이 문서 (문서 가이드)
│
├─ MONOREPO_SETUP.md               # 🚀 프로젝트 구조 (전체)
│  ├─ 왜 모노레포인가?
│  ├─ 프로젝트 구조
│  ├─ 역할 분담 (Figma/백엔드)
│  ├─ 설정 방법
│  ├─ Git 협업
│  └─ 배포 설정
│
├─ FRONTEND_CODE_GENERATION.md     # 🎨 Cursor 코드 생성 (프론트)
│  ├─ 왜 Cursor 자동 생성인가?
│  ├─ Cursor 프롬프트 (복사 붙여넣기)
│  ├─ 생성되는 파일
│  ├─ 사용 방법
│  └─ Mock ↔ Real API 전환
│
└─ API_SPECIFICATION.md            # 🔧 백엔드 API 명세 (백엔드)
   ├─ 기본 정보
   ├─ 데이터 타입 정의
   ├─ API 엔드포인트
   │  ├─ 예약 API
   │  ├─ 정산 API
   │  ├─ 문의 API
   │  └─ 대시보드 API
   ├─ 인증 및 보안
   └─ 에러 처리
```

---

## ✅ 빠른 체크리스트

### **초기 설정 (모든 팀원)**
- [ ] 루트 README.md 읽기
- [ ] `docs/MONOREPO_SETUP.md` 읽기
- [ ] 역할 분담 확인
- [ ] Git 클론 완료
- [ ] `npm run install:all` 실행
- [ ] 환경 변수 설정

### **프론트엔드 개발자**
- [ ] `docs/FRONTEND_CODE_GENERATION.md` 읽기
- [ ] Cursor 프롬프트 복사
- [ ] Cursor에 붙여넣기
- [ ] `frontend/api/` 생성 확인
- [ ] `frontend/hooks/` 생성 확인
- [ ] Mock 데이터로 개발 시작

### **백엔드 개발자**
- [ ] `docs/API_SPECIFICATION.md` 읽기
- [ ] 데이터베이스 설정
- [ ] Cursor로 백엔드 코드 생성
- [ ] API 엔드포인트 구현
- [ ] Postman으로 API 테스트

---

## 🚨 중요 규칙

### **절대 규칙** ❌

```
❌ Figma → backend/ 폴더 수정 금지
❌ Figma → frontend/api/ 폴더 수정 금지
❌ Figma → frontend/hooks/ 폴더 수정 금지

❌ 백엔드 → frontend/ 폴더 수정 금지
❌ 백엔드 → docs/ 폴더 수정 금지 (읽기만)
```

### **협의 필요** ⚠️

```
⚠️ shared/types/ 폴더 수정 시:
   → 팀원과 협의 후 수정
   → 변경 사항 문서화
   → 양쪽 모두 테스트
```

---

## 📞 도움이 필요하면?

### **프로젝트 구조 이해**
→ `MONOREPO_SETUP.md` 참고

### **API 코드 자동 생성**
→ `FRONTEND_CODE_GENERATION.md` 참고

### **백엔드 API 구현**
→ `API_SPECIFICATION.md` 참고

### **Git 충돌 문제**
→ `MONOREPO_SETUP.md` > "Git 협업" 섹션 참고

---

## 🎉 시작하기

```bash
# 1. 문서 읽기
cat docs/MONOREPO_SETUP.md

# 2. 프로젝트 클론
git clone https://github.com/yourname/sapiens-island.git
cd sapiens-island

# 3. 설치
npm run install:all

# 4. 실행
npm run dev
```

---

**Happy Coding! 🚀**

---

**Last Updated**: 2026-01-06  
**Version**: 2.0.0  
**Docs Structure**: Clean & Organized ✅
