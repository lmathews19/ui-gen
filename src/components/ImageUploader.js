import React, { useState } from 'react';
import { Box, Button, CircularProgress, Paper, Typography, TextField } from '@mui/material';
import { CloudUpload, Search } from '@mui/icons-material';
import axios from 'axios';

const ImageUploader = ({ onCodeGenerated }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState("Analyze the image. Check to see if it contains a UI screen design. if it does, convert this UI mockup into HTML, CSS, and JavaScript code. Provide the code in a structured format with clear separation between HTML, CSS, and JavaScript sections. If it does not contain a UI screen design, return Image description: <description of the image>.");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please upload an image first");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("prompt", prompt);

      const response = await axios.post("http://localhost:3001/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onCodeGenerated(response.data.code);
    } catch (err) {
      setError("Error generating code. Please try again. And, make sure the API server is running and OPEN_API_KEY has been specified.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Upload UI Mockup
        </Typography>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUpload />}
            disabled={loading}
          >
            Choose Image
          </Button>
        </label>
        {selectedImage && (
          <>
            <Box sx={{ mt: 2 }}>
              <img
                src={selectedImage}
                alt="Selected mockup"
                style={{ maxWidth: '100%', maxHeight: 300 }}
              />
            </Box>
            <Box sx={{ mt: 2, textAlign: 'left' }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Analysis Prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Search />}
                onClick={handleAnalyze}
                disabled={loading}
              >
                Analyze
              </Button>
            </Box>
          </>
        )}
        {loading && (
          <Box sx={{ mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ImageUploader; 