# web-dev-portfolio
Full-stack school web application project built with React, Typescript & C# featuring REST API integration & state management 

This project is a full-stack school web application built as part of my Web Development course. This was a group project, in this read me I will be highlighting my contributions to the project. 
It simulates a real-world calendar & attendance platform where users can authenticate, manage sessions, and track attendance.


During this project I learned how to:

-Build and structure a React + TypeScript front-end

-Create REST APIs using C# and ASP.NET

-Handle authentication & state management

-Connect front-end and back-end systems

-Work in an Agile / Scrum team environment

-Use Git & GitHub for collaboration and version control

My Contributions to the Frontend : 
- Designed and implemented complete authentication flow (login, logout, signup)
- Built login interface using React with Bootstrap styling matching project theme
- Created user-friendly, responsive login UI

Routing & Navigation
- Implemented React Router for application navigation
- Fixed routing logic to ensure application starts on login page
- Configured protected route navigation after successful authentication

Global State Management
- Built authentication context using React's useContext Hook
- Stored and managed logged-in user data globally across application
- Made user credentials available on all pages throughout the app

Conditional Rendering
- Implemented conditional rendering so users only see buttons and pages when logged in
- Dynamic UI elements based on authentication state
- Protected content visibility based on user permissions

- Implemented attendance modification allowing logged-in users to edit only their own attendance
- Linked all attendance actions to the logged-in user's ID instead of static data
- Built complete Create, Read, Update, Delete operations with proper authorization



My Contributions to the Backend:

Security & Validation
- Secured all attendance endpoints with authentication
- Implemented server-side validation and error handling
- Prevented unauthorized access to other users' records

Booking Functionality
- Implemented room booking feature allowing logged-in users to book only available rooms
- Built availability checking logic
- Linked bookings to authenticated user accounts

Endpoint Security
- Secured all room booking endpoints with authentication
- Reused login logic for consistent authorization across features
- Implemented server-side validation and error handling

Error Handling
- Implemented comprehensive server-side validation
- Built proper error handling throughout the application
- Provided meaningful error messages to users

  



<img width="1598" height="774" alt="image" src="https://github.com/user-attachments/assets/52bed473-e4c4-45de-ad78-dd2ad48ae7d6" />

<img width="1851" height="749" alt="Screenshot 2026-01-07 192501" src="https://github.com/user-attachments/assets/cd0aa830-106d-4dcf-ad72-8444fd655e8f" />

