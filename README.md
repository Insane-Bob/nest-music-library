# 🎸 Classic Rock Music Library API

https://github.com/Insane-Bob/nest-music-library

## 🚀 Overview
A secure NestJS REST API for managing your personal music library, inspired by classic rock and Spotify. This project demonstrates modern authentication, role management, and resource protection with a real-world use case.

---

## 📚 Features
- **User Registration & Login**: Email validation and two-factor authentication (2FA) via email code.
- **Role Management**: `user` and `admin` roles with strict access control.
- **Music Library**: Add, view, update, and delete your own music entries. Admins can view all users and all musics.
- **Swagger UI**: Interactive API documentation and testing.
- **Fixtures & Seeding**: Pre-filled database with classic rock musics and demo users.
- **Email Service**: Local email testing with Maildev.
- **Database**: PostgreSQL + TypeORM, ready for Docker.

---

## 🎯 Subject
Build a secure API for a music library with:
- Registration, login, email validation, and 2FA
- Role management (user/admin)
- Private resources (each user only accesses their own library)
- Admin access to all resources
- Public/private endpoint management
- Demo data: classic rock music

---

## 🛠️ Setup & Usage

### Prerequisites
- Docker & Docker Compose
- Node.js (for local development)

### Quick Start
1. **Clone the repository**
2. **Start the stack**:
   ```bash
   docker compose up
   ```
   This will start:
   - PostgreSQL database
   - Maildev (email testing)
   - Adminer (DB web UI at http://localhost:8080)
   - Seed script (populates DB with demo users and musics)

3. **Start the NestJS API server** (in a separate terminal):
   ```bash
   npm install
   npm run start:dev
   ```

4. **Access Swagger UI**: [http://localhost:3000/swagger](http://localhost:3000/swagger)

### Manual Seeding
If you want to reseed the database:
```bash
npx ts-node src/fixtures/seed.ts
```

---

## 👤 Default Users
- **User**
  - Email: `user@classicrock.com`
  - Password: `Password-User-1234&`
  - Role: `user`
- **Admin**
  - Email: `admin@classicrock.com`
  - Password: `Password-Admin-1234&`
  - Role: `admin`

**OR CHECK THE classic-rock-fixture.ts for more details**

---

## 🔒 Authentication & Roles
- Register or use the seeded users.
- Login, validate email, then use 2FA to get a JWT.
- Use the JWT in Swagger's "Authorize" dialog to access private endpoints.
- Only admins can access `/users` and `/music/all` endpoints.

---

## 📧 Email Testing
- Access Maildev at [http://localhost:1080](http://localhost:1080) to view sent emails.

## 🗄️ Database Access
- Use Adminer at [http://localhost:8080](http://localhost:8080) to inspect or edit the database.

---

## 🏗️ Project Structure
```
src/
  auth/        # Authentication, registration, 2FA
  users/       # User entity, controller, service
  music/       # Music entity, controller, service, DTOs
  common/      # Guards and decorators for roles and public endpoints
  fixtures/    # Demo data and seed script
```
Other files:
- `docker-compose.yaml` - Multi-service setup for DB, mail, adminer, and seeding
- `Dockerfile` - For building the seed script container

---

## 🛡️ Security & Best Practices
- Passwords are hashed before storage
- JWT authentication for all private endpoints
- Role-based guards for admin-only access
- DTO validation for all input data
- CORS enabled for development

---

## 📄 License
MIT

---

For any questions or improvements, feel free to open an issue or contribute!
