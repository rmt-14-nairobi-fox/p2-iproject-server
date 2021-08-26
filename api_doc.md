# CariObat App Server
CariObat App is an application to manage your Drugs data. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
- "POST /register"
- "POST /login"
- "POST /gLogin
- "POST /customers/register"
- "POST /customers/login"
- "POST /customers/gLogin
- "GET /customers/categories"
- "GET /customers/categories/:name"
- "GET /customers/products/:name"
- "GET /customers/search/:name"
- "GET /customers/favorite"
- "POST /customers/favorite"
- "DELETE /customers/favorite/:id"

---

### post /register

> register user

_Request Header_
```
  not needed
```

_Request Body_
```
{
  "username": "<user username to get insert into>",
  "email": "<user email to get insert into>",
  "password": "<user password to get insert into>",
  "phoneNumber": "<user phoneNumber to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by the system>,
  "email": "<user email>",
}
```
_Response (400 - Bad Request)_
```
{
  "message": "validation required"
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

## POST /login
> login user
_Request Header_
```
  not needed
```
_Request Body_
```
{
  "email": "<user email to log in to>",
  "password": "<user password to log in to>",
}
```
_Response (200 - Ok!)_
```
{
  "access_token": <access_token>,
}
```

_Response (401 - Invalid credentials)_
```
{
  "message": "Email/password not match"
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

## POST /glogin
> login staff by google login
_Request Header_
```
  not needed
```
_Request Body_
```
{
  "email": "<user email to log in to>"
}
```
_Response (200 - Ok!)_
```
{
  "access_token": <access_token>,
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

## post /customers/register

> register user

_Request Header_
```
  not needed
```

_Request Body_
```
{
  "username": "<customer username to get insert into>",
  "email": "<customer email to get insert into>",
  "password": "<customer password to get insert into>",
  "phoneNumber": "<customer phoneNumber to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by the system>,
  "email": "<user email>",
}
```
_Response (400 - Bad Request)_
```
{
  "message": "validation required"
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

## POST /customers/login
> login user
_Request Header_
```
  not needed
```
_Request Body_
```
{
  "email": "<user email to log in to>",
  "password": "<user password to log in to>",
}
```
_Response (200 - Ok!)_
```
{
  "access_token": <access_token>,
}
```

_Response (401 - Invalid credentials)_
```
{
  "message": "Email/password not match"
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

## POST /customers/glogin
> login staff by google login
_Request Header_
```
  not needed
```
_Request Body_
```
{
  "email": "<user email to log in to>"
}
```
_Response (200 - Ok!)_
```
{
  "access_token": <access_token>,
}
```

_Response (500 - Internal server error)_
```
{
  "message": "Internal server error"
}
```

## GET /customers/categories

> Get all categories

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "external_id": "<categories external_id>",
    "slug": "<categories slug>",
    "image_url": "<categories image_url>",
    "attributes": "<categories attributes>",
    "images_map": "<categories images_map>",
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

## GET /customers/categories/:name

> Get categories by Name(slug)

_URL Params_

Required:
```
name=[string]

```
_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "external_id": "<categories external_id>",
    "slug": "<categories slug>",
    "canon_slug": "<categories canon_slug>",
    "name": "<categories name>",
    "image_url": "<categories image_url>",
    "thumbnail_url": "<categories thumbnail_url>",
    "min_price": "<categories min_price>",
    "base_price": "<categories base_price>",
    "selling_unit": "<categories selling_unit>",
    "prescription_required": "<categories prescription_required>",
    "controlled_substance_type": "<categories controlled_substance_type>",
    "visual_cues": "<categories visual_cues>",
    "image_map": "<categories image_map>",
  }
]

```
_Response (404 - Data Not Found)_
```
{
  "message": "Data Not Found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---
## GET /customers/products/:name

> Get products by Name(slug)

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "external_id": "<product external_id>",
    "canon_slug": "<product canon_slug>",
    "name": "<product name>",
    "image_url": "<product image_url>",
    "thumbnail_url": "<product thumbnail_url>",
    "min_price": "<product min_price>",
    "base_price": "<product base_price>",
    "selling_unit": "<product selling_unit>",
    "general_indication": "<product general_indication>",
    "description": "<product description>",
    "composition": "<product composition>",
    "dosage": "<product dosage>",
    "how_to_use": "<product how_to_use>",
    "packaging": "<product packaging>",
    "side_effects": "<product side_effects>",
    "contraindication": "<product contraindication>",
    "warning": "<product warning>",
    "segmentation": "<product segmentation>",
    "manufacturer_name": "<product manufacturer_name>",
    "meta_keywords": "<product meta_keywords>",
    "bpom_number": "<product bpom_number>",
    "prescription_required": "<product prescription_required>",
    "controlled_substance_type": "<product controlled_substance_type>",
    "visual_cues": "<product visual_cues>",
    "image_map": "<product image_map>",
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

## GET /customers/search/:name
> Get search by Name

_URL Params_

Required:
```
name=[string]

```
_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "external_id": "<search external_id>",
    "slug": "<search slug>",
    "canon_slug": "<search canon_slug>",
    "name": "<search name>",
    "image_url": "<search image_url>",
    "thumbnail_url": "<search thumbnail_url>",
    "min_price": "<search min_price>",
    "base_price": "<search base_price>",
    "selling_unit": "<search selling_unit>",
    "prescription_required": "<search prescription_required>",
    "controlled_substance_type": "<search controlled_substance_type>",
    "visual_cues": "<search visual_cues>",
    "image_map": "<search image_map>",
  }
]

```
_Response (404 - Data Not Found)_
```
{
  "message": "Data Not Found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

## GET /customers/favorite

> Get all favorite

_Request Header_
```
{
  "access_token": "<your access token>"
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
    "id": 1,
    UserId: <your user id>,
    image_url: <favorite image_url>,
    nameDrug:  <favorite nameDrug>,
    sellingUnitDrug: <favorite sellingUnitDrug>,
    minPriceDrug: <favorite minPriceDrug>,
    BasePriceDrug: <favorite BasePriceDrug>,
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

## POST customers/favorite

> Create new favorite

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  image_url: <favorite image_url>,
  nameDrug:  <favorite nameDrug>,
  sellingUnitDrug: <favorite sellingUnitDrug>,
  minPriceDrug: <favorite minPriceDrug>,
  BasePriceDrug: <favorite BasePriceDrug>,
  "createdAt": new date(),
  "updatedAt": new date(),
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  image_url: <favorite image_url>,
  nameDrug:  <favorite nameDrug>,
  sellingUnitDrug: <favorite sellingUnitDrug>,
  minPriceDrug: <favorite minPriceDrug>,
  BasePriceDrug: <favorite BasePriceDrug>,,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Bad Request"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

## DELETE customers/favorite/:id

> Delete categories by Id

_URL Params_

Required:
```
id=[integer]

```

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200-OK!)_
```
{
  "message": "favorite success to delete"
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
  "message": "Internal Server Error"
}
```