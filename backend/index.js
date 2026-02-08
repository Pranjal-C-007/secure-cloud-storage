const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors()); // Let frontend talk to backend
app.use(express.json());

// Folder for uploaded files (create 'uploads' in backend folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'uploads/'); },
  filename: (req, file, cb) => { cb(null, Date.now() + '-' + file.originalname); }
});

const upload = multer({ storage: storage });

// Upload route
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) { return res.status(400).json({ message: 'No file' }); }
  res.json({ message: 'Uploaded!', filename: req.file.filename });
});

// Serve files (optional for testing)
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server on port ${PORT}`); });