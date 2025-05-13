import React from "react";

const BankDetailsPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const bankDetails = {
    accountNumber: "200067834",
    accountName: "Glimmer",
    bankName: "Commercial Bank",
    branch: "Colombo 7",
    contact: "glimmer.infomail@gmail.com",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-4 p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Bank Details</h2>
        </div>

        <div className="space-y-3">
          <div>
            <span className="block text-sm font-medium text-gray-700">Account Number</span>
            <p className="mt-1 text-base text-gray-900">{bankDetails.accountNumber}</p>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Account Name</span>
            <p className="mt-1 text-base text-gray-900">{bankDetails.accountName}</p>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Bank Name</span>
            <p className="mt-1 text-base text-gray-900">{bankDetails.bankName}</p>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Branch</span>
            <p className="mt-1 text-base text-gray-900">{bankDetails.branch}</p>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Contact</span>
            <p className="mt-1 text-base text-gray-900">
              <a
                href={`mailto:${bankDetails.contact}`}
                className="text-blue-600 hover:underline"
              >
                {bankDetails.contact}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDetailsPopup;
