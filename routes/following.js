const express = require("express")
const router = express.Router()
const security = require("../middleware/security")
const following = require("../models/following")



//Post new user following entry, return newly created following entry
router.post("/:sportname/:teamId", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        // accept request body with one team key containing an object with all attributes of a team entry, along witih information from useParams in frontend
        const { sportname, teamId } = req.params
        const { user } = res.locals
        const team = await following.followTeam({team: req.body, user, sportname, teamId})
        return res.status(201).json({ team })
    }
    catch(err) {
        next(err)
    }
})



module.exports = router