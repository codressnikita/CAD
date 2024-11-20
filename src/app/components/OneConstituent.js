import { useState } from "react";
import ContentViewer from "./ContentViewer";
import ContentCard from "./ContentCard";
import { Globe } from "lucide-react";

const OneConstituent = ({ constituent }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
  };

  console.log({ constituent });

  return (
    <div
      className="flex h-screen"
      style={{
        backgroundImage:
          "radial-gradient(145.05% 100% at 50% 0%, #53904d 0%, white 57.38%, #e3b282 88.16%)",
        transition: "transform 0.3s ease", // Smooth transition for background shift
      }}
    >
      <div className="w-full flex justify-start items-start p-6">
        <div className="bg-white backdrop-blur-lg bg-opacity-30 shadow-lg rounded-2xl p-8 w-full h-full overflow-y-scroll border border-white border-opacity-30">
          <h2 className="text-2xl font-bold">{constituent.name}</h2>
          <p className="mt-2">{constituent.bio}</p>
          <div className="mt-4">
            <h3 className="text-xl font-bold">Province:</h3>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {constituent.province}
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-bold">Available Documents:</h3>
            {constituent.documents && constituent.documents.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {constituent.documents.map((doc, idx) => (
                  <ContentCard
                    key={idx}
                    name={doc.name} // Display the document name
                    type={doc.type} // Document type (e.g., PDF)
                    src={doc.src} // Document source
                    thumbnail={doc.thumbnail} // Thumbnail for the document
                    handleClick={() => handleDocumentClick(doc)}
                  />
                ))}
              </div>
            ) : (
              <p>No documents available</p>
            )}
          </div>
        </div>
      </div>

      {selectedDocument && (
        <ContentViewer
          name={selectedDocument.name}
          type={selectedDocument.type}
          src={selectedDocument.src}
          onClose={() => setSelectedDocument(null)} // Function to close the viewer
        />
      )}
    </div>
  );
};

export default OneConstituent;
