const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    {
        url: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?w=800&q=80',
        filename: 'stadium1.jpg'
    },
    {
        url: 'https://images.pexels.com/photos/159358/pexels-photo-159358.jpeg?w=800&q=80',
        filename: 'player1.jpg'
    },
    {
        url: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?w=800&q=80',
        filename: 'stadium2.jpg'
    },
    {
        url: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?w=800&q=80',
        filename: 'player2.jpg'
    }
];

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }

            const filePath = path.join('images', filename);
            const fileStream = fs.createWriteStream(filePath);
            
            response.pipe(fileStream);
            
            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded: ${filename}`);
                resolve();
            });
        }).on('error', reject);
    });
};

// Tüm fotoğrafları indir
Promise.all(images.map(img => downloadImage(img.url, img.filename)))
    .then(() => console.log('Tüm fotoğraflar başarıyla indirildi!'))
    .catch(error => console.error('Hata:', error)); 