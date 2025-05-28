import React from 'react';

function Urun({ isim, fiyat }) {
  return (
    <div>
      <h3>{isim}</h3>
      <p>Fiyat: {fiyat}</p>
    </div>
  );
}

export default Urun; 