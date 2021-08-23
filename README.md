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

> List all news preference

**Header**

```
not needed
```

**Body**

```
name       = <your name>
email      = <your email>
password   = <your password>
image      = <image file>
newsPrefId = <news preference id>
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
