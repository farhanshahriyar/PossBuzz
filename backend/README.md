# PosBuzz Backend

This is the backend API for the PosBuzz Internship Assignment, built with **NestJS**.

## Tech Stack
- **Framework:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Caching:** Redis 
- **Auth:** JWT & BCrypt

## Features
- **Authentication:** Login/Register with JWT tokens.
- **Products:** CRUD operations with Redis caching for list endpoint.
- **Sales:** Transactional sales recording with stock management.

## Setup

1. **Prerequisites:**
   - PostgreSQL (running on port 5432)
   - Redis (running on port 6379)
   - Node.js (v18+)

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the `backend` folder:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/posbuzz_db?schema=public"
   JWT_SECRET="super-secret-key"
   REDIS_HOST="localhost"
   REDIS_PORT=6379
   ```

4. **Database Setup:**
   Ensure PostgreSQL is running, then populate the schema:
   ```bash
   npx prisma list  # Help purpose
   npx prisma generate
   npx prisma migrate dev --name init
   npx prisma studio # Check the datas
   ```

4. **Run Server:**
   ```bash
   # Development
   npm run start:dev
   ```

5. **API Documentation:**
   Import the `PosBuzz_Collection.json` (root directory) into Postman to test all endpoints.
