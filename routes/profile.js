const express = require("express")
const router = express.Router()
const Profile = require("../models/profile")





//List all user created courses owned by the currently signed in user
router.get("/", async (req, res, next) => {
    try {
        // send json response back for list of all user created courses that are owned by the currently signed in user
        const { user } = res.locals
        const userOwnedCourses = await Profile.listUserCoursesByUser(user)
        return res.status(200).json({ userOwnedCourses })
    }
    catch(err) {
        next(err)
    }
})


















module.exports = router