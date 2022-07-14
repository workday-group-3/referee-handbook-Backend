const express = require("express")
const router = express.Router()

const Learning = require("../models/Learning")


//Return all beginner courses 
router.get("/", async(req, res, next) =>{
    try {
        const beginnerCourses = await Learning.listAllBeginnerCourses()
        return res.status(200).json({beginnerCourses})
    } catch (err) {
        next(err)
    }
})

//Return a beginner course for a specific sport name
router.get("/:sportname/beginner", async (req, res, next) => {
    try {
        const sportInfo = await Learning.fetchSportByName(req.params.sportname)
        return res.status(200).json({sportInfo})
    } catch (err) {
        next(err)
    }

})

module.exports = router