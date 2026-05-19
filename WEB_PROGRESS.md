# Pick 웹 프론트엔드 작업 진행 현황

## [완료] 프로젝트 초기 세팅
- 파일: `web/src/utils/api.ts`, `web/src/utils/auth.ts`, `web/src/context/AuthContext.tsx`, `web/src/App.tsx`, `web/src/index.css`, `web/vite.config.ts`
- 작업 내용: React + Vite + TS 프로젝트 초기화, JSX 및 React 플러그인 설정 완료, Axios API 클라이언트 및 인증 유틸리티 설정, 전역 상태 관리(AuthContext) 및 라우팅 구조(App.tsx) 구축, 디자인 토큰 적용.
- 상태: ✅ 완료

## [완료] 인증 (Auth)
- 파일: `src/pages/auth/Login.tsx`, `src/pages/auth/SignUp.tsx`, `src/pages/auth/PartnerSignUp.tsx`, `src/pages/auth/FindAccount.tsx`
- API: `POST /auth/login`, `POST /auth/check`, `POST /auth/register`, `POST /auth/register/partner`, `POST /auth/findId`, `POST /auth/findPw`
- 작업 내용: 로그인, 고객 회원가입, 파트너 회원가입(파일 업로드 포함), 계정 찾기 화면 구현 및 API 연동 완료.
- 상태: ✅ 완료

## [완료] 고객 화면 (Customer)
- 파일: `src/pages/customer/Main.tsx`, `src/pages/customer/Pick.tsx`, `src/pages/customer/Schedule.tsx`, `src/pages/customer/MyPage.tsx`
- API: `GET /requests`, `GET /companies`, `POST /requests`, `PATCH /requests/:id/cancel`, `GET /users/:userId`, `POST /users/:userId`
- 작업 내용: 고객 메인(요청 카운트), 업체 찾기 및 시공 요청, 일정 관리(취소/상태 확인), 마이페이지(정보 수정) 기능 구현 및 API 연동 완료.
- 상태: ✅ 완료

## [완료] 시공업체 화면 (Constructor)
- 파일: `src/pages/constructor/Main.tsx`, `src/pages/constructor/Schedule.tsx`, `src/pages/constructor/MyPage.tsx`
- API: `GET /requests`, `PATCH /requests/:id/accept`, `PATCH /requests/:id/reject`, `PATCH /requests/:id/setSchedule`, `PATCH /requests/:id/complete`, `GET /companies/:companyId`, `POST /companies/:companyId`
- 작업 내용: 시공업체 메인(신규 요청 카운트), 일정 관리(수락/거절/확정/완료/취소관리), 마이페이지(업체 정보 수정) 기능 구현 및 API 연동 완료.
- 상태: ✅ 완료

## [완료] 중장비업체 화면 (Heavy)
- 파일: `src/pages/heavy/Main.tsx`, `src/pages/heavy/ToolRent.tsx`, `src/pages/heavy/Schedule.tsx`, `src/pages/heavy/MyPage.tsx`
- API: `GET /requests`, `GET /tool-requests/available`, `PATCH /tool-requests/:id/accept`, `PATCH /requests/:id/complete`, `GET /companies/:companyId`
- 작업 내용: 중장비업체 메인, 장비 렌탈 대기 목록 및 수락, 일정 관리, 마이페이지 기능 구현 및 API 연동 완료.
- 상태: ✅ 완료

## [완료] 공통 기능 (Common)
- 파일: `src/pages/common/ChatList.tsx`, `src/pages/common/ChatRoom.tsx`, `src/pages/common/Notice.tsx`, `src/pages/common/QnA.tsx`, `src/pages/common/Notifications.tsx`
- API: `GET /chat/rooms`, `GET /chat/:roomId/messages`, `GET /notices`, `POST /qna`, `GET /qna`, `GET /notifications`, `PATCH /notifications/:id/read`
- 작업 내용: 실시간 채팅(Socket.IO), 공지사항 목록, 1:1 문의 등록/내역, 실시간 알림 기능 구현 및 API 연동 완료.
- 상태: ✅ 완료
