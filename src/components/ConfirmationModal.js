import React, { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa"; // Warning triangle icon
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Loading spinner icon
import { toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

function ConfirmationModal({ isOpen, onClose, onConfirm, message }) {
  const [isLoading, setIsLoading] = useState(false);

  // Close modal on pressing Escape
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  // Simulate a delay (e.g., API call)
  const handleConfirmClick = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);
      onConfirm();
      toast.success("Action confirmed successfully!");
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong!");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-sm mx-4 transform transition-all duration-300 ease-in-out scale-95 hover:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon Section */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-600 text-white rounded-full p-4 flex items-center justify-center">
            <FaExclamationTriangle size={50} />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
        <p className="text-lg text-gray-700 mb-6">{message}</p>

        {/* Buttons Section */}
        <div className="mt-4 flex justify-between gap-4">
          <button
            className="bg-gray-300 text-black px-6 py-3 rounded-lg text-lg hover:bg-gray-400 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:bg-gray-200"
            onClick={onClose}
            aria-label="Cancel"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-red-300"
            onClick={handleConfirmClick}
            aria-label="Confirm"
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-xl" />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
