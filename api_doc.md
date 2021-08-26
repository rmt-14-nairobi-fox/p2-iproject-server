# FISTATOR

## API Reference

## Register

```http
  POST /users/register
```

_Request Body_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Must Be Unique**. |
| `password` | `string` | -- |

_Response (201)_

```
{
    "id": 7,
    "email": "radit3@mail.com",
    "password": "$2b$05$kFx0CEk9KT1nxUyMMDm7h.csSN1OgJXI3UcqVdOJp7N38JO5SRuNG",
    "updatedAt": "2021-08-26T17:02:51.811Z",
    "createdAt": "2021-08-26T17:02:51.811Z"
}
```

Response (400 - Bad Request)

```
{
    "errors": [
        "Invalid email format",
        "Please input your email",
        "Please input your password"
    ]
}
```

## Login

```http
  POST /users/login
```

_Request Body_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required Unique**. |
| `password` | `string` | :-------------------------. |

_Response (200)_

```
{
    "result": {
        "id": 2,
        "email": "radit@mail.com",
        "password": "$2b$05$5tGDbrBYXIaBBHTKmO4Wo.WzY.q1Aqc7/BYdVfsblskL.IGJ3VC3y",
        "createdAt": "2021-08-24T14:32:15.880Z",
        "updatedAt": "2021-08-24T14:32:15.880Z"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyYWRpdEBtYWlsLmNvbSIsImlhdCI6MTYyOTk5NjkzOH0.Fa8hQoAAX_dEaFlVQPrZOTvmB5jqlUCTsqKMFn7rOc4"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "Email/Password combination is wrong!"
}
```

## GET fishes

```http
  GET /fishes
```
_Request Header_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `acess_token` | `string` | **Required**. |

_Response (200)_

```
[
    {
        "id": 0,
        "name": "White Hake",
        "population": "Significantly below target population level. A rebuilding plan is in place.",
        "status": "<ul>\n<li>According to the 2019 stock assessment, white hake is overfished&nbsp;but&nbsp;not subject to overfishing. Summary stock assessment information can be found on <a href=\"https://www.st.nmfs.noaa.gov/stocksmart?app=browse_by_stock&amp;stockid=10518\">Stock SMART</a>.</li>\n</ul>\n",
        "availability": "<p>Year-round.</p>\n",
        "fishingRate": "At recommended level.",
        "imageUrl": "https://www.fishwatch.gov/sites/default/files/Hake_White_NB_W_0.png"
    },
    ...
]
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Not Found"
}
```

## GET fishes by name

```http
  GET /fishes/:fishName
```
_Request Header_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `acess_token` | `string` | **Required**. |

_Response (200)_

```
[
    {
        "id": 0,
        "name": "White Hake",
        "population": "Significantly below target population level. A rebuilding plan is in place.",
        "status": "<ul>\n<li>According to the 2019 stock assessment, white hake is overfished&nbsp;but&nbsp;not subject to overfishing. Summary stock assessment information can be found on <a href=\"https://www.st.nmfs.noaa.gov/stocksmart?app=browse_by_stock&amp;stockid=10518\">Stock SMART</a>.</li>\n</ul>\n",
        "availability": "<p>Year-round.</p>\n",
        "fishingRate": "At recommended level.",
        "imageUrl": "https://www.fishwatch.gov/sites/default/files/Hake_White_NB_W_0.png"
    }
]
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "name": "JsonWebTokenError",
    "message": "invalid signature"
}
```

## POST add fish

```http
  POST /wishlists/add/:fishName
```
_Request Header_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `acess_token` | `string` | **Required**. |

_Response (201)_

```
{
    "id": 10,
    "UserId": 2,
    "fishName": "striped-marlin",
    "updatedAt": "2021-08-25T13:21:12.204Z",
    "createdAt": "2021-08-25T13:21:12.204Z"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (500 - Internal Server Error)_
```
{
    "name": "JsonWebTokenError",
    "message": "invalid signature"
}
```

## GET wishlists

```http
  GET /wishlists
```
_Request Header_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `acess_token` | `string` | **Required**. |

_Response (200)_

```
[
    {
        "id": 1,
        "UserId": 2,
        "fishName": "red-snapper",
        "createdAt": "2021-08-25T02:54:12.696Z",
        "updatedAt": "2021-08-25T02:54:12.696Z"
    },
    ...
]
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Not Found"
}
```

## DELETE fish

```http
  DELETE /wishlists/:fishName
```
_Request Header_
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `acess_token` | `string` | **Required**. |

_Response (200)_

```
{
    "message": "Fish with name shortfin-squid has been deleted"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (500 - Internal Server Error)_
```
{
    "name": "JsonWebTokenError",
    "message": "invalid signature"
}
```
## Default Error

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```