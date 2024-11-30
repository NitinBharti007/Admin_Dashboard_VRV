# Role Management Dashboard

A fully responsive **Role Management Dashboard** built with **React** and **Tailwind CSS**. This project allows users to manage roles and permissions through an intuitive interface, supporting features like adding, editing, and deleting roles. The UI is optimized for both **light** and **dark modes**, ensuring a seamless user experience across devices.

---

## 📋 **Features**

- **Add Role**: Create new roles with a custom name and predefined permissions.
- **Edit Role**: Modify existing roles seamlessly.
- **Delete Role**: Remove roles with confirmation prompts.
- **Dark Mode Support**: The interface adapts to system themes or user preferences.
- **Responsive Design**: Optimized for all screen sizes, from mobile to desktop.
- **LocalStorage Persistence**: Roles are saved locally and persist across sessions.

---

## 🛠️ **Technologies Used**

- **React**: For building the user interface.
- **Tailwind CSS**: For styling and ensuring responsive design.
- **React Toastify**: For notifications.
- **LocalStorage**: For data persistence.

---

## 🚀 **Getting Started**

Follow these steps to set up and run the project on your local machine.

### **Prerequisites**

- **Node.js**: Install the latest version from [Node.js Official Website](https://nodejs.org).
- **Git**: Ensure Git is installed for version control.

---

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/NitinBharti007/Admin_Dashboard_VRV.git
   cd RBAC-VRV-Security
2. Install dependencies:
   ```bash
   npm install

### **Running the Application**

1. Start the development server:
   ```bash
   npm start
Open your browser and navigate to http://localhost:3000.

### **Project Structure**
      📂 src/
      ├── 📂 components/
      │   ├── 📄 RoleManagement        # Main component for role management
      │   ├── 📄 UserManagement        # Main component for user management
      │   └── 📄 ConfirmationModal.jsx # Modal for delete confirmation
      ├── 📂 styles/
      │   └── 📄 index.css           # Custom Tailwind CSS styles
      ├── 📄 App.jsx                 # Application entry point
      ├── 📄 index.js                # Main React DOM rendering
      └── 📄 localStorageUtils.js    # Utility functions for localStorage handling
      
## 🖥️ **Usage**

- **Add Role**: Click the "Add Role" button. Fill in the role name and select permissions. Save the role to see it reflected in the table.
- **Edit Role**: Click the "Edit" button for a specific role. Modify the name or permissions, and save the changes.
- **Delete Role**: Click the "Delete" button for a role. Confirm the action in the pop-up modal.


### **🌟 Features in Dark Mode**

1. Enable dark mode on your system or browser to experience the dark-themed UI automatically.
2. Elements, text, and buttons adapt dynamically for optimal visibility.

### **📧 Contact**

- **Author**: Nitin Bharti
- **Email**: dev.nitin63@gmail.com
- **Portfolio**: [Me](https://nitinbh.netlify.app)
