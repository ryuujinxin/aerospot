// State Management
let spotList = JSON.parse(localStorage.getItem('aerospot_data')) || [];
let currentCategory = 'all';
let currentPrivacy = 'all'; // 'all', 'public', 'private'
let inputMode = 'file'; // 'file' or 'url'
let tempImageBase64 = '';

// DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    const today = new Date().toISOString().split('T')[0];
    const spotDateEl = document.getElementById('spotDate');
    if(spotDateEl) spotDateEl.value = today;
});

// Switch Input Mode (File vs URL)
function switchInputMode(mode) {
    inputMode = mode;
    const fileContainer = document.getElementById('fileInputContainer');
    const urlContainer = document.getElementById('urlInputContainer');
    const tabFileBtn = document.getElementById('tabFileBtn');
    const tabUrlBtn = document.getElementById('tabUrlBtn');

    if (mode === 'file') {
        fileContainer.classList.remove('hidden');
        urlContainer.classList.add('hidden');
        tabFileBtn.className = "py-2 px-3 text-xs font-semibold rounded-xl bg-white text-aviation-dark transition-all";
        tabUrlBtn.className = "py-2 px-3 text-xs font-semibold rounded-xl bg-white/10 text-slate-300 hover:bg-white/20 transition-all border border-white/10";
    } else {
        fileContainer.classList.add('hidden');
        urlContainer.classList.remove('hidden');
        tabUrlBtn.className = "py-2 px-3 text-xs font-semibold rounded-xl bg-white text-aviation-dark transition-all";
        tabFileBtn.className = "py-2 px-3 text-xs font-semibold rounded-xl bg-white/10 text-slate-300 hover:bg-white/20 transition-all border border-white/10";
    }
}

// Open / Close Modal Upload
function openModal() {
    const modal = document.getElementById('uploadModal');
    const modalBox = document.getElementById('modalContentBox');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-95');
    modalBox.classList.add('scale-100');
}

function closeModal() {
    const modal = document.getElementById('uploadModal');
    const modalBox = document.getElementById('modalContentBox');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-100');
    modalBox.classList.add('scale-95');
    document.getElementById('spotForm').reset();
    tempImageBase64 = '';
    switchInputMode('file');
}

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();

    const airline = document.getElementById('airline').value;
    const aircraftType = document.getElementById('aircraftType').value;
    const registration = document.getElementById('registration').value;
    const category = document.getElementById('category').value;
    const location = document.getElementById('location').value;
    const cameraGear = document.getElementById('cameraGear').value;
    const spotDate = document.getElementById('spotDate').value;
    const notes = document.getElementById('notes').value;
    const isPublic = document.getElementById('isPublicToggle').checked;

    if (inputMode === 'url') {
        const imageUrl = document.getElementById('imageUrl').value;
        if (!imageUrl) {
            alert('Mohon masukkan URL gambar pesawat!');
            return;
        }
        saveSpotData(imageUrl, airline, aircraftType, registration, category, location, cameraGear, spotDate, notes, isPublic);
    } else {
        const fileInput = document.getElementById('imageFile');
        const file = fileInput.files[0];
        if (!file) {
            alert('Mohon pilih file gambar terlebih dahulu!');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(uploadEvent) {
            tempImageBase64 = uploadEvent.target.result;
            saveSpotData(tempImageBase64, airline, aircraftType, registration, category, location, cameraGear, spotDate, notes, isPublic);
        };
        reader.readAsDataURL(file);
    }
}

function saveSpotData(imgSrc, airline, aircraftType, registration, category, location, cameraGear, spotDate, notes, isPublic) {
    const newSpot = {
        id: Date.now(),
        image: imgSrc,
        airline,
        aircraftType,
        registration,
        category,
        location,
        cameraGear,
        spotDate,
        notes,
        isPublic
    };

    spotList.unshift(newSpot);
    localStorage.setItem('aerospot_data', JSON.stringify(spotList));

    closeModal();
    renderGallery();
}

// Render Gallery Cards
function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    const emptyState = document.getElementById('emptyState');
    const searchQuery = document.getElementById('searchInput') ? document.getElementById('searchInput').value.toLowerCase() : '';

    const filtered = spotList.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        
        let matchesPrivacy = true;
        if (currentPrivacy === 'public') matchesPrivacy = item.isPublic === true;
        if (currentPrivacy === 'private') matchesPrivacy = item.isPublic === false;

        const matchesSearch = item.airline.toLowerCase().includes(searchQuery) ||
                              item.aircraftType.toLowerCase().includes(searchQuery) ||
                              item.registration.toLowerCase().includes(searchQuery) ||
                              item.location.toLowerCase().includes(searchQuery);
                              
        return matchesCategory && matchesPrivacy && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
        return;
    }

    emptyState.classList.remove('flex');
    emptyState.classList.add('hidden');

    grid.innerHTML = filtered.map(item => `
        <div class="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl overflow-hidden shadow-xl hover:border-aviation-sky/50 transition-all duration-300 flex flex-col group">
            <div class="relative h-52 overflow-hidden bg-black/40 cursor-pointer" onclick="openDetail(${item.id})">
                <img src="${item.image}" alt="${item.aircraftType}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                
                <div class="absolute top-3 right-3 flex items-center space-x-2">
                    <span class="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-white border border-white/10 shadow-md">
                        ${item.isPublic ? '🌍 Publik' : '🔒 Privat'}
                    </span>
                    <span class="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-aviation-sky border border-white/10 shadow-md">
                        ${item.category}
                    </span>
                </div>

                <div class="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                    📍 ${item.location}
                </div>
            </div>
            
            <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                    <div class="flex items-center justify-between text-xs text-slate-300 mb-1">
                        <span class="font-semibold text-aviation-light uppercase tracking-wider">${item.airline}</span>
                        <span>${item.spotDate}</span>
                    </div>
                    <h3 class="text-lg font-bold text-white tracking-wide">${item.aircraftType}</h3>
                    <div class="mt-2 inline-block px-2.5 py-1 bg-white/10 rounded-lg text-xs font-mono text-slate-200 border border-white/10">
                        Reg: ${item.registration}
                    </div>
                </div>

                <div class="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span class="text-xs text-slate-300 truncate max-w-[180px]" title="${item.cameraGear}">📷 ${item.cameraGear || 'Standard Gear'}</span>
                    <div class="flex items-center space-x-2">
                        <button onclick="openDetail(${item.id})" class="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors" title="Lihat Detail">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        </button>
                        <button onclick="deleteSpot(${item.id})" class="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors" title="Hapus Catatan">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Category & Privacy Filtering
function setCategoryFilter(category) {
    currentCategory = category;
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        if (btn.dataset.cat === category) {
            btn.className = "category-btn px-4 py-2 rounded-xl text-xs font-semibold tracking-wide bg-white text-aviation-dark transition-all whitespace-nowrap shadow-md";
        } else {
            btn.className = "category-btn px-4 py-2 rounded-xl text-xs font-semibold tracking-wide bg-white/10 backdrop-blur-md text-slate-300 hover:bg-white/20 transition-all whitespace-nowrap border border-white/10";
        }
    });
    renderGallery();
}

function setPrivacyFilter(privacy) {
    currentPrivacy = privacy;
    const buttons = document.querySelectorAll('.privacy-btn');
    buttons.forEach(btn => {
        if (btn.dataset.privacy === privacy) {
            btn.className = "privacy-btn px-4 py-2 rounded-xl text-xs font-semibold tracking-wide bg-aviation-sky text-aviation-dark transition-all whitespace-nowrap shadow-md";
        } else {
            btn.className = "privacy-btn px-4 py-2 rounded-xl text-xs font-semibold tracking-wide bg-white/10 backdrop-blur-md text-slate-300 hover:bg-white/20 transition-all whitespace-nowrap border border-white/10";
        }
    });
    renderGallery();
}

function filterSpots() {
    renderGallery();
}

// Detail Modal
function openDetail(id) {
    const item = spotList.find(s => s.id === id);
    if (!item) return;

    document.getElementById('detailTitle').textContent = `${item.airline} - ${item.aircraftType}`;
    document.getElementById('detailContent').innerHTML = `
        <div class="rounded-2xl overflow-hidden bg-black/40 border border-white/10 max-h-72 flex items-center justify-center">
            <img src="${item.image}" alt="${item.aircraftType}" class="w-full h-full object-contain">
        </div>
        <div class="grid grid-cols-2 gap-4 pt-2">
            <div class="bg-white/5 p-3 rounded-xl border border-white/10">
                <span class="text-xs text-slate-400 block">Registrasi</span>
                <span class="text-sm font-bold text-white font-mono">${item.registration}</span>
            </div>
            <div class="bg-white/5 p-3 rounded-xl border border-white/10">
                <span class="text-xs text-slate-400 block">Status Publikasi</span>
                <span class="text-sm font-bold text-aviation-light">${item.isPublic ? '🌍 Publik' : '🔒 Privat'}</span>
            </div>
            <div class="bg-white/5 p-3 rounded-xl border border-white/10">
                <span class="text-xs text-slate-400 block">Kategori</span>
                <span class="text-sm font-bold text-aviation-light">${item.category}</span>
            </div>
            <div class="bg-white/5 p-3 rounded-xl border border-white/10">
                <span class="text-xs text-slate-400 block">Bandara / Lokasi</span>
                <span class="text-sm font-bold text-white">${item.location}</span>
            </div>
            <div class="bg-white/5 p-3 rounded-xl border border-white/10 col-span-2">
                <span class="text-xs text-slate-400 block">Tanggal Spotting</span>
                <span class="text-sm font-bold text-white">${item.spotDate}</span>
            </div>
        </div>
        <div class="bg-white/5 p-3 rounded-xl border border-white/10">
            <span class="text-xs text-slate-400 block">Gear Kamera & Lensa</span>
            <span class="text-sm text-slate-200">${item.cameraGear || 'Tidak ada catatan gear'}</span>
        </div>
        <div class="bg-white/5 p-3 rounded-xl border border-white/10">
            <span class="text-xs text-slate-400 block">Catatan Tambahan</span>
            <p class="text-sm text-slate-200 mt-1">${item.notes || 'Tidak ada catatan.'}</p>
        </div>
    `;

    const modal = document.getElementById('detailModal');
    const modalBox = document.getElementById('detailModalBox');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-95');
    modalBox.classList.add('scale-100');
}

function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    const modalBox = document.getElementById('detailModalBox');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-100');
    modalBox.classList.add('scale-95');
}

// Delete Spot
function deleteSpot(id) {
    if (confirm('Apakah kamu yakin ingin menghapus catatan spotting ini?')) {
        spotList = spotList.filter(item => item.id !== id);
        localStorage.setItem('aerospot_data', JSON.stringify(spotList));
        renderGallery();
    }
}