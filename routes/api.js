const express = require("express")
const Redis = require("ioredis")
const axios = require("axios")
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

        // check if we have a cached value of the sport we want
        let cacheEntry = await redis.get(`teams:${sportName}`)

        // if cache hit, return that entry
        if(cacheEntry) {
            cacheEntry = JSON.parse(cacheEntry)
            return res.status(200).json({"json": cacheEntry, "source": "cache"})
        }

        // otherwise call api, conditionally fetches by the league and season of the specific sport
        let json = await axios.get("https://"+apiSportString+".api-sports.io/teams?league="+requestParams[sportName].league+"&season="+requestParams[sportName].season, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": apiSportString+".api-sports.io",
                "x-rapidapi-key": process.env.SPORTS_API_KEY
            }
        })
        
        // soccer data is formatted differently, change json formatting here to avoid complications
        if(sportName == "soccer"){
            for(let i = 0; i < json.data.response.length; i++){
                json.data.response[i] = json.data.response[i].team
            }
        }
        // delete the league from the list of baseball teams
        if(sportName == "baseball"){
            delete json.data.response[0]
        }

        //delete the divisions from the list of hockey teams
        if(sportName == "hockey"){
            delete json.data.response[2]
            delete json.data.response[7]
        }

        redis.set(`teams:${sportName}`, JSON.stringify(json.data.response), 'EX', 13149000)
        
        return res.status(200).json({"json": json.data.response, "source": "api"})
    } catch (err) {
        next(err)
    }
})

router.get("/:sportName/recentGame", async(req, res, next) =>{
    try {
        const {sportName} = req.params

        let apiSportString = 'v1.'+sportName
        let endpoint = "/games"
        // the api version for soccer is v3, endpoint is fixtures, different from the rest
        if(sportName == "soccer"){
            apiSportString = "v3.football"
            endpoint = "/fixtures"
        }

         // check if we have a cached value of the sport we want
         let cacheEntry = await redis.get(`recentGame:${sportName}`)

         // if cache hit, return that entry
         if(cacheEntry) {
             cacheEntry = JSON.parse(cacheEntry)
             return res.status(200).json({"json": cacheEntry, "source": "cache"})
         }

         // otherwise, call api
        let json = await axios.get("https://"+apiSportString+".api-sports.io"+endpoint+"?league="+requestParams[sportName].league+"&season="+requestParams[sportName].season, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": apiSportString+".api-sports.io",
                    "x-rapidapi-key": process.env.SPORTS_API_KEY
                }
        })

        // soccer data is formatted differently, have to filter differently
        if(sportName === "soccer"){
            // filter to find the matches that finished/is in progress
            let filtered_games = json.data.response.filter((item)=>item.fixture.date < new Date().toISOString())

            // reformat the most recent game
            // change the key "goals" to "scores" to match the others
            filtered_games[filtered_games.length - 1].scores = filtered_games[filtered_games.length - 1].goals
            delete filtered_games[filtered_games.length - 1].goals

            // extract date and status variables to match others
            filtered_games[filtered_games.length - 1].date = filtered_games[filtered_games.length - 1].fixture.date
            filtered_games[filtered_games.length - 1].status = filtered_games[filtered_games.length - 1].fixture.status
            delete filtered_games[filtered_games.length - 1].fixture

            // set the updated game
            redis.set(`recentGame:${sportName}`, JSON.stringify(filtered_games[filtered_games.length - 1]), 'EX', 60)
            return res.status(200).json({"json": filtered_games[filtered_games.length - 1], "source": "api"})
        }

        // data filtering for all the other sports
        else{
            let filtered_games_others = json.data.response.filter((item)=>item.date < new Date().toISOString())
            if(sportName == "basketball" || sportName == "baseball"){
                // basketball and baseball are formatted differently, extract the total scores to match other formatting
                filtered_games_others[filtered_games_others.length - 1].scores.home = filtered_games_others[filtered_games_others.length - 1].scores.home.total
                filtered_games_others[filtered_games_others.length - 1].scores.away = filtered_games_others[filtered_games_others.length - 1].scores.away.total
            }
            redis.set(`recentGame:${sportName}`, JSON.stringify(filtered_games_others[filtered_games_others.length - 1]), 'EX', 60)
            return res.status(200).json({"json": filtered_games_others[filtered_games_others.length - 1], "source": "api"})
        }     
        
    } catch (err) {
        next(err)
    }
})

module.exports = router