# Pick 웹 디자인 가이드

Login 페이지 기준으로 확립된 디자인 시스템 정리.

---

## 레이아웃 원칙

- 페이지 전체: `flex items-center justify-center min-h-screen` → 콘텐츠 화면 정중앙
- 최대 너비: `max-w-[470px]` (모바일 기준 단일 컬럼)
- 좌우 패딩: `px-6`
- 요소 간 간격: Tailwind 클래스 캐시 문제로 `style={{}}` 인라인 사용

## 색상

| 변수 | 값 | 용도 |
|------|----|------|
| `text-primary` / `bg-primary` | `#2CB07B` | 강조, 활성 탭, 버튼 |
| `text-dark` / `bg-dark` | `#000326` | 본문, 주요 버튼 |
| `text-gray` | `#848484` | 비활성 텍스트, 라벨 |
| `border-gainsboro` | `#E6E6E6` | 테두리, 구분선 |
| `text-error` | `#FF3120` | 에러 메시지 |

## 인풋 스타일

```
h-59px
border-2 border-gainsboro rounded-lg
focus:border-primary outline-none
text-[17px] placeholder:text-darkgray tracking-tight
```

- 좌측 아이콘: `absolute left-4`, `w-22px h-22px`, `opacity-0.5`
- 아이콘 있는 인풋 패딩: `style={{ paddingLeft: '52px' }}`

## 버튼 스타일

| 종류 | 클래스 |
|------|--------|
| 주요 버튼 (다크) | `bg-dark text-white rounded-[40px] font-bold hover:opacity-90` |
| 주요 버튼 (컬러) | `bg-primary text-white rounded-[40px] font-bold hover:opacity-90` |
| 사이즈 기본 | `w-[220px] h-[44px] text-[17px]` |

## 간격 체계 (Login 기준)

```
섹션 타이틀 → 콘텐츠:  marginBottom: 40px
주요 섹션 간격:        marginBottom: 48px
중간 섹션 간격:        marginBottom: 36px
소항목 간격:           marginBottom: 24px
인풋 사이 gap:         12px
```

## 에러 메시지

```tsx
<div style={{ minHeight: '24px', marginBottom: '24px' }}>
  {errorMsg && <p className="text-[15px] text-error px-1">{errorMsg}</p>}
</div>
```
- `minHeight` 고정 → 에러 없을 때 레이아웃 밀림 방지

## 라디오/탭 선택 UI

```tsx
<img src={active ? '/images/circlecolor.png' : '/images/circlegrey.png'} className="w-[30px] h-[30px]" />
<span className={active ? 'text-dark font-bold text-[20px]' : 'text-gray text-[20px]'}>텍스트</span>
```

## 탭 UI (페이지 내 탭)

```tsx
<button className={`pb-4 text-[20px] font-bold ${
  active ? 'text-primary border-b-4 border-primary' : 'text-gray'
}`}>탭명</button>
```

## 카드 UI (Pick 업체 카드)

```
w-[346px] max-w-full
rounded-[8px] border border-gainsboro shadow-sm
hover:shadow-md transition-all
```

## 폰트

- 기본 폰트: `font-['Noto_Sans_KR']`
- 페이지 타이틀: `text-[32px] font-medium tracking-tight`
- 섹션 타이틀: `text-[22px] font-bold`
- 본문: `text-[17px]`
- 서브: `text-[15px]`
- 캡션: `text-[13px]`

## 이미지 경로

모든 이미지는 `public/images/` 하위에 위치.

| 경로 | 용도 |
|------|------|
| `/images/circlecolor.png` | 라디오 활성 |
| `/images/circlegrey.png` | 라디오 비활성 |
| `/images/person.png` | 아이디 인풋 아이콘 |
| `/images/lock.png` | 비밀번호 인풋 아이콘 |
| `/images/check.png` | 체크박스 |
| `/images/check-color.png` | 체크박스 활성 |
| `/images/check-none.png` | 체크박스 비활성 |
| `/images/triangle.png` | 셀렉트박스 화살표 |
| `/images/next.png` | 리스트 화살표 |
| `/images/chevron.png` | 접기/펼치기 화살표 |
| `/images/02-main-category/001-3d.png` ~ `028-aerialcar.png` | 카테고리 아이콘 28개 |
