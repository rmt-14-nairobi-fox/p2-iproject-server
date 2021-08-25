# My Assets App Server

My Assets App is an application to manage your assets. This app has :

- REST endpoint
- JSON formatted response

&nbsp;

## REST endpoints

## users

### POST /user/login

> Login user

_Request Header_

```
  not needed
```

_Request Body_

```
{
  "email": "String",
  "password": "String"
}
```

_Response (200 - OK)_

```
{
  "userProfile": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmRyZWFzMTYwMjk1QGdtYWlsLmNvbSIsImlhdCI6MTYyOTkwNzYzMn0.jfj3fym95a4VjS37jQpnRFAyRW1vl1pOh3Yblst6JD4",
    "id": 1,
    "username": "andreas",
    "email": "andreas160295@gmail.com",
    "profilePict": "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
  },
  "message": "you have succesfully login"
}
```

_Response (401 - Unauthorized)_

```
{
  "message": "invalid user email/password"
}
```

---

## REST endpoints

## Animal

### GET /animal

> Get all animal

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "id": 1,
    "name": "Inu",
    "type": "Dog",
    "imageUrl": "https://images.unsplash.com/photo-1588023271850-1d1df380a6e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
    "UserId": 1,
    "createdAt": "2021-08-25T07:41:53.814Z",
    "updatedAt": "2021-08-25T07:41:53.814Z",
    "User": {
      "id": 1,
      "username": "andreas",
      "email": "andreas160295@gmail.com",
      "phoneNumber": "123456789",
      "address": "dimana aja",
      "profilePict": "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
      "latitude": "-6.9344694",
      "longitude": "107.6049539",
      "createdAt": "2021-08-25T07:41:53.751Z",
      "updatedAt": "2021-08-25T07:41:53.751Z"
    }
  },
  ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal server error"
}
```

---

### POST /animal

> Create new animal

_Request Header_

```
  not needed
```

_Request Body_

```
{
  "name": "String",
  "type": "String",
  "imageUrl": "String",
}
```

_Response (201 - Created)_

```
{
  "id": 5,
  "name": "tes jalan",
  "type": "dog",
  "imageUrl": "https://images.unsplash.com/photo-1613507195897-d0a6e24ebc05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
  "UserId": 1,
  "updatedAt": "2021-08-25T16:08:20.038Z",
  "createdAt": "2021-08-25T16:08:20.038Z"
}
```

_Response (400 - Bad Request)_

```
{
  "message": [
    "name field must be filled",
    "type field must be filled",
    "imageUrl field must be filled"
  ]
}
```

---

### POST /nearbyPost

> Create new animal

_Request Header_

```
  not needed
```

_Request Body_

```
{
  "ip": "String",
  "type": "String",
  "imageUrl": "String",
}
```

<!-- 139.192.187.67 -->

_Response (201 - Created)_

```
{
[
  {
    "id": 2,
    "name": "Felix",
    "type": "Cat",
    "imageUrl": "https://images.unsplash.com/photo-1591429939960-b7d5add10b5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1233&q=80",
    "UserId": 2,
    "createdAt": "2021-08-25T07:41:53.814Z",
    "updatedAt": "2021-08-25T07:41:53.814Z",
    "User": {
      "id": 2,
      "username": "adit",
      "email": "yohero2019@gmail.com",
      "phoneNumber": "123456789",
      "address": "dimana aja",
      "profilePict": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
      "latitude": "-6.4071903",
      "longitude": "106.8158348",
      "createdAt": "2021-08-25T07:41:53.771Z",
      "updatedAt": "2021-08-25T07:41:53.771Z"
    }
  },
  ...
]
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Failed to get ip"
}
```

```
{
  "message": "Sorry no nearby adopt pet"
}
```

---
