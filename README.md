# Task Management System (MERN Stack)

A full-stack **Task Management System** built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with **role-based access control and hierarchical user structure**. The system is designed for organizations to manage users and tasks efficiently across different roles.

🔗 Live Demo: https://task-6gbp.onrender.com

---

## 🚀 Features

### 🔐 1. Authentication Module
- User registration (only Super Admin can create users)
- Secure login using JWT authentication
- Role-based redirection after login
- Logout functionality with token invalidation

---

### 👥 2. User Hierarchy Module
- Super Admin can manage all users and roles
- Admin can create/manage Managers and Employees
- Manager can view and manage their direct team members
- Each user has a `reportsTo` field for hierarchy mapping

---

### 📋 3. Task Management Module
- Create tasks with:
  - Title
  - Description
  - Priority (Low / Medium / High)
  - Due Date
  - Status tracking
- Assign tasks only within allowed hierarchy scope
- Task workflow:
  - To Do → In Progress → Done → Closed
- Filter & search tasks by:
  - Status
  - Priority
  - Assignee
  - Due date
- Task history / audit log for status changes

---

### 📊 4. Role-Based Dashboards

#### Super Admin Dashboard
- Total users by role
- All tasks overview
- Organization statistics
- System-level monitoring

#### Admin Dashboard
- Manage managers and employees
- Assign tasks across users
- View all task statuses

#### Manager Dashboard
- View team members
- Assign tasks to team
- Track team progress

#### Employee Dashboard
- View assigned tasks
- Update task status
- View task history

---

## 🏗️ Architecture

This project follows a **4-layer React architecture**:

- **UI Layer** → Components & Pages
- **State Layer** → Global/local state management
- **API Layer** → Axios-based API services
- **Hooks Layer** → Custom hooks for business logic

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Context API / Hooks
- Axios
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB
- JWT Authentication

**Deployment:**
- Frontend + Backend hosted on Render

---

## 📂 Project Structure

client/
├── components/
├── pages/
├── hooks/
├── services/
├── context/

server/
├── controllers/
├── models/
├── routes/
├── middleware/


---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-management-system.git

## 📂 Setup environment variables

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000

## ⚙️ Run the project
Frontend:- npm run dev
Backend:- npx nodemon server.js

## 👨‍💻 Author
Build By Piyush



