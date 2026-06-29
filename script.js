// Pastikan semua elemen HTML sudah selesai di-load sebelum JS berjalan
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LOGIKA MODAL LOGIN NEON
    // ==========================================
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const formLogin = document.getElementById('formLogin');

    // Buka Modal Login
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }

    // Tutup Modal lewat tombol silang (X)
    if (closeModal && loginModal) {
        closeModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    }

    // Tutup modal jika user klik di luar area kotak login
    window.addEventListener('click', (e) => {
        if (loginModal && e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Handle Submit Form Login
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('🔥 GOKIL! Login Berhasil di saguqt.id 🔥');
            if (loginModal) loginModal.style.display = 'none';
            if (loginBtn) loginBtn.innerText = '⚡ AKUN SAYA';
        });
    }
});

// ==========================================
// 2. LOGIKA PROSES TOP UP (Global Functions)
// ==========================================
let selectedProduct = "";
let selectedPrice = "";

function selectNominal(element, item, price) {
    // Hapus kelas 'active' dari semua item nominal biar gak double select
    const items = document.querySelectorAll('.nominal-item');
    items.forEach(i => i.classList.remove('active'));
    
    // Tambahkan kelas 'active' ke item yang diklik saat ini
    element.classList.add('active');
    
    // Simpan data produk ke variabel global
    selectedProduct = item;
    selectedPrice = price;
}

function processOrder() {
    const userId = document.getElementById('userId');
    const zoneId = document.getElementById('zoneId');

    // Validasi Input ID Player
    if (!userId || !zoneId || userId.value.trim() === "" || zoneId.value.trim() === "") {
        alert('❌ Eitss! Masukkan User ID dan Zone ID lu dulu, Bang!');
        return;
    }

    // Validasi Pilihan Produk
    if (!selectedProduct || !selectedPrice) {
        alert('❌ Waduh! Pilih nominal Diamond yang mau di-topup dulu lah!');
        return;
    }

    // Tampilkan struk konfirmasi pesanan bertema gahar
    alert(
        `⚡ KONFIRMASI TOP UP SAGUQT.ID ⚡\n\n` +
        `👾 ID Game : ${userId.value} (${zoneId.value})\n` +
        `💎 Produk  : ${selectedProduct}\n` +
        `💵 Harga   : ${selectedPrice}\n\n` +
        `Gas lanjutt! Pesanan lu lagi diproses sistem!`
    );
}

// ==========================================
// 3. DETEKSI GAME OTOMATIS DI HALAMAN TOPUP
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameType = urlParams.get('game');

    const gameTitle = document.querySelector('.left-column h2');
    const gameDesc = document.querySelector('.left-column p');
    const gameImg = document.querySelector('.left-column img');
    const nominalContainer = document.querySelector('.grid-nominal');

    if (!gameTitle || !gameImg || !nominalContainer) return;

    // Database konten game gahar tema gelap saguqt.id
    const gameData = {
        mlbb: {
            title: "Mobile Legends: Bang Bang",
            desc: "Top up Diamond MLBB resmi, murah, dan instan langsung masuk ke akun Anda. Open 24 Jam.",
            img: "https://via.placeholder.com/300x180?text=Mobile+Legends",
            nominal: `
                <div class="nominal-item" onclick="selectNominal(this, '5 Diamond MLBB', 'Rp 1.500')"><strong>5 Diamonds</strong><br><small>Rp 1.500</small></div>
                <div class="nominal-item" onclick="selectNominal(this, '50 Diamond MLBB', 'Rp 14.000')"><strong>50 Diamonds</strong><br><small>Rp 14.000</small></div>
                <div class="nominal-item" onclick="selectNominal(this, '150 Diamond MLBB', 'Rp 40.000')"><strong>150 Diamonds</strong><br><small>Rp 40.000</small></div>
            `
        },
        mcgg: {
            title: "Magic Chess Go Go!",
            desc: "Top up Koin / Voucher Magic Chess Go Go termurah dan legal hanya di saguqt.id.",
            img: "https://via.placeholder.com/300x180?text=Magic+Chess+Go+Go",
            nominal: `
                <div class="nominal-item" onclick="selectNominal(this, '10 Voucher MCGG', 'Rp 3.000')"><strong>10 Vouchers</strong><br><small>Rp 3.000</small></div>
                <div class="nominal-item" onclick="selectNominal(this, '50 Voucher MCGG', 'Rp 15.000')"><strong>50 Vouchers</strong><br><small>Rp 15.000</small></div>
                <div class="nominal-item" onclick="selectNominal(this, '100 Voucher MCGG', 'Rp 29.000')"><strong>100 Vouchers</strong><br><small>Rp 29.000</small></div>
            `
        },
        ff: {
            title: "Free Fire Max",
            desc: "Top up Diamond Free Fire Instan murah via ID. Masukkan ID, pilih nominal, langsung masuk!",
            img: "https://via.placeholder.com/300x180?text=Free+Fire",
            nominal: `
                <div class="nominal-item" onclick="selectNominal(this, '12 Diamond FF', 'Rp 2.000')"><strong>12 Diamonds</strong><br><small>Rp 2.000</small></div>
                <div class="nominal-item" onclick="selectNominal(this, '50 Diamond FF', 'Rp 8.000')"><strong>50 Diamonds</strong><br><small>Rp 8.000</small></div>
                <div class="nominal-item" onclick="selectNominal(this, '140 Diamond FF', 'Rp 20.000')"><strong>140 Diamonds</strong><br><small>Rp 20.000</small></div>
            `
        },
        valorant: {
            title: "Valorant Points",
            desc: "Top up Valorant Points (VP) resmi Riot Games. Masukkan Riot ID Anda, pilih nominal, poin langsung masuk.",
            img: "https://via.placeholder.com/300x180?text=Valorant",
            nominal: `
                <div class="nominal-item" onclick="selectNominal(this, '125 VP', 'Rp 15.000')"><strong>125 VP</strong><br><small>Rp 15.000</small></div>
                <div class="nominal-item" onclick="selectNominal(this, '380 VP', 'Rp 45.000')"><strong>380 VP</strong><br><small>Rp 45.000</small></div>
                <div class="nominal-item" onclick="selectNominal(this, '625 VP', 'Rp 75.000')"><strong>625 VP</strong><br><small>Rp 75.000</small></div>
            `
        }
    };

    if (gameType && gameData[gameType]) {
        gameTitle.innerText = gameData[gameType].title;
        gameDesc.innerText = gameData[gameType].desc;
        gameImg.src = gameData[gameType].img;
        nominalContainer.innerHTML = gameData[gameType].nominal;
    }
});

// ==========================================
// 4. LOGIKA PROSES ORDER JOKI
// ==========================================
function processJokiOrder() {
    const jokiEmail = document.getElementById('jokiEmail')?.value.trim();
    const jokiPassword = document.getElementById('jokiPassword')?.value.trim();
    const jokiLoginVia = document.getElementById('jokiLoginVia')?.value.trim();

    // Validasi data login joki
    if (!jokiEmail || !jokiPassword || !jokiLoginVia) {
        alert('❌ Data Kurang! Mohon isi data akun login joki dengan lengkap demi kelancaran proses joki, Bang!');
        return;
    }

    // Validasi apakah paket rank joki sudah dipilih (menggunakan variabel global selectedProduct dari fungsi selectNominal sebelumnya)
    if (!selectedProduct || !selectedPrice) {
        alert('❌ Pilih dulu paket target Rank Magic Chess yang mau lu tuju, Bang!');
        return;
    }

    // Tampilkan invoice ringkasan joki gahar
    alert(
        `⚡ INVOICE JOKI MAGIC CHESS SAGUQT.ID ⚡\n\n` +
        `🎮 Login Via : ${jokiLoginVia}\n` +
        `📧 User/No HP: ${jokiEmail}\n` +
        `🏆 Paket     : ${selectedProduct}\n` +
        `💵 Total     : ${selectedPrice}\n\n` +
        `Siap! Akun joki lu akan segera diproses oleh pro player kami. Jangan di-login selama proses joki berlangsung!`
    );
}

// ==========================================
// 5. LOGIKA PROSES JUAL BELI AKUN
// ==========================================
function buyAccount(accountCode, price) {
    // Rangkuman checkout transaksi pembelian akun
    alert(
        `🛒 CHECKOUT AKUN SAGUQT.ID 🛒\n\n` +
        `📦 Kode Produk : ${accountCode}\n` +
        `💵 Total Harga : ${price}\n\n` +
        `Pesanan telah dicatat! Admin saguqt.id akan menghubungi Anda lewat sistem untuk proses pemindahan data/serah terima akun aman. Terima kasih!`
    );
}

// ==========================================
// 6. LOGIKA SUBMIT HALAMAN KONTAK
// ==========================================
const formKontak = document.getElementById('formKontak');
if (formKontak) {
    formKontak.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nama = document.getElementById('contactName').value;
        const kontak = document.getElementById('contactHub').value;
        const pesan = document.getElementById('contactMessage').value;

        alert(
            `🔥 PESAN TERKIRIM, BANG! 🔥\n\n` +
            `Halo ${nama}, pesan lu sudah masuk ke database saguqt.id. Admin kami bakal segera ngehubungin lu ke (${kontak}).\n\n` +
            `Pantau terus ya!`
        );

        // Reset form setelah dikirim
        formKontak.reset();
    });
}