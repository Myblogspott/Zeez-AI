const express = require('express');
const cors = require('cors');  // Import the CORS package
const multer = require('multer');
const vision = require('@google-cloud/vision');
const path = require('path');
const fs = require('fs');

const app = express();
const client = new vision.ImageAnnotatorClient();

// Enable CORS for all routes
app.use(cors());
process.env.GOOGLE_APPLICATION_CREDENTIALS = '/Users/sairaghavendra/Desktop/Frontend try2/frontend_zeez/quizifyr-43e46b2c9927.json';
// Set up multer for handling image uploads
const upload = multer({ dest: 'uploads/' });

app.post('/api/extract-text', upload.single('image'), async (req, res) => {
  const imageFilePath = path.join(__dirname, req.file.path);

  try {
    const [result] = await client.textDetection(imageFilePath);
    const texts = result.textAnnotations;

    if (!texts.length) {
      return res.json({ text: 'No text detected' });
    }

    res.json({ text: texts[0].description });
  } catch (error) {
    console.error('Error extracting text:', error);
    res.status(500).json({ error: 'Error identifying text' });
  } finally {
    fs.unlinkSync(imageFilePath); // Delete the uploaded file after processing
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
