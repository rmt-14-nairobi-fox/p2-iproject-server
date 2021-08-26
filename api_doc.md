# Kebunku App Server
Kebunku App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### POST /register

> register user (role: 'customer')

_Request Header_
```
  not needed
```

_Request Body_
```
{
  "email": "<email in string>",
  "phone": "<phone in number>",
  "password": "<password in string>",
}
```

_Response (201 - Created)_
```
{
  "email": "eka@mail.com",
  "role": "customer",
  "access_token": <access token in string>
}
```

_Response (400 - Bad Request)_
```
{
  "message": [
    <string error messages>,
    ...
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### POST /login

> login customer

_Request Header_
```
  not needed
```

_Request Body_
```
{
  "email": "<email in string>",
  "password": "<password in string>",
}
```

_Response (200 - OK)_
```
{
  "email": "eka@mail.com",
  "role": "customer",
  "access_token": <access token in string>
}
```

_Response (401 - Unauthorized)_
```
{
  "message": [
    "invalid username or email password"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### POST /admin/register

> register user (role: 'admin')

_Request Header_
```
  not needed
```

_Request Body_
```
{
  "email": "<email in string>",
  "password": "<password in string>",
}
```

_Response (201 - Created)_
```
{
  "email": "admin@mail.com",
  "role": "admin",
  "access_token": <access token in string>
}
```

_Response (400 - Bad Request)_
```
{
  "message": [
    <string error messages>,
    ...
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### POST /admin/login

> login admin

_Request Header_
```
  not needed
```

_Request Body_
```
{
  "email": "<email in string>",
  "password": "<password in string>",
}
```

_Response (200 - OK)_
```
{
  "email": "admin@mail.com",
  "role": "admin",
  "access_token": <access token in string>
}
```

_Response (401 - Unauthorized)_
```
{
  "message": [
    "invalid username or email password"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### GET /user

> Get current user info

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": 4,
    "email": "admin@mail.com",
    "phone": <number>,
    "role": "admin"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": [
        "authentication failed"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### GET /farm

> Get (admin: all farm, customer: his farm)

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": 6,
        "name": "good sawit",
        "description": <string>,
        "imgUrl": <string>,
        "location": "medan",
        "area": 2000,
        "TypeId": 7,
        "UserId": 1,
        "createdAt": "2021-08-26T01:14:47.853Z",
        "updatedAt": "2021-08-26T01:14:47.853Z",
        "User": {
            "id": 1,
            "email": "andi@mail.com",
            "phone": <number>,
            "role": "customer",
            "createdAt": "2021-08-25T08:51:51.630Z",
            "updatedAt": "2021-08-25T08:51:51.630Z"
        },
        "Type": {
            "id": 7,
            "name": "Sawit",
            "createdAt": "2021-08-26T01:14:11.358Z",
            "updatedAt": "2021-08-26T01:14:11.358Z"
        }
    }
]
```

_Response (401 - Unauthorized)_
```
{
    "message": [
        "authentication failed"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### POST /farm

> Create for customer

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_
```
{
  "name": "<name to get insert into>",
  "description": "<description to get insert into>",
  "location": "<location to get insert into>",
  "area": <area to get insert into>,
  "typeId": <type id to get insert into>
  "imgUrl": "<insert file image>",
}
```

_Response (201 - Created)_
```
{
    "id": 6,
    "name": "good sawit",
    "description": <string>,
    "imgUrl": <string>,
    "location": "medan",
    "area": 2000,
    "TypeId": 7,
    "UserId": 1,
    "updatedAt": "2021-08-26T01:14:47.853Z",
    "createdAt": "2021-08-26T01:14:47.853Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": [
    <string error messages>,
    ...
    ]
}
```

_Response (401 - Unauthorized)_
```
{
    "message": [
        "authentication failed"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### GET /farm/:farmId

> Get farm by Id only admin or the author

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_
```
  not needed
```

_Response (200 - OK)_
```
{
    "id": 6,
    "name": "good sawit",
    "description":<string> ,
    "imgUrl": <string>,
    "location": "medan",
    "area": 2000,
    "TypeId": 7,
    "UserId": 1,
    "createdAt": "2021-08-26T01:14:47.853Z",
    "updatedAt": "2021-08-26T01:14:47.853Z"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": [
        "authentication failed"
    ]
}
```

_Response (404 - Not Found)_
```
{
  "message": [
    "it seems what you trying to find doesnt exist"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### POST /form

> Create form request for customer

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_
```
{
  "FarmId": "<FarmId to get insert into>",
  "farmName": "<farmName to get insert into>",
  "request": "<request to get insert into>",
}
```

_Response (201 - Created)_
```
{
    "id": 3,
    "user": "andi@mail.com",
    "number": 1234,
    "UserId": 1,
    "FarmId": 7,
    "farmName": "good sawit",
    "request": "edit location to manado",
    "status": "sending",
    "admin": "-",
    "updatedAt": "2021-08-26T01:16:02.110Z",
    "createdAt": "2021-08-26T01:16:02.110Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": [
    <string error messages>,
    ...
    ]
}
```

_Response (401 - Unauthorized)_
```
{
    "message": [
        "authentication failed"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### GET /form

> Get (admin: all form, customer: his form)

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": 3,
        "user": "andi@mail.com",
        "number": 1234,
        "UserId": 1,
        "FarmId": 7,
        "farmName": "good sawit",
        "request": "edit location to manado",
        "status": "sending",
        "admin": "-",
        "createdAt": "2021-08-26T01:16:02.110Z",
        "updatedAt": "2021-08-26T01:16:02.110Z"
    },
    ...
]
```

_Response (401 - Unauthorized)_
```
{
    "message": [
        "authentication failed"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### GET /type

> Get all type

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": 7,
        "name": "Sawit",
        "createdAt": "2021-08-26T01:14:11.358Z",
        "updatedAt": "2021-08-26T01:14:11.358Z"
    },
    {
        "id": 8,
        "name": "Kelapa",
        "createdAt": "2021-08-26T01:14:11.358Z",
        "updatedAt": "2021-08-26T01:14:11.358Z"
    },
    ...
]
```

_Response (401 - Unauthorized)_
```
{
    "message": [
        "authentication failed"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### GET /admin/form/:id

> Get one form

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": 2,
    "user": "andi@mail.com",
    "number": 1234,
    "UserId": 1,
    "FarmId": 1,
    "farmName": "good sawit",
    "request": "delete this farm",
    "status": "deleted",
    "admin": "admin@mail.com",
    "createdAt": "2021-08-25T11:43:54.722Z",
    "updatedAt": "2021-08-25T11:54:38.708Z"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": [
        "authentication failed"
    ]
}
```

_Response (403 - Forbidden)_
```
{
    "msg": [
        "you didn't have permission"
    ]
}
```

_Response (404 - Not Found)_
```
{
    "msg": [
        "it seems what you trying to find doesnt exist"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### PUT /admin/farm/:farmId

> Update farm by Id

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_
```
{
  "name": "<name to get insert into>",
  "location": "<location to get insert into>",
  "area": <area to get insert into>,
  "formId": <form id to get insert into>
}
```

_Response (200 - OK)_
```
{
    "id": 6,
    "name": "sawit ijo",
    "description": <string>,
    "imgUrl": <string>,
    "location": "menado",
    "area": 34555,
    "TypeId": 7,
    "UserId": 1,
    "createdAt": "2021-08-26T01:14:47.853Z",
    "updatedAt": "2021-08-26T02:37:55.164Z"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": [
        "authentication failed"
    ]
}
```

_Response (403 - Forbidden)_
```
{
  "message": [
    "you didn't have permission"
  ]
}
```

_Response (404 - Not Found)_
```
{
  "message": [
    "it seems what you trying to find doesnt exist"
  ]
}
```

_Response (400 - Bad Request)_
```
{
  "message": [
    <string error messages>,
    ...
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### DELETE admin/transportation/:farmId

> Delete farm by Id

_Request Header_
```
{
  "access_token": "<access token>"
}
```

_Request Body_
```
  {
      formId : <form id>
  }
```

_Response (200 - OK)_
```
{
    "message": "Farm success to delete"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": [
        "authentication failed"
    ]
}
```

_Response (403 - Forbidden)_
```
{
  "message": [
    "you didn't have permission"
  ]
}
```

_Response (404 - Not Found)_
```
{
  "message": [
    "it seems what you trying to find doesnt exist"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---
### GET /user

> Get current user info

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
{
    "last_updated_epoch": 1629949500,
    "last_updated": "2021-08-26 10:45",
    "temp_c": 32,
    "temp_f": 89.6,
    "is_day": 1,
    "condition": {
        "text": "Partly cloudy",
        "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
        "code": 1003
    },
    "wind_mph": 4.3,
    "wind_kph": 6.8,
    "wind_degree": 150,
    "wind_dir": "SSE",
    "pressure_mb": 1010,
    "pressure_in": 29.83,
    "precip_mm": 0,
    "precip_in": 0,
    "humidity": 49,
    "cloud": 25,
    "feelslike_c": 42.1,
    "feelslike_f": 107.7,
    "vis_km": 6,
    "vis_miles": 3,
    "uv": 7,
    "gust_mph": 4.7,
    "gust_kph": 7.6
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": [
    "Internal server error"
    ]
}
```

---