"use client";
import { useState, useEffect } from "react";
import ContentCard from "./ContentCard"; // Replace DocumentCard with ContentCard
import ContentViewer from "./ContentViewer";
import archivesData from "/public/archiveFiles.json";

const Archive = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Archive</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {archivesData.map((file) => (
          <ContentCard
            key={file.name}
            name={file.name}
            type={file.type}
            src={file.src}
            handleClick={() => setSelectedFile(file)}
          />
        ))}
      </div>

      {/* Display the ContentViewer modal if a document is selected */}
      {selectedFile && (
        <ContentViewer
          name={selectedFile.name}
          type={selectedFile.type}
          src={selectedFile.src}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
};

export default Archive;
