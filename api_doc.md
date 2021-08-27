# H8-sign-on App Server

H8-sign-on App is an application to make a change. This app has : 

* RESTful endpoint for Post's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### POST /register

> Register new User

_Request Header_

```JSON
not needed
```

_Request Body_

```JSON
{
    "username": "Admin Raw",
    "email": "adminraw@mail.com",
    "password": "adminraw"
}
```

_Response (201 Created)_

```JSON
{
    "id": 3,
    "username": "Admin Raw",
    "email": "adminraw@mail.com"
}
```

_Response (400 - Bad Request)_
```JSON
{
    "message": [
        "User.email cannot be empty",
        "Must be email formatted",
        "User.password cannot be empty",
        "Password length must between 5 and 20"
    ]
}
```

_Response (500 - Internal Server Error)_

```JSON
{
  "message": [
      "Internal server error"
  ]
}
```
---

### POST /login

> Login for registered User

_Request Header_

```JSON
not needed
```

_Request Body_

```JSON
{
    "email": "sample@mail.com",
    "password": "12345678",
}
```

_Response (200 OK)_

```JSON
{
    "access_token": "<adminraw access_token>"
}
```

_Response (401 - Unauthorized)_
```JSON
{
    "message": [
        "Invalid email or password"
    ]
}
```

_Response (500 - Internal Server Error)_

```JSON
{
  "message": [
      "Internal server error"
  ]
}
```
---

### POST /petitions

> Create new Petition

_Request Header_
```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_
```JSON
{
    "title": "A nice Title",
    "description": "A content to contain",
    "imageUrl": "http://some.img.url",
    "source": "https://some.news.url",
    "maxCount": 50000
}
```

_Response (201 - Created)_
```JSON
{
    "id": 5,
    "authorId": 3,
    "title": "Test Nodemailer",
    "description": "Lorem ipsum sit amet",
    "imageUrl": "https://i.ibb.co/NVPBtb1/747f3376f58c.jpg",
    "source": "https://news.detik.com/",
    "signCount": 1,
    "maxCount": 2,
    "status": "published",
    "updatedAt": "2021-08-26T12:18:48.144Z",
    "createdAt": "2021-08-26T12:18:48.144Z"
}
```

_Response (400 - Bad Request)_
```JSON
{
    "message": [
        "Petition.title cannot be empty",
        "Petition.description cannot be empty",
        "Petition.source cannot be empty",
        "Petition.maxCount cannot be empty"
    ]
}
```

_Response (401 - Forbidden)_

```JSON
{
    "message": [
        "You must login first"
    ]
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": [
        "Internal server error"
    ]
}
```

---

### POST /signs/:id

> Sign a Petition

_Request Header_
```JSON
{
    "access_token": "<your access token>"
}
```

_Request Body_
```JSON
not needed
```

_Response (201 - Created)_
```JSON
{
    "id": 10,
    "petitionId": 5,
    "userId": 2
}
```

_Response (404 - Not Found)_
```JSON
{
    "message": [
        "There are no such Petition"
    ]
}
```

_Response (403 - Forbidden)_

```JSON
{
    "message": [
        "You already sign this petition"
    ]
}
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": [
        "Internal server error"
    ]
}
```

---

### GET /public/home

> Create new Post

_Request Header_
```JSON
not needed
```

_Request Body_
```JSON
not needed
```

_Response (200 - Ok)_
```JSON
[
    {
        "id": 4,
        "authorId": 2,
        "title": "Sample Title two",
        "imageUrl": "https://i.ibb.co/B2Tfpg9/6aea8d960cb2.jpg",
        "description": "Lorem ipsum sit",
        "source": "https://news.detik.com/",
        "signCount": 1,
        "status": "published",
        "maxCount": 2,
        "createdAt": "2021-08-26T12:09:31.505Z",
        "updatedAt": "2021-08-26T12:09:31.505Z",
        "User": {
            "username": "Sample"
        }
    }
]
```

_Response (500 - Internal Server Error)_

```JSON
{
    "message": [
        "Internal server error"
    ]
}
```

---