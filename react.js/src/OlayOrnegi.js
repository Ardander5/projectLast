import React from 'react';

function OlayOrnegi() {
  const handleClick = () => {
    alert('Butona Tıklandı!');
  };

  return (
    <div>
      <button onClick={handleClick}>Tıkla</button>
    </div>
  );
}

export default OlayOrnegi; 