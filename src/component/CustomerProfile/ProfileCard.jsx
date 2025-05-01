import React from 'react';
import { Pencil } from 'lucide-react'; // optional icon package

const ProfileCard = () => {
  return (
    <div className="w-full max-w-3xl space-y-6">
      {/* User Info */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow">
        <div className="flex items-center space-x-4">
          <img
            src="/component/CustomerProfile/Profile.jpg"
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-lg">John Doe</h3>
            <p className="text-gray-500">Leeds, United Kingdom</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-black">
          <Pencil size={18} />
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Personal Information</h4>
          <button className="text-gray-500 hover:text-black">
            <Pencil size={18} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><span className="font-semibold">First Name:</span> Rafiquar</p>
          <p><span className="font-semibold">Last Name:</span> Rahman</p>
          <p><span className="font-semibold">Email Address:</span> rafiqurraham5@gmail.com</p>
          <p><span className="font-semibold">Phone Number:</span> +94 70 000 0000</p>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Address</h4>
          <button className="text-gray-500 hover:text-black">
            <Pencil size={18} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
            <p><span className="font-semibold">Street:</span> Lake Road</p>
            <p><span className="font-semibold">City:</span> Leeds, East London</p>
            <p><span className="font-semibold">Postal Code:</span> ERT 2354</p>
            <p><span className="font-semibold">Country:</span> United Kingdom</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
