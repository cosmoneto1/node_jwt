var passport = require("passport")
var passportJWT = require("passport-jwt")
var users = require("./users.js")
var cfg = require("./config.js")
var ExtractJwt = passportJWT.ExtractJwt
var Strategy = passportJWT.Strategy
var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = function () {
    var strategy = new Strategy(params, function (payload, done) {
        console.log(payload)
        var user = users.filter((x) => x.id == payload.id)[0] || null
        console.log(user)
        if (user) {
            return done(null, {
                id: user.id,
                name: user.name,
                email: user.email
            })
        } else {
            return done(new Error("User not found"), null)
        }
    })
    passport.use(strategy)
    return {
        initialize: function () {
            return passport.initialize()
        },
        authenticate: function () {
            return passport.authenticate('jwt', { session: false })
        }
    }
}