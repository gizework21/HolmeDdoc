import React, { useEffect, useState, useRef } from "react";
import customAxios from '../../utils/CustomAxios.js';
import IMg from "../../assets/images/about/user.png"

const StarRating = ({ rating,totalRating, onClick }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`cursor-pointer text-4xl ${index < rating ? "text-yellow-400" : "text-gray-300"}`} // Increased star size
      onClick={onClick}
    >
      ★ 
    </span>
  ));
  return <div className="flex items-end space-x-2">{stars} <span className="font-bold  text-xl">{ totalRating } <span className="text-sm text-gray-400">total ratings</span></span></div>;
};

const Modal = ({ users, onClose, modalRef }) => {
  return (
    <div
      ref={modalRef}
      className="absolute mt-2 w-96 bg-white rounded-lg shadow-lg z-50 p-6 border border-gray-200 transition-all duration-300 ease-in-out"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800 bg-gray-300 p-3 rounded-lg">
        Users who have rated
      </h2>
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-2xl"
        onClick={onClose}
      >
        &times;
      </button>
      {users.length > 0 ? (
        <ul className="max-h-60 overflow-y-auto space-y-4">
          {users.map((user, index) => (
            <li key={index} className="flex items-center space-x-4">
              <img
                src={IMg}
                alt={`${user.patient_first_name} ${user.patient_last_name}`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {user.patient_first_name} {user.patient_last_name}
                </p>
                <p className="text-gray-600 text-sm">{user.comments}</p>
                <p className="text-gray-400 text-xs">{user.created_at}</p>
              </div>
              <span className="text-yellow-500 font-bold">{user.total_rating} ★</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No ratings yet.</p>
      )}
    </div>
  );
};

const About = ({ info }) => {
  const [rating, setRating] = useState(null);
  const [totalRating, setTotalRating] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const token = localStorage.getItem("persist:root");
        const tokenJson = JSON.parse(token);
        const tokenJsonAuth = JSON.parse(tokenJson.auth);
        const remmenberToken = tokenJsonAuth.currentUser.remember_token;

        const response = await fetch(
          `https://telehealth.ikrajindustries.com/patient/doctor/view_rating?doctor_id=${info.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "device-id": "22123456",
              Authorization: "Basic YWRtaW46bXlwY290",
              token: "32113213fsadfsdfsd",
              "access-token": `${remmenberToken}`,
              platform: "web",
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          console.log(data?.data?.result)
          setRating(data?.data.result.total_rating);
          setTotalRating(data?.data.result.total_rating);

          setUsers(data?.data.result.rating); // Set users
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("An error occurred while fetching the rating.");
      }
    };

    fetchRating();
  }, []);

  // Handle click outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <h1 className="text-2xl text-gray-900 font-bold tracking-wide mb-4">
        About {info.doctor_name}
      </h1>

      <p className="text-gray-700 mb-6">
        {info?.doctor_bio} <br />
        <span className="mt-2">{info?.doctor_description}</span>
      </p>

      {/* Display the star rating */}
      {rating !== null && (
        <div className="relative">
          <StarRating rating={Math.round(rating)} totalRating={totalRating.toFixed(1)} onClick={openModal} />
          {isModalOpen && <Modal users={users} onClose={closeModal} modalRef={modalRef} />}
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default About;
