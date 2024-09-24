Prerequisites

Before running the application, make sure you have the following installed:

- Docker
- Docker Compose

Running the Application with Docker Compose

1. Clone the repository:

   git clone <your-repo-url>
   cd <your-project-directory>

2. Build and run the containers:

   docker-compose up --build

3. Access the API at http://localhost:3000.

# API Documentation

This API provides authentication services (sign-up, sign-in) and wallet management for authenticated users. All endpoints that modify wallet data require authentication via a JSON Web Token (JWT).

## Authentication Endpoints

### POST `/signup`
Register a new user.

Request:
- URL: `/signup`
- Method: `POST`
- Body (JSON):
  {
    "email": "user@example.com",
    "password": "password123"
  }

Response:
- 201 Created:
  {
    "token": "JWT_TOKEN"
  }
- 400 Bad Request: If the user already exists.
  {
    "message": "User already exists"
  }
- 500 Server Error: If any other server issue occurs.

### POST `/signin`
Authenticate an existing user and retrieve a JWT token.

Request:
- URL: `/signin`
- Method: `POST`
- Body (JSON):
  {
    "email": "user@example.com",
    "password": "password123"
  }

Response:
- 200 OK:
  {
    "token": "JWT_TOKEN"
  }
- 401 Unauthorized: If the email or password is incorrect.
  {
    "message": "Invalid email or password"
  }
- 500 Server Error: If any server-side issue occurs.

---

## Wallet Management Endpoints

### GET `/wallets`
Retrieve all wallets for the authenticated user.

Request:
- URL: `/wallets`
- Method: `GET`
- Headers: 
  - Authorization: Bearer JWT_TOKEN

Response:
- 200 OK: Returns a list of wallets.
  [
    {
      "id": 1,
      "tag": "My Wallet",
      "chain_id": 1,
      "address": "0x123..."
    }
  ]
- 401 Unauthorized: If the user is not authenticated.
  {
    "message": "Unauthorized"
  }
- 500 Server Error: If any server issue occurs.

### POST `/wallets`
Create a new wallet for the authenticated user.

Request:
- URL: `/wallets`
- Method: `POST`
- Headers: 
  - Authorization: Bearer JWT_TOKEN
- Body (JSON):
  {
    "tag": "My Wallet",
    "chain_id": 1,
    "address": "0x123..."
  }

Response:
- 201 Created: Returns the created wallet.
  {
    "id": 1,
    "tag": "My Wallet",
    "chain_id": 1,
    "address": "0x123..."
  }
- 400 Bad Request: If required fields are missing.
  {
    "message": "Please provide all required fields"
  }
- 500 Server Error: If any server issue occurs.

### GET `/wallets/:id`
Retrieve a specific wallet by ID.

Request:
- URL: `/wallets/:id`
- Method: `GET`
- Headers: 
  - Authorization: Bearer JWT_TOKEN

Response:
- 200 OK: Returns the wallet with the specified ID.
  {
    "id": 1,
    "tag": "My Wallet",
    "chain_id": 1,
    "address": "0x123..."
  }
- 400 Bad Request: If the wallet ID is not provided.
  {
    "message": "Wallet ID is required"
  }
- 404 Not Found: If the wallet is not found.
  {
    "message": "Wallet not found"
  }
- 500 Server Error: If any server issue occurs.

### PUT `/wallets/:id`
Update a wallet for the authenticated user.

Request:
- URL: `/wallets/:id`
- Method: `PUT`
- Headers: 
  - Authorization: Bearer JWT_TOKEN
- Body (JSON): Any combination of the following fields
  {
    "tag": "Updated Tag",
    "chain_id": 2,
    "address": "0xabc..."
  }

Response:
- 200 OK: Returns the updated wallet.
  {
    "id": 1,
    "tag": "Updated Tag",
    "chain_id": 2,
    "address": "0xabc..."
  }
- 400 Bad Request: If no fields to update are provided.
  {
    "message": "Please provide at least one field to update"
  }
- 404 Not Found: If the wallet is not found or the user is not authorized.
  {
    "message": "Wallet not found or not authorized"
  }
- 500 Server Error: If any server issue occurs.

### DELETE `/wallets/:id`
Delete a wallet by ID.

Request:
- URL: `/wallets/:id`
- Method: `DELETE`
- Headers: 
  - Authorization: Bearer JWT_TOKEN

Response:
- 204 No Content: If the wallet was successfully deleted.
- 404 Not Found: If the wallet is not found or the user is not authorized.
  {
    "message": "Wallet not found or not authorized"
  }
- 500 Server Error: If any server issue occurs.

---

### Authorization
All wallet-related endpoints require the user to be authenticated by passing a JWT token in the `Authorization` header.

- Example: Authorization: Bearer JWT_TOKEN
