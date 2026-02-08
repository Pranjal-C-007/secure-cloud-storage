import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFile = (e) => { setFile(e.target.files[0]); };

  const uploadFile = async () => {
    if (!file) { setMessage('Pick a file!'); return; }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setMessage(res.data.message);
    } catch (err) { setMessage('Error: ' + err.message); }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Upload Test</h1>
      <input type="file" onChange={handleFile} className="my-2" />
      <button onClick={uploadFile} className="bg-blue-500 text-white p-2">Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default App;