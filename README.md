<div align="center">
 <img src="https://github.com/user-attachments/assets/93edf9c6-b3c4-4028-b90b-6010cdccb080" alt="Logo" width="80" height="80">
    <h1> Bab-Buddy-Fe </h1>
    <p>'오늘 점심 뭐 먹지?' 매일의 고민을 해결해 줄 서비스</p>
</div>

<br/>

### ⚙️ 기술 스택

<div style="display: flex; gap: 10px;">
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" alt="TypeScript" />
  </a>
</div>

<br/>

```bash
"next": "15.3.3",
"react": "^19.0.0",
"react-dom": "^19.0.0",
"zustand": "^5.0.5"
"tailwindcss": "^4",
"typescript": "^5"
```

<br/>

### 🚀 빠른 시작

```bash
# 저장소 복제 및 의존성 설치
git clone https://github.com/BabBuddy/bab-buddy-fe.git
cd bab-buddy-fe
yarn install

# 개발 서버 실행
yarn dev
```

<br/>

### 📌 작업 흐름

1. 작업할 기능에 대한 이슈 생성
2. `develop`에서 `feat/#이슈번호-기능명` branch 생성
3. 기능 개발 완료 후 `develop`으로 Pull Request 생성
4. 코드 리뷰 및 승인 완료 후 merge

<br/>

### 📝 커밋 컨벤션

| 타입       | 설명                               |
| ---------- | ---------------------------------- |
| `feat`     | 새로운 기능 추가                   |
| `fix`      | 버그 수정                          |
| `docs`     | 문서 수정                          |
| `style`    | 코드 포맷팅, 세미콜론 누락 등      |
| `refactor` | 코드 리팩토링                      |
| `chore`    | 빌드 업무 수정, 패키지 매니저 수정 |
