// src/App.jsx
import { useState } from 'react'
import { Container, Paper, TextField, Button, Typography, Link } from '@mui/material'
import axios from 'axios'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/api/urls', { url })
      setShortUrl(`http://localhost:8080/${response.data.shortCode}`)
      setError('')
    } catch (err) {
      setError('Error creating short URL')
      console.error(err)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          URL Shortener
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            margin="normal"
            error={!!error}
            helperText={error}
          />
          <Button 
            variant="contained" 
            type="submit" 
            sx={{ mt: 2 }}
            fullWidth
          >
            Shorten URL
          </Button>
        </form>
        {shortUrl && (
          <Paper sx={{ p: 2, mt: 2, bgcolor: 'grey.100' }}>
            <Typography>Your shortened URL:</Typography>
            <Link href={shortUrl} target="_blank">
              {shortUrl}
            </Link>
          </Paper>
        )}
      </Paper>
    </Container>
  )
}

export default App

// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
)