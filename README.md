# Rating Platform

A full-stack web application that allows users to submit ratings for stores registered on the platform. The project is built as part of a FullStack Intern Coding Challenge.

## 🚀 Tech Stack
- **Frontend:** React.js  
- **Backend:** Express.js  
- **Database:** MySQL / PostgreSQL  
- **Authentication:** JWT  

## 🔑 User Roles
1. **System Administrator**  
   - Add new stores, users, and admins  
   - Access dashboard with total users, stores, and ratings  
   - View, filter, and manage users and stores  

2. **Normal User**  
   - Sign up / log in  
   - View and search stores  
   - Submit or update ratings (1–5)  
   - Update password  

3. **Store Owner**  
   - Log in and manage own store ratings  
   - View users who rated their store  
   - See average rating of their store  

## 🛠️ Features
- Role-based authentication and authorization  
- Secure password hashing with **bcrypt**  
- Input validation on frontend and backend  
- Sorting & filtering for listings  
- JWT-based session management  
- RESTful API with error handling  

## 📂 Project Structure
rating-platform/
├── backend/ # Express.js backend
│ ├── src/
│ ├── .env
│ ├── package.json
├── frontend/ # React.js frontend
│ ├── public/
│ ├── src/
│ ├── package.json
├── .gitignore
├── README.md


## ⚙️ Setup Instructions

### Backend
cd backend
npm install
npm run dev
Frontend
bash
Copy code
cd frontend
npm install
npm start
Environment Variables
Create a .env file in backend/:


PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=rating_platform
JWT_SECRET=your_jwt_secret
📊 Dashboard
Admin Dashboard: View total users, stores, and ratings

Store Owner Dashboard: View ratings and average score

✅ Validations
Name: 20–60 chars

Address: max 400 chars

Password: 8–16 chars, must include at least one uppercase letter & one special character

Email: standard email format

📌 Notes
Ensure database schema is created before running migrations.
