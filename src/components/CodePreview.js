import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  TextField,
} from '@mui/material';
import { Preview } from '@mui/icons-material';

const CodePreview = ({ generatedCode }) => {
  const [tabValue, setTabValue] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePreview = () => {
    // Extract HTML, CSS, and JS from the generated code
    const htmlMatch = generatedCode.match(/```html\n([\s\S]*?)```/);
    const cssMatch = generatedCode.match(/```css\n([\s\S]*?)```/);
    const jsMatch = generatedCode.match(/```javascript\n([\s\S]*?)```/);

    const html = htmlMatch ? htmlMatch[1] : '';
    const css = cssMatch ? cssMatch[1] : '';
    const js = jsMatch ? jsMatch[1] : '';

    // Create a complete HTML document
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;

    setPreviewContent(fullHtml);
    setPreviewOpen(true);
  };

  const renderCodeSection = (code, language) => {
    return (
      <TextField
        fullWidth
        multiline
        rows={10}
        value={code}
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        sx={{ fontFamily: 'monospace' }}
      />
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Generated Code</Typography>
        <Button
          variant="contained"
          startIcon={<Preview />}
          onClick={handlePreview}
        >
          Preview
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="HTML" />
        <Tab label="CSS" />
        <Tab label="JavaScript" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && renderCodeSection(
          generatedCode.match(/```html\n([\s\S]*?)```/)?.[1] || '',
          'html'
        )}
        {tabValue === 1 && renderCodeSection(
          generatedCode.match(/```css\n([\s\S]*?)```/)?.[1] || '',
          'css'
        )}
        {tabValue === 2 && renderCodeSection(
          generatedCode.match(/```javascript\n([\s\S]*?)```/)?.[1] || '',
          'javascript'
        )}
        {tabValue === 0 && !generatedCode.match(/```html\n([\s\S]*?)```/)?.[1] && renderCodeSection(
          "I could not recognize the UI mockup in the image. Here is the description of the image: " + generatedCode.match(/Image description: ([\s\S]*)/)?.[1],
          'description'
        )}
      </Box>

      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Preview</DialogTitle>
        <DialogContent>
          <iframe
            srcDoc={previewContent}
            style={{
              width: '100%',
              height: '70vh',
              border: 'none',
            }}
            title="Preview"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CodePreview; 