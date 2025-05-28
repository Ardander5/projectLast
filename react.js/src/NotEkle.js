import React, { useState } from 'react';

function NotEkle() {
  const [girdi, setGirdi] = useState('');
  const [notlar, setNotlar] = useState([]);

  const ekle = () => {
    if (girdi.trim() !== '') {
      setNotlar([...notlar, girdi]);
      setGirdi('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={girdi}
        onChange={(e) => setGirdi(e.target.value)}
        placeholder="Not girin"
      />
      <button onClick={ekle}>Ekle</button>
      <ul>
        {notlar.map((not, index) => (
          <li key={index}>{not}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotEkle; 