const fs = require("fs");
const path = require("path");

// Define the directory path for your audio files
const audioFolderPath = path.join(__dirname, "archive");

// Get a list of all files in the folder
fs.readdir(audioFolderPath, (err, files) => {
  if (err) {
    console.error("Error reading the directory:", err);
    return;
  }

  // Filter out only audio files (you can adjust the file extension to match your audio formats)
  const audioFiles = files.filter(
    (file) =>
      file.endsWith(".mp3") || file.endsWith(".wav") || file.endsWith(".ogg")
  );

  // Prepare an array to hold the file objects
  const audioObjects = audioFiles.map((file) => {
    const name = file.replace(/\.[^/.]+$/, ""); // Remove the extension from the filename

    // Return the object matching the desired schema
    return {
      name: name,
      src: path.join(audioFolderPath, file),
      type: "audio", // Set type to "audio"
      thumbnail: "", // Set thumbnail to an empty string
    };
  });

  // Create the JSON file with the array of objects
  const jsonFilePath = path.join(__dirname, "archiveFiles.json");
  fs.writeFile(jsonFilePath, JSON.stringify(audioObjects, null, 2), (err) => {
    if (err) {
      console.error("Error writing the JSON file:", err);
    } else {
      console.log("JSON file has been saved to", jsonFilePath);
    }
  });
});
