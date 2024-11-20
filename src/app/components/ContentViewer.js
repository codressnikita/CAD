import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Adjust path if necessary
import { useScreensaverContext } from "../ScreensaverContext"; // Adjust path if necessary
import { ChevronsLeft } from "lucide-react";

const ContentViewer = ({ name, type, src, onClose }) => {
  const { setScreensaverDisabled } = useScreensaverContext();

  useEffect(() => {
    // Disable screensaver when component mounts
    setScreensaverDisabled(true);

    // Clean up on component unmount: re-enable screensaver and revoke object URL
    return () => {
      setScreensaverDisabled(false);
    };
  }, [src, setScreensaverDisabled]);

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-bold p-4 h-[50px]">{name}</h2>
        <div
          className="flex-grow overflow-hidden flex justify-center items-center" // Apply flexbox centering
          style={{ maxHeight: "calc(100vh - 50px)" }}
        >
          {type === "document" ? (
            <iframe src={src} className="w-full h-full" title={name} />
          ) : type === "image" ? (
            <img
              src={src}
              alt={name}
              className="w-full h-auto object-contain"
            />
          ) : type === "audio" ? (
            <audio controls className="w-full max-w-lg" autoPlay>
              {" "}
              {/* Center audio and limit width */}
              <source src={src} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          ) : type === "video" ? (
            <video controls className="w-full" autoPlay>
              <source src={src} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          ) : (
            <p>Unsupported file type</p>
          )}
        </div>
      </div>
      <button
        onClick={onClose}
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
    </Modal>
  );
};

export default ContentViewer;
