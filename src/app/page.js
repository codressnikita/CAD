"use client";
import { useState } from "react";
import Constituents from "./components/Constituents";
import OneConstituent from "./components/OneConstituent";
import Archive from "./components/Archive";
import Landing from "./components/Landing";
import { ChevronsLeft } from "lucide-react";

export default function Page() {
  const [showConstituents, setShowConstituents] = useState(false); // Initialize with true
  const [showArchive, setShowArchive] = useState(false);
  const [selectedConstituent, setSelectedConstituent] = useState(null);

  const handleArchiveClick = () => {
    setShowArchive(true);
    setShowConstituents(false);
  };
  const handleConstituentsClick = () => {
    setShowConstituents(true);
    setShowArchive(false);
  };

  // Function to handle constituent click
  const handleOneConstituentClick = (constituent) => {
    setSelectedConstituent(constituent); // Set selected constituent
  };

  const backToConstituents = () => {
    setSelectedConstituent(null);
  };

  const backToHome = () => {
    setShowConstituents(false);
    setShowArchive(false);
    setSelectedConstituent(null);
  };

  let backFunctionality = () => {};

  if (selectedConstituent) {
    backFunctionality = backToConstituents;
  } else if (showConstituents || showArchive) {
    backFunctionality = backToHome;
  } else {
    backFunctionality = () => {};
  }

  return (
    <div className="flex flex-col h-screen">
      <div
        className="flex-grow overflow-hidden pb-12"
        style={{ paddingBottom: "50px" }}
      >
        {!showArchive && !showConstituents && (
          <Landing
            handleArchiveClick={handleArchiveClick}
            handleConstituentsClick={handleConstituentsClick}
          />
        )}
        {showConstituents && !selectedConstituent && (
          <Constituents handleOneConstituentClick={handleOneConstituentClick} />
        )}
        {showConstituents && selectedConstituent && (
          <OneConstituent constituent={selectedConstituent} />
        )}
        {showArchive && <Archive />}
      </div>
      {(showArchive || showConstituents) && (
        <button
          onClick={backFunctionality}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 text-white rounded-full w-32 h-32 flex items-center justify-center hover:bg-black/70 focus:outline-none focus:ring focus:ring-white"
          style={{
            borderTopLeftRadius: "50%",
            borderBottomLeftRadius: "50%",
            width: "8vh",
            height: "16vh",
            left: "0px", // Ensures the circular part sticks out
          }}
        >
          <ChevronsLeft className="w-10 h-10 transform -translate-x-2" />
        </button>
      )}
    </div>
  );
}
