# Mitchopolis Legal AI Engine

Node.js/Express service responsible for:

- Storing and retrieving classified evidence
- Legal document analysis and indexing
- Evidence retrieval and search
- API endpoints for evidence management

---

## Local Development

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm (typically bundled with Node.js)
- MongoDB Atlas connection string (or local MongoDB instance)
- `.env` file with credentials (see "Environment Variables" below)

### Setup (One-Time)

```bash
cd ~/Mitchopolis/legal_ai_engine
npm install
```

### Starting the API (Dev Mode)

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

Nodemon will automatically restart the server when files change.

### Production Run

```bash
npm start
```

---

## Project Structure

```
legal_ai_engine/
├── README.md
├── package.json          # Dependencies and scripts
├── package-lock.json
├── .env                  # Environment variables (local only, not in Git)
├── .env.example          # Template for .env
├── .gitignore
├── src/
│   ├── server.js         # Express server entry point
│   ├── app.js            # Express app configuration (routes, middleware)
│   ├── config/
│   │   └── db.js         # MongoDB connection setup
│   ├── models/
│   │   └── Evidence.js   # Mongoose schema for evidence documents
│   ├── controllers/
│   │   └── evidenceController.js  # Route handlers and business logic
│   ├── routes/
│   │   └── evidenceRoutes.js      # API endpoint definitions
│   ├── middleware/       # Custom Express middleware (auth, validation, etc.)
│   ├── services/         # Business logic and utilities
│   └── utils/            # Helper functions
└── node_modules/         # Dependencies (local only, not in Git)
```

---

## Key Endpoints

### Implemented

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/health` | Service health check |
| `GET` | `/api/evidence` | List all evidence records |
| `POST` | `/api/evidence` | Create a new evidence record |

### Planned

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/evidence/:id` | Retrieve a specific evidence record |
| `PUT` | `/api/evidence/:id` | Update an evidence record |
| `DELETE` | `/api/evidence/:id` | Delete an evidence record |
| `POST` | `/api/evidence/search` | Search evidence by keyword or metadata |
| `POST` | `/api/evidence/export` | Export evidence records in bulk |

---

## Environment Variables

Create a `.env` file in the `legal_ai_engine` root (not committed to Git). Use `.env.example` as a template:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

**Fields:**
- `MONGO_URI`: MongoDB Atlas connection string (required)
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (`development` or `production`)

---

## API Response Format

Successful responses return JSON with status 200–299:

```json
{
  "status": "ok",
  "data": { /* resource data */ }
}
```

Error responses include status code and message:

```json
{
  "error": "Invalid request",
  "details": "..."
}
```

---

## Troubleshooting

### Port Already in Use

If port 3000 is occupied:

```bash
lsof -i :3000
kill -9 <PID>
```

Or change the port in `.env`:

```bash
PORT=3001
npm run dev
```

### MongoDB Connection Failed

Verify your `MONGO_URI` in `.env`:

- Check cluster IP whitelist in MongoDB Atlas
- Confirm username and password are correct
- Ensure `.mongodb.net` domain is reachable

Test the connection:

```bash
node -e "require('dotenv').config(); console.log(process.env.MONGO_URI)"
```

### Node Modules Issues

If dependencies are missing or broken:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### `nodemon` Not Reloading

Verify nodemon is installed:

```bash
npm list nodemon
```

If missing:

```bash
npm install --save-dev nodemon
npm run dev
```

---

## Git Workflow

- **Branch**: Work on `feature/*` or `dev`, never directly on `main`
- **Commits**: Use conventional commit format (see `docs/best_practices_log_v1.md`)
- **Push**: After tests pass, push to `origin/dev` and create a PR

---

## Contributing

See `~/Mitchopolis/docs/best_practices_log_v1.md` for:
- Git standards & workflow
- Commit message conventions
- Multi-repo discipline rules
- Clean working-tree guidelines

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (with auto-reload) |
| `npm start` | Start production server |
| `npm test` | Run tests (placeholder) |

---

## License

Internal use only. Mitchopolis 2025.
