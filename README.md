# p2-iproject-server

Individual Portfolio Server

# API Documentation

### GET /newsprefs

> List all news preference

**Header**

```
not needed
```

**Body**

```
not needed
```

_Response 200 OK_

```JSON
[
    {
        "name": "Gaming"
    },
    {
        "name": "Sports"
    },
    {
        "name": "Cryptocurrency"
    },
    {
        "name": "Health"
    },
    {
        "name": "Entertainment"
    }
]
```

---

### POST /users/register

> Register

**Header**

```
not needed
```

**Body**

```
name          = <your name>
email         = <your email>
password      = <your password>
profile-image = <image file>
newsPrefId    = <news preference id>
```

_Response 201 Created_

```JSON
{
  "id": 1,
  "name": "<your name>"
}
```

_Response 400 Bad Request_

```JSON
[
  "<field> cannot be empty",
  "Invalid email format",
  "Email already exists"
]
```

---

### POST /users/login

> Login

**Header**

```
not needed
```

**Body**

```
email      = <your email>
password   = <your password>
```

_Response 200 OK_

```JSON
{
  "access_token": "<token>",
  "name": "<your name>",
  "imgUrl": "<your profile image url>"
 }
```

_Response 401 Unauthorized_

```JSON
{
  "message": "Invalid email/password"
}
```

---

### POST /users/google

> Login with google account

**Header**

```
not needed
```

**Body**

```
idToken      = <google id token>
newsPrefId   = <news preference id>
```

_Response 200 OK | 201 Created_

```JSON
{
  "access_token": "<token>",
  "name": "<your name>",
  "imgUrl": "<your profile image url>"
 }
```

_Response 401 Unauthorized_

```JSON
{
  "message": "Invalid email/password"
}
```

---

### PUT /users/edit

> Edit profile

**Header**

```
access_token = <token>
```

**Body**

```
name          = <new name>
profile-image = <image file>
```

_Response 200 OK_

```JSON
{
  "message": "Profile updated"
}
```

_Response 401 Unauthorized_

```JSON
{
  "message": "(Invalid token) | (Please login first)"
}
```

---

### GET /news

> List news

**Header**

```
access_token = <token>
```

**Body**

```
not needed
```

_Response 200 OK_

```JSON
{
    "totalArticles": 11209,
    "articles": [
        {
            "title": "Intel Arc Alchemist Gaming GPUs Will Have Baked-In Overclocking Support",
            "description": "The overclocking interface will be baked right into the driver UI.",
            "content": "Intel is going all-in with discrete graphics, which was made abundantly clear last week with the announcement of its Arc family of gaming cards . Built on Intel’s Xe-HPG architecture, the first graphics cards to hit the market in Q1 2022 will come fr... [2064 chars]",
            "url": "https://hothardware.com/news/intel-arc-alchemist-gaming-gpus-will-have-baked-in-overclocking-support",
            "image": "https://images.hothardware.com/contentimages/newsitem/56062/content/intel_arc_roadmap.jpg",
            "publishedAt": "2021-08-24T14:35:00Z",
            "source": {
                "name": "Hot Hardware",
                "url": "https://hothardware.com"
            }
        },
        ...
    ]
}
```

_Response 401 Unauthorized_

```JSON
{
  "message": "(Invalid token) | (Please login first)"
}
```

---

### POST /news

> Save news

**Header**

```
access_token = <token>
```

**Body**

```JSON
{
  "payload": {
    "title": "<title>",
    "description": "<description>",
    "content": "<content>",
    "url": "<news url>",
    "image": "<news image url>",
    "publishedAt": "<date>",
    "source": {
      "name": "<source name>",
      "url": "<source url>"
    }
  }
}

```

_Response 201 Created_

```JSON
{
  "message": "News saved successfully"
}
```

_Response 401 Unauthorized_

```JSON
{
  "message": "(Invalid token) | (Please login first)"
}
```

---

### GET /news/saved

> List saved news

**Header**

```
access_token = <token>
```

**Body**

```
not needed
```

_Response 200 OK_

```JSON
[
    {
        "id": 3,
        "title": "Best Xbox Gaming Headset 2021: Top Options For Xbox Series X And Xbox One",
        "description": "From SteelSeries to Corsair, here are the best Xbox headsets we've tested, including great options for both Xbox Series X and Xbox One.",
        "content": "Gaming headsets can enhance your experience with your Xbox Series X or Xbox One, especially when playing competitive games. And one of the main perks of Microsoft's commitment to backwards compatibility is that every Xbox headset released for Xbox On... [1846 chars]",
        "url": "https://www.gamespot.com/articles/best-xbox-gaming-headset/1100-6485694/",
        "image": "https://www.gamespot.com/a/uploads/screen_kubrick/1551/15511094/3775388-xbox-headsets.jpg",
        "publishedAt": "2021-08-23T21:37:49.000Z",
        "source_name": "GameSpot",
        "user_id": 3,
        "source_url": "https://www.gamespot.com",
        "createdAt": "2021-08-24T04:35:06.049Z",
        "updatedAt": "2021-08-24T04:35:06.049Z"
    },
    ...
]
```

_Response 401 Unauthorized_

```JSON
{
  "message": "(Invalid token) | (Please login first)"
}
```

---

### DELETE /news/saved/:savedId

> Delete saved news by params :savedId

**Header**

```
access_token = <token>
```

**Body**

```
not needed
```

_Response 200 OK_

```JSON
{
  "message": "Saved news deleted successfully"
}
```

_Response 401 Unauthorized_

```JSON
{
  "message": "(Invalid token) | (Please login first)"
}
```

_Response 403 Forbidden_

```JSON
{
  "message": "You are not allowed to delete this saved news"
}
```

---

### GET /posts

> List all post from all user

**Header**

```
access_token = <token>
```

**Body**

```
not needed
```

_Response 200 OK_

```JSON
[
    {
        "id": 3,
        "title": "test",
        "message": "test",
        "user_id": 3,
        "savedNews_id": 3,
        "createdAt": "2021-08-24T09:36:56.165Z",
        "updatedAt": "2021-08-24T09:36:56.165Z",
        "SavedNew": {
            "title": "Best Xbox Gaming Headset 2021: Top Options For Xbox Series X And Xbox One"
        }
    },
    {
        "id": 1,
        "title": "test",
        "message": "test post",
        "user_id": 1,
        "savedNews_id": 1,
        "createdAt": "2021-08-23T16:46:27.700Z",
        "updatedAt": "2021-08-23T16:46:27.700Z",
        "SavedNew": {
            "title": "test"
        }
    }
]
```

_Response 401 Unauthorized_

```JSON
{
  "message": "(Invalid token) | (Please login first)"
}
```

---

### GET /posts/myposts

> List all post from current user

**Header**

```
access_token = <token>
```

**Body**

```
not needed
```

_Response 200 OK_

```JSON
[
    {
        "id": 3,
        "title": "test",
        "message": "test",
        "user_id": 3,
        "savedNews_id": 3,
        "createdAt": "2021-08-24T09:36:56.165Z",
        "updatedAt": "2021-08-24T09:36:56.165Z",
        "SavedNew": {
            "title": "Best Xbox Gaming Headset 2021: Top Options For Xbox Series X And Xbox One"
        }
    }
]
```

_Response 401 Unauthorized_

```JSON
{
  "message": "(Invalid token) | (Please login first)"
}
```

---

### POST /posts

> Create post

**Header**

```
access_token = <token>
```

**Body**

```
title = <title>
message = <message>
savedNews_id = <current user saved news id>
```

_Response 200 OK_

```JSON
{
  "message": "Post created"
}
```

_Response 401 Unauthorized_

```JSON
{
  "message": "(Invalid token) | (Please login first)"
}
```

_Response 404 Not Found_

```JSON
{
  "message": "Saved news with id <savedNews_id> is not found"
}
```

_Response 403 Forbidden_

```JSON
{
  "message": "You can't use this saved news for your post"
}
```

---

### PUT /posts/:postId

> Edit post with id from params :postId

**Header**

```
access_token = <token>
```

**Body**

```
title = <title>
message = <message>
savedNews_id = <current user saved news id>
```

_Response 200 OK_

```JSON
{
  "message": "Post edited"
}
```

_Response 401 Unauthorized_

```JSON
{
  "message": "(Invalid token) | (Please login first)"
}
```

_Response 404 Not Found_

```JSON
{
  "message": "Saved news with id <savedNews_id> is not found"
}
```

_Response 403 Forbidden_

```JSON
{
  "message": "You can't use this saved news for your post"
}
```

_Response 403 Forbidden_

```JSON
{
  "message": "You are not allowed to modify this post"
}
```

_Response 404 Not Found_

```JSON
{
  "message": "Post with id <:postId> is not found"
}
```

---

### DELETE /posts/:postId

> Delete post with id from params :postId

**Header**

```
access_token = <token>
```

**Body**

```
not needed
```

_Response 200 OK_

```JSON
{
  "message": "Post deleted"
}
```

_Response 401 Unauthorized_

```JSON
{
  "message": "(Invalid token) | (Please login first)"
}
```

_Response 403 Forbidden_

```JSON
{
  "message": "You are not allowed to modify this post"
}
```

_Response 404 Not Found_

```JSON
{
  "message": "Post with id <:postId> is not found"
}
```

---

### GET /corona

> Get corona cases graph

**Header**

```
not needed
```

**Body**

```
not needed
```

_Response 200 OK_

```JSON
{
  "image": "<base64Img string>"
}
```

---

### GET /weather

> Get today's weather for Jakarta

**Header**

```
not needed
```

**Body**

```
not needed
```

_Response 200 OK_

```JSON
{
    "coord": {
        "lon": 106.8451,
        "lat": -6.2146
    },
    "weather": [
        {
            "id": 721,
            "main": "Haze",
            "description": "haze",
            "icon": "50n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 298.2,
        "feels_like": 299.06,
        "temp_min": 298.2,
        "temp_max": 299.11,
        "pressure": 1011,
        "humidity": 88
    },
    "visibility": 5000,
    "wind": {
        "speed": 0,
        "deg": 0
    },
    "clouds": {
        "all": 35
    },
    "dt": 1629819553,
    "sys": {
        "type": 1,
        "id": 9383,
        "country": "ID",
        "sunrise": 1629759406,
        "sunset": 1629802425
    },
    "timezone": 25200,
    "id": 1642911,
    "name": "Jakarta",
    "cod": 200
}
```

---
