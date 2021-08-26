# PENGANGGURANS App Server

H8-blog App is an application to show some services. This app has :

- RESTful endpoint for services
- JSON formatted response

## API Reference

#### Sign Oauth Google

```http
  POST /users/auth/google
```

_Request Body_

| Parameter      | Type     | Description   |
| :------------- | :------- | :------------ |
| `access_token` | `string` | **Required**. |

_Response (201)_

```
{
  "access_token": <user access token>
}
```

_Response (500 - Internal Server Erro)_

```
{
  "message": "Internal Server Error"
}
```

---

#### Register User

```http
  POST /users/register
```

_Request Body_

| Parameter     | Type     | Description   |
| :------------ | :------- | :------------ |
| `fullName`    | `string` | **Required**. |
| `username`    | `string` | **Required**. |
| `email`       | `string` | **Required**. |
| `password`    | `string` | **Required**. |
| `phoneNumber` | `string` | **Required**. |
| `address`     | `string` | **Required**. |

_Response (201)_

```
{
    "id": <user id>,
    "email": "<user email>"
}
```

Response (400 - Bad Request)

```
{
    "message": [
        "name is required",
        "must be email format",
        "email is required",
        ...
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

#### Login user

```http
  POST /users/login
```

_Request Body_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required Unique**. |
| `password` | `string` | **Required min 5**. |

_Response (200)_

```
{
  "access_token": <user access token>
}
```

Response (400 - Bad Request)

```
{
  "message": [
    "email can not be empty",
    "password can not be empty"
    ...
  ]
}
```

Response (401 - Unauthorized)

```
{
  "message": "Email/password invalid"
    ...
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

#### Fetch Login User

```http
  GET /users/
```

_Request Header_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `acess_token` | `string` | **Required**. |

_Response (200)_

```
{
    "id": 1,
    "fullName": "test coba",
    "email": "cust2@mail.com",
    "phoneNumber": "08123646372",
    "username": "customer2",
    "address": "Jl. Singgasana no 69.  Pringsewu, Lampung, Indonesia.",
    "imgUser": "https://e7.pngegg.com/pngimages/953/222/png-clipart-computer-icons-avatar-business-user-profile-avatar-heroes-logo.png"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "You must Log In first!"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

#### Show Services

```http
  GET /cust/services
```

_Response (200)_

```
[
    {
        "id": 7,
        "name": "Potong Rambut",
        "description": "Bisa memotong rambut segala usia, dari balita hingga tua!",
        "imgUrl": "https://statik.tempo.co/?id=823516&width=650",
        "createdAt": "2021-08-25T12:28:01.840Z",
        "updatedAt": "2021-08-25T12:28:01.840Z"
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```

{
"message": "Internal Server Error"
}

```

---

#### Show Product

```http
  GET /cust/services/:id
```

_Request Header_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `acess_token` | `string` | **Required**. |

_Response (200)_

```
[
    {
        "id": 9,
        "name": "Potong Rambut The Rock",
        "ProviderId": 7,
        "price": 15000,
        "ServiceId": 7,
        "detail": "Potong rambut tanpa gunting",
        "createdAt": "2021-08-25T12:29:57.008Z",
        "updatedAt": "2021-08-25T12:29:57.008Z",
        "Service": {
            "id": 7,
            "name": "Potong Rambut",
            "description": "Bisa memotong rambut segala usia, dari balita hingga tua!",
            "imgUrl": "https://statik.tempo.co/?id=823516&width=650",
            "createdAt": "2021-08-25T12:28:01.840Z",
            "updatedAt": "2021-08-25T12:28:01.840Z"
        },
        "User": {
            "id": 7,
            "fullName": "Dwayne Johnson",
            "email": "dwayne@mail.com",
            "phoneNumber": "085676456435",
            "username": "therock69",
            "address": "Jl. Singgasana no 69.  Pringsewu, Lampung, Indonesia.",
            "imgUser": "https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/bolasport/medium_4f7a0d3d1e93f6b0683c98ce36334e17.jpg",
        }
    },
    ...
]
```

_Response (401 - Unauthorized)_

```
{
    "message": "You must Log In first!"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

#### Show Orders by customer id

```http
  GET /orders/
```

_Request Header_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `acess_token` | `string` | **Required**. |

_Response (200)_

```
[
   {
    "id": 47,
    "CustomerId": 2,
    "isPayment": "PAID",
    "totalPrice": 210000,
    "tokenPayment": "553b3e05-ea7e-420f-9a5b-35e1475242d6",
    "createdAt": "2021-08-25T18:12:21.453Z",
    "updatedAt": "2021-08-25T18:12:57.450Z"
   },
...
]
```

_Response (401 - Unauthorized)_

```
{
    "message": "You must Log In first!"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

#### Show Order Details

```http
  GET /orders/:id
```

_Request Header_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `acess_token` | `string` | **Required**. |

_Request Body_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `order details` | `string` | **Required Unique**. |
| `customer details` | `string` | **Required min 5**. |

_Response (200)_

```
'{
    "id": 28,
    "CustomerId": 2,
    "isPayment": "PAID",
    "totalPrice": 170000,
    "tokenPayment": "29f0a0bf-4ad5-4467-a634-a2ce074fc8a5",
    "createdAt": "2021-08-25T13:08:02.214Z",
    "updatedAt": "2021-08-25T13:08:58.479Z",
    "OrderDetails": [
        {
            "id": 36,
            "OrderId": 28,
            "price": 150000,
            "ProductId": 15,
            "createdAt": "2021-08-25T13:08:02.254Z",
            "updatedAt": "2021-08-25T13:08:02.254Z",
            "Product": {
                "id": 15,
                "name": "The Rock Lightning",
                "ProviderId": 7,
                "price": 150000,
                "ServiceId": 10,
                "detail": "Selain bisa potong rambut juga bisa potong arus listrik rumahmu",
                "createdAt": "2021-08-25T12:29:57.008Z",
                "updatedAt": "2021-08-25T12:29:57.008Z",
                "User": {
                    "id": 7,
                    "fullName": "Dwayne Johnson",
                    "email": "dwayne@mail.com",
                    "phoneNumber": "085676456435",
                    "username": "therock69",

                    "address": "Jl. Singgasana no 69.  Pringsewu, Lampung, Indonesia.",
                    "imgUser": "https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/bolasport/medium_4f7a0d3d1e93f6b0683c98ce36334e17.jpg",

                }
            }
        },
     ...
    ]
}'
```

_Response (401 - Unauthorized)_

```
{
    "message": "You must Log In first!"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

#### Checkout

```http
  POST /orders/checkout
```

_Request Header_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `acess_token` | `string` | **Required**. |

_Response (200)_

```
{
  "transactionToken": "29f0a0bf-4ad5-4467-a634-a2ce074fc8a5"
}

```

_Response (401 - Unauthorized)_

```

{
  "message": "You must Log In first!"
}

```

_Response (500 - Internal Server Error)_

```

{
  "message": "Internal Server Error"
}

```

#### Handle Notification from midTrans

```http
  POST /orders/notif
```

_Request Body_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `order_id` | `string` | **Required**. |
| `status_code` | `string` | **Required**. |
| `signature_key` | `string` | **Required**. |

_Response (200)_

```
{
    message: "payment success"
}

```

_Response (500 - Internal Server Error)_

```

{
"message": "Internal Server Error"
}

```

#### Cancel Transaction

```http
  PATCH /orders/:id
```

_Request Header_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `acess_token` | `string` | **Required**. |

_Response (200)_

```
{
  "message": "payment canceled"
}

```

_Response (401 - Unauthorized)_

```

{
  "message": "You must Log In first!"
}

```

_Response (500 - Internal Server Error)_

```

{
  "message": "Internal Server Error"
}

```
