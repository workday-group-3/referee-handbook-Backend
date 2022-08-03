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


    static async createNewCourse({course, user}) {


        //error checking to see if form is missing any required parameters
        const requiredFields = ["sportName", "courseName", "shortDescription", "detailedDescription", "coverImageURL", "difficulty", "tipsAndTricks"]


        requiredFields.forEach(field => {
            if (!course.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} field.`)
            }
        })

        //checking for any fields exceeding character limits set in database
        requiredFields.forEach(field => {
            if(course[field].length > 5000) {
                throw new BadRequestError(`${field} exceeds maximum character length.`)
            }
        })

        
        
        //Use Regular expressions to test that the provided YT URL contains a video code
        const videoCode = /watch\?v\=(.*)/
        const acceptableFormat = videoCode.test(course.tutorialVideoURL)

        
        if (course.tutorialVideoURL != '' && course.tutorialVideoURL != undefined && !acceptableFormat) {
            throw new BadRequestError(`Invalid YouTube Url`)
        }



        //inserting course entry into db
        const results = await db.query(`
            INSERT INTO UserCreatedCourses (
                sport_name,
                course_title,
                course_short_description,
                course_content,
                course_cover_image_URL,
                course_tutorial_video_URL,
                course_tips_tricks,
                difficulty,
                user_id
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, (SELECT id FROM users WHERE email = $9))
                RETURNING id,
                          sport_name
                          course_title,
                          course_short_description,
                          course_content,
                          course_cover_image_URL,
                          course_tutorial_video_URL,
                          course_tips_tricks,
                          difficulty,
                          user_id,
                          created_at

        
        `, [course.sportName, course.courseName, course.shortDescription, course.detailedDescription, course.coverImageURL, course.tutorialVideoURL, course.tipsAndTricks, course.difficulty, user.email])

        return results.rows[0]
    }


    static async updateExistingCourse ({course, courseId}) {
        //error checking to see if form is missing any required parameters
        const requiredFields = ["sportName", "courseName", "shortDescription", "detailedDescription", "coverImageURL", "difficulty", "tipsAndTricks"]


        requiredFields.forEach(field => {
            if (!course.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} field.`)
            }
        })

        //checking for any fields exceeding character limits set in database
        requiredFields.forEach(field => {
            if(course[field].length > 5000) {
                throw new BadRequestError(`${field} exceeds maximum character length.`)
            }
        })

        
        
        //Use Regular expressions to test that the provided YT URL contains a video code
        const videoCode = /watch\?v\=(.*)/
        const acceptableFormat = videoCode.test(course.tutorialVideoURL)

        if (course.tutorialVideoURL != undefined && !acceptableFormat) {
            throw new BadRequestError(`Invalid YouTube Url`)
        }

        //editing course entry in database 
        const results = await db.query(`
            UPDATE UserCreatedCourses
            SET course_title=$1,
                course_short_description=$2,
                course_content=$3,
                course_cover_image_URL=$4,
                course_tutorial_video_URL=$5,
                course_tips_tricks=$6,
                difficulty=$7
            WHERE id=$8 ;
        `, [course.courseName, course.shortDescription, course.detailedDescription, course.coverImageURL, course.tutorialVideoURL, course.tipsAndTricks, course.difficulty, courseId])
        
        

        return results.rows[0]
    }

    static async listUserCoursesBySport(sportname) {

        //pull all user created courses from database that satisfy the sportName parameter
        const results = await db.query(`
            SELECT
                c.id AS "courseId", 
                c.course_title,
                c.course_short_description,
                c.course_content,
                c.course_cover_image_URL,
                c.course_tutorial_video_URL,
                c.course_tips_tricks,
                c.difficulty,
                c.created_at,
                AVG(r.rating) AS "rating",
                COUNT(r.rating) AS "totalRatings",
                u.username,
                u.email,
                u.profile_image_URL
            FROM UserCreatedCourses AS c
                LEFT JOIN users AS u ON u.id = c.user_id
                LEFT JOIN ratings AS r ON r.course_id = c.id
            WHERE c.sport_name = $1
            GROUP BY c.id, u.username, u.email, u.profile_image_URL
            ORDER BY c.created_at DESC
        `, [sportname])
        return results.rows
   
    }



    static async listUserCourseById({courseId}) {

        //pull all user created courses from database that matches courseId
        const results = await db.query(`
            SELECT
                c.id AS "courseId", 
                c.course_title,
                c.course_short_description,
                c.course_content,
                c.course_cover_image_URL,
                c.course_tutorial_video_URL,
                c.course_tips_tricks,
                c.difficulty,
                c.created_at,
                AVG(r.rating) AS "rating",
                COUNT(r.rating) AS "totalRatings",
                u.username,
                u.email 
            FROM UserCreatedCourses AS c
                LEFT JOIN users AS u ON u.id = c.user_id
                LEFT JOIN ratings AS r ON r.course_id = c.id
            WHERE c.id = $1
            GROUP BY c.id, u.username, u.email
        `, [courseId])
        return results.rows[0]
   
    }

    static async deleteCourseById( { courseId} ) {

        //deletes a course based on the provided courseId
        const results = await db.query(`
            DELETE 
            FROM UserCreatedCourses
            WHERE id=$1
        `, [courseId])

        return results.rows[0]
    }
















}

module.exports = Learning