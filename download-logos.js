const https = require('https');
const fs = require('fs');
const path = require('path');

// Logos klasörünü oluştur
const logosDir = path.join(__dirname, 'images', 'logos');
if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true });
}

// Takım logoları
const logos = [
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Galatasaray_Sports_Club_Logo.png/200px-Galatasaray_Sports_Club_Logo.png',
        filename: 'gs.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Fenerbah%C3%A7e_SK.png/200px-Fenerbah%C3%A7e_SK.png',
        filename: 'fb.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Trabzonspor_logo.png/200px-Trabzonspor_logo.png',
        filename: 'ts.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Be%C5%9Fikta%C5%9F_JK.png/200px-Be%C5%9Fikta%C5%9F_JK.png',
        filename: 'bjk.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Istanbul_Basaksehir_FK.png/200px-Istanbul_Basaksehir_FK.png',
        filename: 'ibfk.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Kasimpasa_SK.png/200px-Kasimpasa_SK.png',
        filename: 'kasimpasa.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Adana_Demirspor_logo.png/200px-Adana_Demirspor_logo.png',
        filename: 'ads.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Antalyaspor_logo.png/200px-Antalyaspor_logo.png',
        filename: 'ant.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Konyaspor_logo.png/200px-Konyaspor_logo.png',
        filename: 'konya.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Alanyaspor_logo.png/200px-Alanyaspor_logo.png',
        filename: 'alanya.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Kayserispor_logo.png/200px-Kayserispor_logo.png',
        filename: 'kayseri.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Sivasspor_logo.png/200px-Sivasspor_logo.png',
        filename: 'sivas.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Hatayspor_logo.png/200px-Hatayspor_logo.png',
        filename: 'hatay.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Ankaragucu_logo.png/200px-Ankaragucu_logo.png',
        filename: 'ankaragucu.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fatih_Karagumruk_SK.png/200px-Fatih_Karagumruk_SK.png',
        filename: 'karagumruk.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Gaziantep_FK.png/200px-Gaziantep_FK.png',
        filename: 'gaziantep.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Pendikspor_logo.png/200px-Pendikspor_logo.png',
        filename: 'pendik.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Istanbulspor_logo.png/200px-Istanbulspor_logo.png',
        filename: 'istanbulspor.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Rizespor_logo.png/200px-Rizespor_logo.png',
        filename: 'rize.png'
    },
    {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Ankaraspor_logo.png/200px-Ankaraspor_logo.png',
        filename: 'ankaraspor.png'
    }
];

// Varsayılan logo
const defaultLogo = {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Football_icon.png/200px-Football_icon.png',
    filename: 'default.png'
};

// Logo indirme fonksiyonu
function downloadLogo(url, filename) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(logosDir, filename);
        const file = fs.createWriteStream(filePath);

        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Logo indirilemedi: ${response.statusCode}`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`${filename} başarıyla indirildi`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filePath, () => {});
            reject(err);
        });
    });
}

// Tüm logoları indir
async function downloadAllLogos() {
    try {
        // Önce varsayılan logoyu indir
        await downloadLogo(defaultLogo.url, defaultLogo.filename);
        
        // Sonra diğer logoları indir
        for (const logo of logos) {
            try {
                await downloadLogo(logo.url, logo.filename);
            } catch (err) {
                console.error(`${logo.filename} indirilemedi:`, err.message);
            }
        }
        console.log('Tüm logolar indirildi!');
    } catch (err) {
        console.error('Logo indirme hatası:', err);
    }
}

// Scripti çalıştır
downloadAllLogos(); 