# Addis Connect

Addis Connect is a web platform built with **React + Vite + TailwindCSS (DaisyUI)** that provides city-focused digital services.  
The goal is to create a **scalable smart city hub** where citizens can access tools like security, transport, and AI assistance.

---

## 🚀 Features (Current Status)

### ✅ Working
- **EthioShield** – A demo phishing protection service.  
  - Lets users paste a suspicious link.  
  - Runs a simple (demo) check and gives feedback if it looks safe or dangerous.  
- **Smart AI** – Integrated chatbot powered by an AI API.  
  - Provides basic conversational support.  
  - Designed to expand into a “city assistant.”

### 🕒 Coming Soon
- Public Transport – Real-time transit updates & passes.  
- Permits – Apply for building and event permits.  
- Safety Alerts – Emergency and city notices.  
- Parks & Recreation – Find events and book facilities.  

---

## ⚙️ Tech Stack

- **Frontend**: React (Vite)
- **Styling**: TailwindCSS + DaisyUI
- **Routing**: React Router DOM
- **AI Integration**: Placeholder for external AI API (expandable)
- **Demo Logic**: EthioShield uses simple keyword checks for now

---

## 📌 Notes for Developers

- Only **EthioShield** and **Smart AI** are functional right now.  
- Other services show **“Coming Soon”** placeholders.  
- Naming is case-sensitive on imports (e.g. `ethioshield.jsx` not `EthioShield.jsx`).  
- Admin routes exist (`/admin/login`, `/admin`) but are not fully secured yet.  

---

## 🔮 Next Steps

- Replace demo logic in **EthioShield** with a real backend phishing detection service.  
- Expand **Smart AI** chatbot with real-time city data integrations.  
- Implement authentication + user accounts for personalization.  
- Scale services (Transport, Permits, Alerts, Recreation).  

---


## Dev setup (frontend + backend)

Backend
- cd backend
- Ensure `.env` has MONGO_URL, PORT=5000, JWT_SECRET
- npm install (first time)
- npm run seed (creates admin and sample services)
- npm start

Frontend
- cd "Addis connect 3"
- npm install (first time)
- npm run dev

Vite proxies `/api` to http://localhost:5000.




