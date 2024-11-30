import React, { useState, useEffect, useMemo } from "react";
import UserForm from "./UserForm";
import ConfirmationModal from "../ConfirmationModal";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setUsers(savedUsers);
    setRoles(savedRoles);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [users, roles]);

  const handleSaveUser = (user) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...user, id: u.id } : u))
      );
      setEditingUser(null);
    } else {
      setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setShowModal(false);
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = useMemo(() => {
    let filteredUsers = [...users];

    if (searchQuery) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filter !== "all") {
      filteredUsers = filteredUsers.filter(
        (user) => user.active === (filter === "active")
      );
    }

    if (sortConfig !== null) {
      filteredUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredUsers;
  }, [users, searchQuery, filter, sortConfig]);

  return (
<div className="container mx-auto p-4 sm:p-6">
  <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 space-y-4 sm:space-y-0">
    <h2 className="text-lg sm:text-2xl font-bold text-gray-700 dark:text-gray-200">
      User Management
    </h2>
    <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
      <input
        type="text"
        className="p-2 border rounded-lg w-full sm:w-auto bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        className="p-2 border rounded-lg w-full sm:w-auto bg-white dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700"
        onClick={() => setShowForm(true)}
      >
        Add User
      </button>
    </div>
  </div>

  <div className="overflow-x-auto">
    <table className="table-auto w-full min-w-[600px] bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg">
      <thead className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white">
        <tr>
          <th
            className="px-2 sm:px-4 py-2 text-left cursor-pointer dark:text-gray-200"
            onClick={() => requestSort("name")}
          >
            Name
          </th>
          <th
            className="px-2 sm:px-4 py-2 text-left cursor-pointer dark:text-gray-200"
            onClick={() => requestSort("email")}
          >
            Email
          </th>
          <th
            className="px-2 sm:px-4 py-2 text-left cursor-pointer dark:text-gray-200"
            onClick={() => requestSort("role")}
          >
            Role
          </th>
          <th
            className="px-2 sm:px-4 py-2 text-left cursor-pointer dark:text-gray-200"
            onClick={() => requestSort("active")}
          >
            Status
          </th>
          <th className="px-2 sm:px-4 py-2 text-left dark:text-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.length > 0 ? (
          sortedUsers.map((user, index) => (
            <tr
              key={user.id}
              className={`${
                index % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
              } hover:bg-gray-200 dark:hover:bg-gray-600`}
            >
              <td className="px-2 sm:px-4 py-2 border dark:border-gray-700 dark:text-gray-200">
                {user.name}
              </td>
              <td className="px-2 sm:px-4 py-2 border dark:border-gray-700 dark:text-gray-200">
                {user.email}
              </td>
              <td className="px-2 sm:px-4 py-2 border dark:border-gray-700 dark:text-gray-200">
                {user.role}
              </td>
              <td className="px-2 sm:px-4 py-2 border dark:border-gray-700 dark:text-gray-200">
                {user.active ? "Active" : "Inactive"}
              </td>
              <td className="px-2 sm:px-4 py-2 border flex flex-col sm:flex-row gap-2 dark:border-gray-700">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition dark:bg-green-600 dark:hover:bg-green-700"
                  onClick={() => {
                    setEditingUser(user);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition dark:bg-red-600 dark:hover:bg-red-700"
                  onClick={() => {
                    setUserToDelete(user);
                    setShowModal(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="5"
              className="text-center px-2 sm:px-4 py-2 dark:text-gray-200"
            >
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>


      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => handleDelete(userToDelete.id)}
        message={`Are you sure you want to delete the user ${userToDelete?.name}?`}
      />

      {showForm && (
        <UserForm
          user={editingUser}
          roles={roles}
          onSave={handleSaveUser}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default UserTable;
