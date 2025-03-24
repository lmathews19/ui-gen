import React, { useState } from 'react';
import { Container, Typography, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ImageUploader from './components/ImageUploader';
import CodePreview from './components/CodePreview';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [generatedCode, setGeneratedCode] = useState('');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h3" component="h1" align="center" sx={{ my: 4 }}>
          UI Mockup to Code Generator
        </Typography>
        <ImageUploader onCodeGenerated={setGeneratedCode} />
        {generatedCode && <CodePreview generatedCode={generatedCode} />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
