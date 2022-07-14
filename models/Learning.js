const { BadRequestError, UnauthorizedError, NotFoundError} = require("../utils/errors")
const db = require("../db")

class Learning {
    static async listAllBeginnerCourses() {

        //pull all beginner courses from the database and return the results as rows
        const result = await db.query(` SELECT * FROM BeginnerCourses`)

        const courses = result.rows

        return courses
    }

    //query database by sports name
    static async fetchSportByName(name) {

        //if no name is provided, return an error
        if(!name) {
            throw new BadRequestError("No name is provided")
        }
        
        const query = `
            SELECT * FROM BeginnerCourses
            WHERE BeginnerCourses.sport_name = $1
        `
        const result = await db.query(query, [name])

        //error handling in case sports name is not in the beginner courses database
        if (!result) {
            throw new NotFoundError("Unable to find name: ", name)
        }

        const sports = result.rows

        return sports;

    }
}

module.exports = Learning