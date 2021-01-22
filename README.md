# 개인 포트폴리오 사이트
React와 node.js를 공부하여 기획, 디자인, 구축 및 배포하여 개인 포트폴리오 사이트 오픈

![portfolio](https://user-images.githubusercontent.com/35294456/104563094-94fdc000-568c-11eb-8e0b-b2178659f660.jpg)

- 기간 : 2020.6.19 ~ 2020.10.30
- 기능 :
  - JWT를 이용한 어드민 인증
  - 콘텐츠 관리 CRUD 기능
  - 게시글 유효성 검증
  - 이미지 업로드 (드래그 & 드랍 기능)
  - 카테고리 체크 검색
  - 무한 스크롤 (레이지 로딩)
  - SVG 애니메이션
  - 페이드 인/아웃 페이지 전환
  - 크로스 브라우징
  - 반응형
- 개발환경 : React, Node.js, Javascript(ES6), HTML5, SCSS, CSS3, MongoDB, Visual Studio Code, GitHub

# 원격서버
- 원격서버 프로세스 정지
```
forever stopall
```

- 원격서버 프로세스 목록조회
```
forever list
```

- Back-end 실행방법
```
forever start -r esm src
```

- Front-end 실행방법
```
forever start scripts/start.js
```

