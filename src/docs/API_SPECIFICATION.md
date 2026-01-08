# 🚀 SAPIENS ISLAND - Backend API Specification

> **Cursor AI 친화적 API 명세서**  
> 이 문서는 `/data/mockData.ts`를 기반으로 작성되었으며, 백엔드 개발자가 프론트엔드 코드를 보지 않고도 API를 구축할 수 있도록 설계되었습니다.

**작성일**: 2026-01-06  
**프론트엔드**: React + TypeScript + Vite  
**백엔드**: Node.js/Express (권장) 또는 원하는 프레임워크

---

## 📋 목차

1. [기본 정보](#기본-정보)
2. [인증 및 보안](#인증-및-보안)
3. [공통 응답 형식](#공통-응답-형식)
4. [데이터 타입 정의](#데이터-타입-정의)
5. [API 엔드포인트](#api-엔드포인트)
   - [예약 관리 (Reservations)](#1-예약-관리-reservations)
   - [정산 관리 (Settlements)](#2-정산-관리-settlements)
   - [기타문의 관리 (Inquiries)](#3-기타문의-관리-inquiries)
   - [대시보드 통계 (Dashboard Stats)](#4-대시보드-통계-dashboard-stats)
   - [지역 분석 (Regional Analytics)](#5-지역-분석-regional-analytics)
6. [프론트엔드 코드 자동 생성](#프론트엔드-코드-자동-생성) 🆕
7. [데이터 예시](#데이터-예시)
8. [배포 체크리스트](#배포-체크리스트)

---

## 기본 정보

### Base URL
```
개발: http://localhost:3001/api
운영: https://api.sapiens-island.com/api
```

### HTTP Methods
- `GET`: 조회
- `POST`: 생성
- `PUT`: 수정
- `DELETE`: 삭제

### Content-Type
```
Content-Type: application/json
Accept: application/json
```

---

## 인증 및 보안

### 인증 방식: JWT Bearer Token

**요청 헤더:**
```http
Authorization: Bearer {token}
```

**토큰 발급 엔드포인트** (구현 필요):
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

**응답:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

### CORS 설정
```javascript
// 허용 도메인
https://sapiens-island.com
http://localhost:5173
```

---

## 공통 응답 형식

### 성공 응답
```json
{
  "success": true,
  "data": { /* 응답 데이터 */ }
}
```

### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지"
  }
}
```

### HTTP 상태 코드
- `200 OK`: 성공
- `201 Created`: 생성 성공
- `400 Bad Request`: 잘못된 요청
- `401 Unauthorized`: 인증 실패
- `403 Forbidden`: 권한 없음
- `404 Not Found`: 리소스 없음
- `500 Internal Server Error`: 서버 오류

---

## 데이터 타입 정의

### Reservation (���약)
```typescript
{
  id: number;                    // 예약 ID (자동 증가)
  reservationDate: string;       // 예약 날짜 "YYYY-MM-DD"
  reservationTime: string;       // 예약 시간 "HH:mm"
  expert: string;                // 전문가 이름
  expertField: string;           // 전문 분야
  locationType: "online" | "offline";  // 진행 방식
  location: string;              // 장소
  region: string;                // 지역 (서울, 경기, 부산 등)
  agency: string;                // 기관/회사명
  client: string;                // 담당 부서/팀
  topic: string;                 // 강연 주제
  audience: string;              // 참석 대상
  contactName: string;           // 담당자 이름
  contactPhone: string;          // 담당자 전화번호
  contactEmail: string;          // 담당자 이메일
  fee: number;                   // 강연료 (원)
  message?: string;              // 추가 메시지 (선택)
  status: "pending" | "confirmed" | "completed" | "cancelled";  // 상태
  createdAt: string;             // 생성일시 "YYYY-MM-DD HH:mm"
  confirmedAt?: string;          // 확정일시 (선택)
  completedAt?: string;          // 완료일시 (선택)
  cancelledAt?: string;          // 취소일시 (선택)
  cancelReason?: string;         // 취소 사유 (선택)
}
```

**상태 코드:**
- `pending`: 대기중 (신청 직후)
- `confirmed`: 확정 (관리자 승인)
- `completed`: 완료 (강연 종료)
- `cancelled`: 취소

### Settlement (정산)
```typescript
{
  id: number;                    // 정산 ID (자동 증가)
  reservationId: number;         // 예약 ID (외래키)
  revenue: number;               // 매출액 (원)
  cost: number;                  // 원가 (원)
  profit: number;                // 이익금 (원)
  profitRate: number;            // 이익률 (%)
  commissionRate: number;        // 수수료율 (%)
  commissionAmount: number;      // 수수료 금액 (원)
  settlementAmount: number;      // 정산 금액 (원)
  settlementStatus: "pending" | "completed";  // 정산 상태
  settlementDate?: string;       // 정산일 "YYYY-MM-DD" (선택)
  paymentScheduledDate?: string; // 입금 예정일 "YYYY-MM-DD" (선택)
  memo?: string;                 // 메모 (선택)
}
```

### Inquiry (기타문의)
```typescript
{
  id: number;                    // 문의 ID (자동 증가)
  title: string;                 // 제목
  message: string;               // 문의 내용
  contactName: string;           // 문의자 이름
  contactPhone: string;          // 문의자 전화번호
  contactEmail: string;          // 문의자 이메일
  status: "pending" | "replied" | "resolved";  // 상태
  createdAt: string;             // 생성일시 "YYYY-MM-DD HH:mm"
  repliedAt?: string;            // 답변일시 (선택)
  reply?: string;                // 답변 내용 (선택)
  repliedBy?: string;            // 답변자 (선택)
}
```

### MonthlyStats (월별 통계)
```typescript
{
  month: string;                 // 월 "1월", "2월", ..., "12월"
  bookings: number;              // 예약 건수
  revenue: number;               // 매출 (백만원)
  profit: number;                // 이익 (백만원)
  cost: number;                  // 원가 (백만원)
  settlement: number;            // 정산 금액 (백만원)
  completed: number;             // 완료 건수
  confirmed: number;             // 확정 건수
  pending: number;               // 대기중 건수
  cancelled: number;             // 취소 건수
  expertDetails: Array<{
    expert: string;              // 전문가 이름
    bookings: number;            // 건수
    revenue: number;             // 매출 (백만원)
  }>;
}
```

---

## API 엔드포인트

## 1. 예약 관리 (Reservations)

### 1.1. 예약 목록 조회
```http
GET /api/reservations?page=1&limit=10&status=all&search=
```

**Query Parameters:**
- `page` (number, optional): 페이지 번호 (기본값: 1)
- `limit` (number, optional): 페이지당 항목 수 (기본값: 10)
- `status` (string, optional): 상태 필터 (all | pending | confirmed | completed | cancelled)
- `search` (string, optional): 검색어 (전문가명, 기관명, 담당자명)

**응답:**
```json
{
  "success": true,
  "data": {
    "reservations": [
      {
        "id": 1,
        "reservationDate": "2024-12-15",
        "reservationTime": "14:00",
        "expert": "김경일",
        "expertField": "심리학",
        "locationType": "offline",
        "location": "삼성전자 본사 대강당",
        "region": "경기",
        "agency": "삼성전자",
        "client": "삼성전자 HR팀",
        "topic": "조직 심리와 팀워크",
        "audience": "전 직원",
        "contactName": "김담당",
        "contactPhone": "010-1234-5678",
        "contactEmail": "kim@samsung.com",
        "fee": 2500000,
        "status": "completed",
        "createdAt": "2024-11-20 10:30",
        "confirmedAt": "2024-11-21 14:20",
        "completedAt": "2024-12-15 16:00"
      }
      // ... 더 많은 예약
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 12,
      "totalPages": 2
    }
  }
}
```

---

### 1.2. 예약 상세 조회
```http
GET /api/reservations/:id
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "reservationDate": "2024-12-15",
    "reservationTime": "14:00",
    "expert": "김경일",
    "expertField": "심리학",
    "locationType": "offline",
    "location": "삼성전자 본사 대강당",
    "region": "경기",
    "agency": "삼성전자",
    "client": "삼성전자 HR팀",
    "topic": "조직 심리와 팀워크",
    "audience": "전 직원",
    "contactName": "김담당",
    "contactPhone": "010-1234-5678",
    "contactEmail": "kim@samsung.com",
    "fee": 2500000,
    "message": "강연 잘 부탁드립니다.",
    "status": "completed",
    "createdAt": "2024-11-20 10:30",
    "confirmedAt": "2024-11-21 14:20",
    "completedAt": "2024-12-15 16:00"
  }
}
```

---

### 1.3. 예약 생성 (공개 API - 인증 불필요)
```http
POST /api/reservations
Content-Type: application/json

{
  "reservationDate": "2024-12-25",
  "reservationTime": "14:00",
  "expert": "김경일",
  "expertField": "심리학",
  "locationType": "offline",
  "location": "삼성전자 본사 대강당",
  "region": "서울",
  "agency": "삼성전자",
  "client": "삼성전자 HR팀",
  "topic": "조직 심리와 팀워크",
  "audience": "전 직원",
  "contactName": "김담당",
  "contactPhone": "010-1234-5678",
  "contactEmail": "kim@samsung.com",
  "fee": 2500000,
  "message": "강연 잘 부탁드립니다."
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 13,
    "reservationDate": "2024-12-25",
    "reservationTime": "14:00",
    "expert": "김경일",
    "expertField": "심리학",
    "locationType": "offline",
    "location": "삼성전자 본사 대강당",
    "region": "서울",
    "agency": "삼성전자",
    "client": "삼성전자 HR팀",
    "topic": "조직 심리와 팀워크",
    "audience": "전 직원",
    "contactName": "김담당",
    "contactPhone": "010-1234-5678",
    "contactEmail": "kim@samsung.com",
    "fee": 2500000,
    "message": "강연 잘 부탁드립니다.",
    "status": "pending",
    "createdAt": "2026-01-06 10:30"
  }
}
```

---

### 1.4. 예약 수정 (관리자 전용)
```http
PUT /api/reservations/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "reservationDate": "2024-12-26",
  "reservationTime": "15:00",
  "fee": 3000000,
  "status": "confirmed"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 13,
    "reservationDate": "2024-12-26",
    "reservationTime": "15:00",
    "fee": 3000000,
    "status": "confirmed",
    "confirmedAt": "2026-01-06 11:00"
    // ... 나머지 필드
  }
}
```

---

### 1.5. 예약 상태 변경 (관리자 전용)

#### 확정
```http
POST /api/reservations/:id/confirm
Authorization: Bearer {token}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 13,
    "status": "confirmed",
    "confirmedAt": "2026-01-06 11:00"
    // ... 나머지 필드
  }
}
```

#### 완료
```http
POST /api/reservations/:id/complete
Authorization: Bearer {token}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 13,
    "status": "completed",
    "completedAt": "2026-01-06 16:00"
    // ... 나머지 필드
  }
}
```

#### 취소
```http
POST /api/reservations/:id/cancel
Authorization: Bearer {token}
Content-Type: application/json

{
  "cancelReason": "고객 요청에 의한 취소"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 13,
    "status": "cancelled",
    "cancelledAt": "2026-01-06 11:30",
    "cancelReason": "고객 요청에 의한 취소"
    // ... 나머지 필드
  }
}
```

---

### 1.6. 예약 삭제 (관리자 전용)
```http
DELETE /api/reservations/:id
Authorization: Bearer {token}
```

**응답:**
```json
{
  "success": true,
  "message": "예약이 삭제되었습니다."
}
```

---

## 2. 정산 관리 (Settlements)

### 2.1. 정산 목록 조회
```http
GET /api/settlements?page=1&limit=10&status=all
```

**Query Parameters:**
- `page` (number, optional): 페이지 번호
- `limit` (number, optional): 페이지당 항목 수
- `status` (string, optional): 정산 상태 (all | pending | completed)

**응답:**
```json
{
  "success": true,
  "data": {
    "settlements": [
      {
        "id": 1,
        "reservationId": 1,
        "revenue": 2500000,
        "cost": 500000,
        "profit": 2000000,
        "profitRate": 80,
        "commissionRate": 20,
        "commissionAmount": 500000,
        "settlementAmount": 2000000,
        "settlementStatus": "completed",
        "settlementDate": "2024-12-16",
        "paymentScheduledDate": "2024-12-25",
        "memo": "정산 완료"
      }
      // ... 더 많은 정산
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 7,
      "totalPages": 1
    }
  }
}
```

---

### 2.2. 정산 상세 조회
```http
GET /api/settlements/:id
Authorization: Bearer {token}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "reservationId": 1,
    "revenue": 2500000,
    "cost": 500000,
    "profit": 2000000,
    "profitRate": 80,
    "commissionRate": 20,
    "commissionAmount": 500000,
    "settlementAmount": 2000000,
    "settlementStatus": "completed",
    "settlementDate": "2024-12-16",
    "paymentScheduledDate": "2024-12-25",
    "memo": "정산 완료"
  }
}
```

---

### 2.3. 예약별 정산 조회
```http
GET /api/settlements/by-reservation/:reservationId
Authorization: Bearer {token}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "reservationId": 1,
    "revenue": 2500000,
    "cost": 500000,
    "profit": 2000000,
    "profitRate": 80,
    "commissionRate": 20,
    "commissionAmount": 500000,
    "settlementAmount": 2000000,
    "settlementStatus": "completed",
    "settlementDate": "2024-12-16",
    "paymentScheduledDate": "2024-12-25",
    "memo": "정산 완료"
  }
}
```

---

### 2.4. 정산 생성
```http
POST /api/settlements
Authorization: Bearer {token}
Content-Type: application/json

{
  "reservationId": 13,
  "revenue": 3000000,
  "cost": 600000,
  "profit": 2400000,
  "profitRate": 80,
  "commissionRate": 20,
  "commissionAmount": 600000,
  "settlementAmount": 2400000,
  "paymentScheduledDate": "2026-01-15",
  "memo": "정산 대기중"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 8,
    "reservationId": 13,
    "revenue": 3000000,
    "cost": 600000,
    "profit": 2400000,
    "profitRate": 80,
    "commissionRate": 20,
    "commissionAmount": 600000,
    "settlementAmount": 2400000,
    "settlementStatus": "pending",
    "paymentScheduledDate": "2026-01-15",
    "memo": "정산 대기중"
  }
}
```

---

### 2.5. 정산 자동 계산 (Helper API)
```http
POST /api/settlements/calculate
Authorization: Bearer {token}
Content-Type: application/json

{
  "reservationId": 13,
  "commissionRate": 20
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "revenue": 3000000,
    "cost": 600000,
    "profit": 2400000,
    "profitRate": 80,
    "commissionAmount": 600000,
    "settlementAmount": 2400000
  }
}
```

**로직:**
```javascript
// 예약 ID로 예약 정보 조회
const reservation = await getReservation(reservationId);
const revenue = reservation.fee;

// 계산
const commissionAmount = revenue * (commissionRate / 100);
const settlementAmount = revenue - commissionAmount;
const cost = commissionAmount;
const profit = settlementAmount;
const profitRate = (profit / revenue) * 100;
```

---

### 2.6. 정산 완료 처리
```http
POST /api/settlements/:id/complete
Authorization: Bearer {token}
Content-Type: application/json

{
  "settlementDate": "2026-01-06"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 8,
    "settlementStatus": "completed",
    "settlementDate": "2026-01-06"
    // ... 나머지 필드
  }
}
```

---

### 2.7. 미정산 예약 목록 조회
```http
GET /api/settlements/unsettled-reservations
Authorization: Bearer {token}
```

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "reservationDate": "2024-12-18",
      "expert": "유영만",
      "agency": "현대자동차",
      "fee": 3000000,
      "status": "completed",
      "completedAt": "2024-12-18 12:00"
    }
    // ... 정산되지 않은 완료된 예약들
  ]
}
```

**로직:**
```javascript
// status가 'completed'이면서
// settlements 테이블에 reservationId가 없는 예약 조회
```

---

## 3. 기타문의 관리 (Inquiries)

### 3.1. 문의 목록 조회
```http
GET /api/inquiries?page=1&limit=10&status=all
Authorization: Bearer {token}
```

**Query Parameters:**
- `page` (number, optional): 페이지 번호
- `limit` (number, optional): 페이지당 항목 수
- `status` (string, optional): 상태 필터 (all | pending | replied | resolved)

**응답:**
```json
{
  "success": true,
  "data": {
    "inquiries": [
      {
        "id": 1,
        "title": "홈페이지 회원가입 문의",
        "message": "홈페이지 회원가입 기능이 있나요?...",
        "contactName": "김철수",
        "contactPhone": "010-1234-5678",
        "contactEmail": "kim@example.com",
        "status": "replied",
        "createdAt": "2024-12-20 09:30",
        "repliedAt": "2024-12-20 14:20",
        "reply": "안녕하세요. 현재 홈페이지는...",
        "repliedBy": "관리자"
      }
      // ... 더 많은 문의
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 8,
      "totalPages": 1
    }
  }
}
```

---

### 3.2. 문의 상세 조회
```http
GET /api/inquiries/:id
Authorization: Bearer {token}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "홈페이지 회원가입 문의",
    "message": "홈페이지 회원가입 기능이 있나요? 회원가입을 하고 싶은데 메뉴를 찾을 수 없습니다.",
    "contactName": "김철수",
    "contactPhone": "010-1234-5678",
    "contactEmail": "kim@example.com",
    "status": "replied",
    "createdAt": "2024-12-20 09:30",
    "repliedAt": "2024-12-20 14:20",
    "reply": "안녕하세요. 현재 홈페이지는 회원가입 없이 강연문의하기 기능을 사용하실 수 있습니다.",
    "repliedBy": "관리자"
  }
}
```

---

### 3.3. 문의 생성 (공개 API - 인증 불필요)
```http
POST /api/inquiries
Content-Type: application/json

{
  "title": "강연 일정 변경 문의",
  "message": "강연 일정을 변경하고 싶은데 어떻게 해야 하나요?",
  "contactName": "홍길동",
  "contactPhone": "010-9999-8888",
  "contactEmail": "hong@example.com"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 9,
    "title": "강연 일정 변경 문의",
    "message": "강연 일정을 변경하고 싶은데 어떻게 해야 하나요?",
    "contactName": "홍길동",
    "contactPhone": "010-9999-8888",
    "contactEmail": "hong@example.com",
    "status": "pending",
    "createdAt": "2026-01-06 10:30"
  }
}
```

---

### 3.4. 문의 답변 등록
```http
POST /api/inquiries/:id/reply
Authorization: Bearer {token}
Content-Type: application/json

{
  "reply": "안녕하세요. 강연 일정 변경은 담당자와 협의하여 진행됩니다.",
  "repliedBy": "관리자"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 9,
    "status": "replied",
    "repliedAt": "2026-01-06 11:00",
    "reply": "안녕하세요. 강연 일정 변경은 담당자와 협의하여 진행됩니다.",
    "repliedBy": "관리자"
    // ... 나머지 필드
  }
}
```

---

### 3.5. 문의 해결 처리
```http
POST /api/inquiries/:id/resolve
Authorization: Bearer {token}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": 9,
    "status": "resolved"
    // ... 나머지 필드
  }
}
```

---

### 3.6. 문의 삭제
```http
DELETE /api/inquiries/:id
Authorization: Bearer {token}
```

**응답:**
```json
{
  "success": true,
  "message": "문의가 삭제되었습니다."
}
```

---

## 4. 대시보드 통계 (Dashboard Stats)

### 4.1. 전체 통계 조회
```http
GET /api/dashboard/stats
Authorization: Bearer {token}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "totalBookings": 12,
    "bookingsByStatus": {
      "total": 12,
      "pending": 2,
      "confirmed": 2,
      "completed": 7,
      "cancelled": 1
    },
    "bookingStatusData": [
      { "name": "완료", "value": 7, "color": "#10b981" },
      { "name": "확정", "value": 2, "color": "#3b82f6" },
      { "name": "대기중", "value": 2, "color": "#f59e0b" },
      { "name": "취소", "value": 1, "color": "#ef4444" }
    ],
    "totalRevenue": 31000000,
    "averageBookingAmount": 2583333,
    "totalSettlementAmount": 14920000
  }
}
```

**계산 로직:**
```javascript
// 총 예약 건수
const totalBookings = await Reservation.count();

// 상태별 건수
const pending = await Reservation.count({ where: { status: 'pending' } });
const confirmed = await Reservation.count({ where: { status: 'confirmed' } });
const completed = await Reservation.count({ where: { status: 'completed' } });
const cancelled = await Reservation.count({ where: { status: 'cancelled' } });

// 총 매출 (모든 예약의 fee 합계)
const totalRevenue = await Reservation.sum('fee');

// 평균 예약 금액
const averageBookingAmount = totalRevenue / totalBookings;

// 총 정산 금액 (완료된 정산의 settlementAmount 합계)
const totalSettlementAmount = await Settlement.sum('settlementAmount', {
  where: { settlementStatus: 'completed' }
});
```

---

### 4.2. 월별 통계 조회
```http
GET /api/dashboard/monthly-stats?year=2024
Authorization: Bearer {token}
```

**Query Parameters:**
- `year` (number, optional): 연도 (기본값: 현재 연도)

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "month": "1월",
      "bookings": 0,
      "revenue": 0,
      "profit": 0,
      "cost": 0,
      "settlement": 0,
      "completed": 0,
      "confirmed": 0,
      "pending": 0,
      "cancelled": 0,
      "expertDetails": []
    },
    // ... 2월 ~ 10월 (데이터 없음)
    {
      "month": "11월",
      "bookings": 4,
      "revenue": 10.1,
      "profit": 8.08,
      "cost": 2.02,
      "settlement": 8.08,
      "completed": 4,
      "confirmed": 0,
      "pending": 0,
      "cancelled": 0,
      "expertDetails": [
        { "expert": "김경일", "bookings": 1, "revenue": 2.4 },
        { "expert": "유영만", "bookings": 1, "revenue": 3.2 },
        { "expert": "김미경", "bookings": 1, "revenue": 2.0 },
        { "expert": "최재붕", "bookings": 2, "revenue": 5.3 }
      ]
    },
    {
      "month": "12월",
      "bookings": 8,
      "revenue": 20.9,
      "profit": 16.72,
      "cost": 4.18,
      "settlement": 6.48,
      "completed": 3,
      "confirmed": 2,
      "pending": 2,
      "cancelled": 1,
      "expertDetails": [
        { "expert": "김경일", "bookings": 2, "revenue": 4.9 },
        { "expert": "유영만", "bookings": 1, "revenue": 3.0 },
        { "expert": "정재한", "bookings": 2, "revenue": 6.3 },
        { "expert": "김태훈", "bookings": 1, "revenue": 2.2 },
        { "expert": "김미경", "bookings": 1, "revenue": 1.9 },
        { "expert": "최재붕", "bookings": 1, "revenue": 2.6 }
      ]
    }
  ]
}
```

**계산 로직:**
```javascript
// 1월~12월 초기화
const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const monthlyData = months.map(month => ({
  month,
  bookings: 0,
  revenue: 0,
  profit: 0,
  cost: 0,
  settlement: 0,
  completed: 0,
  confirmed: 0,
  pending: 0,
  cancelled: 0,
  expertDetails: []
}));

// 예약 데이터를 월별로 집계
const reservations = await Reservation.findAll({
  where: { 
    reservationDate: { 
      [Op.gte]: `${year}-01-01`,
      [Op.lte]: `${year}-12-31`
    }
  }
});

reservations.forEach(r => {
  const monthIndex = new Date(r.reservationDate).getMonth();
  const monthData = monthlyData[monthIndex];
  
  // 예약 건수
  monthData.bookings++;
  
  // 매출 (백만원 단위)
  const revenueInM = r.fee / 1000000;
  monthData.revenue += revenueInM;
  
  // 수수료율 20% 가정
  const cost = revenueInM * 0.2;
  const profit = revenueInM * 0.8;
  monthData.cost += cost;
  monthData.profit += profit;
  
  // 완료된 예약만 정산 가능
  if (r.status === 'completed') {
    monthData.settlement += profit;
    monthData.completed++;
  }
  
  // 상태별 카운트
  if (r.status === 'confirmed') monthData.confirmed++;
  if (r.status === 'pending') monthData.pending++;
  if (r.status === 'cancelled') monthData.cancelled++;
  
  // 전문가별 상세
  const expertData = monthData.expertDetails.find(e => e.expert === r.expert);
  if (expertData) {
    expertData.bookings++;
    expertData.revenue += revenueInM;
  } else {
    monthData.expertDetails.push({
      expert: r.expert,
      bookings: 1,
      revenue: revenueInM
    });
  }
});

// 소수점 반올림
monthlyData.forEach(m => {
  m.revenue = Math.round(m.revenue * 10) / 10;
  m.profit = Math.round(m.profit * 10) / 10;
  m.cost = Math.round(m.cost * 10) / 10;
  m.settlement = Math.round(m.settlement * 10) / 10;
  m.expertDetails.forEach(e => {
    e.revenue = Math.round(e.revenue * 10) / 10;
  });
});
```

---

### 4.3. 전문가별 성과 조회
```http
GET /api/dashboard/expert-performance
Authorization: Bearer {token}
```

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "name": "김경일",
      "bookings": 3,
      "revenue": 7.4,
      "field": "심리학"
    },
    {
      "name": "최재붕",
      "bookings": 3,
      "revenue": 7.9,
      "field": "미디어"
    },
    {
      "name": "유영만",
      "bookings": 2,
      "revenue": 6.2,
      "field": "교육학"
    },
    {
      "name": "정재한",
      "bookings": 2,
      "revenue": 6.3,
      "field": "경영전략"
    },
    {
      "name": "김미경",
      "bookings": 2,
      "revenue": 3.9,
      "field": "교육"
    }
  ]
}
```

**계산 로직:**
```javascript
// 전문가별로 그룹핑하여 집계
const expertStats = {};

reservations.forEach(r => {
  if (!expertStats[r.expert]) {
    expertStats[r.expert] = {
      name: r.expert,
      bookings: 0,
      revenue: 0,
      field: r.expertField
    };
  }
  
  expertStats[r.expert].bookings++;
  expertStats[r.expert].revenue += r.fee / 1000000; // 백만원 단위
});

// 배열로 변환 후 예약 건수 기준 내림차순 정렬
const result = Object.values(expertStats)
  .map(e => ({
    ...e,
    revenue: Math.round(e.revenue * 10) / 10
  }))
  .sort((a, b) => b.bookings - a.bookings);
```

---

### 4.4. 최근 예약 조회
```http
GET /api/dashboard/recent-bookings?limit=8
Authorization: Bearer {token}
```

**Query Parameters:**
- `limit` (number, optional): 조회 개수 (기본값: 8)

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "id": 9,
      "date": "2024-12-25",
      "time": "10:30",
      "expert": "정재한",
      "client": "포스코",
      "status": "pending",
      "amount": "3,500,000",
      "field": "경영전략"
    },
    {
      "id": 4,
      "date": "2024-12-22",
      "time": "09:00",
      "expert": "김태훈",
      "client": "SK하이닉스",
      "status": "pending",
      "amount": "2,200,000",
      "field": "심리학"
    }
    // ... 최근 예약 순서대로
  ]
}
```

**계산 로직:**
```javascript
// reservationDate 기준 내림차순 정렬 후 limit개 조회
const recentBookings = await Reservation.findAll({
  order: [['reservationDate', 'DESC']],
  limit: limit
});

// 응답 형식 변환
const result = recentBookings.map(r => ({
  id: r.id,
  date: r.reservationDate,
  time: r.reservationTime,
  expert: r.expert,
  client: r.agency,
  status: r.status,
  amount: r.fee.toLocaleString(),
  field: r.expertField
}));
```

---

### 4.5. 상위 전문가 조회
```http
GET /api/dashboard/top-experts?limit=5
Authorization: Bearer {token}
```

**Query Parameters:**
- `limit` (number, optional): 조회 개수 (기본값: 5)

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "name": "김경일",
      "field": "심리학",
      "bookings": 3,
      "rating": 4.8
    },
    {
      "rank": 2,
      "name": "최재붕",
      "field": "미디어",
      "bookings": 3,
      "rating": 4.8
    },
    {
      "rank": 3,
      "name": "유영만",
      "field": "교육학",
      "bookings": 2,
      "rating": 4.8
    },
    {
      "rank": 4,
      "name": "정재한",
      "field": "경영전략",
      "bookings": 2,
      "rating": 4.8
    },
    {
      "rank": 5,
      "name": "김미경",
      "field": "교육",
      "bookings": 2,
      "rating": 4.8
    }
  ]
}
```

**계산 로직:**
```javascript
// 전문가별 성과 조회 후 상위 N명 선택
const expertPerformance = getExpertPerformance(); // 위에서 구현한 함수
const topExperts = expertPerformance.slice(0, limit).map((expert, index) => ({
  rank: index + 1,
  name: expert.name,
  field: expert.field,
  bookings: expert.bookings,
  rating: 4.8 // Mock rating (추후 리뷰 기능 추가 시 실제 계산)
}));
```

---

## 5. 지역 분석 (Regional Analytics)

### 5.1. 지역별 분포 조회
```http
GET /api/analytics/regional-distribution?expert=all
Authorization: Bearer {token}
```

**Query Parameters:**
- `expert` (string, optional): 전문가 필터 (all | 전문가명)

**응답:**
```json
{
  "success": true,
  "data": [
    {
      "region": "경기",
      "value": 4,
      "percentage": 33.3
    },
    {
      "region": "서울",
      "value": 8,
      "percentage": 66.7
    }
  ]
}
```

**계산 로직:**
```javascript
// 전문가 필터 적용
let query = {};
if (expert !== 'all') {
  query.expert = expert;
}

const reservations = await Reservation.findAll({ where: query });

// 지역별 집계
const regionMap = {};
reservations.forEach(r => {
  regionMap[r.region] = (regionMap[r.region] || 0) + 1;
});

const total = reservations.length;

// 배열로 변환 후 건수 기준 내림차순 정렬
const result = Object.entries(regionMap)
  .map(([region, value]) => ({
    region,
    value,
    percentage: total > 0 ? Math.round((value / total) * 1000) / 10 : 0
  }))
  .sort((a, b) => b.value - a.value);
```

---

### 5.2. 전문가 목록 조회 (지역 필터용)
```http
GET /api/analytics/experts
Authorization: Bearer {token}
```

**응답:**
```json
{
  "success": true,
  "data": [
    "김경일",
    "유영만",
    "정재한",
    "김태훈",
    "김미경",
    "최재붕"
  ]
}
```

**계산 로직:**
```javascript
// 중복 제거한 전문가 목록
const experts = await Reservation.findAll({
  attributes: ['expert'],
  group: ['expert']
});

const result = experts.map(e => e.expert).sort();
```

---

## 프론트엔드 코드 자동 생성

Cursor AI를 사용하여 프론트엔드 코드를 자동으로 생성할 수 있습니다. 다음은 프롬프트 예시입니다.

1. **프롬프트 예시:**
   ```
   이 API 명세서를 기반으로 React + TypeScript + Vite 프론트엔드를 구현해주세요.
   
   요구사항:
   - TypeScript 사용
   - Axios를 사용한 API 호출
   - 예약 관리 페이지 구현
   - 정산 관리 페이지 구현
   - 기타문의 관리 페이지 구현
   - 대시보드 통계 페이지 구현
   - 지역 분석 페이지 구현
   - 에러 처리 포함
   - 테스트 코드 포함
   ```

2. **단계별 구현:**
   - Step 1: API 호출 함수 구현
   - Step 2: 예약 관리 페이지 구현
   - Step 3: 정산 관리 페이지 구현
   - Step 4: 기타문의 관리 페이지 구현
   - Step 5: 대시보드 통계 페이지 구현
   - Step 6: 지역 분석 페이지 구현
   - Step 7: 테스트 코드 작성

3. **추천 프레임워크:**
   - **React**: TypeScript + Vite
   - **Vue**: TypeScript + Vite
   - **Angular**: TypeScript + Angular CLI

---

## 데이터 예시

### 실제 Mock 데이터 (12건)

프론트엔드에서 사용 중인 실제 데이터입니다. 백엔드 개발 시 이 데이터를 시드(seed)로 사용하세요.

#### 예약 데이터 (reservations)

```json
[
  {
    "id": 1,
    "reservationDate": "2024-12-15",
    "reservationTime": "14:00",
    "expert": "김경일",
    "expertField": "심리학",
    "locationType": "offline",
    "location": "삼성전자 본사 대강당",
    "region": "경기",
    "agency": "삼성전자",
    "client": "삼성전자 HR팀",
    "topic": "조직 심리와 팀워크",
    "audience": "전 직원",
    "contactName": "김담당",
    "contactPhone": "010-1234-5678",
    "contactEmail": "kim@samsung.com",
    "fee": 2500000,
    "status": "completed",
    "createdAt": "2024-11-20 10:30",
    "confirmedAt": "2024-11-21 14:20",
    "completedAt": "2024-12-15 16:00"
  },
  {
    "id": 2,
    "reservationDate": "2024-12-18",
    "reservationTime": "10:00",
    "expert": "유영만",
    "expertField": "교육학",
    "locationType": "online",
    "location": "Zoom 온라인",
    "region": "서울",
    "agency": "현대자동차",
    "client": "현대자동차 인재개발원",
    "topic": "미래 인재 육성 전략",
    "audience": "임원진",
    "contactName": "이과장",
    "contactPhone": "010-2345-6789",
    "contactEmail": "lee@hyundai.com",
    "fee": 3000000,
    "status": "confirmed",
    "createdAt": "2024-11-25 09:15",
    "confirmedAt": "2024-11-26 11:30"
  },
  {
    "id": 3,
    "reservationDate": "2024-12-20",
    "reservationTime": "15:00",
    "expert": "정재한",
    "expertField": "경영전략",
    "locationType": "offline",
    "location": "LG트윈타워 컨퍼런스홀",
    "region": "서울",
    "agency": "LG전자",
    "client": "LG전자 경영전략팀",
    "topic": "글로벌 경영 전략과 혁신",
    "audience": "경영진",
    "contactName": "박부장",
    "contactPhone": "010-3456-7890",
    "contactEmail": "park@lg.com",
    "fee": 2800000,
    "status": "confirmed",
    "createdAt": "2024-12-01 13:45",
    "confirmedAt": "2024-12-02 16:20"
  },
  {
    "id": 4,
    "reservationDate": "2024-12-22",
    "reservationTime": "09:00",
    "expert": "김태훈",
    "expertField": "심리학",
    "locationType": "offline",
    "location": "SK하이닉스 연수원",
    "region": "경기",
    "agency": "SK하이닉스",
    "client": "SK하이닉스 교육팀",
    "topic": "조직 내 소통과 갈등 관리",
    "audience": "팀장급",
    "contactName": "최차장",
    "contactPhone": "010-4567-8901",
    "contactEmail": "choi@skhynix.com",
    "fee": 2200000,
    "status": "pending",
    "createdAt": "2024-12-10 11:20"
  },
  {
    "id": 5,
    "reservationDate": "2024-11-30",
    "reservationTime": "13:00",
    "expert": "김미경",
    "expertField": "교육",
    "locationType": "online",
    "location": "MS Teams",
    "region": "서울",
    "agency": "네이버",
    "client": "네이버 인재육성팀",
    "topic": "리더십과 동기부여",
    "audience": "신입사원",
    "contactName": "강대리",
    "contactPhone": "010-5678-9012",
    "contactEmail": "kang@naver.com",
    "fee": 2000000,
    "status": "completed",
    "createdAt": "2024-11-01 14:30",
    "confirmedAt": "2024-11-02 09:45",
    "completedAt": "2024-11-30 15:00"
  },
  {
    "id": 6,
    "reservationDate": "2024-11-28",
    "reservationTime": "16:00",
    "expert": "최재붕",
    "expertField": "미디어",
    "locationType": "offline",
    "location": "카카오 판교오피스",
    "region": "경기",
    "agency": "카카오",
    "client": "카카오 마케팅팀",
    "topic": "디지털 전환과 미디어 트렌드",
    "audience": "전체 직원",
    "contactName": "윤팀장",
    "contactPhone": "010-6789-0123",
    "contactEmail": "yoon@kakao.com",
    "fee": 2700000,
    "status": "completed",
    "createdAt": "2024-10-28 10:15",
    "confirmedAt": "2024-10-29 14:30",
    "completedAt": "2024-11-28 18:00"
  },
  {
    "id": 7,
    "reservationDate": "2024-12-05",
    "reservationTime": "11:00",
    "expert": "김경일",
    "expertField": "심리학",
    "locationType": "offline",
    "location": "LG전자 연구소",
    "region": "서울",
    "agency": "LG전자",
    "client": "LG전자 R&D센터",
    "topic": "창의성과 혁신적 사고",
    "audience": "연구원",
    "contactName": "서연구원",
    "contactPhone": "010-7890-1234",
    "contactEmail": "seo@lg.com",
    "fee": 2400000,
    "status": "completed",
    "createdAt": "2024-11-05 09:30",
    "confirmedAt": "2024-11-06 13:15",
    "completedAt": "2024-12-05 13:00"
  },
  {
    "id": 8,
    "reservationDate": "2024-11-20",
    "reservationTime": "14:30",
    "expert": "유영만",
    "expertField": "교육학",
    "locationType": "online",
    "location": "Zoom 온라인",
    "region": "서울",
    "agency": "삼성전자",
    "client": "삼성전자 교육센터",
    "topic": "학습 조직 구축 전략",
    "audience": "관리자급",
    "contactName": "정부장",
    "contactPhone": "010-8901-2345",
    "contactEmail": "jung@samsung.com",
    "fee": 3200000,
    "status": "completed",
    "createdAt": "2024-10-20 15:45",
    "confirmedAt": "2024-10-21 10:30",
    "completedAt": "2024-11-20 16:30"
  },
  {
    "id": 9,
    "reservationDate": "2024-12-25",
    "reservationTime": "10:30",
    "expert": "정재한",
    "expertField": "경영전략",
    "locationType": "offline",
    "location": "포스코센터",
    "region": "서울",
    "agency": "포스코",
    "client": "포스코 기획팀",
    "topic": "지속 가능한 경영 전략",
    "audience": "임원진",
    "contactName": "임상무",
    "contactPhone": "010-9012-3456",
    "contactEmail": "lim@posco.com",
    "fee": 3500000,
    "status": "pending",
    "createdAt": "2024-12-12 16:20"
  },
  {
    "id": 10,
    "reservationDate": "2024-11-15",
    "reservationTime": "15:30",
    "expert": "김태훈",
    "expertField": "심리학",
    "locationType": "offline",
    "location": "CJ ENM 센터",
    "region": "서울",
    "agency": "CJ ENM",
    "client": "CJ ENM 인사팀",
    "topic": "조직 문화와 직원 만족도",
    "audience": "인사담당자",
    "contactName": "한차장",
    "contactPhone": "010-0123-4567",
    "contactEmail": "han@cj.net",
    "fee": 2100000,
    "status": "completed",
    "createdAt": "2024-10-15 11:10",
    "confirmedAt": "2024-10-16 14:25",
    "completedAt": "2024-11-15 17:30"
  },
  {
    "id": 11,
    "reservationDate": "2024-12-28",
    "reservationTime": "09:30",
    "expert": "김미경",
    "expertField": "교육",
    "locationType": "online",
    "location": "Google Meet",
    "region": "서울",
    "agency": "쿠팡",
    "client": "쿠팡 교육개발팀",
    "topic": "셀프 리더십과 자기계발",
    "audience": "전 직원",
    "contactName": "오과장",
    "contactPhone": "010-1111-2222",
    "contactEmail": "oh@coupang.com",
    "fee": 1900000,
    "status": "cancelled",
    "createdAt": "2024-12-05 10:40",
    "cancelledAt": "2024-12-18 09:15",
    "cancelReason": "사내 일정 변경으로 인한 취소"
  },
  {
    "id": 12,
    "reservationDate": "2024-11-10",
    "reservationTime": "13:30",
    "expert": "최재붕",
    "expertField": "미디어",
    "locationType": "offline",
    "location": "배달의민족 본사",
    "region": "서울",
    "agency": "우아한형제들",
    "client": "우아한형제들 마케팅팀",
    "topic": "모바일 시대의 마케팅 전략",
    "audience": "마케팅팀",
    "contactName": "송팀장",
    "contactPhone": "010-2222-3333",
    "contactEmail": "song@woowa.com",
    "fee": 2600000,
    "status": "completed",
    "createdAt": "2024-10-10 12:25",
    "confirmedAt": "2024-10-11 15:40",
    "completedAt": "2024-11-10 15:30"
  }
]
```

#### 정산 데이터 (settlements)

```json
[
  {
    "id": 1,
    "reservationId": 1,
    "revenue": 2500000,
    "cost": 500000,
    "profit": 2000000,
    "profitRate": 80,
    "commissionRate": 20,
    "commissionAmount": 500000,
    "settlementAmount": 2000000,
    "settlementStatus": "completed",
    "settlementDate": "2024-12-16",
    "paymentScheduledDate": "2024-12-25",
    "memo": "정산 완료"
  },
  {
    "id": 2,
    "reservationId": 5,
    "revenue": 2000000,
    "cost": 400000,
    "profit": 1600000,
    "profitRate": 80,
    "commissionRate": 20,
    "commissionAmount": 400000,
    "settlementAmount": 1600000,
    "settlementStatus": "completed",
    "settlementDate": "2024-12-01",
    "paymentScheduledDate": "2024-12-10",
    "memo": "정산 완료"
  },
  {
    "id": 3,
    "reservationId": 6,
    "revenue": 2700000,
    "cost": 540000,
    "profit": 2160000,
    "profitRate": 80,
    "commissionRate": 20,
    "commissionAmount": 540000,
    "settlementAmount": 2160000,
    "settlementStatus": "completed",
    "settlementDate": "2024-11-29",
    "paymentScheduledDate": "2024-12-08",
    "memo": "정산 완료"
  },
  {
    "id": 4,
    "reservationId": 7,
    "revenue": 2400000,
    "cost": 480000,
    "profit": 1920000,
    "profitRate": 80,
    "commissionRate": 20,
    "commissionAmount": 480000,
    "settlementAmount": 1920000,
    "settlementStatus": "pending",
    "paymentScheduledDate": "2024-12-20",
    "memo": "정산 대기중"
  },
  {
    "id": 5,
    "reservationId": 8,
    "revenue": 3200000,
    "cost": 640000,
    "profit": 2560000,
    "profitRate": 80,
    "commissionRate": 20,
    "commissionAmount": 640000,
    "settlementAmount": 2560000,
    "settlementStatus": "completed",
    "settlementDate": "2024-11-21",
    "paymentScheduledDate": "2024-11-30",
    "memo": "정산 완료"
  },
  {
    "id": 6,
    "reservationId": 10,
    "revenue": 2100000,
    "cost": 420000,
    "profit": 1680000,
    "profitRate": 80,
    "commissionRate": 20,
    "commissionAmount": 420000,
    "settlementAmount": 1680000,
    "settlementStatus": "completed",
    "settlementDate": "2024-11-16",
    "paymentScheduledDate": "2024-11-25",
    "memo": "정산 완료"
  },
  {
    "id": 7,
    "reservationId": 12,
    "revenue": 2600000,
    "cost": 520000,
    "profit": 2080000,
    "profitRate": 80,
    "commissionRate": 20,
    "commissionAmount": 520000,
    "settlementAmount": 2080000,
    "settlementStatus": "completed",
    "settlementDate": "2024-11-11",
    "paymentScheduledDate": "2024-11-20",
    "memo": "정산 완료"
  }
]
```

---

## 배포 체크리스트

### 백엔드 구현 시

- [ ] **데이터베이스 설정**
  - [ ] PostgreSQL / MySQL / MongoDB 등 선택
  - [ ] 테이블/스키마 생성
  - [ ] 시드 데이터 삽입 (위의 Mock 데이터 사용)

- [ ] **API 엔드포인트 구현**
  - [ ] 예약 관리 (8개 엔드포인트)
  - [ ] 정산 관리 (8개 엔드포인트)
  - [ ] 기타문의 관리 (6개 엔드포인트)
  - [ ] 대시보드 통계 (5개 엔드포인트)
  - [ ] 지역 분석 (2개 엔드포인트)

- [ ] **인증 시스템**
  - [ ] JWT 토큰 발급/검증
  - [ ] 로그인 API
  - [ ] 토큰 갱신 API

- [ ] **보안**
  - [ ] CORS 설정
  - [ ] HTTPS 사용 (운영 환경)
  - [ ] SQL Injection 방어
  - [ ] XSS 방어
  - [ ] Rate Limiting

- [ ] **에러 처리**
  - [ ] 전역 에러 핸들러
  - [ ] 유효성 검사
  - [ ] 에러 로깅

- [ ] **테스트**
  - [ ] Postman/Thunder Client로 API 테스트
  - [ ] 각 엔드포인트 정상 작동 확인
  - [ ] 에러 케이스 테스트

### 프론트엔드 연동 시

- [ ] **환경 변수 설정**
  ```bash
  # .env
  VITE_API_URL=https://api.sapiens-island.com/api
  ```

- [ ] **Mock 모드 해제**
  ```typescript
  // /api/reservations.ts
  const USE_MOCK = false;
  
  // /api/settlements.ts
  const USE_MOCK = false;
  ```

- [ ] **통합 테스트**
  - [ ] 예약 생성 테스트
  - [ ] 예약 목록 조회 테스트
  - [ ] 정산 관리 테스트
  - [ ] 대시보드 통계 테스트

---

## 🎯 Cursor AI 사용 팁

이 명세서를 Cursor AI에 제공할 때:

1. **프롬프트 예시:**
   ```
   이 API 명세서를 기반으로 Node.js + Express + PostgreSQL 백엔드를 구현해주세요.
   
   요구사항:
   - TypeScript 사용
   - Sequelize ORM 사용
   - JWT 인증 구현
   - 모든 엔드포인트 구현
   - 에러 처리 포함
   - 시드 데이터 스크립트 포함
   ```

2. **단계별 구현:**
   - Step 1: 데이터베이스 모델 정의
   - Step 2: 라우터 및 컨트롤러 구현
   - Step 3: 인증 미들웨어 구현
   - Step 4: 시드 데이터 스크립트 작성
   - Step 5: 테스트 코드 작성

3. **추천 프레임워크:**
   - **Node.js**: Express.js + Sequelize + PostgreSQL
   - **Python**: FastAPI + SQLAlchemy + PostgreSQL
   - **Java**: Spring Boot + JPA + PostgreSQL
   - **C#**: ASP.NET Core + Entity Framework + SQL Server

---

## 📞 문의

문제가 발생하면:
1. 이 문서의 데이터 타입 정의 확인
2. 응답 예시 참고
3. 계산 로직 확인
4. 프론트엔드 팀에 문의

---

**Happy Coding! 🚀**

이 문서만으로 백엔드 개발이 가능하도록 설계되었습니다.  
프론트엔드 코드를 보지 않아도 완벽한 API를 구축할 수 있습니다!