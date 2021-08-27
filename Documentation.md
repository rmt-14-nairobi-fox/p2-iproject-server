# CMS App Career Portal Server
Rapoot is a website to help teachers assign score to their students and make easier for students to see their score. This app has : 
* RESTful endpoint for asset's CRUD operation
* RESTful endpoint for Login and Register operation
* JSON formatted response

&nbsp;

# RESTful endpoints
---
## --- Teachers ---
&nbsp;
### POST /teachers/register

> Make teacher account

_Request Header_
```
{
  not need
}
```

_Request Body_
```
{
    "email": "teacher4@mail.com",
    "password": "12345",
    "name": "teacher4",
    "phoneNumber": "08121212"
}
```

_Success Register : Response ( 201 )_
```
{
    "email": "teacher4@mail.com",
    "name": "teacher 4"
}
```

_Wrong Input : Response (400 - Bad Request)_
```
{
    "<input>": "<message error for this input>",
    "<input>": "<message error for this input>"   
}
```
_Not Unique Email : Response (400 - Bad Request)_
```
{
    "email": "email must be unique"
}
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### POST /teachers/login

> Login as Teacher in this app

_Request Header_
```
{
  not need
}
```

_Request Body_
```
{
    "email": "teacher4@mail.com",
    "password": "12345",
}
```

_Success Login : Response ( 200 )_
```
{
    "access_token": string,
    "role": "teacher"
}
```

_Wrong Input : Response (400 - Bad Request)_
```
{
    "name": "Wrong Email/Password"
} 
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### GET /teachers/class

> To get all the classes a teacher has

_Request Header_
```
{
  access_token : string
}
```

_Request Body_
```
{
  not need
}
```

_Success Get All : Response ( 200 )_
```
[
    {
        "id": 1,
        "TeacherId": 1,
        "name": "kelas 1"
    },
    {
        "id": 2,
        "TeacherId": 1,
        "name": "kelas 2"
    },
    ...
]
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### GET /teachers/class/:idClass

> To get a class and its students with the status accepted

_Request Header_
```
{
  access_token : string
}
```

_Request Body_
```
{
  not need
}
```

_Success Get One : Response ( 200 )_
```
[
    {
        "id": 6,
        "ClassId": 1,
        "StudentId": 2,
        "score1": 20,
        "score2": 1,
        "score3": 20,
        "score4": 20,
        "score5": 20,
        "totalScore": 81,
        "predikat": "B",
        "status": "accepted",
        "note": "Belajar yang lebih giat yaa",
        "createdAt": "2021-08-24T13:38:13.782Z",
        "updatedAt": "2021-08-25T15:40:39.418Z",
        "Student": {
            "id": 2,
            "email": "student2@mail.com",
            "name": "student1",
            "phoneNumber": "08121212",
            "role": "student"
        }
    }
]
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### GET /teachers/waiting/:idClass
> To get a class and its students with the status waiting

_Request Header_
```
{
  access_token : string
}
```

_Request Body_
```
{
  not need
}
```

_Success Get Waiting Class : Response ( 200 )_
```
[
    {
        "id": 6,
        "ClassId": 1,
        "StudentId": 4,
        "score1": 0,
        "score2": 0,
        "score3": 0,
        "score4": 0,
        "score5": 0,
        "totalScore": 0,
        "predikat": "F",
        "status": "waiting",
        "note": "",
        "createdAt": "2021-08-24T13:38:13.782Z",
        "updatedAt": "2021-08-25T15:40:39.418Z",
        "Student": {
            "id": 4,
            "email": "student4@mail.com",
            "name": "student4",
            "phoneNumber": "08121212",
            "role": "student"
        }
    }
]
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### POST /teachers/add-class

> For a teacher add a class

_Request Header_
```
{
  access_token : string
}
```

_Request Body_
```
{
    "name": "kelas 2"
}
```

_Success Add : Response ( 201 )_
```
{
    "id": 7,
    "TeacherId": 1,
    "name": "kelas 2",
    "updatedAt": "2021-08-27T01:38:13.341Z",
    "createdAt": "2021-08-27T01:38:13.341Z"
}
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### GET /teachers/:idClass/:idStudent

> To get one student for see score

_Request Header_
```
{
  access_token : string
}
```

_Request Body_
```
{
    Not need
}
```

_Success Get : Response ( 200 )_
```
{
    "id": 6,
    "ClassId": 1,
    "StudentId": 2,
    "score1": 20,
    "score2": 1,
    "score3": 20,
    "score4": 20,
    "score5": 20,
    "totalScore": 81,
    "predikat": "B",
    "status": "accepted",
    "note": "Belajar yang lebih giat yaa",
    "createdAt": "2021-08-24T13:38:13.782Z",
    "updatedAt": "2021-08-25T15:40:39.418Z",
    "Student": {
        "id": 2,
        "email": "student2@mail.com",
        "name": "student1",
        "phoneNumber": "08121212",
        "role": "student"
    }
}
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### PUT /teachers/score/:idClass/:idStudent

> For teacher to update score student

_Request Header_
```
{
  access_token : string
}
```

_Request Body_
```
{
    "score1": 20,
    "score2": 1,
    "score3": 20,
    "score4": 20,
    "score5": 20,
    "note": "Belajar yang lebih giat yaa",
}
```

_Success Update Score : Response ( 200 )_
```
{
   "message": "Score  has been updated"
}
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### PATCH /teachers/accept/:idClass/:idStudent

> For update status student to accepted

_Request Header_
```
{
  access_token : string
}
```

_Request Body_
```
{
  Not need
}
```

_Success Accepted : Response ( 200 )_
```
{
   "message": " <Student name> has been accepted from your class"
}
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### PATCH /teachers/reject/:idClass/:idStudent
> For update status student to rejected

_Request Header_
```
{
  access_token : string
}
```

_Request Body_
```
{
  Not need
}
```

_Success Accepted : Response ( 200 )_
```
{
   "message": " <Student name> has been rejected from your class"
}
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### DELETE /teachers/delete/:idClass/:idStudent
> For delete student from your class

_Request Header_
```
{
  access_token : string
}
```

_Request Body_
```
{
  Not need
}
```

_Success Deleted : Response ( 200 )_
```
{
   "message": " <Student name> has been deleted from your class"
}
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### POST /teachers/calender
> To create agenda for teacher

_Request Header_
```
{
  access_token : string
}
```

_Request Body_
```
{
    "summary": "Testing - 3",
    "description": "percobaan - 3",
    "startEvent": "2021-08-28",
    "endEvent": "2021-08-29"
}
```

_Success Create : Response ( 201 )_
```
{
   "message": "Event created"
}
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
## --- Student ---
&nbsp;
### POST /students/register

> Make Student account

_Request Header_
```
{
  not need
}
```

_Request Body_
```
{
    "email": "student4@mail.com",
    "password": "12345",
    "name": "student4",
    "phoneNumber": "08121212"
}
```

_Success Register : Response ( 201 )_
```
{
    "email": "student4@mail.com",
    "name": "student 4"
}
```

_Wrong Input : Response (400 - Bad Request)_
```
{
    "<input>": "<message error for this input>",
    "<input>": "<message error for this input>"   
}
```
_Not Unique Email : Response (400 - Bad Request)_
```
{
    "email": "email must be unique"
}
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### POST /students/login
> Login as Student in this app

_Request Header_
```
{
  not need
}
```

_Request Body_
```
{
    "email": "student4@mail.com",
    "password": "12345",
}
```

_Success Login : Response ( 200 )_
```
{
    "access_token": string,
    "role": "student"
}
```

_Wrong Input : Response (400 - Bad Request)_
```
{
    "name": "Wrong Email/Password"
} 
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### GET /students/my-class
> To get all classes attended by a student

_Request Header_
```
{
  "access_token": string
}
```

_Request Body_
```
{
    Not Need
}
```

_Success Get : Response ( 200 )_
```
[
    {
        "id": 6,
        "ClassId": 1,
        "StudentId": 2,
        "note": "Belajar yang lebih giat yaa",
        "Class": {
            "id": 1,
            "TeacherId": 1,
            "name": "kelas 1",
            "Teacher": {
                "id": 1,
                "email": "teacher1@mail.com",
                "name": "teacher1",
                "phoneNumber": "08121212"
            }
        }
    },
    {
        "id": 7,
        "ClassId": 2,
        "StudentId": 2,
        "note": "good laah",
        "Class": {
            "id": 2,
            "TeacherId": 1,
            "name": "kelas 2",
            "Teacher": {
                "id": 1,
                "email": "teacher1@mail.com",
                "name": "teacher1",
                "phoneNumber": "08121212"
            }
        }
    }
]
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### GET /students/all-class

> To get all class

_Request Header_
```
{
  "access_token": string
}
```

_Request Body_
```
{
    Not Need
}
```

_Success Get : Response ( 200 )_
```
[
    {
        "id": 1,
        "TeacherId": 1,
        "name": "kelas 1",
        "Teacher": {
            "id": 1,
            "email": "teacher1@mail.com",
            "name": "teacher1",
            "phoneNumber": "08121212"
        }
    },
   ...
]
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### GET /students/waiting-class

> To get Class with status waiting

_Request Header_
```
{
  "access_token": string
}
```

_Request Body_
```
{
    Not Need
}
```

_Success Get : Response ( 200 )_
```
[
    {
        "id": 13,
        "ClassId": 4,
        "StudentId": 2,
        "Class": {
            "id": 4,
            "TeacherId": 1,
            "name": "kelas 3",
            "Teacher": {
                "id": 1,
                "email": "teacher1@mail.com",
                "name": "teacher1",
                "phoneNumber": "08121212"
            }
        }
    }
]
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### GET /students/my-score/:idClass

> To get score student in one class

_Request Header_
```
{
  "access_token": string
}
```

_Request Body_
```
{
    Not Need
}
```

_Success Get : Response ( 200 )_
```
{
    "id": 7,
    "ClassId": 2,
    "StudentId": 2,
    "score1": 20,
    "score2": 20,
    "score3": 20,
    "score4": 15,
    "score5": 10,
    "totalScore": 85,
    "predikat": "B",
    "status": "accepted",
    "note": "good laah",
    "createdAt": "2021-08-24T13:38:17.690Z",
    "updatedAt": "2021-08-26T03:14:19.304Z",
    "Class": {
        "id": 2,
        "TeacherId": 1,
        "name": "kelas 2",
        "Teacher": {
            "id": 1,
            "email": "teacher1@mail.com",
            "name": "teacher1",
            "phoneNumber": "08121212"
        }
    }
}
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---
### POST /students/join-class/:id

> To student when want to join a class

_Request Header_
```
{
  "access_token": string
}
```

_Request Body_
```
{
    Not Need
}
```

_Success Join : Response ( 201 )_
```
{
    "message": "Success join class"
}
```

_Internal Server Error : Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error",    
}
```
---