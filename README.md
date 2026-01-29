# PosBuzz - Point of Sale System

PosBuzz is a modern, full-stack Point of Sale (POS) application designed for efficiency and ease of use. It features a robust **NestJS** backend and a polished **React** frontend with a custom design system.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** React + Vite (TypeScript)
- **UI Library:** Ant Design (Custom "PosBuzz Purple" Theme)
- **State Management:** TanStack Query (React Query)
- **Styling:** CSS Modules + Inline Styles for pixel-perfect layout

### Backend
- **Framework:** NestJS
- **Database:** PostgreSQL (with Prisma ORM)
- **Caching:** Redis (High-performance caching for products)
- **Authentication:** JWT + BCrypt

---

### Login Cred: 
Email: farhan@possbuzz.com
Password: farhan2026

## ✨ Key Features & Screenshots

### 1. Secure Authentication
A minimalist, "Acme Inc" style login page with secure JWT authentication.
![Login Page](https://78d11y9vqc.ufs.sh/f/5z2fDmMWhbJSKmQEqas0j3qU2Xt7kYrlzvSL8bcsPeEaQANF)

### 2. Dashboard & Product Management
Effortlessly manage your inventory. Features include:
- **Skeleton Loading:** Smooth data fetching animations.
- **CRUD:** Create, Edit, Delete products instantly.
- **Stock Tracking:** Visual indicators for low stock.
![Products Page](https://78d11y9vqc.ufs.sh/f/5z2fDmMWhbJSsIQvibgWfnXZmlrDhNqgw5vxHsU4J2Giy10d)

### 3. Sales Terminal
A consolidated sales interface designed for speed.
- **Split View:** New Sale form on the left, Recent Transactions on the right.
- **Real-time Totals:** "Estimated Total" updates instantly as you adjust quantity.
![Sales Page](https://78d11y9vqc.ufs.sh/f/5z2fDmMWhbJS2k8QvJZCL1xcEq4zAXTYW5RUSB0jQZFHgfpN)

### 4. Smart Search
Quickly find products to add to a sale using the searchable dropdown with stock and price details.
![Product Search](https://78d11y9vqc.ufs.sh/f/5z2fDmMWhbJSKo9hJs0j3qU2Xt7kYrlzvSL8bcsPeEaQANF9)

### 5. User Profile
A custom collapsible sidebar with a branded "PosBuzz" trigger and a user profile menu for secure logout.
![User Menu](https://78d11y9vqc.ufs.sh/f/5z2fDmMWhbJSg4WC7mvK35NrnVRzjCTkWtE8BL1pgveZcf6H)

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (Port 5432)
- Redis (Port 6379 - *Optional, app will degrade gracefully without it*)

### Quick Start

**1. Clone & Install**
```bash
# Backend
cd backend
npm install
cp .env.example .env # Configure your DB credentials
npx prisma migrate dev

# Frontend
cd ../frontend
npm install
```

**2. Run the System**
```bash
# Terminal 1: Backend
cd backend
npm run start:dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173` to start buzzing! 🐝
