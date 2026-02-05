# Refined Jiji API Documentation

## Base URL
```
https://api.refined-jiji.com
```

## Authentication

All API requests require authentication using JWT tokens in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+2341234567890",
  "location": "Lagos, Nigeria"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+2341234567890",
    "location": "Lagos, Nigeria",
    "isVerified": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

#### POST /auth/login
Login user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Listings

#### GET /listings
Get listings with optional filters.

**Query Parameters:**
- `category`: Category ID
- `location`: Location string
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `condition`: new|used|refurbished
- `search`: Search query
- `sortBy`: createdAt|price|views
- `sortOrder`: asc|desc
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response:**
```json
{
  "listings": [
    {
      "id": "listing_id",
      "title": "iPhone 15 Pro",
      "description": "Latest iPhone model",
      "price": 1500000,
      "currency": "NGN",
      "condition": "new",
      "location": "Lagos",
      "images": ["image_url_1", "image_url_2"],
      "category": {
        "id": "category_id",
        "name": "Mobile Phones"
      },
      "user": {
        "id": "user_id",
        "firstName": "John",
        "lastName": "Doe",
        "avatar": "avatar_url",
        "isVerified": true
      },
      "views": 150,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### POST /listings
Create a new listing.

**Request Body:**
```json
{
  "title": "iPhone 15 Pro",
  "description": "Brand new iPhone 15 Pro",
  "price": 1500000,
  "categoryId": "category_id",
  "condition": "new",
  "location": "Lagos, Nigeria",
  "latitude": 6.5244,
  "longitude": 3.3792,
  "images": ["image_url_1"],
  "tags": ["iphone", "mobile", "apple"]
}
```

#### PUT /listings/:id
Update a listing.

#### DELETE /listings/:id
Delete a listing (soft delete).

### Chat

#### GET /chat
Get user's conversations.

**Response:**
```json
{
  "conversations": [
    {
      "id": "conversation_id",
      "listing": {
        "id": "listing_id",
        "title": "iPhone 15 Pro",
        "images": ["image_url"]
      },
      "buyer": {
        "id": "buyer_id",
        "firstName": "Jane",
        "lastName": "Smith",
        "avatar": "avatar_url"
      },
      "seller": {
        "id": "seller_id",
        "firstName": "John",
        "lastName": "Doe",
        "avatar": "avatar_url"
      },
      "lastMessageAt": "2024-01-01T12:00:00.000Z",
      "messages": [
        {
          "content": "Hi, is this still available?",
          "createdAt": "2024-01-01T12:00:00.000Z",
          "senderId": "buyer_id"
        }
      ]
    }
  ]
}
```

#### GET /chat/:conversationId/messages
Get messages in a conversation.

#### POST /chat/:conversationId/messages
Send a message.

**Request Body:**
```json
{
  "content": "Hello, I'm interested in your item"
}
```

### Payments

#### POST /payments/initialize
Initialize a payment for escrow.

**Request Body:**
```json
{
  "listingId": "listing_id",
  "amount": 1500000
}
```

#### POST /payments/deposit
Deposit funds (for sellers).

#### POST /payments/withdraw
Withdraw funds.

### Users

#### GET /users/:id
Get user profile.

#### GET /users/:id/listings
Get user's listings.

#### GET /users/:id/reviews
Get user's reviews.

#### POST /users/:id/reviews
Submit a review.

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Great seller, item as described",
  "listingId": "listing_id"
}
```

## Error Responses

All errors follow this format:

```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

API requests are limited to 100 requests per 15 minutes per IP address.

## WebSocket Events

Real-time chat uses Socket.io:

```javascript
// Join conversation
socket.emit('join_conversation', conversationId);

// Send message
socket.emit('send_message', {
  conversationId,
  content: 'Hello!',
  senderId: userId
});

// Listen for new messages
socket.on('new_message', (message) => {
  console.log('New message:', message);
});
```