// DOM Elementleri
const loadScoresBtn = document.getElementById('loadScoresBtn');
const scoresList = document.getElementById('scoresList');
const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');

// AOS Animasyon Kütüphanesini Başlat
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
});

// Örnek Maç Verileri
const ornekMaclar = [
    {
        id: 1,
        evSahibi: "Real Madrid",
        deplasman: "Barcelona",
        evSkor: 2,
        depSkor: 1,
        durum: "Canlı",
        dakika: "65'",
        lig: "La Liga",
        tarih: "2024-02-20 20:00"
    },
    {
        id: 2,
        evSahibi: "Manchester City",
        deplasman: "Liverpool",
        evSkor: 3,
        depSkor: 3,
        durum: "Devre Arası",
        dakika: "HT",
        lig: "Premier Lig",
        tarih: "2024-02-20 19:45"
    },
    {
        id: 3,
        evSahibi: "Bayern Münih",
        deplasman: "PSG",
        evSkor: 1,
        depSkor: 0,
        durum: "Bitti",
        dakika: "FT",
        lig: "Şampiyonlar Ligi",
        tarih: "2024-02-19 21:00"
    },
    {
        id: 4,
        evSahibi: "Milan",
        deplasman: "Inter",
        evSkor: 0,
        depSkor: 2,
        durum: "Canlı",
        dakika: "78'",
        lig: "Serie A",
        tarih: "2024-02-20 20:45"
    }
];

// Canlı puanları göster
const displayScores = () => {
    scoresList.innerHTML = '';
    loadScoresBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yükleniyor...';
    
    // Simüle edilmiş yükleme gecikmesi
    setTimeout(() => {
        ornekMaclar.forEach(game => {
            const matchCard = document.createElement('div');
            matchCard.className = 'match-card';
            
            const statusClass = game.fixture.status.long === 'Maç Sonu' ? 'match-ended' : 
                              game.fixture.status.long === 'Devre Arası' ? 'match-half-time' : 'match-live';
            
            matchCard.innerHTML = `
                <div class="match-header">
                    <span class="competition">${game.fixture.league.name}</span>
                    <span class="match-date">${formatDate(game.fixture.date)}</span>
                </div>
                <div class="match-teams">
                    <div class="team">${game.teams.home.name}</div>
                    <div class="score ${statusClass}">${game.goals.home} - ${game.goals.away}</div>
                    <div class="team">${game.teams.away.name}</div>
                </div>
                <div class="match-status ${statusClass}">
                    <i class="fas ${getStatusIcon(game.fixture.status.long)}"></i>
                    ${game.fixture.status.long}
                </div>
            `;
            
            scoresList.appendChild(matchCard);
        });
        
        loadScoresBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Yenile';
    }, 1000);
};

// Tarih formatla
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
};

// Durum ikonunu belirle
const getStatusIcon = (status) => {
    if (status === 'Maç Sonu') return 'fa-flag-checkered';
    if (status === 'Devre Arası') return 'fa-clock';
    return 'fa-futbol';
};

// Canlı skorları göster
function canliSkorlariGoster(maclar = ornekMaclar) {
    const skorlarListesi = document.getElementById('canli-skorlar-listesi');
    if (!skorlarListesi) return;

    // Yükleme göstergesini kaldır
    skorlarListesi.innerHTML = '';

    // Maçları göster
    maclar.forEach(mac => {
        const macKutusu = document.createElement('div');
        macKutusu.className = 'mac-kutusu';
        macKutusu.setAttribute('data-aos', 'fade-up');

        // Maç durumuna göre renk sınıfı
        let durumClass = '';
        let durumIcon = '';
        switch(mac.durum) {
            case 'Canlı':
                durumClass = 'mac-canli';
                durumIcon = 'fa-circle';
                break;
            case 'Devre Arası':
                durumClass = 'mac-devre-arasi';
                durumIcon = 'fa-pause-circle';
                break;
            case 'Bitti':
                durumClass = 'mac-bitti';
                durumIcon = 'fa-check-circle';
                break;
        }

        macKutusu.innerHTML = `
            <div class="mac-baslik">
                <span class="lig-adi">
                    <i class="fas fa-trophy"></i>
                    ${mac.lig}
                </span>
                <span class="mac-tarih">
                    <i class="far fa-clock"></i>
                    ${mac.tarih}
                </span>
            </div>
            <div class="mac-detay">
                <div class="takim ev-sahibi">
                    <i class="fas fa-home"></i>
                    ${mac.evSahibi}
                </div>
                <div class="skor ${durumClass}">
                    ${mac.evSkor} - ${mac.depSkor}
                </div>
                <div class="takim deplasman">
                    ${mac.deplasman}
                    <i class="fas fa-plane"></i>
                </div>
            </div>
            <div class="mac-durum">
                <div class="durum ${durumClass}">
                    <i class="fas ${durumIcon}"></i>
                    ${mac.durum}
                </div>
                <div class="dakika">${mac.dakika}</div>
            </div>
        `;

        skorlarListesi.appendChild(macKutusu);
    });
}

// Quiz sonuçlarını kontrol et
function checkQuizAnswers(event) {
    event.preventDefault();
    
    const answers = {
        q1: quizForm.q1.value,
        q2: quizForm.q2.value.trim(),
        q3: quizForm.q3.value.trim().toLowerCase()
    };
    
    let score = 0;
    let total = 3;
    let feedback = [];
    
    // Soru 1 kontrolü
    if (answers.q1 === '32') {
        score++;
        feedback.push('<i class="fas fa-check-circle"></i> Soru 1: Doğru! UEFA Şampiyonlar Ligi 32 takımla oynanır.');
    } else {
        feedback.push('<i class="fas fa-times-circle"></i> Soru 1: Yanlış! UEFA Şampiyonlar Ligi 32 takımla oynanır.');
    }
    
    // Soru 2 kontrolü
    if (answers.q2 === '11') {
        score++;
        feedback.push('<i class="fas fa-check-circle"></i> Soru 2: Doğru! Her takımda 11 oyuncu bulunur.');
    } else {
        feedback.push('<i class="fas fa-times-circle"></i> Soru 2: Yanlış! Her takımda 11 oyuncu bulunur.');
    }
    
    // Soru 3 kontrolü
    if (answers.q3.includes('ronaldo') || answers.q3.includes('cristiano')) {
        score++;
        feedback.push('<i class="fas fa-check-circle"></i> Soru 3: Doğru! Cristiano Ronaldo en çok gol atan futbolcudur.');
    } else {
        feedback.push('<i class="fas fa-times-circle"></i> Soru 3: Yanlış! Cristiano Ronaldo en çok gol atan futbolcudur.');
    }
    
    // Sonuçları göster
    const resultHTML = `
        <div class="quiz-feedback">
            <h3><i class="fas fa-chart-bar"></i> Sonuçlarınız</h3>
            <div class="score-display">
                <div class="score-circle">
                    <span class="score-number">${score}</span>
                    <span class="score-total">/${total}</span>
                </div>
                <div class="score-percentage">${Math.round((score/total) * 100)}%</div>
            </div>
            <div class="feedback-list">
                ${feedback.map(f => `<p>${f}</p>`).join('')}
            </div>
        </div>
    `;
    
    quizResult.innerHTML = resultHTML;
    quizResult.scrollIntoView({ behavior: 'smooth' });
}

// Event Listeners
if (loadScoresBtn) {
    loadScoresBtn.addEventListener('click', displayScores);
}

if (quizForm) {
    quizForm.addEventListener('submit', checkQuizAnswers);
}

// Sayfa yüklendiğinde animasyonları başlat
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.animationDelay = `${index * 0.2}s`;
    });
});

// Futbol topu animasyonu
function futbolTopuAnimasyonu() {
    const canvas = document.getElementById('futbol-topu-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let topX = 0;
    let topY = canvas.height / 2;
    const topYaricap = 20;
    let hiz = 2;
    let yon = 1;

    // Saha renkleri
    const sahaRenk = '#4CAF50'; // Çim rengi
    const cizgiRenk = '#ffffff'; // Beyaz çizgi rengi
    const kaleRenk = '#ffffff'; // Kale rengi

    function sahayiCiz() {
        // Çim zemini
        ctx.fillStyle = sahaRenk;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Saha çizgileri
        ctx.strokeStyle = cizgiRenk;
        ctx.lineWidth = 2;

        // Orta saha çizgisi
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        // Orta saha dairesi
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
        ctx.stroke();

        // Orta nokta
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2);
        ctx.fillStyle = cizgiRenk;
        ctx.fill();

        // Ceza sahaları
        const cezaSahaGenislik = 100;
        const cezaSahaYukseklik = 60;

        // Sol ceza sahası
        ctx.beginPath();
        ctx.rect(0, (canvas.height - cezaSahaYukseklik) / 2, cezaSahaGenislik, cezaSahaYukseklik);
        ctx.stroke();

        // Sağ ceza sahası
        ctx.beginPath();
        ctx.rect(canvas.width - cezaSahaGenislik, (canvas.height - cezaSahaYukseklik) / 2, cezaSahaGenislik, cezaSahaYukseklik);
        ctx.stroke();

        // Kaleler
        const kaleGenislik = 10;
        const kaleYukseklik = 40;

        // Sol kale
        ctx.fillStyle = kaleRenk;
        ctx.fillRect(0, (canvas.height - kaleYukseklik) / 2, kaleGenislik, kaleYukseklik);
        ctx.strokeRect(0, (canvas.height - kaleYukseklik) / 2, kaleGenislik, kaleYukseklik);

        // Sağ kale
        ctx.fillRect(canvas.width - kaleGenislik, (canvas.height - kaleYukseklik) / 2, kaleGenislik, kaleYukseklik);
        ctx.strokeRect(canvas.width - kaleGenislik, (canvas.height - kaleYukseklik) / 2, kaleGenislik, kaleYukseklik);

        // Kale direkleri
        ctx.fillStyle = '#e0e0e0';
        // Sol kale direkleri
        ctx.fillRect(-2, (canvas.height - kaleYukseklik) / 2 - 2, 4, 4);
        ctx.fillRect(-2, (canvas.height + kaleYukseklik) / 2 - 2, 4, 4);
        // Sağ kale direkleri
        ctx.fillRect(canvas.width - 2, (canvas.height - kaleYukseklik) / 2 - 2, 4, 4);
        ctx.fillRect(canvas.width - 2, (canvas.height + kaleYukseklik) / 2 - 2, 4, 4);

        // Çim deseni
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 30) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
    }

    function topuCiz() {
        // Canvas'ı temizle
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sahayı çiz
        sahayiCiz();

        // Top gölgesi
        ctx.beginPath();
        ctx.arc(topX, topY + 5, topYaricap, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fill();

        // Top
        ctx.beginPath();
        ctx.arc(topX, topY, topYaricap, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.fill();

        // Top deseni
        ctx.beginPath();
        ctx.arc(topX, topY, topYaricap - 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();

        // Top hareketi
        topX += hiz * yon;
        
        // Yön değiştirme ve kale kontrolü
        if (topX + topYaricap > canvas.width - 10) { // Sağ kale
            if (topY > (canvas.height - 40) / 2 && topY < (canvas.height + 40) / 2) {
                // Gol!
                topX = canvas.width / 2;
                topY = canvas.height / 2;
                setTimeout(() => {
                    yon = -1;
                }, 1000);
            } else {
                yon = -1;
            }
        } else if (topX - topYaricap < 10) { // Sol kale
            if (topY > (canvas.height - 40) / 2 && topY < (canvas.height + 40) / 2) {
                // Gol!
                topX = canvas.width / 2;
                topY = canvas.height / 2;
                setTimeout(() => {
                    yon = 1;
                }, 1000);
            } else {
                yon = 1;
            }
        }

        // Y ekseni hareketi (hafif zıplama efekti)
        topY += Math.sin(topX / 30) * 2;

        // Üst ve alt sınır kontrolü
        if (topY - topYaricap < 0) {
            topY = topYaricap;
        } else if (topY + topYaricap > canvas.height) {
            topY = canvas.height - topYaricap;
        }

        requestAnimationFrame(topuCiz);
    }

    topuCiz();
}

// Lig Filtreleme
document.querySelectorAll('.league-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Aktif buton sınıfını güncelle
        document.querySelectorAll('.league-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const lig = e.target.dataset.league;
        let filtrelenmisMaclar = ornekMaclar;

        if (lig !== 'all') {
            filtrelenmisMaclar = ornekMaclar.filter(mac => {
                switch(lig) {
                    case 'champions':
                        return mac.lig === 'Şampiyonlar Ligi';
                    case 'premier':
                        return mac.lig === 'Premier Lig';
                    case 'laliga':
                        return mac.lig === 'La Liga';
                    default:
                        return true;
                }
            });
        }

        canliSkorlariGoster(filtrelenmisMaclar);
    });
});

// Galeri Filtreleme
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Aktif buton sınıfını güncelle
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const kategori = e.target.dataset.filter;
        const galeriItems = document.querySelectorAll('.gallery-item');

        galeriItems.forEach(item => {
            if (kategori === 'all' || item.dataset.category === kategori) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // AOS'u başlat
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Canlı skorları göster
    canliSkorlariGoster();
    
    // Futbol topu animasyonunu başlat
    futbolTopuAnimasyonu();
    
    // Puan durumunu göster
    puanDurumuGoster();
    
    // Yenile butonuna tıklandığında
    const refreshBtn = document.getElementById('refreshScores');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.classList.add('rotating');
            setTimeout(() => {
                refreshBtn.classList.remove('rotating');
                canliSkorlariGoster();
            }, 1000);
        });
    }
});

// Süper Lig Puan Durumu (2023-2024 Sezonu - Final)
const superLigPuanDurumu = [
    { sira: 1, takim: "Galatasaray", logo: "images/logos/gs.png", o: 38, g: 33, b: 3, m: 2, a: 92, y: 26, av: 66, p: 102 },
    { sira: 2, takim: "Fenerbahçe", logo: "images/logos/fb.png", o: 38, g: 31, b: 6, m: 1, a: 99, y: 31, av: 68, p: 99 },
    { sira: 3, takim: "Trabzonspor", logo: "images/logos/ts.png", o: 38, g: 19, b: 5, m: 14, a: 65, y: 51, av: 14, p: 62 },
    { sira: 4, takim: "Beşiktaş", logo: "images/logos/bjk.png", o: 38, g: 16, b: 8, m: 14, a: 52, y: 47, av: 5, p: 56 },
    { sira: 5, takim: "Başakşehir", logo: "images/logos/ibfk.png", o: 38, g: 16, b: 8, m: 14, a: 50, y: 45, av: 5, p: 56 },
    { sira: 6, takim: "Kasımpaşa", logo: "images/logos/kasimpasa.png", o: 38, g: 15, b: 8, m: 15, a: 56, y: 61, av: -5, p: 53 },
    { sira: 7, takim: "Adana Demirspor", logo: "images/logos/ads.png", o: 38, g: 15, b: 7, m: 16, a: 63, y: 52, av: 11, p: 52 },
    { sira: 8, takim: "Antalyaspor", logo: "images/logos/ant.png", o: 38, g: 12, b: 12, m: 14, a: 44, y: 48, av: -4, p: 48 },
    { sira: 9, takim: "Konyaspor", logo: "images/logos/konya.png", o: 38, g: 12, b: 12, m: 14, a: 41, y: 47, av: -6, p: 48 },
    { sira: 10, takim: "Alanyaspor", logo: "images/logos/alanya.png", o: 38, g: 11, b: 12, m: 15, a: 44, y: 51, av: -7, p: 45 },
    { sira: 11, takim: "Kayserispor", logo: "images/logos/kayseri.png", o: 38, g: 12, b: 8, m: 18, a: 43, y: 59, av: -16, p: 44 },
    { sira: 12, takim: "Sivasspor", logo: "images/logos/sivas.png", o: 38, g: 11, b: 10, m: 17, a: 46, y: 54, av: -8, p: 43 },
    { sira: 13, takim: "Hatayspor", logo: "images/logos/hatay.png", o: 38, g: 9, b: 14, m: 15, a: 45, y: 52, av: -7, p: 41 },
    { sira: 14, takim: "Ankaragücü", logo: "images/logos/ankaragucu.png", o: 38, g: 8, b: 16, m: 14, a: 46, y: 52, av: -6, p: 40 },
    { sira: 15, takim: "Fatih Karagümrük", logo: "images/logos/karagumruk.png", o: 38, g: 10, b: 10, m: 18, a: 49, y: 63, av: -14, p: 40 },
    { sira: 16, takim: "Gaziantep FK", logo: "images/logos/gaziantep.png", o: 38, g: 9, b: 12, m: 17, a: 46, y: 57, av: -11, p: 39 },
    { sira: 17, takim: "Pendikspor", logo: "images/logos/pendik.png", o: 38, g: 9, b: 10, m: 19, a: 42, y: 73, av: -31, p: 37 },
    { sira: 18, takim: "İstanbulspor", logo: "images/logos/istanbulspor.png", o: 38, g: 4, b: 7, m: 27, a: 27, y: 80, av: -53, p: 19 },
    { sira: 19, takim: "Rizespor", logo: "images/logos/rize.png", o: 38, g: 6, b: 6, m: 26, a: 30, y: 69, av: -39, p: 24 },
    { sira: 20, takim: "Ankaraspor", logo: "images/logos/ankaraspor.png", o: 38, g: 3, b: 6, m: 29, a: 22, y: 84, av: -62, p: 15 }
];

// Puan durumu tablosunu oluştur
function puanDurumuGoster() {
    console.log('puanDurumuGoster fonksiyonu çağrıldı');
    const canvas = document.getElementById('puanDurumuCanvas');
    if (!canvas) {
        console.error('Canvas elementi bulunamadı');
        return;
    }

    // Canvas boyutunu ayarla
    canvas.width = 1200;  // Sabit genişlik
    canvas.height = 1000; // Sabit yükseklik

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Canvas context alınamadı');
        return;
    }

    // Ölçeklendirme faktörleri
    const scale = 1.2; // Sabit ölçek faktörü

    const padding = 40;
    const rowHeight = 45;
    const colWidth = 110;
    const startX = padding;
    const startY = padding + 30;

    // Canvas'ı temizle ve arka planı ayarla
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Başlık
    ctx.fillStyle = '#003366';
    ctx.font = 'bold 32px Poppins';
    ctx.textAlign = 'center';
    ctx.fillText('Süper Lig Puan Durumu', canvas.width / 2, startY - 15);

    // Tablo başlıkları
    const headers = ['Sıra', 'Takım', 'O', 'G', 'B', 'M', 'A', 'Y', 'Av', 'P'];
    ctx.font = 'bold 18px Poppins';
    ctx.fillStyle = '#003366';
    
    headers.forEach((header, index) => {
        let x;
        if (index === 1) { // Takım sütunu için
            ctx.textAlign = 'left';
            x = startX + colWidth + 10;
        } else {
            ctx.textAlign = 'center';
            x = startX + (index * colWidth) + (colWidth / 2);
        }
        ctx.fillText(header, x, startY);
    });

    // Takım verilerini çiz
    ctx.font = '500 16px Poppins'; // Font weight'i 500 yaptım
    superLigPuanDurumu.forEach((takim, index) => {
        const y = startY + ((index + 1) * rowHeight);
        
        // Satır arka planı
        if (takim.sira <= 2) {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
        } else if (takim.sira <= 4) {
            ctx.fillStyle = 'rgba(255, 165, 0, 0.1)';
        } else if (takim.sira >= 17) {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
        } else {
            ctx.fillStyle = '#ffffff';
        }
        ctx.fillRect(startX - 5, y - rowHeight + 5, canvas.width - (padding * 2) + 10, rowHeight - 10);

        // Sıra
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'center';
        ctx.font = '500 16px Poppins';
        ctx.fillText(takim.sira.toString(), startX + (colWidth / 2), y);

        // Takım adı
        ctx.textAlign = 'left';
        ctx.fillStyle = '#2c3e50';
        ctx.font = '600 16px Poppins'; // Takım adları için daha kalın font
        const takimX = startX + colWidth + 10;
        ctx.fillText(takim.takim, takimX, y);

        // Diğer veriler
        ctx.textAlign = 'center';
        ctx.font = '500 16px Poppins';
        const veriler = [takim.o, takim.g, takim.b, takim.m, takim.a, takim.y, takim.av, takim.p];
        veriler.forEach((veri, i) => {
            const x = startX + ((i + 2) * colWidth);
            // Puan sütunu için özel stil
            if (i === veriler.length - 1) {
                ctx.font = '600 16px Poppins';
                ctx.fillStyle = '#003366';
            } else {
                ctx.font = '500 16px Poppins';
                ctx.fillStyle = '#2c3e50';
            }
            ctx.fillText(veri.toString(), x + (colWidth / 2), y);
        });
    });

    // Çizgiler
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    // Yatay çizgiler
    for (let i = 0; i <= superLigPuanDurumu.length + 1; i++) {
        const y = startY + (i * rowHeight);
        ctx.beginPath();
        ctx.moveTo(startX - 5, y);
        ctx.lineTo(canvas.width - padding + 5, y);
        ctx.stroke();
    }

    // Dikey çizgiler
    for (let i = 0; i <= headers.length; i++) {
        const x = startX + (i * colWidth);
        ctx.beginPath();
        ctx.moveTo(x, startY - 5);
        ctx.lineTo(x, startY + ((superLigPuanDurumu.length + 1) * rowHeight));
        ctx.stroke();
    }

    // Açıklama
    const aciklamaY = startY + ((superLigPuanDurumu.length + 2) * rowHeight);
    ctx.font = '500 15px Poppins';
    ctx.textAlign = 'left';

    // Şampiyonlar Ligi
    ctx.fillStyle = 'rgba(0, 255, 0, 0.15)';
    ctx.fillRect(startX, aciklamaY, 15, 15);
    ctx.fillStyle = '#2c3e50';
    ctx.fillText('Şampiyonlar Ligi', startX + 25, aciklamaY + 12);

    // Avrupa Ligi
    ctx.fillStyle = 'rgba(255, 165, 0, 0.15)';
    ctx.fillRect(startX + 150, aciklamaY, 15, 15);
    ctx.fillText('Avrupa Ligi', startX + 175, aciklamaY + 12);

    // Düşme Hattı
    ctx.fillStyle = 'rgba(255, 0, 0, 0.15)';
    ctx.fillRect(startX + 300, aciklamaY, 15, 15);
    ctx.fillText('Düşme Hattı', startX + 325, aciklamaY + 12);
}

// Pencere boyutu değiştiğinde yeniden çizme işlemini kaldırıyoruz
// çünkü artık scroll ile görüntülenecek
// window.addEventListener('resize', () => {
//     puanDurumuGoster();
// }); 