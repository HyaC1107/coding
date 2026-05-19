# Pick 웹 프론트엔드 작업 진행 현황

## [완료] 프로젝트 초기 세팅
- 파일: `web/src/utils/api.ts`, `web/src/utils/auth.ts`, `web/src/context/AuthContext.tsx`, `web/src/App.tsx`, `web/src/index.css`, `web/vite.config.ts`
- 작업 내용: React + Vite + TS 프로젝트 초기화, JSX 및 React 플러그인 설정 완료, Axios API 클라이언트 및 인증 유틸리티 설정, 전역 상태 관리(AuthContext) 및 라우팅 구조(App.tsx) 구축, 디자인 토큰 적용.
- 상태: ✅ 완료

## [리디자인 완료] 공통 레이아웃 (TopNavLayout)
- 파일: `src/components/layout/TopNavLayout.tsx`
- 변경: 상단 유틸 바, 네비바(PICK 로고 및 메뉴), 위치 바를 포함한 반응형 상단 네비게이션 레이아웃 구현. 유저 타입별(customer, constructor, heavy) 메뉴 분기 처리.
- 상태: ✅ 완료

## [리디자인 완료] 로그인 (Login)
- 파일: `src/pages/auth/Login.tsx`
- 변경: Locofy 디자인 기반 flexbox 레이아웃 재구현. Tailwind CSS 적용, 유저 타입 선택(회원/파트너), 아이콘 적용. 기존 API 연동 로직 유지.
- 상태: ✅ 완료

## [리디자인 완료] 고객 메인 (Customer Main)
- 파일: `src/pages/customer/Main.tsx`
- 변경: 배너 영역, 28개 카테고리 아이콘 그리드(반응형), 접어두기 토글, 오늘의 방문스케줄 카드 가로 스크롤 레이아웃 구현.
- 상태: ✅ 완료

## [리디자인 완료] 업체찾기/Pick (Customer Pick)
- 파일: `src/pages/customer/Pick.tsx`
- 변경: 찜콕/전체 탭, 필터 드롭다운, 업체 카드(프로필, 태그, 시공 이미지, 리뷰/시공건수) 그리드 레이아웃 구현. 하단 일괄 요청 플로팅 버튼 적용.
- 상태: ✅ 완료

## [리디자인 완료] 마이페이지 (MyPage)
- 파일: `src/pages/customer/MyPage.tsx`, `src/pages/constructor/MyPage.tsx`, `src/pages/heavy/MyPage.tsx`
- 변경: 사용자 타입별(고객/시공/중장비) 맞춤형 상단 프로필 배너 및 메뉴 리스트(아이콘 + 텍스트) 레이아웃 구현. 고객/파트너 탈퇴 버튼 추가.
- 상태: ✅ 완료

## [완료] 나머지 공통 및 기능 페이지
- 대상: 일정 관리, 채팅방, 공지사항, QnA 등
- 변경: TopNavLayout 적용 및 기존 API 로직 유지하며 전체적인 스타일 정돈.
- 상태: ✅ 완료
