# Panduan Deploy ke Vercel

Panduan ini menjelaskan cara deploy aplikasi Expense Tracker (frontend + backend) ke Vercel dalam satu repository.

## Struktur Project

```
expense-tracker-backend/
├── api/                    # Vercel Serverless Functions
│   ├── expenses/
│   │   └── index.ts       # API endpoints untuk expenses
│   └── package.json       # Dependencies untuk API
├── frontend/              # React + Vite frontend
├── server/                # Local development server (Hono + Bun)
├── vercel.json           # Konfigurasi Vercel
├── deploy.sh             # Script deployment
└── package.json          # Root package.json
```

## Prerequisites

1. **Node.js** (v18 atau lebih baru)
2. **Bun** (untuk development lokal)
3. **Akun Vercel** (gratis di vercel.com)
4. **Vercel CLI** (akan diinstall otomatis)

## Cara Deploy

### Opsi 1: Menggunakan Script Otomatis

```bash
# Jalankan script deployment
./deploy.sh
```

Script ini akan:

- Install dependencies
- Build frontend
- Deploy ke Vercel

### Opsi 2: Manual Deployment

```bash
# 1. Install dependencies root
npm install

# 2. Install dependencies frontend
cd frontend && npm install && cd ..

# 3. Build frontend
npm run build:frontend

# 4. Deploy ke Vercel
npx vercel --prod
```

## Konfigurasi Vercel

File `vercel.json` sudah dikonfigurasi dengan:

- **Build Command**: `npm run build`
- **Output Directory**: `frontend/dist`
- **API Routes**: Semua file di `api/` akan menjadi serverless functions
- **Rewrites**: Frontend routing dan API routing

## API Endpoints

Setelah deploy, API akan tersedia di:

- `GET /api/expenses` - Dapatkan semua expenses
- `POST /api/expenses` - Tambah expense baru
- `GET /api/expenses/total-spent` - Dapatkan total pengeluaran
- `GET /api/expenses/:id` - Dapatkan expense berdasarkan ID
- `DELETE /api/expenses/:id` - Hapus expense

## Development Lokal

Untuk development lokal, gunakan:

```bash
# Terminal 1: Start backend (Hono + Bun)
npm run dev

# Terminal 2: Start frontend (React + Vite)
cd frontend && npm run dev
```

## Environment Variables

Jika diperlukan, tambahkan environment variables di Vercel Dashboard:

1. Buka project di vercel.com
2. Settings → Environment Variables
3. Tambahkan variables yang diperlukan

## Troubleshooting

### Error saat Build

- Pastikan semua dependencies terinstall
- Check apakah ada syntax error di kode

### API tidak berfungsi

- Verifikasi struktur folder `api/`
- Check vercel.json configuration
- Lihat logs di Vercel Dashboard

### Frontend tidak load

- Pastikan build berhasil
- Check routing configuration di vercel.json

## File Penting

1. **`vercel.json`** - Konfigurasi deployment Vercel
2. **`api/expenses/index.ts`** - Serverless function untuk API
3. **`deploy.sh`** - Script deployment otomatis
4. **`package.json`** - Build scripts dan dependencies

## Tips

- Setiap perubahan pada branch `main` akan trigger auto-deployment jika GitHub integration aktif
- Gunakan `vercel --prod` untuk production deployment
- Gunakan `vercel` (tanpa flag) untuk preview deployment
- Monitor logs di Vercel Dashboard untuk debugging
