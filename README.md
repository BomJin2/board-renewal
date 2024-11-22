#### 1. 프로젝트 설명

해방 프로젝트는 Next.js와 Supabase를 활용한 나만의 일정관리(TASK 관리) 웹 애플리케이션 만들기 프로젝트 입니다.<br/>
Supabase를 활용하여 기본적인 CRUD(Crate, Read, Update, Delete) 기능을 구현하고,<br/>
Figma 디자인 시안을 통해 필요한 데이터베이스 구조설계 연습을 해보았습니다.<br/>
<br/>
해당 프로젝트는 전적으로 Shadcn UI 디자인 시스템을 사용하여 UI/UX 개발을 진행하였습니다.<br/>

### 프로젝트 환경설정

1. Shadcn UI 공식문서의 CLI를 통해 NEXT.js 프로젝트를 생성합니다. 하기에 작성한 명령어를 통해 설치해줍니다. 또한, 모든 기본 설정을 통해 진행하였습니다
   <br/> 단, 컬러 테마는 본인의 취향에 맞게 설정해주세요

Shadcn UI 설치한 것들

1. button : `npx shadcn@latest add button`
2. alert-dialog : `npx shadcn@latest add alert-dialog`
3. popover : `npx shadcn@latest add popover`
4. card : `npx shadcn@latest add card`
5. checkbox : `npx shadcn@latest add checkbox`
6. dialog : `npx shadcn@latest add dialog`
7. input : `npx shadcn@latest add input`
8. progress : `npx shadcn@latest add progress`
9. separator : `npx shadcn@latest add separator`
10. skeleton : `npx shadcn@latest add skeleton`
11. toast : `npx shadcn@latest add toast`

- SASS/SCSS 설치: `npm i sass`
- React 마크다운 에디터 설치: `npm i @uiw/react-markdown-editor`
- Supabase 연동을 위한 라이브러리 설치: `npm install @supabase/supabase-js`
