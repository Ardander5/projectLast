import React, { useState } from 'react';
import './App.css';
import Selam from './Selam';
import Urun from './Urun';
import NotEkle from './NotEkle';
import OlayOrnegi from './OlayOrnegi';

function App() {
  const [sayac, setSayac] = useState(0);
  const kullanicilar = ['Veli', 'Zeynep'];

  const arttir = () => {
    setSayac(sayac + 1);
  };

  return (
    <div className="App">
      <h1>Ana Sayfa</h1>

      <h2>Selam</h2>
      <Selam isim="Ali" />
      <Selam isim="Ayşe" />
      {kullanicilar.map((kullanici) => (
        <Selam key={kullanici} isim={kullanici} />
      ))}

      <h2>Ürün</h2>
      <Urun isim="Kalem" fiyat="10 TL" />
      <Urun isim="Defter" fiyat="20 TL" />

      <h2>Sayaç</h2>
      <p>Sayaç: {sayac}</p>
      <button onClick={arttir}>Arttır</button>

      <h2>Not Ekleme</h2>
      <NotEkle />

      <h2>Olay Yönetimi</h2>
      <OlayOrnegi />
    </div>
  );
}

export default App; 