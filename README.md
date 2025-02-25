# Django React TypeScript Boilerplate

A modern full-stack boilerplate with Django (DRF) backend and React TypeScript frontend.

## Features

- **Backend**: Django + Django Rest Framework

  - CRUD API endpoints
  - SQLite (easily switchable to PostgreSQL)
  - CORS configuration

- **Frontend**: React + TypeScript
  - Modern stack with Vite
  - TanStack Query for data fetching and state management
  - React Hook Form with Zod validation
  - React Router for navigation
  - Tailwind CSS and ShadCN components

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:

   ```bash
   python manage.py migrate
   ```

5. Start the development server:
   ```bash
   python manage.py runserver
   ```

The backend API will be available at http://localhost:8000/api/

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:5173/

## API Endpoints

- `GET /api/posts/` - List all posts
- `POST /api/posts/` - Create a new post
- `GET /api/posts/{id}/` - Retrieve a specific post
- `PUT /api/posts/{id}/` - Update a specific post
- `DELETE /api/posts/{id}/` - Delete a specific post

## Database

The project uses SQLite by default. To switch to PostgreSQL:

1. Install psycopg2:

   ```bash
   pip install psycopg2-binary
   ```

2. Uncomment the PostgreSQL configuration in `backend/core/settings.py` and comment out the SQLite configuration.

## License

MIT
