Models:

_User_

```
- username : required, unique
- email : required
- password : required
- role : required
```

_Project_

```
- name : required
- description : required
- imageUrl : required
- position : required
- jobDesc : required
- dueDate : required
- UserId : required
```

_UserProject_

```
- UserId : required​
- ProjectId : required
- status : required
```

List of available endpoints:

_UserRoutes_
- `POST api/v1/user/recruiter/register`
- `POST api/v1/user/recruiter/login`
- `POST api/v1/user/employee/register`
- `POST api/v1/user/employee/login`
- `POST api/v1/user/employee/github`

_ProjectRoutes_
- `POST api/v1/project/create`
- `POST api/v1/project/:id/position`
- `GET api/v1/project`
- `PUT api/v1/project/edit/:id`
- `DELETE api/v1/project/delete/:id`
- `GET api/v1/project/:id`

_UserProjectRoutes_
- `POST api/v1/userproject/:projectId/apply`
- `GET api/v1/userproject/:userId`
- `GET api/v1/userproject/recruiter/apply`
- `PUT api/v1/userproject/apply/accepted`
- `DELETE api/v1/userproject/apply/accepted/:name`
- `PATCH api/v1/userproject/:id/status`

## POST /recruiter/register

- data :

```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string",    
}
```

Response:

status:201
- body:

```json
{
    "token": "string"
}

```

_Response (400) Bad Request_

```json

  "message": "<field> cannot be null"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email format"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is already exists"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username is already exists"
}
```

## POST recruiter/login

- data :

```json
{
    "email": "string",
    "password": "string",
    "role": "string",    
}
```

Response:

status:200
- body:

```json
{
    "token": "string"
}

```

_Response (401 - Unauthorized)_
```json
{
  "message": "Unauthorized"
}
```

_Response (403 - You can't access)_
```json
{
  "message": "You can't access"
}
```

_Response (500 -)_
```json
{
  "message": "Internal Server Error"
}
```


## POST /employee/register

- data :

```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string",    
}
```

Response:

status:201
- body:

```json
{
    "token": "string"
}

```

_Response (400) Bad Request_

```json

  "message": "<field> cannot be null"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email format"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is already exists"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username is already exists"
}
```

## POST /employee/login

- data :

```json
{
    "email": "string",
    "password": "string",
    "role": "string",    
}
```

Response:

status:200
- body:

```json
{
    "token": "string"
}

```

_Response (401 - Unauthorized)_
```json
{
  "message": "Unauthorized"
}
```

_Response (403 - You can't access)_
```json
{
  "message": "You can't access"
}
```

_Response (500 -)_
```json
{
  "message": "Internal Server Error"
}
```

## POST /employee/github

- data :

```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string",    
}
```

Response:

status:201
- body:

```json
{
    "token": "string"
}

```

_Response (400) Bad Request_

```json

  "message": "<field> cannot be null"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email format"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "email is already exists"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username is already exists"
}
```
## POST /project/create

Request:

- headers: token (string)

- data :
```json
{
    "name": "string",
    "description": "string",
    "imageURL": "file",
    "position": "string",
    "jobDesc": "string",
    "dueDate": "string",
    "UserId": "number"

}

```json
    _Response (201 (created))_
    
    {
        "name": "string",
        "description": "string",
        "imageURL": "file",
        "position": "string",
        "jobDesc": "string",
        "dueDate": "string",
        "UserId": "number"
    }
```
_Response (403 - (Forbidden))_

```json
{
    "msg": "You Can't access"
}
```

_Response (400 - (Bad request))_

```json
{
    "msg": "<field> cannot be null"
}
```

# POST /:id/position

- headers : token(string)
- params: "integer" required

- data :
```json
    {
    "name": "string",
    "description": "string",
    "imageURL": "file",
    "position": "string",
    "jobDesc": "string",
    "dueDate": "string",
    "UserId": "number"

}

```json
    _Response (201 (created))_
    
    {
        "name": "string",
        "description": "string",
        "imageURL": "file",
        "position": "string",
        "jobDesc": "string",
        "dueDate": "string",
        "UserId": "number"
    }
```
_Response (403 - (Forbidden))_

```json
{
    "msg": "You Can't access"
}
```

_Response (400 - (Bad request))_

```json
{
    "msg": "<field> cannot be null"
}
```

# GET /project

-headers: token(string)

_Response (200-success)_

```json
{
  [
    {
        "id": 1,
        "name": "Project A",
        "description": "Project Aplikasi Kucing",
        "imageURL": "https://ik.imagekit.io/531zscyc91wt/Saint-Bernard-laying-down-in-the-grass_D7blw5X_W.jpg",
        "position": "Developer",
        "jobDesc": "Merapihkan fitur dengan vuex",
        "dueDate": "21/12/2021",
        "UserId": 1,
        "createdAt": "2021-08-23T20:00:32.345Z",
        "updatedAt": "2021-08-23T20:00:32.345Z"
    },
    {
        "id": 3,
        "name": "Project Kucing",
        "description": "Kucing Putih aplikasi",
        "imageURL": "https://ik.imagekit.io/531zscyc91wt/gjxryxryryr_hIwPghCRn.jfif",
        "position": "Designer",
        "jobDesc": "mendesign UI",
        "dueDate": "21/12/2021",
        "UserId": 1,
        "createdAt": "2021-08-24T05:22:39.530Z",
        "updatedAt": "2021-08-24T05:22:39.530Z"
    },
    {
        "id": 4,
        "name": "Project Kucing",
        "description": "Kucing Putih aplikasi",
        "imageURL": "https://ik.imagekit.io/531zscyc91wt/gjxryxryryr_RqucaFyU0.jfif",
        "position": "Designer",
        "jobDesc": "mendesign UI",
        "dueDate": "21/12/2021",
        "UserId": 1,
        "createdAt": "2021-08-24T12:37:20.377Z",
        "updatedAt": "2021-08-24T12:37:20.377Z"
    },
    {
        "id": 5,
        "name": "Project Arsitek",
        "description": "membangun sebuah rumah dengan indah",
        "imageURL": "https://ik.imagekit.io/531zscyc91wt/page_6_owIeCQI9V.jpg",
        "position": "Arsitek",
        "jobDesc": "membangun sebuah kerangka bangunan",
        "dueDate": "21/10/2022",
        "UserId": 1,
        "createdAt": "2021-08-24T12:39:23.681Z",
        "updatedAt": "2021-08-24T12:39:23.681Z"
    },
    {
        "id": 11,
        "name": "Project Arsitek",
        "description": "membangun sebuah rumah dengan indah",
        "imageURL": "https://ik.imagekit.io/531zscyc91wt/page_6_owIeCQI9V.jpg",
        "position": "kuli",
        "jobDesc": "pengaduk semen",
        "dueDate": "21/10/2022",
        "UserId": 1,
        "createdAt": "2021-08-24T12:54:09.406Z",
        "updatedAt": "2021-08-24T12:54:09.406Z"
    },
    {
        "id": 14,
        "name": "Football Media",
        "description": "Mencari berita-berita sepakbola dan di upload ke salah satu stasiun tv",
        "imageURL": "https://ik.imagekit.io/531zscyc91wt/lionel-messi_169_Ntzu-Gbw5q.jpeg",
        "position": "Repoter",
        "jobDesc": "Mencari berita dan update tentang berita sepakbola yang penting jangan hoax",
        "dueDate": "2022-06-30",
        "UserId": 1,
        "createdAt": "2021-08-25T10:57:57.176Z",
        "updatedAt": "2021-08-25T10:57:57.176Z"
    }
]  
}
```

# PUT / edit/:id

- headers: token(string)
- params: projectId(integer)
- data : 

```json
    {
        "name": "string",
        "description": "string",
        "imageURL": "file",
        "position": "string",
        "jobDesc": "string",
        "dueDate": "string",
        "UserId": "number"        
    }
```
_Response (200-updated)_

- body:

```json
   {
        "name": "string",
        "description": "string",
        "imageURL": "file",
        "position": "string",
        "jobDesc": "string",
        "dueDate": "string",
        "UserId": "number"        
    } 
```

_Response (403-Frbidden access)_

```json
{
    "msg" : "You don't have access"
}











