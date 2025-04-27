import React, { useState } from "react";
import Sidebar from "../component/AdminEvent/Sidebar";
import Navbar from "../component/AdminEvent/Navbar";
import EventTable from "../component/AdminEvent/EventTable";
import Popup from "../component/AdminEvent/Popup"; // Import Popup component

const EventsPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-4 overflow-y-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">All Event List</h1>
            <button
              onClick={openPopup}
              className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
            >
              + New Event
            </button>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Search Product"
              className="border p-2 rounded w-full md:w-1/3"
            />
            <button className="border p-2 rounded w-full md:w-auto">
              Sort By
            </button>
          </div>

          {/* Table */}
          <EventTable />
        </main>
      </div>

      {/* Render Popup */}
      {isPopupOpen && (
        <Popup closePopup={closePopup}>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Event Name:
              </label>
              <input
                type="text"
                placeholder="Enter event name"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
               {/* Event Description */}
               <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description *:
              </label>
              <textarea
                placeholder="Enter event description"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Event Image */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Upload Image:
              </label>
              <input
                type="file"
                accept="image/*"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
           {/* Buttons */}
      <div className="flex justify-end gap-4">
        {/* Cancel Button */}
        <button
          type="button"
          onClick={closePopup}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>
          </form>
        </Popup>
      )}
    </div>
  );
};

export default EventsPage;
