# API Documentation (LearnCamp)

Base URL: `http://localhost:4000`

## Health
- `GET /health`

## Authentication
### Register
- `POST /api/auth/register`
```json
{
  "fullName": "Awa Ndiaye",
  "email": "awa@example.com",
  "password": "Secure123!",
  "role": "trainer"
}
```

### Login
- `POST /api/auth/login`
```json
{
  "email": "awa@example.com",
  "password": "Secure123!"
}
```

## Protected routes
Passer `Authorization: Bearer <token>`.

### Bootcamps
- `GET /api/bootcamps`
- `POST /api/bootcamps`
- `PATCH /api/bootcamps/:id`
- `DELETE /api/bootcamps/:id`

### Sessions
- `POST /api/sessions`
- `GET /api/bootcamps/:bootcampId/sessions`

### Payments
- `POST /api/payments`

### Chat
- `POST /api/chat/messages`
- `GET /api/sessions/:sessionId/messages`

### Resources
- `POST /api/resources`
- `GET /api/bootcamps/:bootcampId/resources`

### Replays
- `POST /api/replays`
- `GET /api/bootcamps/:bootcampId/replays`
