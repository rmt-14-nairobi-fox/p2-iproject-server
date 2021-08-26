# AllComm

Server API

## AllComm server

---

Individual project using nodejs, postgres and express

## RESTful endpoints

---

## **Accommodations**

### **GET /accommodations**

> Get all accommodations

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Ok)_

```
[
      {
        "id": 3,
        "title": "title accommodations",
        "address": "address accommodations",
        "city": "city accommodations",
        "AuthorId": AuthorId accommodations,
        "description": "description accommodations",
        "price": price accommodations,
        "status": "status accommodations",
        "zipCode": "zipCode accommodations",
        "weatherDesc": "weatherDesc accommodations",
        "temperature": temperature accommodations,
        "long": long accommodations,
        "lat": lat accommodations,
        "type": "type accommodations",
        "createdAt": "2021-08-25T18:23:45.164Z",
        "updatedAt": "2021-08-25T20:10:09.926Z",
        "User": {
            "id": User Id,
            "fullname": "fullname User",
            "email": "email",
            "phonenumber": "phonenumber User",
            "address": "address User",
            "city": "city User",
            "role": "role User",
            "zipCode": "zipCode User",
            "createdAt": "2021-08-25T18:05:53.929Z",
            "updatedAt": "2021-08-25T18:05:53.929Z"
        }
    },
    {
        "id": 2,
        "title": "title accommodations",
        "address": "address accommodations",
        "city": "city accommodations",
        "AuthorId": AuthorId accommodations,
        "description": "description accommodations",
        "price": price accommodations,
        "status": "status accommodations",
        "zipCode": "zipCode accommodations",
        "weatherDesc": "weatherDesc accommodations",
        "temperature": temperature accommodations,
        "long": long accommodations,
        "lat": lat accommodations,
        "type": "type accommodations",
        "createdAt": "2021-08-25T18:23:45.164Z",
        "updatedAt": "2021-08-25T20:10:09.926Z",
        "User": {
            "id": User Id,
            "fullname": "fullname User",
            "email": "email",
            "phonenumber": "phonenumber User",
            "address": "address User",
            "city": "city User",
            "role": "role User",
            "zipCode": "zipCode User",
            "createdAt": "2021-08-25T18:05:53.929Z",
            "updatedAt": "2021-08-25T18:05:53.929Z"
        }
    },
    {
        "id": 1,
        "title": "title accommodations",
        "address": "address accommodations",
        "city": "city accommodations",
        "AuthorId": AuthorId accommodations,
        "description": "description accommodations",
        "price": price accommodations,
        "status": "status accommodations",
        "zipCode": "zipCode accommodations",
        "weatherDesc": "weatherDesc accommodations",
        "temperature": temperature accommodations,
        "long": long accommodations,
        "lat": lat accommodations,
        "type": "type accommodations",
        "createdAt": "2021-08-25T18:23:45.164Z",
        "updatedAt": "2021-08-25T20:10:09.926Z",
        "User": {
            "id": User Id,
            "fullname": "fullname User",
            "email": "email",
            "phonenumber": "phonenumber User",
            "address": "address User",
            "city": "city User",
            "role": "role User",
            "zipCode": "zipCode User",
            "createdAt": "2021-08-25T18:05:53.929Z",
            "updatedAt": "2021-08-25T18:05:53.929Z"
        }
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}---
```

---

### **GET /accommodations/:id**

> Get accommodation by id | required: _id: [integer]_

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Ok)_

```
{
    "id": 1,
    "title": "title accommodations",
    "address": "address accommodations",
    "city": "city accommodations",
    "AuthorId": AuthorId accommodations,
    "description": "description accommodations",
    "price": price accommodations,
    "status": "status accommodations",
    "zipCode": "zipCode accommodations",
    "weatherDesc": "weatherDesc accommodations",
    "temperature": temperature accommodations,
    "long": long accommodations,
    "lat": lat accommodations,
    "type": "type accommodations",
    "createdAt": "2021-08-25T18:23:45.164Z",
    "updatedAt": "2021-08-25T20:10:09.926Z"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (404 - Id not Found)_

```
{
  "message": "Item/s not Found"
}
```

---

### **POST /accommodations**

> Create accommodation

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "address": <address to get insert into>",
    "city": <city to get insert into>",
    "zipCode": <zipCode to get insert into>",
    "price": <price to get insert into>"
    "type": <type to get insert into>"

}
```

_Response (201 - Created)_

```
{
    "id": 1,
    "title": "<Your title accommodations>",
    "address": "<Your address accommodations>",
    "city": "<Your city accommodations>",
    "AuthorId": <Your AuthorId accommodations>,
    "description": "<Your description accommodations>",
    "price": <Your price accommodations>,
    "status": "<Your status accommodations>",
    "zipCode": "<Your zipCode accommodations>",
    "weatherDesc": "weatherDesc accommodations",
    "temperature": temperature accommodations,
    "long": long accommodations,
    "lat": lat accommodations,
    "type": "<Your type accommodations>",
    "createdAt": "2021-08-25T18:23:45.164Z",
    "updatedAt": "2021-08-25T20:10:09.926Z"
}
```

_Response (400 - Validate Error)_

```
{
  "message": [
      Errors for validation
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

### **PUT /accommodations/:id**

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

> Update accommodation with id | required:_id: [integer]_

_Request Body_

```
{
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "zipCode": <zipCode to get insert into>",
    "city": <city to get insert into>",
    "price": <price to get insert into>"
    "type": <type to get insert into>"

}
```

_Response (200 - Ok)_

```
{
    "id": 1,
    "title": "<Your updated title accommodations>",
    "address": "<Your updated address accommodations>",
    "city": "<Your updated city accommodations>",
    "AuthorId": <Your updated AuthorId accommodations>,
    "description": "<Your updated description accommodations>",
    "price": <Your updated price accommodations>,
    "status": "<Your updated status accommodations>",
    "zipCode": "<Your updated zipCode accommodations>",
    "weatherDesc": "weatherDesc accommodations",
    "temperature": temperature accommodations,
    "long": long accommodations,
    "lat": lat accommodations,
    "type": "<Your updated type accommodations>",
    "createdAt": "2021-08-25T18:23:45.164Z",
    "updatedAt": "2021-08-25T20:10:09.926Z"
}
```

_Response (400 - Validate Error)_

```
{
  "message": [
      Errors for validation
  ]
}
```

_Response (404 - Id not Found)_

```
{
  "message": "Item/s not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### **DELETE /accommodations/:id**

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

> Delete accommodation by id | required: _id: [integer]_

_Response (200 - Ok)_

```
{
    "message": "<name with id> success to delete"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (404 - Id not Found)_

```
{
  "message": "Item/s not Found"
}
```

---

### **PATCH /accommodations/:id**

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

> Update accommodation with id | required:_id: [integer]_

_Request Body_

```
{
    "status": "<status to get update>",
}
```

_Response (200 - Ok)_

```
{
    ""id": 1,
    "title": "Your title accommodations",
    "address": "Your address accommodations",
    "city": "Your city accommodations",
    "AuthorId": Your AuthorId accommodations,
    "description": "Your description accommodations",
    "price": Your price accommodations,
    "status": "<Your updated status accommodations>",
    "zipCode": "Your zipCode accommodations",
    "weatherDesc": "weatherDesc accommodations",
    "temperature": temperature accommodations,
    "long": long accommodations,
    "lat": lat accommodations,
    "type": "Your type accommodations",
    "createdAt": "2021-08-25T18:23:45.164Z",
    "updatedAt": "2021-08-25T20:10:09.926Z"
}
```

_Response (404 - Id not Found)_

```
{
  "message": "Item/s not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

## **Users**

### **POST /register**

> Register to website

_Request Body_

```
{
    "fullname": "<fullname to register>",
    "email": "<email to register>",
    "password": <password to register>"
    "address": <address to get insert into>",
    "city": <city to get insert into>",
    "zipCode": <zipCode to get insert into>",
}
```

_Response (201 - Created)_

```
{
    "id": <given id by system>,
    "fullname": "<created fullname>",
    "email": "<created email>",
    "role": <given role by system>"
    "address": <address to get insert into>",
    "city": <city to get insert into>",
    "zipCode": <zipCode to get insert into>",
    "createdAt": "2021-08-02T10:04:46.830Z",
    "updatedAt": "2021-08-02T10:04:46.830Z"
}
```

_Response (400 - Validate Error)_

```
{
  "message": [
      Error for validation
  ]
}
```

_Response (400 - Email unique constraint)_

```
{
  "message": [
      Emails is already registered
  ]
}
```

---

### **POST /login**

> Login to website

_Request Body_

```
{
    "email": "<email to input>",
    "password": <password to input>"
}
```

_Response (200 - Ok)_

```
{
  "access_token": "<your token>",
  "email": "<your email>",
  "role": "<your role>",
  "id": "<your id>"
}
```

_Response (401- Email/Password wrong)_

```
{
  "message": [
      Emails / password is wrong
  ]
}
```

_Response (404 - UserNotFound)_

```
{
  "message": [
      User not found
  ]
}
```

---

### **POST /googleAuth**

> Register / login to website using Google account | required: google account

_Response (200 - Ok)_

```
{
  "access_token": "<your token>",
  "email": "<your email>",
  "role": "<your role>",
  "id": "<your id>"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

## **Public**

### **GET /public**

> Get all public accommodation

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Ok)_

```
[
      {
        "id": 3,
        "title": "title accommodations",
        "address": "address accommodations",
        "city": "city accommodations",
        "AuthorId": AuthorId accommodations,
        "description": "description accommodations",
        "price": price accommodations,
        "status": "status accommodations",
        "zipCode": "zipCode accommodations",
        "weatherDesc": "weatherDesc accommodations",
        "temperature": temperature accommodations,
        "long": long accommodations,
        "lat": lat accommodations,
        "type": "type accommodations",
        "createdAt": "2021-08-25T18:23:45.164Z",
        "updatedAt": "2021-08-25T20:10:09.926Z",
        "User": {
            "id": User Id,
            "fullname": "fullname User",
            "email": "email",
            "phonenumber": "phonenumber User",
            "address": "address User",
            "city": "city User",
            "role": "role User",
            "zipCode": "zipCode User",
            "createdAt": "2021-08-25T18:05:53.929Z",
            "updatedAt": "2021-08-25T18:05:53.929Z"
        }
    },
    {
        "id": 2,
        "title": "title accommodations",
        "address": "address accommodations",
        "city": "city accommodations",
        "AuthorId": AuthorId accommodations,
        "description": "description accommodations",
        "price": price accommodations,
        "status": "status accommodations",
        "zipCode": "zipCode accommodations",
        "weatherDesc": "weatherDesc accommodations",
        "temperature": temperature accommodations,
        "long": long accommodations,
        "lat": lat accommodations,
        "type": "type accommodations",
        "createdAt": "2021-08-25T18:23:45.164Z",
        "updatedAt": "2021-08-25T20:10:09.926Z",
        "User": {
            "id": User Id,
            "fullname": "fullname User",
            "email": "email",
            "phonenumber": "phonenumber User",
            "address": "address User",
            "city": "city User",
            "role": "role User",
            "zipCode": "zipCode User",
            "createdAt": "2021-08-25T18:05:53.929Z",
            "updatedAt": "2021-08-25T18:05:53.929Z"
        }
    },
    {
        "id": 1,
        "title": "title accommodations",
        "address": "address accommodations",
        "city": "city accommodations",
        "AuthorId": AuthorId accommodations,
        "description": "description accommodations",
        "price": price accommodations,
        "status": "status accommodations",
        "zipCode": "zipCode accommodations",
        "weatherDesc": "weatherDesc accommodations",
        "temperature": temperature accommodations,
        "long": long accommodations,
        "lat": lat accommodations,
        "type": "type accommodations",
        "createdAt": "2021-08-25T18:23:45.164Z",
        "updatedAt": "2021-08-25T20:10:09.926Z",
        "User": {
            "id": User Id,
            "fullname": "fullname User",
            "email": "email",
            "phonenumber": "phonenumber User",
            "address": "address User",
            "city": "city User",
            "role": "role User",
            "zipCode": "zipCode User",
            "createdAt": "2021-08-25T18:05:53.929Z",
            "updatedAt": "2021-08-25T18:05:53.929Z"
        }
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

### **GET /public/:id**

> Get public accommodation by id | required: _id: [integer]_

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Ok)_

```
{
    "id": 1,
    "title": "title accommodations",
    "address": "address accommodations",
    "city": "city accommodations",
    "AuthorId": AuthorId accommodations,
    "description": "description accommodations",
    "price": price accommodations,
    "status": "status accommodations",
    "zipCode": "zipCode accommodations",
    "weatherDesc": "weatherDesc accommodations",
    "temperature": temperature accommodations,
    "long": long accommodations,
    "lat": lat accommodations,
    "type": "type accommodations",
    "createdAt": "2021-08-25T18:23:45.164Z",
    "updatedAt": "2021-08-25T20:10:09.926Z"
}
```

_Response (404 - Id not Found)_

```
{
  "message": "Item/s not Found"
}
```

---

## **Save accommodation/ Bookmarks**

### **GET /savedAccommodations**

> Get all saved accommodation

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Ok)_

```
[
    {
        "id": 1,
        "UserId": <UserId>,
        "AccommodationId": <AccommodationId>,
        "createdAt": "2021-08-26T04:00:19.269Z",
        "updatedAt": "2021-08-26T04:00:19.269Z",
        "User": {
            "id": 4,
            "fullname": "<fullname user>",
            "email": "<email user>",
            "phonenumber": "<phonenumber user>",
            "address": "<address user>",
            "city": "<city user>",
            "role": "role",
            "zipCode": "zipcode",
            "createdAt": "2021-08-25T19:33:36.537Z",
            "updatedAt": "2021-08-25T19:33:36.537Z"
        },
        "Accommodation": {
            "id": 4,
            "title": "<title>",
            "address": "<address>",
            "city": "<city>",
            "AuthorId": AuthorId,
            "description": "<description>",
            "price": price,
            "status": "<status>",
            "zipCode": "zipcode",
            "weatherDesc": <weatherDesc>,
            "temperature": temperature,
            "long": long,
            "lat": lat,
            "type": "<type>",
            "createdAt": "2021-08-25T18:05:54.057Z",
            "updatedAt": "2021-08-25T18:05:54.057Z"
        }
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

### **POST /savedAccommodations**

> Save/ add all saved accommodation

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Response (201 - Ok)_

```
{
    "id": 1,
    "UserId": UserId,
    "AccommodationId": AccommodationId,
    "updatedAt": "2021-08-26T09:32:34.787Z",
    "createdAt": "2021-08-26T09:32:34.787Z"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "This accommodation is already on your bookmarks"
}
```

---

### **POST /savedAccommodations**

> Unsave/ delete all saved accommodation

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Response (200 - Ok)_

```
{
    "message": "<name with id> success to delete"
}
```

_Response (404 - Id not Found)_

```
{
  "message": "Item/s not Found"
}
```

---
