import React, { useState, useEffect } from "react";
import Sidebar from "../component/AdminEvent/Sidebar";
import Navbar from "../component/AdminEvent/Navbar";
import EventTable from "../component/AdminEvent/EventTable";
import Popup from "../component/AdminEvent/Popup";
import ConfirmationModal from "../component/ConfirmationModal";
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
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${apiUrl}/event/`);
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setEvents([]);
      setFilteredEvents([]);
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

    if (formData.eventImage) {
      formDataToSend.append("eventImage", formData.eventImage);
    }

    formDataToSend.append("visibility", "false");

    try {
      if (isEditMode) {
        await axios.put(`${apiUrl}/event/${editEventId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${apiUrl}/event/add`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchEvents();
      closePopup();
    } catch (error) {
      console.error("Error details:", error);
    }
  };

  const requestDelete = (eventId) => {
    setEventToDelete(eventId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/event/${eventToDelete}`);
      setIsModalOpen(false);
      setEventToDelete(null);
      fetchEvents();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto ml-0 md:ml-64"> {/* Responsive margin */}
        <main className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <h1 className="text-xl font-semibold">All Event List</h1>
            <button
              onClick={openPopup}
              className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 w-full md:w-auto"
            >
              + New Event
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Search Event"
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                if (value.trim() === "") {
                  fetchEvents();
                }
              }}
              className="border p-2 rounded w-full"
            />
            <button
              className="border p-2 rounded bg-gray-200 hover:bg-gray-300 w-full md:w-auto"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="overflow-x-auto">
            <EventTable
              events={filteredEvents}
              fetchEventsForDelete={fetchEvents}
              handleEdit={handleEdit}
              handleDeleteRequest={requestDelete}
            />
          </div>
        </main>
      </div>

      {isPopupOpen && (
        <Popup closePopup={closePopup}>
          <form onSubmit={handleSubmit}>
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
                className="border p-2 rounded w-full"
              />
            </div>

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
                className="border p-2 rounded w-full"
                rows="4"
              ></textarea>
            </div>

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
                className="border p-2 rounded w-full"
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

      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default EventsPage;