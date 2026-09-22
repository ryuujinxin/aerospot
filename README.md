# ✈️ AeroSpot - Plane Spotting Logbook & Gallery

<div align="center">

<!-- Badge Bahasa Pemrograman & Teknologi Utama -->
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS">

<p>A modern, sleek, and elegant web-based application designed for aviation enthusiasts and plane spotters to log, manage, and showcase their best aircraft captures.</p>

<!-- Media Sosial & Kontak -->
<p>
  <a href="https://instagram.com/username_kamu" target="_blank"><img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white" alt="Instagram"></a>
  <a href="https://tiktok.com/@username_kamu" target="_blank"><img src="https://img.shields.io/badge/TikTok-%23000000.svg?style=for-the-badge&logo=TikTok&logoColor=white" alt="TikTok"></a>
  <a href="https://youtube.com/@username_kamu" target="_blank"><img src="https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white" alt="YouTube"></a>
  <a href="https://discord.gg/invite_kamu" target="_blank"><img src="https://img.shields.io/badge/Discord-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="mailto:emailkamu@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
</p>

</div>

---

## 🖼️ Preview & Background Pesawat

> Aplikasi ini menggunakan background lokal personal dan mendukung galeri foto pesawat interaktif:

<div align="center">
  <img src="background/photo.jpg" alt="Plane Spotting Preview" width="800" style="border-radius: 16px; border: 2px solid rgba(255,255,255,0.2);">
</div>

---

## ✨ Features

- **🖼️ Local Background Support**: Menggunakan foto pesawat pribadi dari folder `background/photo.jpg` dengan efek *glassmorphism* yang elegan.
- **📸 Flexible Image Input**: Unggah foto langsung dari penyimpanan lokal (konversi otomatis via Base64/LocalStorage) atau pakai URL gambar eksternal.
- **🔍 Advanced Search & Filtering**: Cari catatan berdasarkan maskapai, tipe pesawat, registrasi, atau lokasi bandara dengan cepat. Saring berdasarkan kategori (Komersial, Kargo, Militer, Jet Pribadi).
- **📱 Detailed View Modal**: Lihat detail lengkap termasuk gear kamera/lensa, tanggal *spotting*, nomor registrasi, dan catatan pribadi.
- **💾 Local Storage Persistence**: Seluruh data catatan tersimpan aman di dalam *browser* lokal tanpa perlu database tambahan.

---

## 📂 Project Structure

```text
📦 aerospot/
 ┣ 📂 background/
 ┃  ┗ 📜 photo.jpg        # Foto background pesawat lokalmu
 ┣ 📂 server/
 ┃  ┗ 📜 script.js        # Logika aplikasi & manajemen state (JavaScript)
 ┣ 📂 UI/
 ┃  ┗ 📜 style.css        # Desain kustom & aturan background (CSS)
 ┗ 📜 index.html          # Antarmuka utama aplikasi (HTML & Tailwind)
