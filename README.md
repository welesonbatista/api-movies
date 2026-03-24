# API Movies

A simple RESTful API for managing movie notes, tags, and users. Built with Node.js, Express, and SQLite, using Knex.js for database queries.

## Features
- User registration and update
- Create, view, list, and delete movie notes
- Tag movies with custom tags
- Filter notes by tags and title

## Technologies
- Node.js
- Express
- SQLite
- Knex.js

## Getting Started

### Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Configure your database (SQLite by default)
4. Run migrations with `npx knex migrate:latest`
5. Start the server: `node src/server.js`

## API Endpoints

### Users
- `POST /users` — Create a new user
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "yourpassword"
    }
    ```
- `PUT /users/:id` — Update user info
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "newpassword",
      "old_password": "oldpassword"
    }
    ```

### Movie Notes
- `POST /notes/:user_id` — Create a new movie note
  - **Request Body:**
    ```json
    {
      "title": "Inception",
      "description": "Great movie!",
      "rating": 5,
      "name": ["Sci-Fi", "Thriller"]
    }
    ```
- `GET /notes/:id` — Get a specific note
- `GET /notes` — List all notes (filter by `title`, `user_id`, `name` as query params)
- `DELETE /notes/:id` — Delete a note

### Tags
- `GET /tags/:user_id` — List all tags for a user

## Database Models

### users
| Field       | Type      | Description         |
|-------------|-----------|---------------------|
| id          | INTEGER   | Primary key         |
| name        | VARCHAR   | User's name         |
| email       | VARCHAR   | User's email        |
| password    | VARCHAR   | Hashed password     |
| avatar      | VARCHAR   | Avatar URL (nullable)|
| created_at  | TIMESTAMP | Creation timestamp  |
| updated_at  | TIMESTAMP | Update timestamp    |

### notes
| Field       | Type      | Description         |
|-------------|-----------|---------------------|
| id          | INTEGER   | Primary key         |
| title       | TEXT      | Note title          |
| description | TEXT      | Note description    |
| rating      | INTEGER   | Movie rating (1-5)  |
| user_id     | INTEGER   | Foreign key (users) |
| created_at  | TIMESTAMP | Creation timestamp  |
| updated_at  | TIMESTAMP | Update timestamp    |

### tags
| Field    | Type    | Description                |
|----------|---------|----------------------------|
| id       | INTEGER | Primary key                |
| note_id  | INTEGER | Foreign key (notes)        |
| user_id  | INTEGER | Foreign key (users)        |
| name     | TEXT    | Tag name                   |

## Example JSON Responses

**Get Note** (`GET /notes/:id`):
```json
{
  "id": 1,
  "title": "Inception",
  "description": "Great movie!",
  "rating": 5,
  "user_id": 1,
  "created_at": "2024-03-24T12:00:00.000Z",
  "updated_at": "2024-03-24T12:00:00.000Z",
  "names": [
    { "id": 1, "note_id": 1, "user_id": 1, "name": "Sci-Fi" },
    { "id": 2, "note_id": 1, "user_id": 1, "name": "Thriller" }
  ]
}
```

**Get Tags** (`GET /tags/:user_id`):
```json
[
  { "id": 1, "note_id": 1, "user_id": 1, "name": "Sci-Fi" },
  { "id": 2, "note_id": 1, "user_id": 1, "name": "Thriller" }
]
```

## Error Handling
- Returns appropriate HTTP status codes and error messages for invalid input or operations.

## License
MIT
