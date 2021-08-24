# API DOC 

### GET/ user/login

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

### GET/ stories

{
	title : 'Sebuah cerita',
	authorId : 1,
	cover : 'link.url/url'
}