"use client";
import React, { useState, useEffect } from "react";
import { Search, FileText, Video, User } from "lucide-react"; // Icons
import constituentsData from "/public/constituents.json"; // Adjust path if necessary

const Constituents = ({ handleOneConstituentClick }) => {
  const [constituents, setConstituents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load the data from the JSON on component mount
  useEffect(() => {
    setConstituents(constituentsData);
  }, []);

  // Handle the search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the list of constituents based on the search term
  const filteredConstituents = constituents.filter((constituent) =>
    constituent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="flex h-screen"
      style={{
        backgroundImage:
          "radial-gradient(145.05% 100% at 50% 0%, #53904d 0%, white 57.38%, #e3b282 88.16%)",
        transition: "transform 0.3s ease", // Smooth transition for background shift
      }}
    >
      {/* Left Column: Geometrical Pattern and Text */}
      <div className="w-full flex justify-start items-start p-6">
        <div className="bg-white backdrop-blur-lg bg-opacity-60 shadow-lg rounded-2xl p-8 w-full h-full overflow-hidden border border-white border-opacity-30">
          {/* Search Bar */}
          <h1 className="text-gray-800 text-xl font-bold leading-snug text-left p-4 pb-6">
            Know your Constituent Assembly Members
          </h1>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search for CA members"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-4 pl-8 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          {/* Scrollable List */}
          <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
            {filteredConstituents.map((constituent) => (
              <div
                key={constituent.id}
                onClick={() => handleOneConstituentClick(constituent)} // Handle click
                className="flex items-center bg-gray-100 p-3 mb-3 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                {/* Name */}
                <h2 className="text-base mr-auto">{constituent.name}</h2>

                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium mr-2">
                  <User className="inline mr-1 w-4 h-4" /> Bio
                </span>

                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm font-medium">
                  <FileText className="inline mr-1 w-4 h-4" />{" "}
                  {constituent.documents.length} Debates
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Constituents;
