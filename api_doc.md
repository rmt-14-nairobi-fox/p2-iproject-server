# My Destination App Server

My Destination App is an application to show destinations. This app has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

### POST /destinations

> Create new asset

_Request Header_

```
{
  "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyOTg1OTU0NH0.ZekypK7I-ZIQ1mmhUXbnBBqlrcImvMUonfe5q20CvU0"
}
```

_Request Body_

```
{
  "name": "<string>",
  "country": "<string>",
  "city": "<string>",
  "price": "<integer>"
  "images": "<string>" as multer file
  "categoryId": "<integer>"
}
```

_Response (201 - Created)_

```
{
  "id": 12,
  "name": "Toraja",
  "country": "Indonesia",
  "city": "Makasar",
  "price": 4900000,
  "image": "https://ik.imagekit.io/iefyzkif2xd/Toraja_-_Makasar_BfDd0CjSK.jpg",
  "categoryId": 1,
  "authorId": 1,
  "updatedAt": "2021-08-25T03:29:23.785Z",
  "createdAt": "2021-08-25T03:29:23.785Z"
}
```

_Response (400 - Bad Request)_

```
{
  "message": [
    "<field> is required>"
  ]
}
```

_Response (413 - Payload Too Large)_

```
{
  "message": "file size excedeed the maximum size"
}
```

_Response (415 - Unsupported Media Type)_

```
{
  "message": "format file image cant be PNG"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### GET /destinations

> Get all assets

_Request Header_

```
{
  "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyOTg1OTU0NH0.ZekypK7I-ZIQ1mmhUXbnBBqlrcImvMUonfe5q20CvU0"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
  {
    "id": 11,
    "name": "Toraja",
    "country": "Indonesia",
    "city": "Makasar",
    "price": 4900000,
    "image": "https://ik.imagekit.io/iefyzkif2xd/Toraja_-_Makasar_kYfc1W_Ps.jpg",
    "authorId": 1,
    "createdAt": "2021-08-25T03:29:14.238Z",
    "updatedAt": "2021-08-25T03:29:14.238Z",
    "categoryId": 1,
    "Category": {
      "id": 1,
      "name": "Domestic",
      "createdAt": "2021-08-25T01:15:22.043Z",
      "updatedAt": "2021-08-25T01:15:22.043Z"
    }
  },
  {
    "id": 10,
    "name": "Tanah Lot",
    "country": "Indonesia",
    "city": "Bali",
    "price": 1050000,
    "image": "https://ik.imagekit.io/iefyzkif2xd/Tanah_Lot_-_Bali_R_02oL8Sz.jpg",
    "authorId": 1,
    "createdAt": "2021-08-25T03:14:55.832Z",
    "updatedAt": "2021-08-25T03:18:01.011Z",
    "categoryId": 1,
    "Category": {
      "id": 1,
      "name": "Domestic",
      "createdAt": "2021-08-25T01:15:22.043Z",
      "updatedAt": "2021-08-25T01:15:22.043Z"
    }
  },
  {
    "id": 9,
    "name": "Disney Land",
    "country": "Hongkong",
    "city": "Penny Bay",
    "price": 80000000,
    "image": "https://ik.imagekit.io/iefyzkif2xd/Disney_Land_-_Hongkong_-_Penny_Bay_aAA9Eqqsb.webp",
    "authorId": 1,
    "createdAt": "2021-08-25T03:11:11.849Z",
    "updatedAt": "2021-08-25T03:11:11.849Z",
    "categoryId": 2,
    "Category": {
      "id": 2,
      "name": "International",
      "createdAt": "2021-08-25T01:15:22.043Z",
      "updatedAt": "2021-08-25T01:15:22.043Z"
    }
  },
  {
    "id": 8,
    "name": "Pulau Lombok",
    "country": "Indonesia",
    "city": "Lombok",
    "price": 8400000,
    "image": "https://ik.imagekit.io/iefyzkif2xd/Pulau_Lombok_-Lombok_-waZLL1_5.jpg",
    "authorId": 1,
    "createdAt": "2021-08-25T03:07:27.715Z",
    "updatedAt": "2021-08-25T03:19:48.663Z",
    "categoryId": 1,
    "Category": {
      "id": 1,
      "name": "Domestic",
      "createdAt": "2021-08-25T01:15:22.043Z",
      "updatedAt": "2021-08-25T01:15:22.043Z"
    }
  },
  {
    "id": 7,
    "name": "Lake Toba",
    "country": "Indonesia",
    "city": "Medan",
    "price": 1000000,
    "image": "https://ik.imagekit.io/iefyzkif2xd/lake_toba_-_Medan_F1OSSTxEg.jpg",
    "authorId": 1,
    "createdAt": "2021-08-25T03:05:26.317Z",
    "updatedAt": "2021-08-25T03:05:26.317Z",
    "categoryId": 1,
    "Category": {
      "id": 1,
      "name": "Domestic",
      "createdAt": "2021-08-25T01:15:22.043Z",
      "updatedAt": "2021-08-25T01:15:22.043Z"
    }
  },
  {
    "id": 6,
    "name": "Colloseum",
    "country": "Italia",
    "city": "Rome",
    "price": 55000000,
    "image": "https://ik.imagekit.io/iefyzkif2xd/Italia_-_Rome_-_Colloseum_Xb-0NtvqK.jpg",
    "authorId": 2,
    "createdAt": "2021-08-25T02:59:11.751Z",
    "updatedAt": "2021-08-25T02:59:11.751Z",
    "categoryId": 2,
    "Category": {
      "id": 2,
      "name": "International",
      "createdAt": "2021-08-25T01:15:22.043Z",
      "updatedAt": "2021-08-25T01:15:22.043Z"
    }
  },
  {
    "id": 4,
    "name": "Maldewa Kian Moncer",
    "country": "Maldives",
    "city": "Maldewa",
    "price": 35000000,
    "image": "https://ik.imagekit.io/iefyzkif2xd/Maladewa_Kian_Moncer_-_Maldives_-_Maladewa_-c4Np9X0x.jpg",
    "authorId": 1,
    "createdAt": "2021-08-25T02:56:14.371Z",
    "updatedAt": "2021-08-25T02:56:14.371Z",
    "categoryId": 2,
    "Category": {
      "id": 2,
      "name": "International",
      "createdAt": "2021-08-25T01:15:22.043Z",
      "updatedAt": "2021-08-25T01:15:22.043Z"
    }
  },
  {
    "id": 3,
    "name": "Gunung Bromo",
    "country": "Indonesia",
    "city": "Malang",
    "price": 1000000,
    "image": "https://ik.imagekit.io/iefyzkif2xd/Gunung_bromo_-_Malang_CXIu20srm.jpg",
    "authorId": 1,
    "createdAt": "2021-08-25T02:55:17.537Z",
    "updatedAt": "2021-08-25T02:55:17.537Z",
    "categoryId": 1,
    "Category": {
      "id": 1,
      "name": "Domestic",
      "createdAt": "2021-08-25T01:15:22.043Z",
      "updatedAt": "2021-08-25T01:15:22.043Z"
    }
  },
  {
    "id": 2,
    "name": "Bukit Lawang",
    "country": "Indonesia",
    "city": "Medan",
    "price": 1000000,
    "image": "https://ik.imagekit.io/iefyzkif2xd/Bukit_lawang_-_Medan_C5pdCcOXt.jpg",
    "authorId": 1,
    "createdAt": "2021-08-25T02:54:24.283Z",
    "updatedAt": "2021-08-25T02:54:24.283Z",
    "categoryId": 1,
    "Category": {
      "id": 1,
      "name": "Domestic",
      "createdAt": "2021-08-25T01:15:22.043Z",
      "updatedAt": "2021-08-25T01:15:22.043Z"
    }
  },
  {
    "id": 1,
    "name": "Candi Borobudur",
    "country": "Indonesia",
    "city": "Yogyakarta",
    "price": 1000000,
    "image": "https://ik.imagekit.io/iefyzkif2xd/Borobudur_Jogja_QFvwckrvf.jpg",
    "authorId": 1,
    "createdAt": "2021-08-25T02:53:07.335Z",
    "updatedAt": "2021-08-25T02:53:07.335Z",
    "categoryId": 1,
    "Category": {
      "id": 1,
      "name": "Domestic",
      "createdAt": "2021-08-25T01:15:22.043Z",
      "updatedAt": "2021-08-25T01:15:22.043Z"
    }
  }
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### GET byPK /destinations:id

> Get all assets

_Request Header_

```
{
  "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyOTg1OTU0NH0.ZekypK7I-ZIQ1mmhUXbnBBqlrcImvMUonfe5q20CvU0"
}
```

_Request Params_

```
{
  "id": "<id to get insert into>"
}
```

_Response (200)_

```
{
  "id": 1,
  "name": "Candi Borobudur",
  "country": "Indonesia",
  "city": "Yogyakarta",
  "price": 1000000,
  "image": "https://ik.imagekit.io/iefyzkif2xd/Borobudur_Jogja_QFvwckrvf.jpg",
  "authorId": 1,
  "createdAt": "2021-08-25T02:53:07.335Z",
  "updatedAt": "2021-08-25T02:53:07.335Z",
  "categoryId": 1
}
```

_Response (404 - Not Found)_

```
{
  "message": "error not found"
}
```

---

### Put byPK /destinations/:id

_Request Header_

```
{
  "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyOTg1OTU0NH0.ZekypK7I-ZIQ1mmhUXbnBBqlrcImvMUonfe5q20CvU0"
}
```

_Request Params_

```
{
  "id": "<id to get insert into>"
}
```

_Request Body_

```
{
  "name": "<string>",
  "country": "<string>",
  "city": "<string>",
  "price": "<integer>"
  "images": "<string>"
  "categoryId": "<integer>"
}
```

_Response (200 - Updated)_

```
{
  "id": <given id by req.params.id>,
  "name": "<posted name>",
  "country": "<posted country>",
  "city": "<posted city>",
  "price": "<posted price>",
  "image": "<posted imgUrl>",
  "categoryId": "<posted CategoryId>",
  "authorId": "<posted authorId>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_

```
{
  "message": [
    "<field> is required>"
  ]
}
```

_Response (403 - Forbidden)_

```
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```
{
  "message": "data not found"
}
```

_Response (413 - Payload Too Large)_

```
{
  "message": "file size excedeed the maximum size"
}
```

_Response (415 - Unsupported Media Type)_

```
{
  "message": "format file image cant be PNG"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### Delete byPK /destinations/:id

_Request Header_

```
{
  "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyOTg1OTU0NH0.ZekypK7I-ZIQ1mmhUXbnBBqlrcImvMUonfe5q20CvU0"
}
```

_Request Params_

```
{
  "id": "<id to get insert into>"
}
```

_Request Body_

```
not needed
```

_Response (200 - Deleted)_

```
{ message: "Destination has been deleted" }
```

_Response (403 - Forbidden)_

```
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```
{
  "message": "data not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### Post /register

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "email": "<string>",
  "password": "<string>"
}
```

_Response (201 - created)_

```
{
  "id": 2,
  "email": "customer@mail.com",
  "role": "customer",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsImlhdCI6MTYyOTg1OTU4OX0.iBB8bFxGyXiL8HUfNO25N5qpN1zkRhC5p9QFcxIQ2ug"
}
```

_Response (400 - bad request)_

```
{
  "message": [
    "customer@mail.com already registered",
    "Must be email format",
    "email is required",
    "password is required"
  ]
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### Post /login

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "email": "<string>",
  "password": "<string>"
}
```

_Response (200 - success)_

```
{
  "id": 2,
  "email": "customer@mail.com",
  "role": "customer",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYyOTg2NDE5N30.2a6UtF4IBS9ShvuW66nbNnEJJE8tEnvqT2N7NuW4AzM"
}
```

_Response (401 - unauthorized)_

```
{
  "message": "Email/Password is wrong"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### Post /auth/google

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Response (200 - success)_

```
{
  "access_token": "string"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### Post /wishlists/:id

_Request Header_

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYyOTg2NDE5N30.2a6UtF4IBS9ShvuW66nbNnEJJE8tEnvqT2N7NuW4AzM"
}
```

_Request Params_

```
{
  "id": "<id to get insert into>"
}
```

_Request Body_

```
not needed
```

_Response (201 - created)_

```
{
  "UserId": 2,
  "DestinationId": 1,
  "updatedAt": "2021-08-25T04:17:47.955Z",
  "createdAt": "2021-08-25T04:17:47.955Z"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### Get /wishlists

_Request Header_

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYyOTg2NDE5N30.2a6UtF4IBS9ShvuW66nbNnEJJE8tEnvqT2N7NuW4AzM"
}
```

_Request Params_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200 - success)_

```
[
  {
    "UserId": 2,
    "DestinationId": 1,
    "createdAt": "2021-08-25T04:17:47.955Z",
    "updatedAt": "2021-08-25T04:17:47.955Z",
    "Destination": {
      "id": 1,
      "name": "Candi Borobudur",
      "country": "Indonesia",
      "city": "Yogyakarta",
      "price": 1000000,
      "image": "https://ik.imagekit.io/iefyzkif2xd/Borobudur_Jogja_QFvwckrvf.jpg",
      "authorId": 1,
      "createdAt": "2021-08-25T02:53:07.335Z",
      "updatedAt": "2021-08-25T02:53:07.335Z",
      "categoryId": 1,
      "Category": {
        "id": 1,
        "name": "Domestic",
        "createdAt": "2021-08-25T01:15:22.043Z",
        "updatedAt": "2021-08-25T01:15:22.043Z"
      }
    }
  }
]
```

_Response (401 - unauthorized)_

```
{
  "message": "Please Login First"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "Only For Customers"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### Delete /wishlists/:id

_Request Header_

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjdXN0b21lckBtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYyOTg2NDE5N30.2a6UtF4IBS9ShvuW66nbNnEJJE8tEnvqT2N7NuW4AzM"
}
```

_Request Params_

```
{
  "id": "<id to get insert into>"
}
```

_Request Body_

```
not needed
```

_Response (200 - Deleted)_

```
{
  "message": "Wishlist has been deleted"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "Forbidden"
}
```

_Response (404 - Not Found)_

```
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```


---