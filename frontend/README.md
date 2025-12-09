# 🌸 Mind Notes — Full-Stack Notes App

A full-stack notes application built using **React + TypeScript + Vite**, **Node.js + Express**, **MongoDB Atlas**, and **JWT authentication**.

Users can **register**, **log in**, **create notes**, **view notes**, and **delete notes**, all inside a minimal UI.

---

## ✨ Features

* 📝 Create, read, and delete notes
* 🔐 Fully secure authentication (JWT)
* ☁️ MongoDB Atlas cloud database
* 🚀 Fast frontend powered by React + Vite
* 🔒 Protected backend routes (only logged-in users can access notes)
* 💾 Automatic login persistence (localStorage token)

---

## 🗂 Folder Structure

```
notes-app/
│
├── backend/
│   ├── server.js
│   ├── .env
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── notes.js
│   └── middleware/
│       └── authMiddleware.js
│
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── styles.css
    │   ├── api/api.ts
    │   ├── types/Note.ts
    │   ├── components/
    │   │   ├── AuthForm.tsx
    │   │   ├── NoteForm.tsx
    │   │   ├── NoteList.tsx
    │   │   └── NoteItem.tsx
    │   └── pages/
    │       ├── Login.tsx
    │       ├── Register.tsx
    │       └── Home.tsx
    ├── index.html
    ├── package.json
    └── vite.config.ts
```

---

## 🔐 Authentication Flow

1. User registers or logs in.
2. Backend returns a **JWT token**.
3. Token is saved in **localStorage**.
4. All API calls include:

```
Authorization: Bearer <token>
```

5. Backend validates token using middleware.
6. Users only see their own notes.

---

## 📝 Notes CRUD Flow

| Action      | Frontend Request      | Backend Logic                   |
| ----------- | --------------------- | ------------------------------- |
| Load notes  | GET /api/notes        | Returns all notes for that user |
| Create note | POST /api/notes       | Saves new note tied to user ID  |
| Delete note | DELETE /api/notes/:id | Deletes only if owned by user   |

---

## 🧠 Tech Stack

**Frontend**

* React
* TypeScript
* Vite
* CSS (custom pastel theme)

**Backend**

* Node.js
* Express
* JWT
* Bcrypt
* Mongoose

**Database**

* MongoDB Atlas

---
