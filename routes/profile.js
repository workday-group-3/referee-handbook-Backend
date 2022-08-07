const express = require("express")
const router = express.Router()
const Profile = require("../models/profile")





//List all user created courses owned by the currently signed in user, along with all their followed sports teams
router.get("/", async (req, res, next) => {
    try {
        // send json response back for list of all user created courses that are owned by the currently signed in user, along with list of all their followed teams
        const { user } = res.locals
        const userOwnedCourses = await Profile.listUserCoursesByUser(user)
        const userFollowedTeams = await Profile.listFollowedTeamsByUser(user)
        const userReceivedRatings = await Profile.listRatingsReceivedByUser(user)
        return res.status(200).json({ "userCourses": userOwnedCourses, "userTeams": userFollowedTeams, "userReceivedRatings": userReceivedRatings })
    }
    catch(err) {
        next(err)
    }
})

//list all user created courses owned by a searched user, along with all their followed sports teams
router.get("/:username", async (req, res, next) => {
    try {
        const { username } = req.params
        const userOwnedCourses = await Profile.listUserCoursesByUser({username})
        const userInformation = await Profile.listUserPublicInformation({username})
        const userFollowedTeams = await Profile.listFollowedTeamsByUser({username})
        const userReceivedRatings = await Profile.listRatingsReceivedByUser({username})

        
        return res.status(200).json({ "userCourses": userOwnedCourses, "userTeams": userFollowedTeams, "userInformation" : userInformation, "userReceivedRatings": userReceivedRatings })
        

    } 
    catch (err) {
        next(err)
    }
})





















module.exports = router