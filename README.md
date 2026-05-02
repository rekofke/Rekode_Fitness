# 💪 Rekode_Fitness – Full‑Stack Fitness Studio App

[![GitHub license](https://img.shields.io/github/license/your-username/Rekode_Fitness)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3-lightgrey)](https://flask.palletsprojects.com/)

A complete fitness studio management platform enabling clients to book classes, trainers to manage schedules, and admins to oversee operations. Built as a full‑stack portfolio piece to demonstrate modern web development skills.

---

## 🏋️ Features

### For Clients
- Browse classes by date, time, trainer, or specialty
- Book / cancel classes with real‑time capacity checks
- View personal booking history and upcoming classes
- Update profile and membership type (Basic / Premium)
- Receive booking confirmation emails (EmailJS)

### For Trainers
- Create, edit, and delete classes
- View class rosters and client attendance
- Manage availability and specialty tags
- Trainer dashboard with schedule overview

### For Admins
- User management (clients, trainers, roles)
- Class capacity and waitlist controls
- System usage analytics (booking trends, popular classes)
- Send notifications to all users

### Technical Highlights
- JWT authentication with role‑based access (client / trainer / admin)
- RESTful API with full Swagger documentation
- Responsive mobile‑first UI (React‑Bootstrap)
- Real‑time capacity enforcement (no overbooking)
- CI/CD pipeline (GitHub Actions → Render/Netlify)

---

## 🧰 Tech Stack

| Layer       | Technologies |
|-------------|--------------|
| **Frontend**| React 18, Vite, React Router DOM, React‑Bootstrap, Axios |
| **Backend** | Flask, Flask‑SQLAlchemy, Flask‑Marshmallow, Flask‑JWT‑Extended, Flasgger (Swagger) |
| **Database**| PostgreSQL (production), SQLite (development) |
| **Auth**    | JWT (JSON Web Tokens), bcrypt password hashing |
| **Email**   | EmailJS (booking confirmations) |
| **Hosting** | Netlify (frontend), Render (backend) |
| **DevOps**  | Git, GitHub, GitHub Actions (CI/CD) |

---

## 📁 Project Structure

Rekode_Fitness/
├── backend/
│ ├── app/
│ │ ├── init.py # Flask app factory
│ │ ├── models.py # SQLAlchemy models (User, Client, Trainer, Class, Booking)
│ │ ├── schemas.py # Marshmallow serializers
│ │ ├── blueprints/
│ │ │ ├── auth.py
│ │ │ ├── clients.py
│ │ │ ├── trainers.py
│ │ │ ├── classes.py
│ │ │ └── bookings.py
│ │ ├── config.py
│ │ └── extensions.py
│ ├── requirements.txt
│ └── run.py
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/ # Login, Register, ClassList, Dashboard, BookingHistory
│ │ ├── services/ # API client (axios)
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
└── README.md

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+ and pip

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Rekode_Fitness.git
   cd Rekode_Fitness

cd backend
python -m venv venv
source venv/bin/activate   # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
flask run --port=5000

cd frontend
npm install
npm run dev

SECRET_KEY=your_secret
JWT_SECRET_KEY=your_jwt_secret
DATABASE_URL=postgresql://...   # or sqlite:///fitness.db
EMAILJS_PUBLIC_KEY=your_key

📡 API Endpoints (Swagger)
Once the backend is running, access interactive API docs at:
http://localhost:5000/apidocs/

Key endpoints:

POST /api/auth/register – create new user (client)

POST /api/auth/login – get JWT token

GET /api/classes – list all classes

POST /api/bookings – book a class (client only)

DELETE /api/bookings/<id> – cancel booking

(Trainer/admin) POST /api/classes – create class

GET /api/users/me – current user profile


 What I Learned
Designing a full‑stack app from scratch with role‑based authentication

Handling relational database relationships (clients ↔ bookings ↔ classes)

Securing routes with JWT and enforcing permissions

Writing Swagger documentation for every endpoint

Deploying and debugging a two‑tier app on separate platforms
