const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'Invalid-key. Set your key in .env file'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the image file and convert to base64
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString('base64');

    // Get the custom prompt or use the default one
    const prompt = req.body.prompt || "Analyze the image. Check to see if it contains a UI screen design. if it does, convert this UI mockup into HTML, CSS, and JavaScript code. Provide the code in a structured format with clear separation between HTML, CSS, and JavaScript sections. If it does not contain a UI screen design, return Image description: <description of the image>.";

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${req.file.mimetype};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 4000
    });

    const generatedCode = response.choices[0].message.content;

    // Clean up the uploaded file
    fs.unlinkSync(req.file.path);

    res.json({ code: generatedCode });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error processing the image' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 