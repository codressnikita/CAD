import fs from "fs/promises";
import path from "path";

// Paths
const __dirname = path.resolve();
const publicFolderPath = __dirname;
const jsonFilePath = path.join(publicFolderPath, "constituents.json");
const documentsBasePath = path.join(publicFolderPath, "documents");

// Main Script
const updateConstituents = async () => {
  const constituents = JSON.parse(await fs.readFile(jsonFilePath, "utf8"));

  const updatedConstituents = await Promise.all(
    constituents.map(async (constituent) => {
      const name = constituent.name;
      const folderPath = path.join(documentsBasePath, name);

      let documents = [];
      try {
        const files = await fs.readdir(folderPath);

        documents = await Promise.all(
          files.map(async (file) => {
            const filePath = path.join(folderPath, file);
            const fileNameWithoutExt = path.basename(file, path.extname(file));
            const ext = path.extname(file).toLowerCase();

            return {
              name: fileNameWithoutExt,
              src: `./documents/${name}/${file}`,
              type: ext === ".pdf" ? "document" : "unknown",
              thumbnail: "", // Set the thumbnail as an empty string
            };
          })
        );
      } catch (err) {
        console.warn(`No folder found for constituent: ${name}`);
      }

      return { ...constituent, documents };
    })
  );

  await fs.writeFile(
    jsonFilePath,
    JSON.stringify(updatedConstituents, null, 4),
    "utf8"
  );
  console.log(
    "constituents.json has been updated with detailed document metadata."
  );
};

updateConstituents().catch((err) => {
  console.error("Error updating constituents.json:", err);
});
