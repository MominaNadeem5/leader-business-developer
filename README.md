# Leader Business Developer

Monorepo containing the website and its API.

| Folder | Stack | Purpose |
| --- | --- | --- |
| [`frontend/`](frontend) | React + Vite | Public website and application forms |
| [`backend/`](backend) | Laravel (PHP ^8.3) | API (including the Gemini-powered business-name generator) |

## Frontend (`frontend/`)

Requires Node.js 22.

```bash
cd frontend
cp .env.example .env      # adjust values; never commit .env
npm install
npm run dev               # dev server (http://localhost:5173)
npm run build             # production build into frontend/dist
npm run lint
```

Environment variables (all optional, none are secrets): `VITE_SITE_URL`, `VITE_API_URL`, `VITE_TOOLS_API_URL`. Without `VITE_API_URL` the UI runs in demo mode.

## Backend (`backend/`)

Requires PHP ^8.3 and Composer.

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve         # http://localhost:8000
```

Or use the Composer helpers: `composer setup` (install + migrate) and `composer dev` (all dev processes). Run tests with `composer test`.

Set these in `backend/.env` (never commit it):

- `GEMINI_API_KEY` - Google Gemini key for the name generator. Keep it on the backend only.
- `CORS_ALLOWED_ORIGINS` - frontend origins allowed to call the API (default includes `http://localhost:5173`).

## Deployment

`.github/workflows/deploy-frontend.yml` builds `frontend/` and deploys `frontend/dist` to cPanel over FTPS on pushes to `main` that touch `frontend/`. It needs the repository secrets `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD`. The backend is not deployed by this workflow.

## Secrets

`.env` files, `node_modules`, `vendor`, build output, logs and archives are git-ignored. Only `.env.example` files are committed.
