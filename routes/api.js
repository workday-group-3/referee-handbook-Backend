const express = require("express")
const Redis = require("ioredis")
const axios = require("axios")
const constants = require("../constants")
const router = express.Router()
const redis = new Redis(
    {'port': process.env.REDIS_PORT || 6379,
    'host': process.env.REDIS_HOST || '127.0.0.1'})

// storing all the information for leagues, leagueName and seasons of each respective sport
const requestParams = {"basketball": {"league": 12, "season": "2021-2022", "leagueName": "NBA"},
                    "baseball": {"league": 1, "season": "2022", "leagueName": "MLB"},
                    "soccer": {"league": 253, "season": "2022", "leagueName": "Major League Soccer"},
                    "hockey": {"league": 57, "season": "2021", "leagueName": "NHL"},
                    "volleyball": {"league": 180, "season": "2022", "leagueName": "NVA"},
                    "rugby": {"league": 44, "season": "2022", "leagueName": "Major League Rugby"}}

//Sanitary check
router.get("/", async(req, res, next) =>{
    try {
        return res.status(200).json({"ping": "pong"})
    } catch (err) {
        next(err)
    }
})

router.get("/:sportName/teams", async(req, res, next) =>{
    try {
        const {sportName} = req.params

        let apiSportString = 'v1.'+sportName
        // the api version for soccer is v3, different from the rest
        if(sportName == "soccer"){
            apiSportString = "v3.football"
        }
        let t0 = new Date().getTime()
        // check if we have a cached value of the sport we want
        let cacheEntry = await redis.get(`teams:${sportName}`)
        let t1 = new Date().getTime()
        // if cache hit, return that entry
        if(cacheEntry) {
            cacheEntry = JSON.parse(cacheEntry)
            return res.status(200).json({"sport": sportName, "apiSportString": apiSportString, "json": cacheEntry, "source": "cache", "time": (t1-t0)+"ms"})
        }

        // otherwise call api, conditionally fetches by the league and season of the specific sport
        let json = await axios.get("https://"+apiSportString+".api-sports.io/teams?league="+requestParams[sportName].league+"&season="+requestParams[sportName].season, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": apiSportString+".api-sports.io",
                "x-rapidapi-key": process.env.SPORTS_API_KEY
            }
        })
        redis.set(`teams:${sportName}`, JSON.stringify(json.data.response), 'EX', 13149000)
        t1 = new Date().getTime()
        
        return res.status(200).json({"sport": sportName, "apiSportString": apiSportString, "json": json.data.response, "source": "api", "time": (t1-t0)+"ms"})
    } catch (err) {
        next(err)
    }
})

module.exports = router