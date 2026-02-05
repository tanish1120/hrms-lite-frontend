# HRMS Lite — Frontend ✅

## Project overview
A lightweight React frontend for HRMS Lite. Built with Vite and Tailwind CSS, it provides pages to view employees, attendance, and employee details, and it calls the HRMS Lite backend API to fetch and mutate data.

## Tech stack
- **Framework:** React (via Vite)
- **Styling:** Tailwind CSS + PostCSS
- **HTTP client:** Axios
- **Dev tooling:** Vite, ESLint

## Local setup & run
1. Ensure Node.js and npm are installed (Node 18+ recommended). ⚠️
2. From the repository root run:
   ```bash
   cd frontend
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173` (or as printed by Vite).

4. Build for production:
   ```bash
   npm run build
   ```
5. Preview the production build locally:
   ```bash
   npm run preview
   ```
6. Lint the codebase:
   ```bash
   npm run lint
   ```

## Notes about API endpoint
- The app uses `src/api.js` to configure the API base URL. By default it points to the deployed backend: `https://hrms-lite-backend-yz3g.onrender.com/`.
- For local backend testing, change `baseURL` in `src/api.js` to `http://localhost:8000/`.

## Assumptions & limitations
- The frontend expects the backend to provide the documented REST endpoints (no runtime schema discovery).
- No client-side authentication implemented. Only one admin exists.

---

