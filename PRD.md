# Product Requirements Document (PRD)

**Nama Proyek:** Aplikasi Web Tes Kraepelin/Pauli (Zero-Latency SPA)  
**Platform:** Web Mobile (Fokus optimasi iOS Safari & Android)  
**Fase:** V1 (Minimum Viable Product)  

---

## 1. Ringkasan Proyek
Aplikasi ini adalah platform simulasi Tes Koran/Kraepelin berbasis peramban (*browser*) yang dirancang khusus untuk peserta bimbingan belajar. Target utamanya adalah memberikan pengalaman tes yang 100% responsif tanpa jeda (*zero latency*), tanpa perlu menginstal aplikasi (.apk/.ipa) dari bursa aplikasi, dan adil bagi pengguna ekosistem iOS maupun Android.

---

## 2. Arsitektur & Teknologi
Berbeda dengan arsitektur web konvensional yang melempar input data ke server lokal untuk diproses (misalnya mengirim *form* ke `proses.php` di folder `htdocs`), seluruh logika hitungan di aplikasi ini akan dieksekusi secara lokal di sisi klien (*client-side*).

* **Frontend Framework:** Svelte (via Vite)
* **Styling:** Tailwind CSS (untuk desain responsif dan *numpad* kustom)
* **State Management:** Svelte Stores (menyimpan skor dan *timer* secara reaktif)
* **Penyimpanan Data:** LocalStorage (menyimpan riwayat tes sementara di perangkat *user*)
* **Hosting:** GitHub Pages (Statis, HTTPS)

---

## 3. Kebutuhan Fitur Utama (Functional Requirements)

### A. Generator Soal (Engine)
* Sistem menghasilkan deretan angka acak (0-9) secara vertikal.
* Logika penjumlahan: *User* harus menjumlahkan dua angka yang saling berdekatan.
* Hanya digit terakhir dari hasil penjumlahan yang menjadi jawaban sah (contoh: 8 + 7 = 15, jawaban yang harus diinput adalah 5).

### B. Custom Numpad & Input
* **Wajib:** Terdapat komponen *keyboard* numerik (0-9) buatan sendiri di sepertiga bagian bawah layar.
* *Keyboard* bawaan sistem (iOS/Android) **tidak boleh** muncul saat *user* berinteraksi dengan aplikasi.
* Angka yang ditekan langsung mengevaluasi jawaban (Benar/Salah) dan secara otomatis menggeser fokus ke baris angka berikutnya.

### C. Sistem Pengatur Waktu (Timer)
* Terdapat indikator waktu per lajur/kolom (standar: 30 detik per lajur).
* Saat waktu habis (pindah lajur), sistem otomatis mencatat skor pada lajur tersebut dan menggeser layar ke lajur angka baru di sebelahnya tanpa interupsi.

---

## 4. Syarat Performa & UX (Non-Functional Requirements)
Ini adalah aturan ketat untuk mengatasi kelemahan pada web referensi sebelumnya:

* **Zero Latency Touch:** Komponen *Custom Numpad* harus menggunakan *event listener* `pointerdown` (bukan `click` biasa).
* **iOS Safari Optimization:** Harus menggunakan deklarasi CSS `touch-action: manipulation` pada area *numpad* untuk mematikan *delay* 300ms bawaan iOS.
* **Scroll Locking:** Menggunakan CSS `overscroll-behavior: none` pada `body` agar layar tidak membal atau tergeser secara tidak sengaja ketika *user* memencet angka dengan kecepatan tinggi.
* **Ukuran Bundle:** Harus seminimal mungkin agar waktu muat (*load time*) di bawah 1 detik bahkan di jaringan seluler.

---

## 5. Alur Pengguna (User Flow)
1. *User* membuka tautan web (misal: *domain.github.io*).
2. Tampil layar pembuka berisi tombol **"Mulai Tes"** dan input nama singkat.
3. Hitung mundur (3, 2, 1) dimulai.
4. Layar tes utama terbuka (Angka vertikal di atas, Numpad di bawah).
5. *User* mengerjakan tes sampai total durasi habis.
6. Layar hasil (*Result Screen*) muncul menampilkan: Total Jawaban Benar, Total Jawaban Salah, dan Grafik Kestabilan (jumlah benar per lajur).

---

## 6. Rencana Eksekusi (Milestones)
* **Tahap 1:** *Setup* repositori Svelte/Vite dan konfigurasi Tailwind CSS.
* **Tahap 2:** Membangun *UI Layout* statis (Lajur angka dan Numpad).
* **Tahap 3:** Menyuntikkan JavaScript/Svelte reaktif untuk logika hitungan (Benar/Salah) dan *event pointerdown*.
* **Tahap 4:** Membangun logika *Timer* dan pergantian lajur.
* **Tahap 5:** Pengujian di perangkat nyata (iPhone dan Android) lalu *deploy* ke GitHub Pages.