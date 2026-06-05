# Brainly — Second Brain App

A full-stack web application that lets you save, organize, and share your favorite content from YouTube, Twitter/X, and the web — all in one place.

---

## Features

- **Authentication** — Register and log in with JWT-based auth. Passwords are validated for strength on signup.
- **Content Dashboard** — View all your saved content cards in one place.
- **Add Content** — Save YouTube videos, Twitter/X tweets, and articles by pasting a link.
- **Embedded Previews** — YouTube videos render as iframes; Twitter/X tweets embed inline; articles show as a clickable preview.
- **Delete Content** — Remove any saved content from your dashboard.
- **Share Brain** — Generate a unique public link to share your entire collection with anyone (no login required to view).
- **Logout** — Clears the session token from local storage.

---

## Tech Stack

### Backend
| Tool | Purpose |
|------|---------|
| Node.js + Express 5 | REST API server |
| TypeScript | Type safety |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Stateless authentication |
| CORS | Cross-origin requests from frontend |

### Frontend
| Tool | Purpose |
|------|---------|
| React 19 | UI library |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS 4 | Utility-first styling |
| React Router DOM 7 | Client-side routing |
| Axios | HTTP requests |

---

## Project Structure

```
Brainly/
├── Backend/
│   └── src/
│       ├── index.ts               # Express app entry point
│       ├── configs/config.ts      # JWT secret & DB credentials
│       ├── middleware/
│       │   └── middleware.ts      # JWT auth middleware
│       ├── model/
│       │   ├── UserModel.ts       # User schema
│       │   ├── ContentModel.ts    # Content schema (youtube/twitter/article)
│       │   └── LinkModel.ts       # Share link schema
│       └── controller/
│           ├── userLogin.ts       # Signup & signin routes
│           ├── content.ts         # Content CRUD routes
│           ├── shareLink.ts       # Brain share routes
│           └── utils.ts           # Random hash generator
└── Frontend/
    └── src/
        ├── App.tsx                # Router setup
        ├── config.ts              # Backend URL config
        ├── pages/
        │   ├── SignUp.tsx
        │   ├── SignIn.tsx
        │   ├── Dashboard.tsx
        │   └── ShareBrain.tsx
        ├── components/ui/
        │   ├── Card.tsx           # Content card with embed support
        │   ├── AddContentModel.tsx # Modal to add new content
        │   ├── SideBar.tsx
        │   ├── Button.tsx
        │   ├── Input.tsx
        │   └── Select.tsx
        ├── hooks/
        │   └── useContent.tsx     # Custom hook for fetching content
        └── icons/                 # SVG icon components
```

---

## API Reference

All protected routes require a `token` header with the JWT from signin.

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/signup` | Register a new user |
| `POST` | `/api/v1/signin` | Login and receive a JWT |

**Signup validation:**
- Username: 3–10 characters, alphanumeric only
- Password: 8–20 characters, must include uppercase, lowercase, number, and special character

### Content (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/content` | Add a new content item |
| `GET` | `/api/v1/content` | Get all content for the logged-in user |
| `DELETE` | `/api/v1/content` | Delete a content item by `contentId` |

**Content body:** `{ title, link, type }` — type is `"youtube"`, `"twitter"`, or `"article"`

### Share Brain

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/brain/share` | Enable (`share: true`) or disable sharing |
| `GET` | `/api/v1/brain/:shareLink` | View a shared brain (public, no auth) |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)

### Backend

```bash
cd Backend
npm install
```

Create a `src/configs/config.ts` (or set env vars) with:
```ts
export const JWT_SECRET = "your_jwt_secret";
export const dbUsername = "your_mongo_username";
export const dbPassword = "your_mongo_password";
```

```bash
npm run dev   # builds TypeScript and starts server on http://localhost:3000
```

### Frontend

```bash
cd Frontend
npm install
npm run dev   # starts Vite dev server on http://localhost:5173
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/signup` | Create a new account |
| `/signin` | Log in to your account |
| `/dashboard` | View, add, and delete your saved content |
| `/share/:shareLink` | Public view of a shared brain |

---

## GitHub

[github.com/rutushah/SecondBrain](https://github.com/rutushah/SecondBrain)
