# 💼 Job Management & Application Tracking System (MERN Stack)

A full-stack Job Management and Application Tracking web application
built using the **MERN stack**. It is my internship project as `veridia.io`. This system allows **Admins to post
jobs** and **Users to apply for jobs**, while tracking the complete
hiring workflow from application to hiring.

------------------------------------------------------------------------

## 🚀 Tech Stack

-   **Frontend:** React.js, Tailwind CSS, Lucide icons
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (Mongoose)
-   **File Upload:** Multer
-   **File Storage:** Cloudinary
-   **Authentication:** JWT
-   **Email Service and OTP:** Nodemailer, twilio
-   **State Management:** Context API

------------------------------------------------------------------------

## 🎯 Key Features

### 👤 User Side

-   User Registration & Login
-   User recover forgot password
-   Profile with education, skills, experience
-   File upload Resume (pdf) Avatar (jpg, png)
-   Browse and apply to jobs
-   Track application status
-   Email notification on application

### 🛠️ Admin Side

-   Create / Update / Delete Jobs
-   View applications per job
-   View and filter user profile & resume
-   Change application status
-   Schedule interviews
-   Send emails to applicants

------------------------------------------------------------------------

## 🧩 Application Workflow

User applies → Admin reviews → Shortlist/Reject (email will be sent according application status) → Schedule interview →
Final decision

------------------------------------------------------------------------


## 🗃️ Database Schema

### User

-   firstname, lastname, email, phone, gender, dob
-   location
-   skills
-   experience { companyName, year }
-   education
-   resume, avatar
-   password
-   role

### Admin

-   name, email
-   password
-   role

### Application 

-   userId, jobId
-   status (Pending, Shortlisted, Rejected, Scheduled,Hired)

### Job

-   title, department, job type
-   experience, description, skills
-   closingDate
-   hiring workflow, eligibility Criteria, responsibilities
-   location

### Interview

-   applicantId, jobId, scheduledBy
-   interview date, 
-   mode
-   meeting link / location
-   status (scheduled, completed, cancelled, no show, selected,     rejected)
-   remarks


### OTP 

-   value
-   otp
-   expiresat
-   verified



------------------------------------------------------------------------

## 🔐 Security Practices

-   Password hashing (bcrypt)
-   JWT protected routes
-   Role-based access
-   Limited field selection

------------------------------------------------------------------------

## 📦 Installation

### Backend
-   Step `1`

```
git clone https://github.com/arghyadeep00/Internship-final-project.git
```

-   Step `2`

``` 
cd InternShip Project
```

-   Step `3`
now see two folder frontend and backend go to the backend folder

``` 
cd backend 
```

- Step `4` setup .env file

    - create `.env` file

```
PORT=
JWT_SECRET=
CLIENT_URL=
NODE_ENV=
MONGO_URI=

EMAIL_USER=
EMAIL_PASS=
        
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

```
- put this variables `.env` file and fill up your api keys

-   Step `5` run backend program

``` 
npm run dev
 ```

🎉 successfully run backend server.

### Frontend

- Step `6` now go to frontend folder

```
cd frontend
```
-   Step `7` run frontend program
```
npm run dev
```

🎉 successfully run frontend server.



------------------------------------------------------------------------

## 👨‍💻 Author

**Arghyadeep She** | MERN Stack Developer.
