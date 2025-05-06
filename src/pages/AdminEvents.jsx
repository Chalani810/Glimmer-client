import React, { useState, useEffect } from "react";
import Sidebar from "../component/AdminEvent/Sidebar";
import Navbar from "../component/AdminEvent/Navbar";
import EventTable from "../component/AdminEvent/EventTable";
import Popup from "../component/AdminEvent/Popup";
import axios from "axios";

const EventsPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    eventImage: null,
  });
  const [events, setEvents] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${apiUrl}/event/`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => {
    setIsPopupOpen(false);
    setFormData({ eventName: "", description: "", eventImage: null });
    setIsEditMode(false);
    setEditEventId(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "eventImage") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEdit = (event) => {

    setFormData({
      eventName: event.title,
      description: event.description,
      eventImage: null,
    });
    setEditEventId(event._id);
    setIsEditMode(true);
    setIsPopupOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.eventName);
    formDataToSend.append("description", formData.description);
    
    // Important: Append the file with the correct field name ('eventImage')
    if (formData.eventImage) {
      formDataToSend.append("eventImage", formData.eventImage);
    }
    
    // Convert boolean to string as FormData sends everything as strings
    formDataToSend.append("visibility", "false");
  
    // Debug: Show actual FormData contents
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
  
    try {
      if (isEditMode) {
        const response = await axios.put(
          `${apiUrl}/event/${editEventId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Update response:", response.data);
      } else {
        const response = await axios.post(
          `${apiUrl}/event/add`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Create response:", response.data);
      }
      
      await fetchEvents();
      closePopup();
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      // You might want to add user feedback here
    }
  };

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
          <EventTable 
            events={events} 
            fetchEventsForDelete={fetchEvents} 
            handleEdit={handleEdit}
          />

        </main>
      </div>

      {/* Render Popup */}
      {isPopupOpen && (
        <Popup closePopup={closePopup}>
          <form onSubmit={handleSubmit}>
            {/* Event Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Event Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
                placeholder="Enter event name"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Event Description */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter event description"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>

            {/* Event Image Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Upload Image {!isEditMode && <span className="text-red-500">*</span>}
              </label>
              <input
                type="file"
                name="eventImage"
                onChange={handleChange}
                required={!isEditMode}
                accept="image/*"
                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={closePopup}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>

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