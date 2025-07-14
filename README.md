# 🧪 Aksamedia Frontend Developer Internship Test

Proyek ini merupakan hasil pengerjaan tes magang **Frontend Developer** di **PT Aksamedia Mulia Digital**. Aplikasi ini dibangun menggunakan React dan TailwindCSS tanpa library UI tambahan, serta tidak menggunakan API eksternal — semua data tersimpan secara lokal menggunakan `localStorage`.

---

## 🧩 Fitur yang Diimplementasikan

✅ Login statis (tanpa register, hanya username dan password tetap)  
✅ Halaman hanya bisa diakses jika sudah login (ProtectedRoute)  
✅ CRUD data user lokal (Create, Read, Update, Delete)  
✅ Fitur search/filter + pagination manual  
✅ Simpan state query pagination dan filter di URL (query string)  
✅ Data user & login tetap tersimpan meskipun browser direfresh  
✅ Edit profil user (nama) + real-time update pada Navbar  
✅ Dark mode / light mode / mengikuti OS  
✅ Dropdown menu custom di Navbar  
✅ Routing fallback ke halaman 404 (NotFound)  
✅ Responsif (mobile, tablet, desktop)  
✅ Tanpa library UI eksternal  
✅ Tanpa API eksternal (semua pakai localStorage)

---

## 🧑‍💻 Teknologi yang Digunakan

- ⚛️ **React.js** (Vite)
- 🎨 **Tailwind CSS**
- 🌐 **React Router DOM v6**
- 💾 **localStorage**
- ☁️ **Vercel** (untuk deployment)

---

## 🔐 Credential Login

Username: raiakmal
Password: @Rai12345

---

## 🗂️ Struktur Direktori

src/
├── App.jsx
├── main.jsx
├── components/
│ ├── Navbar.jsx
│ └── ProtectedRoute.jsx
├── pages/
│ ├── Login.jsx
│ ├── Dashboard.jsx
│ ├── EditProfile.jsx
│ ├── UserForm.jsx
│ └── NotFound.jsx
├── utils/
│ ├── auth.js
│ └── theme.js
└── assets/

---

## 🛠️ Cara Menjalankan Secara Lokal

### 1. Clone repository

```bash
git clone https://github.com/username/frontend-test.git
cd frontend-tes
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan aplikasi

```bash
npm run dev
```

### 4. Akses di browser

```bash
http://localhost:5173
```

---

### 🙋‍♂️ Pembuat

Nama: Muhammad Rai Akmal
Domisili: Tasikmalaya, Jawa Barat

---

### 📬 Kontak

✉️ Email: muhammadrai0504@gmail.com
🌐 GitHub: https://github.com/raiakmal
💼 LinkedIn: https://www.linkedin.com/in/muhammad-rai-akmal-4805aa1b2/
