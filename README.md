# 📇 Contacts CRUD: Spring Boot + Vanilla JS

A small **full-stack contacts manager**: a **Spring Boot REST API** with an in-memory **H2** database, and a lightweight frontend built with **HTML, JavaScript (Fetch API) and Bootstrap 5**, with no frontend framework.

> ℹ️ The repository name mentions Angular, but the frontend is plain HTML + JavaScript + Bootstrap.

## ✨ What it does
- 👤 Create, edit, list and delete **contact profiles**
- 🔎 Search contacts by **name**, **address**, **ID**, or **age range**
- 🏠 Each contact can have **multiple addresses and phone numbers**, a date of birth and a photo
- 🧩 DTOs and **mappers** keep the API model separate from the JPA entities
- 🗄️ **H2 in-memory database** with the H2 console enabled, so it runs with zero setup

## 🛠️ Tech stack
| Layer | Technology |
|-------|------------|
| Backend | Java 8, Spring Boot 2.6 (Web, Data JPA) |
| Database | H2 (in-memory) |
| Frontend | HTML5, JavaScript (Fetch API), Bootstrap 5, CSS3 |
| Tooling | Maven, Lombok |

## 🚀 Run it

### 1. Start the backend
~~~bash
git clone https://github.com/LazaroDevelop/Full-Stack-Angular-Spring-CRUD.git
cd Full-Stack-Angular-Spring-CRUD/backend
./mvnw spring-boot:run
~~~
The API runs on **http://localhost:8080**.

### 2. Open the frontend
Open `frontend/index.html` in your browser, or serve the folder with any static server:
~~~bash
cd ../frontend
npx serve .
~~~

## 📡 API tour
Base path: `/v1/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/all` | List all contacts |
| `GET` | `/by-name` | Find contacts by name (query param `name`) |
| `GET` | `/by-addresses` | Find contacts by address (query param `address`) |
| `POST` | `/by-id/{id}` | Find a contact by ID |
| `POST` | `/contacts/between-age-range` | Find contacts within an age range |
| `POST` | `/create-profile` | Create a contact |
| `PUT` | `/modify-profile/{id}` | Update a contact |
| `DELETE` | `/delete-profile/{id}` | Delete a contact |
| `GET` | `/ping` | Health check |

## 🏗️ Project structure
~~~text
├── backend    # Spring Boot API (controller, dto, mapper, entities, repository, services)
└── frontend   # index.html, js/app.js, Bootstrap CSS/JS
~~~

## 🗺️ Roadmap
- [ ] Upgrade to Java 21 and Spring Boot 3
- [ ] Add unit and integration tests
- [ ] Rebuild the frontend with Angular
- [ ] Add Docker Compose to run both parts with one command

## 👤 Author

**Lazaro Noel Guerra Medina**, Java Backend Engineer

> *"Make it work, make it right, make it fast."* ☕
