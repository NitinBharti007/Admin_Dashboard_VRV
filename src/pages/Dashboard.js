import React, { useState, useEffect } from "react";
import UserTable from "../components/UserManagement/UserTable";
import RoleTable from "../components/RoleManagement/RoleTable";
import {
  FaUsers,
  FaUserShield,
  FaBars,
  FaTimes,
  FaMoon,
  FaSun,
  FaChartBar,
} from "react-icons/fa";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const [recentActivity, setRecentActivity] = useState([
    "User John Doe updated their profile.",
    "Role 'Editor' permissions updated.",
    "Admin approved 3 new users.",
  ]);

  useEffect(() => {
    // Check if there is a saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newTheme = !prev ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return !prev;
    });
  };

  return (
    <div
      className={`dashboard flex h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-white"}`}
    >
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarCollapsed ? "w-16" : "w-64"
        } bg-gradient-to-b ${
          isDarkMode ? "from-gray-900 to-gray-800" : "from-gray-800 to-gray-600"
        } text-white flex flex-col transition-all duration-300`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-6">
          <h1
            className={`text-2xl font-bold transition-opacity duration-300 ${
              isSidebarCollapsed ? "opacity-0 hidden" : "opacity-100"
            }`}
          >
            Admin
          </h1>
          <button
            className="text-lg focus:outline-none"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
          >
            {isSidebarCollapsed ? (
              <FaBars /> 
            ) : (
              <FaTimes />
            )}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col px-2 space-y-3">
          <button
            className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
              activeTab === "users"
                ? "bg-blue-600 dark:bg-blue-700 shadow-xl"
                : "hover:bg-blue-500 dark:hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <FaUsers className="text-xl" />
            {!isSidebarCollapsed && <span className="ml-3">User Management</span>}
          </button>
          <button
            className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
              activeTab === "roles"
                ? "bg-green-600 dark:bg-green-700 shadow-xl"
                : "hover:bg-green-500 dark:hover:bg-green-600"
            }`}
            onClick={() => setActiveTab("roles")}
          >
            <FaUserShield className="text-xl" />
            {!isSidebarCollapsed && <span className="ml-3">Role Management</span>}
          </button>
          <button
            className="flex items-center p-3 rounded-lg hover:bg-purple-500 dark:hover:bg-purple-600 transition-all duration-300"
          >
            <FaChartBar className="text-xl" />
            {!isSidebarCollapsed && <span className="ml-3">Analytics</span>}
          </button>
        </nav>

        {/* Theme Toggle */}
        <div className="mt-auto p-4">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-between w-full p-2 rounded-lg bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700"
          >
            <span className={`${isSidebarCollapsed ? "hidden" : ""} ml-2`}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto transition-all duration-300">
        {/* Header */}
        <header
          className={`flex flex-col sm:flex-row justify-between items-center p-4 rounded-md shadow-lg mb-6 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
          }`}
        >
          <div className="mb-4 sm:mb-0">
            <h2
              className={`text-2xl font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {activeTab === "users" ? "User Management" : "Role Management"}
            </h2>
            <p
              className={`text-gray-500 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Manage {activeTab === "users" ? "users and their data" : "roles and permissions"} here.
            </p>
          </div>
          {/* Profile Section */}
          <div>
            <button className="flex items-center focus:outline-none">
              <img
                src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span
                className={`ml-3 hidden sm:block font-medium ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Admin
              </span>
            </button>
          </div>
        </header>

        {/* Dashboard Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div
            className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
              isDarkMode ? "bg-blue-700" : "bg-blue-600"
            } text-white`}
          >
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold">120</p>
          </div>
          <div
            className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
              isDarkMode ? "bg-green-700" : "bg-green-600"
            } text-white`}
          >
            <h3 className="text-lg font-semibold">Active Roles</h3>
            <p className="text-3xl font-bold">8</p>
          </div>
          <div
            className={`p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
              isDarkMode ? "bg-yellow-700" : "bg-yellow-500"
            } text-white`}
          >
            <h3 className="text-lg font-semibold">Pending Requests</h3>
            <p className="text-3xl font-bold">14</p>
          </div>
        </section>

        {/* Content Section */}
        <section
          className={`p-6 rounded-md shadow-lg mb-6 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
          }`}
        >
          {activeTab === "users" ? <UserTable /> : <RoleTable />}
        </section>

        {/* Recent Activity */}
        <section
          className={`p-6 rounded-md shadow-lg ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
          }`}
        >
          <h3
            className={`text-xl font-semibold ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            } mb-4`}
          >
            Recent Activity
          </h3>
          <ul
            className={`space-y-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            {recentActivity.map((activity, index) => (
              <li key={index}>- {activity}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
