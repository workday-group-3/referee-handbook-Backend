const { BadRequestError, UnauthorizedError, NotFoundError} = require("../utils/errors")
const db = require("../db")


class Profile {

    static async fetchEmailFromUsername (user) {
        const username = user.username

        //return user email from username 
        const results = await db.query(`
            SELECT * FROM users
            WHERE username=$1;
        `, [username])

        const email = results.rows[0].email;
    
        return email;
    }

    static async listUserCoursesByUser(user) {

        //checks if a user email is provided or a username. If email, set email to it, 
        //if username, grab the email from it in another function
        const email = 'username' in user ? await this.fetchEmailFromUsername(user) : user.email

        //pull all user created courses from database that the currently signed in user has created
        const results = await db.query(`
            SELECT c.sport_name,
                   c.id AS "courseId",
                   c.course_title,
                   c.course_cover_image_URL,
                   c.course_short_description,
                   c.course_content,
                   c.course_tips_tricks,
                   c.difficulty,
                   c.course_tutorial_video_URL,
                   c.created_at,
                   c.user_id,
                   u.email
            FROM UserCreatedCourses AS c
                JOIN users AS u ON u.id = c.user_id
            WHERE u.email = $1
            ORDER BY c.created_at DESC
        `, [email])

        return results.rows
    }

    static async listUserPublicInformation(user) {

        const username = user.username

        const results = await db.query(`
            SELECT
                users.username,
                users.full_name,
                users.location,
                users.profile_image_url,
                users.created_at,
                users.email
            FROM users
            WHERE users.username=$1
        `, [username])


        return results.rows[0]

    }

    static async listFollowedTeamsByUser(user) {

        //checks if a user email is provided or a username. If email, set email to it, 
        //if username, grab the email from it in another function
        const email = 'username' in user ? await this.fetchEmailFromUsername(user) : user.email

        //pull all user followed teams from database that are owned by the currently signed in user 
        const results = await db.query(`
            SELECT t.team_name,
                   t.team_logo,
                   t.team_id,
                   t.team_league,
                   t.team_sport_name,
                   t.user_id,
                   t.following_at,
                   u.email
            FROM UsersFollowingTeam AS t
                JOIN users AS u ON u.id = t.user_id
            WHERE u.email = $1
            ORDER BY t.following_at DESC
        `, [email])
        return results.rows
    }


    static async listRatingsReceivedByUser(user) {
        //query to receive all active ratings across all courses created by passed in user

        const email = 'username' in user ? await this.fetchEmailFromUsername(user) : user.email

        const results = await db.query(`
            SELECT c.course_title,
                   r.rating
            FROM UserCreatedCourses AS c
            JOIN users AS u 
                ON u.id = c.user_id
            JOIN ratings AS r
                ON c.id = r.course_id
            WHERE u.email = $1 
            ORDER BY r.created_at
        `, [email])
        return results.rows


    }


}



module.exports = Profile