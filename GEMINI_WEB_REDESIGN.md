# Pick 웹 리디자인 작업 지침

## 배경
기존 `web/src/pages/`는 API 연결은 되어있지만 디자인이 빈약함.
Locofy(Figma→React 변환)로 뽑은 디자인 코드를 기반으로 재구현.

## 핵심 규칙
1. **API 로직 유지** — useQuery, useMutation, useAuth 등 기존 로직 절대 건드리지 말 것
2. **absolute 포지셔닝 금지** — Locofy 코드의 `absolute top-[Npx] left-[Npx]`는 참고용. flexbox/grid로 재구현
3. **Tailwind CSS 사용** — inline style 대신 Tailwind 클래스 사용 (이미 설치됨)
4. **이미지 경로** — `/images/` 폴더 기준 (예: `/images/02-main-category/001-3d.png`)
5. **반응형** — 모바일(~768px) / 태블릿(768~1024px) / 데스크톱(1024px~)

---

## 레이아웃 변경 (가장 중요)

### 기존 → 변경
- 기존: CustomerLayout, ConstructorLayout, HeavyLayout (사이드바)
- 변경: **공통 TopNavLayout 1개** (상단 네비바)

### TopNavLayout 구조 (`src/components/layout/TopNavLayout.tsx` 새로 생성)

```
┌─────────────────────────────────────────────────────┐
│ 상단 유틸 바: [알림] [로그인/유저명] [회원가입] [앱다운로드] │  h-[50px] bg-white border-b
├─────────────────────────────────────────────────────┤
│ 네비바: PICK로고 | 업체찾기 | 시공PICK | 스케줄 | TALK | 마이페이지 │  h-[60px]
├─────────────────────────────────────────────────────┤
│ 위치 바: 📍 서울특별시 마포구 도화동 00-1  ▼           │  h-[45px] bg-gray-50
├─────────────────────────────────────────────────────┤
│                                                     │
│                   콘텐츠 영역                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 네비 항목 (유저 타입별 분기)
- **customer**: 업체찾기(`/customer/pick`) | 시공PICK(`/customer/pick`) | 스케줄(`/customer/schedule`) | TALK(`/customer/chat`) | 마이페이지(`/customer/mypage`)
- **constructor**: 스케줄(`/constructor/schedule`) | TALK(`/constructor/chat`) | 마이페이지(`/constructor/mypage`)
- **heavy**: 스케줄(`/heavy/schedule`) | 장비렌탈(`/heavy/tool-rent`) | TALK(`/heavy/chat`) | 마이페이지(`/heavy/mypage`)

활성 메뉴: `text-[#2CB07B] font-bold`
비활성 메뉴: `text-[#000326]`

### App.tsx 수정
기존 CustomerLayout/ConstructorLayout/HeavyLayout 감싸는 부분을 전부 TopNavLayout으로 교체.
TopNavLayout은 auth.type을 읽어서 네비 항목 자동 분기.

---

## 디자인 토큰 (Tailwind에 이미 등록됨)

```
primary:   #2CB07B  (초록 — 버튼, 활성탭, 강조)
dark:      #000326  (네이비 — 텍스트, 헤더)
gray:      #848484  (회색 — 서브텍스트)
gainsboro: #E6E6E6  (연회색 — 테두리, 구분선)
darkgray:  #B4B4B4  (입력창 placeholder)
error:     #FF3120  (빨강 — 에러메시지)
light:     #F6F6F6  (배경)
```

---

## 페이지별 구현 가이드

### 1. 로그인 (`src/pages/auth/Login.tsx`)

**디자인 구조 (Locofy 참고):**
- 흰 배경, 세로 중앙 정렬
- 상단: 회원 / 파트너 라디오 버튼 (선택시 주황색 채워진 원)
- 중앙: "시공전문가 찾고 **픽!** 할 땐" (픽!은 #2CB07B)
- 입력창: 아이디(사람 아이콘), 비밀번호(자물쇠 아이콘) — 아이콘은 `/images/01-login/` 참고
- 에러메시지: #FF3120
- 자동로그인 체크박스 + 아이디/비밀번호 찾기 링크
- 하단: 로그인 버튼 (bg-[#000326] rounded-[40px] text-white)
- 회원/파트너 회원가입 링크

**기존 로직 유지:**
```tsx
// 이 로직들 그대로 유지
const handleLogin = async (e) => { ... post('/auth/login') ... }
const { login } = useAuth()
navigate('/customer/main') 등
```

---

### 2. 고객 메인 (`src/pages/customer/Main.tsx`)

**디자인 구조 (Locofy 참고):**
- 배너 이미지 영역 (h-[250px], `/images/` 중 적절한 이미지)
- 카테고리 아이콘 그리드 (8개 × N행):
  ```
  이미지: /images/02-main-category/001-3d.png ~ 028-aerialcar.png
  카테고리명: 3D도면설계, 종합인테리어, 철거, 소방설비, 설비, 전기, 샤시, 목공,
              욕실, 타일, 페인트, 도배, 필름, 마루, 장판, 조명,
              싱크, 닥트, 금속공사, 간판, 천막&어닝, 냉난방, CCTV, 청소,
              도어락, 카고크레인, 사다리차, 고소작업차
  ```
  레이아웃: `grid grid-cols-8 gap-4` (데스크톱), `grid-cols-4` (모바일)
  각 아이템: 아이콘(73×73) + 텍스트 아래
- "접어두기" 토글 버튼
- 오늘의 방문스케줄 섹션 (카드 가로 스크롤)

**기존 로직 유지:**
```tsx
const { data: requestCount } = useQuery({ ... get('/requests', ...) })
```

---

### 3. 업체찾기/Pick (`src/pages/customer/Pick.tsx`)

**업체 카드 디자인 (Locofy pick.tsx 참고):**
```
┌─────────────────────────────────┐
│ [프로필이미지 70×70] 업체명(bold)  │
│                보증보험가능 자격증보유 6개월A/S │
├── 시공이미지1(173×119) ──시공이미지2(146×119) ┤
├─────────────────────────────────┤
│ ⭐+100    ───────    30건        │
└─────────────────────────────────┘
```
- 카드 크기: w-[346px], shadow, rounded-[8px], border-gainsboro
- 카드 목록: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

**필터 바:**
- 지역 드롭다운 + 카테고리 드롭다운 (Locofy의 `종합인테리어 ▼` 참고)
- "찜콕" 탭 | "전체" 탭

**기존 로직 유지:**
```tsx
useQuery({ queryKey: ['companies'...], queryFn: () => get('/companies', ...) })
useMutation({ mutationFn: (data) => post('/requests', data) })
handleToggleCompany, handleRequest 등
```

---

### 4. 마이페이지 — 고객 (`src/pages/customer/MyPage.tsx`)

**디자인 구조 (Locofy mypage.tsx 참고):**
- 상단: 회색 배경 배너(h-[146px]) 안에 프로필 이미지(88×88) + 이름 + 전화번호
- 메뉴 리스트 (아이콘 + 텍스트):
  - 공지사항 → `/customer/notice`
  - 찜콕
  - 리뷰관리
  - 자주 묻는 질문 → `/customer/qna`
  - 1:1 문의하기 → `/customer/qna`
  - 회원정보 수정하기

**기존 로직 유지:**
```tsx
useQuery({ queryKey: ['userProfile'...], queryFn: () => get('/users/...') })
useMutation({ mutationFn: (formData) => postForm('/users/...', formData) })
```

---

### 5. 나머지 페이지 (같은 패턴 적용)

**constructor/MyPage, heavy/MyPage:**
- mypage.tsx 디자인 패턴 동일, 내용만 다름 (업체명, 업체정보)

**Schedule 페이지들 (customer/constructor/heavy):**
- 탭 바 + 카드 리스트 구조 유지
- 카드 디자인: white bg, shadow, rounded, 상태 뱃지 (기존 로직 유지)

**ChatList / ChatRoom:**
- 기존 로직 유지, 디자인만 개선
- ChatList: 아바타(50×50 원형) + 이름 + 마지막 메시지 + 시간
- ChatRoom: 말풍선 (내가 보낸 것: 오른쪽 #2CB07B, 상대방: 왼쪽 흰색)

---

## 이미지 경로 매핑

```
카테고리 아이콘:
  3D도면설계  → /images/02-main-category/001-3d.png
  종합인테리어 → /images/02-main-category/002-interior.png
  철거        → /images/02-main-category/003-demolition.png
  소방설비    → /images/02-main-category/004-firefighting.png
  설비        → /images/02-main-category/005-facility.png
  전기        → /images/02-main-category/006-electronic.png
  샤시        → /images/02-main-category/007-chassis.png
  목공        → /images/02-main-category/008-woodworking.png
  욕실        → /images/02-main-category/009-bath.png
  타일        → /images/02-main-category/010-tile.png
  페인트      → /images/02-main-category/011-paint.png
  도배        → /images/02-main-category/012-papering.png
  필름        → /images/02-main-category/013-film.png
  장판        → /images/02-main-category/014-floor.png
  조명        → /images/02-main-category/015-light.png
  마루        → /images/02-main-category/016-flooring.png
  싱크        → /images/02-main-category/017-sink.png
  닥트        → /images/02-main-category/018-doct.png
  금속공사    → /images/02-main-category/019-metalwork.png
  간판        → /images/02-main-category/020-sign.png
  천막&어닝   → /images/02-main-category/021-earning.png
  냉난방      → /images/02-main-category/022-warming.png
  CCTV       → /images/02-main-category/023-cctv.png
  청소        → /images/02-main-category/024-cleaning.png
  도어락      → /images/02-main-category/025-doorlock.png
  카고크레인  → /images/02-main-category/026-cargo.png
  사다리차    → /images/02-main-category/027-laddercar.png
  고소작업차  → /images/02-main-category/028-aerialcar.png

기타:
  자동로그인 체크 → /images/01-login/02-auto-login.png
  별점           → /images/star/1.png, /images/star/2.png
  리뷰 썸네일    → /images/review-thum-1.png
```

---

## 완료 기록
작업 완료 시 `WEB_PROGRESS.md`에 추가:
```
## [리디자인 완료] 페이지명
- 파일: src/pages/...
- 변경: Locofy 디자인 기반 재구현, TopNavLayout 적용
- 상태: ✅ 완료
```
