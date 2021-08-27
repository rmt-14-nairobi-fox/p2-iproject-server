# My Assets App Server
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

### GET/ user/login

> User login

_request body_

```
{
	name : "John Doe",
	email : "john@mail.com",
	password : "1234Abc",
	gender : "male"
	date_birth : "17-09-2000"
	profile_picture : "image/url.com"
}

```

_response (200 ok)_

```
{
	name : "John Doe",
	email : "john@mail.com",
	profile_picture : "image/url",
	access_token : "323rmpewihoenfnvwvi0vnwvnwvpnvpwvonw2r309a"
}

```

_response (400 Bad Request)_
```
{
	message : "<field> cannot empty"
}

```

_response (401 unauthorized)_
```
{
	message : "Email/password wrong"
}

```
---
### POST/ /user/register
> User Sign Up

_Request Body_
```
{
    "name" : "Zeta", 
    "email" : "Zeta@mail", 
    "password" : "123456", 
    "date_birth" : "2009-19-08", 
    "gender" : "female"
}

```
_Response 201_
```
{
	
}

```

---
### GET/ stories?page=0
> Fetch data stories all with pagination

_Request Params_
```
{
	query : 0 
}

```

_Response 200 Ok_
```
{
	"totalItems": 10,
    "stories": [{
            "id": 3,
            "title": "Sepucuk Perih Yang Mendamaikan",
            "sinopsis": "Cinta memang mampu membuat siapapun berubah",
            "story_text": "Cinta memang mampu membuat siapapun berubah. Itulah pengaruh kekuatannya, Cinta memang mampu membuat siapapun berubah. Itulah pengaruh kekuatannya, Cinta memang mampu membuat siapapun berubah. Itulah pengaruh kekuatannya",
            "cover_image_url": "https://picsum.photos/200/300?random=2",
            "AuthorId": 1,
            "tag": "romance",
            "createdAt": "2021-08-25T04:02:41.774Z",
            "updatedAt": "2021-08-25T04:02:41.774Z"
        },
        {
            "id": 4,
            "title": "Gemuruh yang meniada",
            "sinopsis": "Persahabatan miskin dan kaya",
            "story_text": "Cinta memang mampu membuat siapapun berubah. Itulah pengaruh kekuatannya, Cinta memang mampu membuat siapapun berubah. Itulah pengaruh kekuatannya, Cinta memang mampu membuat siapapun berubah. Itulah pengaruh kekuatannya",
            "cover_image_url": "https://picsum.photos/200/300?random=1",
            "AuthorId": 2,
            "tag": "inspiration",
            "createdAt": "2021-08-25T04:02:41.774Z",
            "updatedAt": "2021-08-25T04:02:41.774Z"
        }],

    "totalPages": 2,
    "currentPage": 0
}

```
---
### GET /stories/:id (story id)
> Getting single story data

_Request Params_
```
{
	id : 1
}

```

_Reques Header_
```
{
	access_token : <some_access_token>
}

```

_Response 200 Ok_
```
{
    "id": 3,
    "title": "Sepucuk Perih Yang Mendamaikan",
    "sinopsis": "Cinta memang mampu membuat siapapun berubah",
    "story_text": "Cinta memang mampu membuat siapapun berubah. Itulah pengaruh kekuatannya, Cinta memang mampu membuat siapapun berubah. Itulah pengaruh kekuatannya, Cinta memang mampu membuat siapapun berubah. Itulah pengaruh kekuatannya",
    "cover_image_url": "https://picsum.photos/200/300?random=2",
    "AuthorId": 1,
    "tag": "romance",
    "createdAt": "2021-08-25T04:02:41.774Z",
    "updatedAt": "2021-08-25T04:02:41.774Z",
    "StoryComments": [
        {
            "reaction": "Cool!",
            "StoryId": 3,
            "UserId": null,
            "createdAt": "2021-08-25T21:23:36.668Z",
            "updatedAt": "2021-08-25T21:23:36.668Z"
        },
        {
            "reaction": "Cool!",
            "StoryId": 3,
            "UserId": 1,
            "createdAt": "2021-08-25T21:24:31.169Z",
            "updatedAt": "2021-08-25T21:24:31.169Z"
        },
        {
            "reaction": "ads",
            "StoryId": 3,
            "UserId": 9,
            "createdAt": "2021-08-26T03:01:14.106Z",
            "updatedAt": "2021-08-26T03:01:14.106Z"
        }
    ],
    "StoriesLikes": [
        {
            "id": 19,
            "StoryId": 3,
            "UserId": 1,
            "createdAt": "2021-08-26T01:38:45.916Z",
            "updatedAt": "2021-08-26T01:38:45.916Z"
        },
        {
            "id": 20,
            "StoryId": 3,
            "UserId": 1,
            "createdAt": "2021-08-26T01:38:53.143Z",
            "updatedAt": "2021-08-26T01:38:53.143Z"
        },
        {
            "id": 21,
            "StoryId": 3,
            "UserId": 1,
            "createdAt": "2021-08-26T01:38:55.520Z",
            "updatedAt": "2021-08-26T01:38:55.520Z"
        },
        {
            "id": 22,
            "StoryId": 3,
            "UserId": 1,
            "createdAt": "2021-08-26T01:38:57.450Z",
            "updatedAt": "2021-08-26T01:38:57.450Z"
        },
        {
            "id": 23,
            "StoryId": 3,
            "UserId": 1,
            "createdAt": "2021-08-26T01:39:00.386Z",
            "updatedAt": "2021-08-26T01:39:00.386Z"
        },
        {
            "id": 24,
            "StoryId": 3,
            "UserId": 9,
            "createdAt": "2021-08-26T03:01:05.358Z",
            "updatedAt": "2021-08-26T03:01:05.358Z"
        },
        {
            "id": 25,
            "StoryId": 3,
            "UserId": 9,
            "createdAt": "2021-08-26T03:01:07.304Z",
            "updatedAt": "2021-08-26T03:01:07.304Z"
        },
        {
            "id": 26,
            "StoryId": 3,
            "UserId": 1,
            "createdAt": "2021-08-26T15:25:45.812Z",
            "updatedAt": "2021-08-26T15:25:45.812Z"
        },
        {
            "id": 27,
            "StoryId": 3,
            "UserId": 1,
            "createdAt": "2021-08-26T15:25:47.568Z",
            "updatedAt": "2021-08-26T15:25:47.568Z"
        }
    ],
    "UserComment": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@mail.com",
            "password": "$2b$08$NPiMSuzWhKe3Q./467jjUufat4ocA5sLSafVCu6fJKiLfhQPc8xNC",
            "date_birth": "2000-10-01T00:00:00.000Z",
            "profile_picture": "https://ik.imagekit.io/61kwqbplekv7/dummy_profile_picture_i2nNaF_j8.jpg?updatedAt=1629789891619",
            "gender": "male",
            "createdAt": "2021-08-24T09:01:43.770Z",
            "updatedAt": "2021-08-24T09:01:43.770Z",
            "StoryComment": {
                "reaction": "Cool!",
                "StoryId": 3,
                "UserId": 1,
                "createdAt": "2021-08-25T21:24:31.169Z",
                "updatedAt": "2021-08-25T21:24:31.169Z"
            }
        },
        {
            "id": 9,
            "name": "Alfian Rudi Yogatama",
            "email": "alvmarjinal@gmail.com",
            "password": "$2b$08$QU/n5Co8zszzc4L8B1n.WuD8jO64ixB48yEGboAAQepPFdnIAPQxK",
            "date_birth": "2021-08-26T02:52:00.591Z",
            "profile_picture": "https://ik.imagekit.io/61kwqbplekv7/dummy_profile_picture_i2nNaF_j8.jpg?updatedAt=1629789891619",
            "gender": "unverified",
            "createdAt": "2021-08-26T02:52:00.840Z",
            "updatedAt": "2021-08-26T02:52:00.840Z",
            "StoryComment": {
                "reaction": "ads",
                "StoryId": 3,
                "UserId": 9,
                "createdAt": "2021-08-26T03:01:14.106Z",
                "updatedAt": "2021-08-26T03:01:14.106Z"
            }
        }
    ]
}

```
_Response 400 Bad Request_
```
{
    "messages": "You need to login first"
}

```
---
### 