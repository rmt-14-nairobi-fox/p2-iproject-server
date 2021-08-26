## RESTful endpoints

### POST /user/auth

> POST

_Request Header_

```
not need
```

_Request Body_

```
{
    idToken: "string"
}
```

_Response (200)_

```
{
    access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhZGFtNEBtYWlsLmNvbSIsImlhdCI6MTYyODAzNDQzNH0._b9qE5FYwDBMSR7Ln0_WGiLrWVBOPUk3EzG-a_on1y0"
    email: "adam@mail.com"
}
```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```

### POST /login

> POST login user

_Request Header_

```
not need
```

_Request Body_

```
{
    "email": "adam4@mail.com"
    "password": "12345"
}
```

_Response (200)_

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJhZGFtNEBtYWlsLmNvbSIsImlhdCI6MTYyODAzNDQzNH0._b9qE5FYwDBMSR7Ln0_WGiLrWVBOPUk3EzG-a_on1y0"
}
```

_Response (401 - Unauthorized Login)_

```
{
    massage: "email/password invalid"
}

```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```

### POST /user/register

> POST register new user

_Request Header_

```
not need
```

_Request Body_

```
{

    "email": "adi@mail.com"
    "password": 12345
    "username":adi,
}
```

_Response (200)_

```
{
    "id": 5,
    "email": "adi@mail.com"
}
```

_Response (401 - email already used)_

```
{
  "message": "email is already exists"
}
```

_Response (401 - field required)_

```
{
 "message": [
        "email cannot be null",
        "password cannot be null",
        "username cannot be null",
    ]
}
```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```

### GET /review

> Get all review

_Request Header_

```
access_token =  "string"
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 8,
        "url": "https://myanimelist.net/anime/34445/Yuuki_Yuuna_wa_Yuusha_de_Aru__Yuusha_no_Shou",
        "image_url": "https://cdn.myanimelist.net/images/anime/8/83013.jpg?s=3b88e89668fdba73fedbdd72be69ec65",
        "title": "Yuuki Yuuna wa Yuusha de Aru: Yuusha no Shou",
        "episodes": 6,
        "rated": "PG-13",
        "userpoin": 10,
        "review": "ANIME YANG SANGAT OP miu wangy wangy",
        "recomendation": "recomended",
        "UserId": 1,
        "createdAt": "2021-08-24T23:07:03.331Z",
        "updatedAt": "2021-08-24T23:33:55.610Z",
        "User": {
            "id": 1,
            "email": "admin@mail.com"
        }
    },
    {
        "id": 12,
        "url": "https://myanimelist.net/anime/4134/Naruto__Shippuuden_-_Shippuu_Konoha_Gakuen_Den",
        "image_url": "https://cdn.myanimelist.net/images/anime/5/51895.jpg?s=50657ee2b01cf3e31680314e7fe65981",
        "title": "Naruto: Shippuuden - Shippuu! \"Konoha Gakuen\" Den",
        "episodes": 1,
        "rated": "PG-13",
        "userpoin": 8,
        "review": "ni anime keren ish",
        "recomendation": "recomended",
        "UserId": 2,
        "createdAt": "2021-08-25T11:26:26.130Z",
        "updatedAt": "2021-08-25T11:26:26.130Z",
        "User": {
            "id": 2,
            "email": "adam@mail.com"
        }
    },
    {
        "id": 9,
        "url": "https://myanimelist.net/anime/19511/Naruto__Shippuuden_-_Sunny_Side_Battle",
        "image_url": "https://cdn.myanimelist.net/images/anime/1047/91638.jpg?s=0fc6795322dd479caca2103d775de05b",
        "title": "Naruto: Shippuuden - Sunny Side Battle",
        "episodes": 1,
        "rated": "PG-13",
        "userpoin": 10,
        "review": "itachi ga jelas",
        "recomendation": "recomended",
        "UserId": 2,
        "createdAt": "2021-08-25T02:30:45.905Z",
        "updatedAt": "2021-08-25T02:30:45.905Z",
        "User": {
            "id": 2,
            "email": "adam@mail.com"
        }
    }
    ...
]
```

_Response (401 - Unauthorized)_

```
{
    massage: "Unauthorized"
}
```

_Response (401 - Invalid Token)_

```
{
    massage: "Invalid Token"
}
```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```

### GET /review/myreview

> Get my review

_Request Header_

```
access_token =  "string"
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 12,
        "url": "https://myanimelist.net/anime/4134/Naruto__Shippuuden_-_Shippuu_Konoha_Gakuen_Den",
        "image_url": "https://cdn.myanimelist.net/images/anime/5/51895.jpg?s=50657ee2b01cf3e31680314e7fe65981",
        "title": "Naruto: Shippuuden - Shippuu! \"Konoha Gakuen\" Den",
        "episodes": 1,
        "rated": "PG-13",
        "userpoin": 8,
        "review": "ni anime keren ish",
        "recomendation": "recomended",
        "UserId": 2,
        "createdAt": "2021-08-25T11:26:26.130Z",
        "updatedAt": "2021-08-25T11:26:26.130Z",
        "User": {
            "id": 2,
            "email": "adam@mail.com"
        }
    },
    {
        "id": 9,
        "url": "https://myanimelist.net/anime/19511/Naruto__Shippuuden_-_Sunny_Side_Battle",
        "image_url": "https://cdn.myanimelist.net/images/anime/1047/91638.jpg?s=0fc6795322dd479caca2103d775de05b",
        "title": "Naruto: Shippuuden - Sunny Side Battle",
        "episodes": 1,
        "rated": "PG-13",
        "userpoin": 10,
        "review": "itachi ga jelas",
        "recomendation": "recomended",
        "UserId": 2,
        "createdAt": "2021-08-25T02:30:45.905Z",
        "updatedAt": "2021-08-25T02:30:45.905Z",
        "User": {
            "id": 2,
            "email": "adam@mail.com"
        }
    }
    ...
]
```

_Response (404 - Unauthorized)_

```
{
    message: "Review not Found"
}
```

_Response (401 - Unauthorized)_

```
{
    massage: "Unauthorized"
}
```

_Response (401 - Invalid Token)_

```
{
    massage: "Invalid Token"
}
```

_Response (403 - Forbiden)_

```
{
    message: "Forbidden Access"
}
```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```

### POST /review

> post my review

_Request Header_

```
access_token =  "string"
```

_Request Body_

```
{
    url: "https://myanimelist.net/anime/4134/Naruto__Shippuuden_-_Shippuu_Konoha_Gakuen_Den",
    image_url: "https://cdn.myanimelist.net/images/anime/5/51895.jpg?s=50657ee2b01cf3e31680314e7fe65981",
    title: "Naruto: Shippuuden - Shippuu! \"Konoha Gakuen\" Den",
    episodes: 1,
    rated: "PG-13",
    userpoin: 8,
    review: "ni anime keren ish",
    recomendation: "recomended",
}

```

_Response (200)_

```
{
    "id": 12,
    "url": "https://myanimelist.net/anime/4134/Naruto__Shippuuden_-_Shippuu_Konoha_Gakuen_Den",
    "image_url": "https://cdn.myanimelist.net/images/anime/5/51895.jpg?s=50657ee2b01cf3e31680314e7fe65981",
    "title": "Naruto: Shippuuden - Shippuu! \"Konoha Gakuen\" Den",
    "episodes": 1,
    "rated": "PG-13",
    "userpoin": 8,
    "review": "ni anime keren ish",
    "recomendation": "recomended",
    "UserId": 2,
    "createdAt": "2021-08-25T11:26:26.130Z",
    "updatedAt": "2021-08-25T11:26:26.130Z",
    "User": {
        "id": 2,
        "email": "adam@mail.com"
}


```

_Response (401 - Unauthorized)_

```
{
    massage: "Unauthorized"
}
```

_Response (401 - Invalid Token)_

```
{
    massage: "Invalid Token"
}
```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```

### PUT /review/:id

> edit my review

_Request Header_

```
access_token =  "string"
```

_Request Body_

```
{
    userpoin: 8,
    review: "ni anime keren ish",
    recomendation: "recomended",
}

```

_Response (200)_

```
{
    "id": 12,
    "url": "https://myanimelist.net/anime/4134/Naruto__Shippuuden_-_Shippuu_Konoha_Gakuen_Den",
    "image_url": "https://cdn.myanimelist.net/images/anime/5/51895.jpg?s=50657ee2b01cf3e31680314e7fe65981",
    "title": "Naruto: Shippuuden - Shippuu! \"Konoha Gakuen\" Den",
    "episodes": 1,
    "rated": "PG-13",
    "userpoin": 8,
    "review": "ni anime keren ish",
    "recomendation": "recomended",
    "UserId": 2,
    "createdAt": "2021-08-25T11:26:26.130Z",
    "updatedAt": "2021-08-25T11:26:26.130Z",
}


```

_Response (404 - Unauthorized)_

```
{
    message: "Review not Found"
}
```

_Response (401 - Unauthorized)_

```
{
    massage: "Unauthorized"
}
```

_Response (401 - Invalid Token)_

```
{
    massage: "Invalid Token"
}
```

_Response (403 - Forbiden)_

```
{
    message: "Forbidden Access"
}
```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```

### DELETE /review/:id

> delete my review

_Request Header_

```
access_token = "string"
```

_Request Body_

```
not needed

```

_Response (200)_

```
{
    message : "review has been delete"
}


```

_Response (404 - Unauthorized)_

```
{
    message: "Review not Found"
}
```

_Response (401 - Unauthorized)_

```
{
    massage: "Unauthorized"
}
```

_Response (401 - Invalid Token)_

```
{
    massage: "Invalid Token"
}
```

_Response (403 - Forbiden)_

```
{
    message: "Forbidden Access"
}
```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```
