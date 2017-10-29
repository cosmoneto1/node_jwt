# NodeJs JsonWebToken  
Nodejs, expressjs e passportjs.
Exemplo de uma aplicação rest em nodejs com json web token.  

## Start
```bash
$ cd node_jwt && npm install && node index.js
```

## Urls
```bash
get: localhost:3000
post: localhost:3000/token
        email:sarah@mail.com
        password:sarah123

 get: localhost:3000/user
        Headers
            Authorization: Bearer token
```