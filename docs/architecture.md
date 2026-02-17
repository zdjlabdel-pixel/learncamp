# Architecture complète LearnCamp

## 1) Architecture globale

### Frontend (React + Vite)
- Dashboard formateur: gestion bootcamps, sessions live, ressources, replays, paiements.
- Espace élève: calendrier sessions, accès live, lecture replay, téléchargement ressources.
- Composants mobile-first, design léger (faible consommation data).
- Prévu pour brancher WebRTC (live) + WebSocket (chat) dans une phase de production.

### Backend (Node.js + Express)
- API REST sécurisée JWT.
- Contrôle d’accès par rôle: `trainer` et `student`.
- Endpoints pour bootcamps, sessions, paiements Mobile Money, chat, ressources, replays.
- Validation d’entrée avec Zod.

### Données
- Modèles relationnels (migration PostgreSQL fournie).
- Prototype d’exécution en mémoire (`store.js`) pour accélérer le bootstrap local.

## 2) Modèles de données

1. `users`
   - id, full_name, email, password_hash, role, created_at
2. `bootcamps`
   - id, trainer_id, title, description, start_date, end_date, duration_weeks, price_xof, created_at
3. `live_sessions`
   - id, bootcamp_id, trainer_id, title, scheduled_at, duration_minutes, live_room_code, created_at
4. `chat_messages`
   - id, session_id, sender_id, content, created_at
5. `resources`
   - id, bootcamp_id, uploaded_by, title, type, url, created_at
6. `replays`
   - id, session_id, title, video_url, duration_minutes, storage_provider, created_at
7. `payments`
   - id, bootcamp_id, student_id, provider, phone_number, amount_xof, status, reference, paid_at

## 3) Routes API

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Bootcamps
- `GET /api/bootcamps`
- `POST /api/bootcamps` (trainer)
- `PATCH /api/bootcamps/:id` (trainer propriétaire)
- `DELETE /api/bootcamps/:id` (trainer propriétaire)

### Sessions live
- `POST /api/sessions` (trainer)
- `GET /api/bootcamps/:bootcampId/sessions`

### Paiements Mobile Money
- `POST /api/payments` (student)
  - providers: `wave`, `orange_money`, `mtn_momo`, `airtel_money`

### Chat temps réel (API persistante)
- `POST /api/chat/messages`
- `GET /api/sessions/:sessionId/messages`

### Ressources
- `POST /api/resources` (trainer)
- `GET /api/bootcamps/:bootcampId/resources`

### Replays
- `POST /api/replays` (trainer)
- `GET /api/bootcamps/:bootcampId/replays`

## 4) Composants frontend

- `App`: shell global dashboard
- `BootcampList`: listing bootcamps + prochaine session
- `SessionPanel`: zone live native (actions démarrer, partage écran)
- `MobileMoneyCard`: fournisseurs + action de paiement
- `ReplayPanel`: catalogue de replays
- `ResourcePanel`: ressources téléchargeables
- `ChatPanel`: messages live + saisie

## 5) Implémentation code

- Backend:
  - `src/index.js` bootstrap serveur
  - `src/routes/*` routes REST
  - `src/controllers/*` logique métier
  - `src/middleware/auth.js` auth JWT + permissions
  - `src/utils/schemas.js` validation payload
  - `db/migrations/001_init.sql` migration SQL
- Frontend:
  - `src/App.jsx` composition UI
  - `src/components/*` composants métier
  - `src/styles/app.css` style mobile-first
