//import required modules
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

//import errors & security
const security = require("./middleware/security")
const { NotFoundError } = require("./utils/errors")


//create routes
const authRoutes = require("./routes/auth")
const learningRoutes = require("./routes/learning")
const profileRoutes = require("./routes/profile")



const app = express()

//middleware
app.use(cors()) //enable cross origin sharing
app.use(express.json()) //parse incoming request bodies with JSON payloads
app.use(morgan("tiny")) // Log request info


//for every request, check if a token exists in the authorization header
//if it does, attach the decoded user to res.locals
app.use(security.extractUserFromJwt)



//Assign routes
app.use("/auth", authRoutes)
app.use("/learning", learningRoutes)
app.use("/profile", profileRoutes)


// health check 
app.get("/", function(req, res) {
    return res.status(200).json({ping: "pong"})
})

//Displays error message when URL directory is not found
//EX : http://localhost:3001/not-a-route
app.use((req, res, next) => {
    return next(new NotFoundError())
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: {message, status}
    })
})


module.exports = app