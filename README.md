# ExamiVana - Online Examination System

ExamiVana is a professional, responsive web-based platform for conducting MCQ-based online exams. It supports teachers in creating exams with timers, deadlines, and auto-grading, while allowing students to take exams securely with real-time features like chat.

## Features
- **Teacher Mode**: Create MCQs, set timers/deadlines, generate unique codes, view student scores, and chat privately with students.
- **Student Mode**: Enter exam code, provide name/roll no (once), take timed exams, auto-submit on time-up, view scores/remarks, and chat with teachers.
- **Demo Mode**: Try creating MCQs as a teacher without registration.
- **Responsive Design**: Works seamlessly on mobiles and PCs using Bootstrap.
- **Security**: JWT authentication, hashed passwords, role-based access.
- **Real-Time Chat**: Using Socket.io for private teacher-student communication.
- **Auto-Grading**: Instant scoring with remarks (Excellent, Good, Fair, Poor).
- **Deadlines**: Exams inaccessible after deadline; quizzes solvable only once.

## Tech Stack
- **Frontend**: React, React Router, Bootstrap, Axios, Socket.io-client
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Bcrypt, Socket.io
- **Database**: MongoDB (local or Atlas)

## Project Structure