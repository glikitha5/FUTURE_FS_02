# Mini CRM - Client Lead Management System

A full-stack **MERN** application to manage client leads with status tracking, notes, and follow-ups.

## 🧱 Tech Stack
- **Frontend:** React.js (Vite) + Axios + React Router
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose)
- **Styling:** Modern glassmorphism UI with gradient background

## 📁 Project Structure
```
mini-crm/
├── backend/        # Express + MongoDB API
└── frontend/       # React dashboard
```

## ⚙️ Prerequisites
- Node.js v18+
- MongoDB running locally (`mongodb://localhost:27017`) or a MongoDB Atlas URI

## 🚀 Run Locally in VS Code

### 1. Backend
```bash
cd backend
npm install
# Create a .env file (see backend/.env.example)
npm run dev
```
Backend runs at **http://localhost:5000**

### 2. Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at **http://localhost:5173**

## 🔌 REST API
| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| GET    | /api/leads            | List all leads        |
| POST   | /api/leads            | Create new lead       |
| PUT    | /api/leads/:id        | Update a lead         |
| DELETE | /api/leads/:id        | Delete a lead         |
| POST   | /api/leads/:id/notes  | Add note to a lead    |

## ✨ Features
- Dashboard with summary cards (Total / Contacted / Converted)
- Lead table with inline status updates
- Add Lead form with validation
- Per-lead notes & follow-ups
- Search and filter
- Smooth animations, glassmorphism theme

## 📤 Upload to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Mini CRM"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
