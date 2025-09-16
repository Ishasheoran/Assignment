# API Playground

**Live URL (Frontend):** (https://assignment-git-main-ishasheorans-projects.vercel.app/)
**GitHub Repo:** https://github.com/Ishasheoran/Assignment

---

## Overview

API Playground is a full-stack web application that allows users to test APIs in a simple, user-friendly interface.  
It supports sending requests, setting headers, passing JSON bodies, and viewing formatted responses.  

---

## Architecture

- **Frontend:** React.js (Hooks, Vite)  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB Atlas  
- **Deployment:**  
  - Frontend on **Vercel**  
  - Backend on **Railway/Render**  

**Workflow:**  

1. User sends request from frontend.  
2. Frontend calls hosted backend API (`/api/profile`).  
3. Backend processes the request, interacts with MongoDB, and responds.  
4. Frontend displays formatted response.  

---

## Setup Instructions

### Local Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/Ishasheoran/Assignment.git
   cd Assignment
2.Backend setup:
  cd backend
  npm install
  # Add MONGO_URI and PORT in .env
  npm start
3.Frontend setup:
  cd ../frontend
  npm install

  # Add VITE_API_URL=http://localhost:5000
  npm run dev

RESUME: https://drive.google.com/file/d/1WKB69HcNYSSCM4i4hxbrRWmBdexvtRKT/view?usp=drive_link
   
