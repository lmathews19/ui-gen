# UI Code Generator

A powerful application that converts UI mockup images into production-ready HTML, CSS, and JavaScript code using OpenAI's GPT-4 Vision model. This tool helps developers quickly transform design mockups into functional code.

## Features

- Upload UI mockup images (PNG, JPG, JPEG)
- Customizable analysis prompts
- Real-time code generation
- Live preview of generated code
- Tabbed interface for HTML, CSS, and JavaScript code
- Responsive Material-UI design
- Secure file handling with automatic cleanup

## Architecture

### Frontend (React)
- Built with React and Material-UI components
- Features a clean, modern interface with:
  - Image upload component with preview
  - Customizable analysis prompt
  - Code preview with syntax highlighting
  - Live preview functionality
  - Responsive design for all screen sizes

### Backend (Node.js/Express)
- RESTful API server handling:
  - File uploads using Multer
  - Image processing and base64 conversion
  - OpenAI API integration
  - CORS support for local development
  - Secure file cleanup after processing

### OpenAI Integration
- Uses GPT-4 Vision model for image analysis
- Processes UI mockups to generate:
  - Semantic HTML structure
  - Styled CSS components
  - Interactive JavaScript functionality
- Handles both UI mockups and non-UI images with appropriate responses

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/lmathews19/ui-gen.git
cd ui-gen
```

2. Install dependencies for both client and server:
```bash
npm run install:all
```

3. Create a `.env` file in the server directory:
```bash
cd server
echo "OPENAI_API_KEY=your_api_key_here" > .env
```

## Configuration

1. Ensure your OpenAI API key is valid and has access to the GPT-4 Vision model
2. The server runs on port 3001 by default (configurable via PORT environment variable)
3. The React development server runs on port 3000

## Running the Application

1. Start the server first:
```bash
cd server
npm run dev
```

2. In a new terminal, start the React development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Click "Choose Image" to upload a UI mockup
2. (Optional) Edit the analysis prompt
3. Click "Analyze" to process the image
4. View the generated code in the tabbed interface
5. Use the "Preview" button to see the live result

## Error Handling

The application provides clear error messages for:
- Missing API key
- Invalid file uploads
- Server connection issues
- OpenAI API errors

## Development

- Client code is in the `src` directory
- Server code is in the `server` directory
- Both use hot-reloading for development
- Concurrent execution of client and server is handled by the start script

## Security Notes

- API keys should never be committed to version control
- Uploaded files are automatically deleted after processing
- CORS is enabled for local development only
- File uploads are restricted to image types

## License

MIT License

Copyright (c) 2025 UI Code Generator

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
