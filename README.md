![](https://i.imgur.com/xG74tOh.png)
<h2 align="center"> 
	🚧 The Social Network 🚧
</h2>
<p align="center">
<img alt="under development" src="https://img.shields.io/badge/STATUS-UNDER%20DEVELOPMENT-green">
</p>


## 💻 About the project

📄 This project aims to develop an API for a social network.

---

## Architectures and Folders 📂
```bash
📂 src
┣ 📂 controllers
   ┣ 📜 postsControllers.ts
   ┗ 📜 usersControllers.ts
┣ 📂 middlewares
   ┣ 📜 authentication.ts
   ┣ 📜 multer.ts
   ┣ 📜 validatePost.ts
   ┗ 📜 validateUser.ts
┣ 📂 models
   ┣ 📜 post.ts
   ┗ 📜 user.ts
┣ 📂 routes
   ┣ 📜 routesPosts.ts
   ┗ 📜 routesUsers.ts
┣ 📂 services
   ┗ 📜 upload.ts
┣ 📂 utils
   ┣ 📜 postFunctions.ts
   ┗ 📜 userFunctions.ts
┣ 📜 index.ts
🐳 .dockerignore
⚙️ .env.example
⚡ .gitignore
🐳 docker-compose.yml
🐳 Dockerfile
📦 package-lock.json
📦 package.json
📄 tsconfig.json
```
---

## Technologies used 🔧
 <p align="center">
      <a href="#">
         <img src="https://skillicons.dev/icons?i=git,ts,nodejs,express,mongodb,docker&perline=9" />
      </a>
   </p>


## ⚙️ Functionalities

### No authentication 🐛

  - [x] Register user
  - [x] Login user
---
### Authenticated ✅

- [x] User:
  - [x] Update user
  - [x] Detail user
  - [x] Delete user
 
- [x] Post:
  - [x] List posts
  - [x] Detail post
  - [x] Comment post
  - [x] Like post
  - [x] Unlike post
  - [x] Create post
  - [x] Update post
  - [x] Delete post
---

## 🛣️ How to execute the project

### Prerequisites 💡

Before starting, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Furthermore, it is good to have an editor to work with the code like [VSCode](https://code.visualstudio.com/)
You will also need an account with [Backblaze](https://backblaze.com), to upload the images.
We will also use the [Docker](https://www.docker.com) version desktop.

1- Open the Docker Desktop.

#### 🎲 Running (server)

```bash
# Clone this repository
$ git clone git@github.com:ThalysRow/the-social-network

# Install dependencies
$ npm install

# Rename the .env.example file to .env and enter your credentials;
DB_USER=
DB_PASS=
DB_PORT=
DB_URI=''

PORT=

KEY_ID=''
KEY_NAME=''
APP_KEY=''
ENDPOINT_S3=''
BUCKET_NAME=''

JWT_PASS=

# Run the docker compose
$ docker compose up -d
```

## Endpoints:

- To test the endpoints, it is recommended to use the [Insomnia](https://insomnia.rest/download)

```bash
User:
Create user: http://localhost:3000/user

Login user: http://localhost:3000/login

Update user: http://localhost:3000/user

Delete user: http://localhost:3000/user

Post:
Create post: http://localhost:3000/post

List posts: http://localhost:3000/post

Detail post: http://localhost:3000/post/:id

Update post: http://localhost:3000/post/:id

Delete post: http://localhost:3000/post/:id

Comment post: http://localhost:3000/post/:id/coment

Like post: http://localhost:3000/post/:id/like
```

## 💪 How to contribute to the project

1. Fork the project.
2. Create a new branch with your changes: `git checkout -b my-feature`
3. Save your changes and create a commit message telling what you did: `git commit -m "feature: My new feature"`
4. Submit your changes: `git push origin my-feature`

## 🧙‍♂️ Author
Made with ❤️ by Thalys Row 👋🏽 [Contact!](www.linkedin.com/in/thalys-row)
