var express = require("express")
var bodyParser = require("body-parser")
var jwt = require("jwt-simple")
var auth = require("./auth.js")()
var users = require("./users.js")
var cfg = require("./config.js")
var app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(auth.initialize())

app.get("/", function (req, res) {
    res.json({
        status: "My API is alive!"
    })
})

app.use(function (req, res, next) {
    //console.log(req)
    next()
})

app.get("/user", auth.authenticate(), function (req, res) {
    res.json(req.user)
})

app.post("/token", function (req, res) {
    console.log(req.body)
    if (req.body.email && req.body.password) {
        var email = req.body.email
        var password = req.body.password
        var user = users.find(function (u) {
            return u.email === email && u.password === password
        })
        if (user) {
            var payload = {
                id: user.id
            }
            var token = jwt.encode(payload, cfg.jwtSecret)
            res.json({
                token: token
            })
        } else {
            res.sendStatus(401)
        }
    } else {
        res.sendStatus(401)
    }
})

app.listen(3000, function () {
    console.log("My API is running...")
})
