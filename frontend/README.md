# PosBuzz Frontend

The modern, responsive frontend for the PosBuzz Point of Sale system. Built with **React** and **Ant Design**.

## ⚡ Tech Stack
- **Build Tool:** Vite
- **Framework:** React (TypeScript)
- **UI Library:** Ant Design (v5)
- **State Management:** TanStack Query (React Query)
- **Routing:** React Router DOM
- **HTTP Client:** Axios

## 🎨 Features & UI Polish

### 1. Authentication
- **Secure Login:** JWT-based authentication flow.
- **Design:** Minimalist "Acme Inc" style login page.
- **Branding:** Custom **PosBuzz Purple (#6C63FF)** theme.

### 2. Dashboard Layout
- **Custom Sidebar:** 
  - Collapsible design with dynamic logo ("PosBuzz" ↔ "P").
  - **Purple Trigger Bar** at the bottom for expanding/collapsing.
  - **User Profile** section anchored at the bottom with a custom dropdown menu.
- **Header:** Clean, sticky header with page titles.

### 3. Product Management
- **Data Display:** Clean, borderless table view.
- **UX:** **Skeleton Loaders** for smooth data fetching (no jarring spinners).
- **CRUD:** Full Create, Read, Update, Delete capabilities via modal forms.

### 4. Sales System
- **Layout:** Split-screen design (New Sale Form vs. Recent Transactions).
- **Interactive Form:** 
  - Searchable Product Select.
  - Live "Estimated Total" calculation with purple accent styling.
- **Stock Validation:** Real-time prevention of sales exceeding stock.

## 🚀 Setup & Run

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5173`.

3. **Build for Production:**
   ```bash
   npm run build
   ```

## 📂 Key Directory Structure
- `src/api` - Axios client & API endpoints
- `src/components` - Reusable UI components (AppLayout, ProductForm)
- `src/context` - AuthContext for user state
- `src/hooks` - React Query hooks (useProducts, useSales)
- `src/pages` - Main page views (Login, ProductList, Sales)
