# Book Management API

A simple RESTful API for managing books using Express.js, TypeScript, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account

## Installation

1. Clone the repository:
bash
git clone <repository-url>
cd problem5

2. Install dependencies:
bash
npm install

3. Create a `.env` file in the root directory:

```env:problem5/REAME.md
PORT=2222
MONGODB_URI=mongodb+srv://admin:admin123456@cluster0.ktq0x.mongodb.net/?retryWrites=true&appName=cluster0
```

## Running the Application

Development mode with auto-reload:
```bash
npm run dev
```

Build and run in production:
```bash
npm run build
npm start
```

## API Endpoints

### Create a Book
- **POST** `/api/books`
```json
{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 29.99,
    "publishedYear": 1925
}
```

### Get All Books
- **GET** `/api/books`
- Optional query parameters:
  - author
  - year

### Get Book by ID
- **GET** `/api/books/:id`

### Update Book
- **PUT** `/api/books/:id`
```json
{
    "title": "Updated Title",
    "price": 39.99
}
```

### Delete Book
- **DELETE** `/api/books/:id`

## Project Structure
```
src/
├── config/
│   └── database.ts
├── controllers/
│   └── bookController.ts
├── middleware/
│   ├── validator.ts
│   └── errorHandler.ts
├── models/
│   └── book.ts
├── routes/
│   └── bookRoutes.ts
├── services/
│   └── bookService.ts
├── utils/
│   └── errors.ts
├── validators/
│   └── bookValidator.ts
└── server.ts
```

## Error Handling

The API uses custom error classes for consistent error responses:
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

Example error response:
```json
{
    "status": "fail",
    "message": "Book not found",
    "errors": []
}
```

## Technologies Used

- Express.js
- TypeScript
- MongoDB with Mongoose
- Joi for validation
- dotenv for environment variables
