# User Management Role-Based Access Control (RBAC) System

This project is a simple **User Management System** built with **React-JS**. It allows you to manage users and roles in a table format, with the ability to add, edit, and delete users and roles. Each user has a **name**, **email**, **role**, and **status (active/inactive)**. The app stores user data in **localStorage**, so your data persists even after a page refresh.


## Features

- **Add Users**: You can easily add new users by filling out a form with their name, email, and role. The email is validated to ensure it's in the correct format before saving.
- **Edit Users**: Existing users can be edited by clicking the "Edit" button in the user table. The form pre-fills with the user's details, and you can modify them.
- **Delete Users**: You can delete users directly from the user table, which will permanently remove them from the system.
- **Responsiveness**: The app is designed to work well on both desktop and mobile devices. Tables and forms adjust gracefully to different screen sizes.
  

## Technologies Used

- **React** for building the UI
- **Tailwind CSS** for styling and responsiveness
- **localStorage** for persisting user data


## How to Use

1. **Clone the repository:**

   ```bash
   git clone https://github.com/harver2001/RBAC-VRV-Security

2. **Install dependencies:**

   - (Assuming you have Node.js and npm installed)
   - Run the below command to install all the required dependencies.
   
    npm install

2. **Start the application:**

   - Run the below command to start the project locally.
   
    npm start


## Interacting with the Application

- Initally create a role that can eventually be assigned to any User.
- Adding Users: Click on the designated "Add User" button to add a new user.
- Editing Users: Locate the "Edit" button next to a user's record in the table and click it to modify details, including their role.
- Deleting Users: Click the corresponding "Delete" button to permanently remove a user.
- Role Management: When adding or editing a user, you can assign a specific role. This helps to control the access and permissions for each user.
- LocalStorage Utilization: The application leverages the browser's localStorage for user data persistence. This entails:
    - Saving user and role data modifications (addition, editing, deletion) locally to your browser.
    - Maintaining user and role data even upon page refreshes, as it's retrieved from localStorage upon subsequent loads.
