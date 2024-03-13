### Requirements

- Node ^v20

### Local Setup

- Clone repository
  -- `git clone https://github.com/alexvirga/solace-notes`
- Install dependencies
  --`npm run install:all`
- Start app
  -- `npm run start`
- Navigate to `http://localhost:5173`

(If you want to run server and client separetely, run `cd client && npm run dev` and `cd server && npm run start` )

### Database

- Local is using the hosted postgres db.
- Local postgres db can be created and connected in the db.js file.

### Hosted Page

\*\* **It may take a few seconds for the database & backend to spin up** \*\*

- Client: https://solace-notes-web.onrender.com/
- API: https://solace-notes.onrender.com

### Tools used

- Backend: Node, express
- Frontend: React, Typescript
- Database: PostgreSQL
- Styling: MaterialUI
- Hosting: Render.com
