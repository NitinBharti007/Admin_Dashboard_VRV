import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../ConfirmationModal";

function RoleTable() {
  const [roles, setRoles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  // Load roles from localStorage
  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    setRoles(savedRoles);
  }, []);

  // Save roles to localStorage
  useEffect(() => {
    localStorage.setItem("roles", JSON.stringify(roles));
  }, [roles]);

  // Handle Add/Edit Role
  const handleSaveRole = (role) => {
    if (!role.name || role.permissions.length === 0) {
      setError("Role name and permissions are required.");
      return;
    }

    if (editingRole) {
      setRoles((prev) =>
        prev.map((r) => (r.id === editingRole.id ? { ...role, id: r.id } : r))
      );
      toast.success("Role updated successfully!");
      setEditingRole(null);
    } else {
      setRoles((prev) => [...prev, { ...role, id: Date.now() }]);
      toast.success("Role added successfully!");
    }
    setShowForm(false);
    setError("");
  };

  // Handle Delete Role
  const handleDelete = (id) => {
    const newRoles = roles.filter((r) => r.id !== id);
    setRoles(newRoles);
    setShowDeleteModal(false);
  };

  return (
    <div className="container mx-auto p-1 sm:p-6 lg:p-4">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          Role Management
        </h2>
        <button
          className="bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300 sm:w-auto w-full"
          onClick={() => setShowForm(true)}
        >
          {editingRole ? "Edit Role" : "Add Role"}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500 text-white p-3 mb-4 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Roles Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-gray-50 dark:bg-gray-800 shadow-md rounded-lg">
          <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Permissions</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No roles found
                </td>
              </tr>
            ) : (
              roles.map((role, index) => (
                <tr
                  key={role.id}
                  className={`${
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-white dark:bg-gray-600"
                  } hover:bg-gray-200 dark:hover:bg-gray-500`}
                >
                  <td className="px-4 py-3 border dark:border-gray-700 text-gray-800 dark:text-gray-200">
                    {role.name}
                  </td>
                  <td className="px-4 py-3 border dark:border-gray-700 text-gray-800 dark:text-gray-200">
                    {role.permissions.join(", ")}
                  </td>
                  <td className="px-4 py-3 border dark:border-gray-700 flex gap-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      onClick={() => {
                        setEditingRole(role);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => {
                        setRoleToDelete(role);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Role Form */}
      {showForm && (
        <RoleForm
          onClose={() => {
            setEditingRole(null);
            setShowForm(false);
          }}
          onSave={handleSaveRole}
          role={editingRole}
          error={error}
        />
      )}

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDelete(roleToDelete.id)}
          message={`Are you sure you want to delete the role: ${roleToDelete.name}? This action cannot be undone.`}
        />
      )}
    </div>
  );
}

function RoleForm({ onClose, onSave, role, error }) {
  const predefinedPermissions = ["Read", "Write", "Delete"];
  const [name, setName] = useState(role?.name || "");
  const [permissions, setPermissions] = useState(role?.permissions || []);
  const [formError, setFormError] = useState("");

  const handleTogglePermission = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    if (!name || permissions.length === 0) {
      setFormError("Role name and at least one permission are required.");
      return;
    }

    onSave({ name, permissions });
    setFormError("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 w-11/12 sm:w-96">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          {role ? "Edit Role" : "Add Role"}
        </h3>
        <input
          type="text"
          placeholder="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
        />
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
            Permissions
          </label>
          <div className="space-y-2">
            {predefinedPermissions.map((permission) => (
              <label
                key={permission}
                className="flex items-center gap-2 cursor-pointer text-gray-800 dark:text-gray-200"
              >
                <input
                  type="checkbox"
                  checked={permissions.includes(permission)}
                  onChange={() => handleTogglePermission(permission)}
                  className="cursor-pointer"
                />
                <span>{permission}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {formError && (
          <div className="bg-red-500 text-white p-3 mb-4 rounded">
            <strong>Error:</strong> {formError}
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleTable;