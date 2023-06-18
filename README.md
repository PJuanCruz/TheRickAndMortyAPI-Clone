# 👉 **TheRickAndMortyAPI-Clone**

## A clone of The Rick and Morty API, with PostgreSQL and Express.

<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg" alt="Rick&Morty" width="500">

### 💻 Project Tech Stack:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

TheRickAndMortyAPI-Clone is a Node.js application built using Object-Oriented Programming (OOP) principles that replicates the endpoints of the popular [Rick and Morty API](https://rickandmortyapi.com/). The application use PostgreSQL as the database management system, and Express.js for handling HTTP requests.

### 🔧 Features

- Replicates the endpoints of the well-known Rick and Morty API.
- Utilizes a PostgreSQL database container to store and retrieve data.
- Employs SQL queries for efficient data manipulation and retrieval.
- Built with Express.js, a flexible and minimalistic web application framework for Node.js.
- Endpoint documentation is available using Postman, providing comprehensive details on the available routes and their usage.

### 📰 Installation Guide

1. Open a terminal in the desired location to clone the repository.

2. Make sure you have Docker, Node.js, and Git installed by running the following commands:

```bash
$ docker -v
```

```bash
$ node -v
```

```bash
$ git -v
```

3. Clone the repository:

```bash
$ git clone https://github.com/PJuanCruz/TheRickAndMortyAPI-Clone.git
```

4. Move to the project directory:

```bash
$ cd TheRickAndMortyAPI-Clone
```

5. Install the dependencies:

```bash
$ npm install
```

6. Rename the .env.example file to .env:

```bash
$ mv .env.example .env
```

7. Configure the environment variables or use the default values in the .env file:

```bash
PORT=3000
HOST=http://localhost:3000
PGUSER=user-postgres
PGHOST=127.0.0.1
PGPASSWORD=pP@ssw0rd!
PGDATABASE=rickandmorty
PGPORT=5433
PGADMIN_DEFAULT_EMAIL=pgadmin@postgres.com
PGADMIN_DEFAULT_PASSWORD=pgP@ssw0rd!
```

8. Start the Docker container:

```bash
$  docker compose up -d
```

9. Run the database migrations and seeds:

```bash
$ npm run migrations:up && npm run seeds
```

10. Start the application:

```bash
$ npm start
```

11. Visit the [ API endpoints documentation](https://documenter.getpostman.com/view/23055576/2s93si1prk).

---

### 📝 Contact Me:

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PJuanCruz) [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/peluffojuancruz-fullstack-dev/)
