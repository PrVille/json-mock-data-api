# JSON Mock Data API

The [JSON Mock Data API](https://json-mock-data.vercel.app/) is a free online REST API designed to simplify the process of generating and managing mock data for developers. Whether you're creating a new application, conducting tests, or need placeholder data, this API has you covered.

## Table of contents

- [Screenshots](#screenshots)
- [Resources](#resources)
- [Try it out](#try-it-out)
- [Links](#links)
- [Built with](#built-with)
- [Author](#author)

## Screenshots

<div align="center">
  <img src="./screenshots/home.png" width="100%" alt="home" />
  <img src="./screenshots/docs.png" width="100%" alt="docs" />
  <img src="./screenshots/users.png" width="100%" alt="users" />
  <img src="./screenshots/create-user.png" width="100%" alt="create-user" />
  <img src="./screenshots/account.png" width="100%" alt="account" />
</div>

## Resources

- Users: [https://json-mock-data.vercel.app/api/users](https://json-mock-data.vercel.app/api/users)
- Posts: [https://json-mock-data.vercel.app/api/users](https://json-mock-data.vercel.app/api/users)
- Comments: [https://json-mock-data.vercel.app/api/users](https://json-mock-data.vercel.app/api/users)

...and more coming soon!

## Try it out

Try it out by fetching some [mock users](https://json-mock-data.vercel.app/api/users)!

    https://json-mock-data.vercel.app/api/users

```js
fetch('https://json-mock-data.vercel.app/api/users?take=3&sortBy=lastName')
  .then(response => response.json())
  .then(json => console.log(json))
```

See more: [https://json-mock-data.vercel.app/docs/](https://json-mock-data.vercel.app/docs/)

## Links

- Wesbite: [https://json-mock-data.vercel.app/](https://json-mock-data.vercel.app/)
- Docs: [https://json-mock-data.vercel.app/docs/](https://json-mock-data.vercel.app/docs/)
- API: [https://json-mock-data.vercel.app/api/](https://json-mock-data.vercel.app/api/)
- GitHub: [https://github.com/PrVille/json-mock-data-api](https://github.com/PrVille/json-mock-data-api)

## Built with

<p>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />  
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

## Author

<p>
  <a href="https://villeprami.vercel.app/">
    <img alt="me" title="Me" src="https://img.shields.io/badge/portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white" />
  </a>
  <a href="https://www.linkedin.com/in/ville-prami/">
    <img alt="linkedin" title="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
   <a href="https://www.codewars.com/users/PrVille" >
    <img alt="codewars" title="Codewars" src="https://img.shields.io/badge/Codewars-B1361E?style=for-the-badge&logo=Codewars&logoColor=white" />
  </a>
  <a href="https://www.frontendmentor.io/profile/PrVille" >
    <img alt="frontend-mentor" title="Frontend Mentor" src="https://img.shields.io/badge/FRONTEND%20MENTOR-f8f9f8?style=for-the-badge&logo=Frontend-Mentor&logoColor=black" />
  </a>
</p>
