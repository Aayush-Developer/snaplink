# 🔗 URL Shortener API

<p align="center">
<img src="https://skillicons.dev/icons?i=nodejs,express,postgres,docker" />
</p>

------------------------------------------------------------------------

# 📑 Table of Contents

-   Overview
-   Features
-   Architecture
-   Tech Stack
-   Folder Structure
-   Database Design
-   Authentication Flow
-   API Endpoints
-   Sample Requests
-   Installation
-   Environment Variables
-   Roadmap

------------------------------------------------------------------------

# 📖 Overview

This project provides a secure backend service for creating and managing
shortened URLs.

## Highlights

-   JWT Authentication
-   bcrypt Password Hashing
-   Zod Request Validation
-   PostgreSQL + Drizzle ORM
-   NanoID Short Codes
-   RESTful API
-   Modular Project Structure

------------------------------------------------------------------------

# 🏗 Architecture

``` text
                Client
                   │
                   ▼
             Express Router
                   │
      ┌────────────┴────────────┐
      ▼                         ▼
 User Routes               URL Routes
      │                         │
      ▼                         ▼
 Validation              Authentication
      │                         │
      └────────────┬────────────┘
                   ▼
              Drizzle ORM
                   │
                   ▼
              PostgreSQL
```

------------------------------------------------------------------------

# ✨ Features

## 👤 Authentication

-   Register User
-   Login User
-   JWT Authentication
-   Protected Routes
-   Password Hashing

## 🔗 URL Management

-   Create Short URL
-   Custom Alias
-   Auto-generated NanoID
-   Redirect
-   Update URL
-   Delete URL
-   List User URLs

## 🛡 Security

-   bcrypt
-   Zod Validation
-   Environment Variables

------------------------------------------------------------------------

# 🛠 Tech Stack

  Category         Technology
  ---------------- -------------
  Runtime          Node.js
  Framework        Express.js
  Database         PostgreSQL
  ORM              Drizzle ORM
  Authentication   JWT
  Validation       Zod
  Security         bcrypt
  Short Code       NanoID

------------------------------------------------------------------------

# 📂 Folder Structure

``` text
src
├── middleware
├── routes
├── schema
├── services
├── utils
├── validation
└── index.js
```

------------------------------------------------------------------------

# 🗄 Database Design

``` text
+-----------+         +----------------+
|  USERS    | 1    *  |      URLS      |
+-----------+---------+----------------+
| id        |         | id             |
| name      |         | shortCode      |
| email     |         | targetURL      |
| password  |         | userId (FK)    |
+-----------+         +----------------+
```

------------------------------------------------------------------------

# 🔐 Authentication Flow

``` text
Signup
  │
Validate (Zod)
  │
Hash Password
  │
Store User
  │
Login
  │
Verify Password
  │
Generate JWT
  │
Authorization: Bearer <token>
  │
Protected Routes
```

------------------------------------------------------------------------

# 📡 API Endpoints

<div align="center">

| Method | Endpoint | Auth | Description |
|:------:|:---------|:----:|:------------|
| **POST** | `/user/signup` | ❌ | Register a new user |
| **POST** | `/user/login` | ❌ | Authenticate user and generate JWT |
| **POST** | `/url/shorten` | ✅ | Create a shortened URL |
| **GET** | `/url/codes` | ✅ | Get all URLs created by the authenticated user |
| **PATCH** | `/url/update/:id` | ✅ | Update an existing short URL |
| **DELETE** | `/url/delete/:id` | ✅ | Delete a short URL |
| **GET** | `/url/:shortCode` | ❌ | Redirect to the original URL |

</div>

------------------------------------------------------------------------

# 📝 Sample Requests

### Signup

``` json
{
  "name":"Aayush",
  "email":"aayush@example.com",
  "password":"password123"
}
```

### Login

``` json
{
  "email":"aayush@example.com",
  "password":"password123"
}
```

### Shorten URL

``` json
{
  "url":"https://github.com",
  "code":"github"
}
```

------------------------------------------------------------------------

# ⚙️ Installation

``` bash
git clone https://github.com/Aayush-Developer/url-shortener-api.git
cd url-shortener-api
npm install
docker compose up -d
npx drizzle-kit push
npm start
```

------------------------------------------------------------------------

# 🔑 Environment Variables

``` env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
PORT=8000
```

------------------------------------------------------------------------

# 🧪 Testing

Use Postman.

Protected routes require:

``` text
Authorization: Bearer <JWT_TOKEN>
```

------------------------------------------------------------------------

# 👨‍💻 Author

**Aayush Sao**

If you found this project useful, consider giving it a ⭐.
