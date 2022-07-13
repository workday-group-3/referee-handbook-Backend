-- CREATE TABLE users (

-- )

CREATE TABLE BeginnerCourses (
    id                          SERIAL PRIMARY KEY,
    sport_name                  TEXT NOT NULL,
    beginner_history_timeline   TEXT NOT NULL,
    beginner_rules              TEXT NOT NULL,
    beginner_short_description  TEXT NOT NULL,
    beginner_cover_image_URL    TEXT NOT NULL,
    beginner_tutorial_video_URL TEXT NOT NULL,
    beginner_field_diagram_URL  TEXT NOT NULL,
    created_at                  TIMESTAMP NOT NULL DEFAULT NOW()
)

-- CREATE TABLE UserCreatedCourses (
--     id                          SERIAL PRIMARY KEY,
--     sport_name                  TEXT NOT NULL,
--     user_id                  INTEGER NOT NULL,
--     course_title                TEXT NOT NULL,
--     course_short_description    TEXT NOT NULL,
--     course_cover_image_URL 	    TEXT NOT NULL,
--     course_content              TEXT NOT NULL,
--     course_tutorial_video_URL   TEXT NOT NULL,
--     course_tips_tricks          TEXT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(id),
--     created_at                  TIMESTAMP NOT NULL DEFAULT NOW()
-- )


