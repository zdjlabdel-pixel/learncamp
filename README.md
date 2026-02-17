# LearnCamp - Plateforme éducative bootcamp-first

Ce dépôt fournit une implémentation full-stack de référence pour une plateforme de cours en ligne orientée **formateurs africains**.

## Structure

- `backend/` API Node.js + Express (JWT, rôles, CRUD, paiement, chat, replay, ressources)
- `frontend/` interface React mobile-first (dashboard formateur/élève)
- `docs/architecture.md` architecture globale, modèles de données, routes API, composants frontend
- `backend/db/migrations/001_init.sql` migration SQL initiale

## Démarrage rapide

### Backend

```bash
cd backend
npm install
npm run dev
```

API disponible sur `http://localhost:4000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Application disponible sur `http://localhost:5173`.
