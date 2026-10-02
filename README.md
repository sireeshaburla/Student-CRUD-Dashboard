# Student Management Dashboard

A responsive student dashboard with a Node.js/Express REST API and a browser-based frontend.

## Features
- View student records and dashboard statistics
- Add, edit, and delete student records
- Search by name, email, department, or ID
- Responsive layout for desktop and mobile
- REST endpoints for CRUD operations

## Run locally
1. Install Node.js.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm start`.
5. Visit `http://localhost:3000`.

## API endpoints
- `GET /api/students` — list students
- `GET /api/students/:id` — get one student
- `POST /api/students` — add a student
- `PUT /api/students/:id` — update a student
- `DELETE /api/students/:id` — delete a student

Example JSON body:
```json
{
  "name": "Ananya Rao",
  "age": 20,
  "department": "CSE",
  "email": "ananya@example.com"
}
```

## Important note about storage
This starter version stores records in server memory. Data resets when the server restarts or redeploys. For a production deployment, connect a persistent database such as MongoDB Atlas or PostgreSQL before relying on long-term data storage.

## Deploy on Render
- Create a new **Web Service** and connect this GitHub repository.
- Build command: `npm install`
- Start command: `npm start`
- No environment variables are required for this starter version.
