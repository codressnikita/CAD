import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

// __dirname workaround for ES modules
const __dirname = path.resolve();

// Paths to the public folder and document/image directories
const publicFolder = path.join(__dirname, "public");
const documentsFolder = path.join(publicFolder, "documents");
const imagesFolder = path.join(publicFolder, "images");

// Sleep function to wait for a specific amount of time (in milliseconds)
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to generate a thumbnail image from a PDF
async function generateThumbnail(pdfPath, thumbnailPath) {
  const browser = await puppeteer.launch({
    headless: true, // Run in headless mode
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // Load the PDF file into the browser
  await page.goto(`file://${pdfPath}`, { waitUntil: "networkidle0" });

  // Apply a delay to ensure the page is fully loaded before taking a screenshot
  await sleep(1000); // Sleep for 1 second (you can adjust this duration)

  // Set the viewport size to fit a typical PDF page (adjust height for better fit)
  await page.setViewport({ width: 500, height: 800 });

  // Hide the sidebar (for PDF viewer) and enter fullscreen mode
  await page.evaluate(() => {
    // Hide the sidebar by clicking on the panel toggle button
    const sidebarButton = document.querySelector(".pdfViewer");
    if (sidebarButton) sidebarButton.style.display = "none";

    // Maximize the PDF page to ensure we capture only the page content
    const pdfPage = document.querySelector(".pdfViewer");
    if (pdfPage) pdfPage.style.height = "100vh";
  });

  // Wait a little more for the PDF viewer to adjust
  await sleep(1500); // Sleep for half a second

  // Take a screenshot of the first page
  await page.screenshot({
    path: thumbnailPath,
    clip: { x: 0, y: 60, width: 500, height: 300 }, // Adjust this as needed
  });

  await browser.close();
}

// Read constituents.json and process the PDF files
async function processConstituentsJson() {
  const constituentsPath = path.join(publicFolder, "constituents.json");

  // Check if the constituents.json file exists
  if (!fs.existsSync(constituentsPath)) {
    console.error("constituents.json file not found!");
    return;
  }

  // Read and parse the constituents.json file
  const constituentsData = JSON.parse(fs.readFileSync(constituentsPath));

  // Loop through each constituent and their documents
  for (const constituent of constituentsData) {
    for (const doc of constituent.documents) {
      if (doc.src && doc.src.endsWith(".pdf")) {
        const pdfFilePath = path.join(publicFolder, doc.src.replace("./", ""));
        const thumbnailPath = path.join(imagesFolder, `${doc.name}.jpg`);

        // Check if the PDF file exists
        if (fs.existsSync(pdfFilePath)) {
          console.log(`Generating thumbnail for ${doc.name}...`);
          await generateThumbnail(pdfFilePath, thumbnailPath);
          console.log(`Thumbnail saved as ${thumbnailPath}`);

          // Update the JSON object with the thumbnail URL
          doc.thumbnail = `./images/${doc.name}.jpg`;
        } else {
          console.warn(`PDF file ${pdfFilePath} not found!`);
        }
      }
    }
  }

  // After processing all documents, update the constituents.json file
  fs.writeFileSync(constituentsPath, JSON.stringify(constituentsData, null, 2));
  console.log("constituents.json updated with thumbnail URLs.");
}

// Run the script
processConstituentsJson().catch((err) => console.error(err));
