const { BadRequestError, UnauthorizedError, NotFoundError} = require("../utils/errors")
const db = require("../db")


class Profile {

    static async listUserCoursesByUser(user) {

        //pull all user created courses from database that the currently signed in user has created
        const results = await db.query(`
            SELECT c.sport_name,
                   c.course_title,
                   c.course_cover_image_URL,
                   c.course_short_description,
                   c.created_at,
                   c.user_id,
                   u.email
            FROM UserCreatedCourses AS c
                RIGHT JOIN users AS u ON u.id = c.user_id
            WHERE u.email = $1
            ORDER BY c.created_at DESC
        `, [user.email])

        return results.rows

    }



}



module.exports = Profile