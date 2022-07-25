const { BadRequestError, UnauthorizedError, NotFoundError} = require("../utils/errors")
const db = require("../db")

class following {




    static async followTeam({team, user, sportname, teamId}) {


        //error checking to see if form is missing any required parameters
        const requiredFields = ["teamName", "teamLogo", "teamLeague"]
        requiredFields.forEach(field => {
            if (!team.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} field.`)
            }
        })

        //inserting new following entrry into db
        const results = await db.query(`
            INSERT INTO UsersFollowingTeam (
                team_name,
                team_logo,
                team_id,
                team_league,
                team_sport_name,
                user_id
                )
                VALUES ($1, $2, $3, $4, $5,(SELECT id FROM users WHERE email = $6))
                RETURNING id,
                          team_name
                          team_logo,
                          team_id,
                          team_league,
                          team_sport_name,
                          user_id,
                          following_at

        
        `, [team.teamName, team.teamLogo, teamId, team.teamLeague, sportname, user.email])

        return results.rows[0]
    }











}

module.exports = following