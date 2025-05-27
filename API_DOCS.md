# API Documentation

This document provides an overview of the available API endpoints used in the Bumi Kahuripan, a guesthouse/lodgings management system.

> Base URL: `https://bumi-kahuripan.up.railway.app/api`

## 🔐 Authentication

All endpoints are protected using **Bearer Token Authentication**. Include the token in the request header:

```
Authorization: Bearer your-access-token
```

## 👥 Guests/Orders

> **GET** `/orders`

<details>
  <summary>Return a message and a list of all guests and orders records.</summary>

```json
{
  "message": "Guest and Order successfully fetched",
  "orders": [
    {
      "id": 1,
      "guest_id": 1,
      "room_id": 2,
      "start_date": "2025-01-01",
      "end_date": "2025-01-03",
      "total_price": 600000,
      "status_id": 3,
      "guest": {
        "id": 1,
        "name": "John Doe",
        "origin": "New York",
        "phone": "081234567890",
        "identity_photo": "uploads/b0rLIv0fFYjpBiDdQfNEw6TxyaJGdSFddpALvdB8.jpg"
      },
      "room": {
        "id": 2,
        "number": 102,
        "price": 300000,
        "status_id": 2,
        "category_id": 1
      }
    }
  ],
  "rooms": [
    {
      "id": 2,
      "number": 102,
      "price": 300000,
      "status_id": 2,
      "category_id": 1
    }
  ]
}
```

</details>

> **GET** `/orders/{id}`

<details>
  <summary>Return a message and room record</summary>

```json
{
  "message": "Guest and Order successfully fetched.",
  "room": {
    "id": 1,
    "number": 101,
    "price": 250000,
    "status_id": 1,
    "category_id": 1
  }
}
```

</details>

> **POST** `/orders`

<details>
  <summary>Return a message</summary>

```json
{
  "message": "Guest and Order successfully created."
}
```

</details>

> **PUT** `/orders/{id}`

<details>
  <summary>Return a message</summary>

```json
{
  "message": "Guest and Order successfully updated."
}
```

</details>

> **DELETE** `/orders/{id}`

<details>
  <summary>Return a message</summary>

```json
{
  "message": "Guest and Order successfully deleted."
}
```

</details>

## 🏠 Rooms

> **GET** `/rooms`

<details>
  <summary>Return a message and a list of all rooms records</summary>

```json
{
  "message": "Rooms successfully fetched.",
  "rooms": [
    {
      "id": 1,
      "number": 101,
      "price": 300000,
      "status_id": 1,
      "category_id": 1,
      "category": {
        "id": 1,
        "name": "ac",
        "additional_price": 50000
      }
    },
    {
      "id": 2,
      "number": 102,
      "price": 250000,
      "status_id": 2,
      "category_id": 2,
      "category": {
        "id": 2,
        "name": "non ac",
        "additional_price": null
      }
    }
  ],
  "categories": [
    {
      "id": 1,
      "name": "ac",
      "additional_price": 50000
    },
    {
      "id": 2,
      "name": "non ac",
      "additional_price": null
    }
  ]
}
```

</details>

> **GET** `/rooms/{id}`

<details>
  <summary>Return a message and room record</summary>

```json
{
  "message": "Room successfully fetched.",
  "room": {
    "id": 1,
    "number": 101,
    "price": 250000,
    "status_id": 1,
    "category_id": 1
  }
}
```

</details>

> **POST** `/rooms`

<details>
  <summary>Return a message</summary>

```json
{
  "message": "Room successfully created."
}
```

</details>

> **PUT** `/rooms/{id}`

<details>
  <summary>Return a message</summary>

```json
{
  "message": "Room successfully updated."
}
```

</details>

> **DELETE** `/rooms/{id}`

<details>
  <summary>Return a message</summary>

```json
{
  "message": "Room successfully deleted."
}
```

</details>

## ⚙️ Settings

> **GET** `/settings`

<details>
  <summary>Return a message and a list of all editable settings</summary>

```json
{
  "message": "All settings successfully fetched.",
  "data": {
    "categories": [
      {
        "id": 1,
        "name": "ac",
        "additional_price": 50000
      },
      {
        "id": 2,
        "name": "non ac",
        "additional_price": 0
      }
    ]
  }
}
```

</details>

> **PUT** `/settings`

<details>
  <summary>Return a message</summary>

```json
{
  "message": "Settings successfully updated."
}
```

</details>
