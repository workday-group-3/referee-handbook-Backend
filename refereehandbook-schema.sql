-- CREATE USER TABLE
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE CHECK(POSITION('@' IN email) > 1),
    username    TEXT NOT NULL,
    password    TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    location    TEXT NOT NULL,
    profile_image_URL TEXT,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);



-------------------  CREATE AND SEED BEGINNER COURSES ----------------------
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
);

INSERT INTO BeginnerCourses (id, sport_name, beginner_history_timeline, beginner_rules, beginner_short_description, beginner_cover_image_URL, beginner_tutorial_video_URL, beginner_field_diagram_URL)
VALUES (1, 
        'Soccer', 
        'timeline Url', 
        'A match consists of two 45 minutes halves with a 15 minute rest period in between.  
            Each team can have a minimum off 11 players (including 1 goalkeeper who is the only player allowed to handle the ball within the 18 yard box) and a minimum of 7 players are needed to constitute a match.
            The field must be made of either artificial or natural grass. The size of pitches is allowed to vary but must be within 100-130 yards long and 50-100 yards wide. The pitch must also be marked with a rectangular shape around the outside showing out of bounds, two six yard boxes, two 18 yard boxes and a centre circle. A spot for a penalty placed 12 yards out of both goals and centre circle must also be visible.
            The ball must have a circumference of 58-61cm and be of a circular shape.
            Each team can name up to 7 substitute players. Substitutions can be made at any time of the match with each team being able to make a maximum of 3 substitutions per side. In the event of all three substitutes being made and a player having to leave the field for injury the team will be forced to play without a replacement for that player.
            Each game must include one referee and two assistant referee`s (linesmen). It`s the job of the referee to act as time keeper and make any decisions which may need to be made such as fouls, free kicks, throw ins, penalties and added on time at the end of each half. The referee may consult the assistant referees at any time in the match regarding a decision. It`s the assistant referee`s job to spot offside`s in the match (see below), throw ins for either team and also assist the referee in all decision making processes where appropriate.
            If the game needs to head to extra time as a result of both teams being level in a match then 30 minutes will be added in the form of two 15 minute halves after the allotted 90 minutes.
            If teams are still level after extra time then a penalty shootout must take place.
            The whole ball must cross the goal line for it to constitute as a goal.
            For fouls committed a player could receive either a yellow or red card depending on the severity of the foul; this comes down to the referee`s discretion. The yellow is a warning and a red card is a dismissal of that player. Two yellow cards will equal one red. Once a player is sent off then they cannot be replaced.
            If a ball goes out of play off an opponent in either of the side lines then it is given as a throw in. If it goes out of play off an attacking player on the base line then it is a goal kick. If it comes off a defending player it is a corner kick.', 
        'Football (Soccer) is one of the oldest sports in the world and with that; it`s also one of the most recognised. The pinnacle of the international game comes in the form the Football World Cup.  Domestically the strongest leagues come from England (English Premier League), Spain (La Liga), Italy (Serie A) and Germany (Bundesliga). ', 
        'https://media.npr.org/assets/img/2022/06/06/ap22156795241469_custom-ac5673971ad7b73fb5af7e3c0605d08abc59f80e-s1100-c50.jpg', 
        'https://www.youtube.com/watch?v=qknP-E-vPQ4', 
        'https://www.soccerdrive.com/sites/SoccerDrive2-0/files/soccer-field-diagram-with-lines.jpg' );

INSERT INTO BeginnerCourses (id, sport_name, beginner_history_timeline, beginner_rules, beginner_short_description, beginner_cover_image_URL, beginner_tutorial_video_URL, beginner_field_diagram_URL)
VALUES (2, 
        'Basketball', 
        'timeline Url', 
        'Each team can have a maximum of 5 players on the court at any one time. Substitutions can be made as many times as they wish within the game.
            The ball can only be moved by either dribbling (bouncing the ball) or passing the ball. Once a player puts two hands on the ball (not including catching the ball) they cannot then dribble or move with the ball and the ball must be passed or shot.
            After the ball goes into a team`s half and they win possession back the ball must then make it back over the half way line within 10 seconds. If the ball fails to do so then a foul will be called and the ball will be turned over.
            Each team has 24 seconds to at least shot at the basket. A shot constitutes either going in the basket or hitting the rim of the basket. If after the shot is taken and the ball fails to go in the basket then the shot clock is restarted for another 24 seconds.
            The team trying to score a basket is called the offence whilst the team trying to prevent them from scoring is called the defence. The defence must do all they can to stop the offence from scoring by either blocking a shot or preventing a shot from being fired.
            After each successful basket the ball is then turned over to the opposition.
            Fouls committed throughout the game will be accumulated and then when reached a certain number will be eventually be awarded as a free throw. A free throw involves one playerfrom the offensive team (the player fouled) to take a shot unopposed from the free throw line. Depending on where the foul was committed will depend on the number free throws a player gets.
            Violations in basketball include travelling (taking more than one step without bouncing the ball), double dribble (picking the ball up dribbling, stopping then dribbling again with two hands), goaltending (a defensive player interferes with the ball travelling downwards towards the basket) and back court violation (once the ball passes the half way line the offensive team cannot take the ball back over the half way line).', 
        'Basketball dates back as far as 1891 and since then has evolved into a sport played around the world. Many countries have adopted the game such as Russia, Great Britain, Germany, Spain and parts of Asia, but it is America where the biggest and most lucrative league in the world lives: the NBA (National Basketball Association).', 
        'https://static01.nyt.com/images/2020/03/11/sports/11virus-leagues-curry2/merlin_170213634_6955db75-0fa6-476b-b75d-9f63826e296a-mobileMasterAt3x.jpg', 
        'https://www.youtube.com/watch?v=F6VLIExnc7Q', 
        'https://www.harrodsport.com/uploads/wysiwyg/img/basketball-court-dimensions-and-markings-in-feet-720x444.png' );

INSERT INTO BeginnerCourses (id, sport_name, beginner_history_timeline, beginner_rules, beginner_short_description, beginner_cover_image_URL, beginner_tutorial_video_URL, beginner_field_diagram_URL)
VALUES (3, 
        'Tennis', 
        'timeline Url', 
        'The game starts with a coin toss to determine which player must serve first and which side they want to serve from.
            The server must then serve each point from alternative sides on the base line. At no point must the server`s feet move in front of the baseline on the court prior to hitting their serve.
            If the server fails to get their first serve in they may take advantage of a second serve. If they again fail to get their second serve in then a double fault will be called and the point lost.
            If the server clips the net but the ball goes in the service area still then let is called and they get to take that serve again without penalty. If the ball hits the net and fails to go in the service area then out is called and they lose that serve.
            The receiver may stand where they wish upon receipt of the serve. If the ball is struck without the serve bouncing then the server will receive the point.
            Once a serve has been made the amount of shots between the players can be unlimited. The point is won by hitting the ball so the opponent fails to return it in the scoring areas.
            Points are awarded in scores of 15, 30 and 40. 15 represent 1 point, 30 = 2 and 40 = 3. You
            need 4 points to win a game. If a game lands on 40-40 it`s known as deuce. From deuce a player needs to win 2 consecutive points to win the game. After winning one point from deuce they player is on advantage. If the player wins the next point they win the game, if they lose it goes back to deuce.
            To win the set a player must win 6 games by 2 or more. The opening sets will go to a tie break if its ends up 6-6 where players play first to 7 points. The final set will not have a tie break and requires players to win by two games with no limits.
            If a player touches the net, distracts his opponent or impedes in anyway then they automatically lose the point.
            The ball can hit any part of the line for the point to be called in, outside the line and the ball is out.
            The balls in a tennis match are changed for new balls every 6 games
            A player loses a point if they fail to return the ball in either the correct areas on the court, hits the net and doesn`t go into opponent`s area or fails to return the ball before it bounces twice in their half.', 
        'Tennis is a sport that originated in England around the 19th century and is now played in a host of countries around the world. There are four major tournaments known as the ‘majors` that include Wimbledon, US Open, French Open and Australian tournament.', 
        'https://www.gannett-cdn.com/presto/2022/07/08/USAT/1b23164d-daf1-4bbe-aa3a-41c72a00f987-djoker.jpg?crop=1922,1081,x0,y40&width=660&height=370&format=pjpg&auto=webp', 
        'https://www.youtube.com/watch?v=S9DnaBlhlVI', 
        'https://www.harrodsport.com/uploads/wysiwyg/img/doubles-tennis-court-dimensions-598x381.png' );

INSERT INTO BeginnerCourses (id, sport_name, beginner_history_timeline, beginner_rules, beginner_short_description, beginner_cover_image_URL, beginner_tutorial_video_URL, beginner_field_diagram_URL)
VALUES (4, 
        'Hockey', 
        'timeline Url', 
        'The game starts in the centre circle with a face off. This is where the referee drops the puck in between two opposing players who then scrap to win position for their team. A faceoff may also be used to resume play after a stoppage in any of the attacking or defending face off zones.
            Players may use physical force to win the puck off their opponent. Body checking can be used but is not prohibited in the back or above shoulder height.
            Players who are imposed to have committed a minor penalty will be ordered to leave the ice for two minutes and their team play with 5 players for that duration. If the opposing team score a goal within those two minutes then that player can return to the rink immediately.
            A minor penalty can include tripping an opponent with their stick, holding with either their stick or hands, hooking with their stick or body checking a player without the puck.
            Major penalties will result in a player being removed from the ice for up to 5 minutes. These may include fighting, inflicting serious injury on opposing players or continued minor violations.', 
        'The origins of ice hockey date back to the 19th century in Canada where adaptations of the modern day hockey game were played in icy conditions. Since then the sport has gone on to become one of the largest in the world with the major participants originating from North America. The NHL (National Hockey League) is the largest league in the world.', 
        'https://cdn.ontariohockeyleague.com/uploads/ohl/2022/07/13233806/July13WintertonSeattle-730x428.jpg', 
        'https://www.youtube.com/watch?v=H_70vAiyyXM', 
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Ice_hockey_layout.svg/1200px-Ice_hockey_layout.svg.png' );

INSERT INTO BeginnerCourses (id, sport_name, beginner_history_timeline, beginner_rules, beginner_short_description, beginner_cover_image_URL, beginner_tutorial_video_URL, beginner_field_diagram_URL)
VALUES (5, 
        'Ping Pong', 
        'timeline Url', 
        'Ping pong is played over a pre-agreed number of games and the first to 11 points wins each game.
            The toss of a coin or another form of lot-drawing determines which of the players shall serve first.
            Each table tennis player serves twice in turn and serves must be made from an open palm, the ball tossed six inches then struck so it bounces on the service side, clears the net, then bounces on the receiver`s side.
            Points are decided as described above and games must be won by two clear points. At 10-10 each player serves once only, in turn, until one player established a two point lead and wins the game.
            After each game the players rotate both the end of the table from which they are playing as well as who serves and receives the ball first.
            In the deciding game of a match the players swap ends after either player reaches five points.', 
        'Table tennis has been an Olympic sport since 1988 and is hugely popular in Asia, although it is played all over the world from the dusty streets of Ethiopia to the public schools of rural England. The game did indeed begin in England at the end of the 19th century, first as a postprandial parlour game for upper classes. ', 
        'https://images.nbcolympics.com/sites/default/files/2021-03/Oly-16x9-Table-Tennis.png', 
        'https://www.youtube.com/watch?v=phXqTy5MbhI', 
        'https://c8.alamy.com/zooms/9/eff026c102fb4ef1be3610155665e563/2c5n8jm.jpg');

INSERT INTO BeginnerCourses (id, sport_name, beginner_history_timeline, beginner_rules, beginner_short_description, beginner_cover_image_URL, beginner_tutorial_video_URL, beginner_field_diagram_URL)
VALUES (6, 
        'Badminton', 
        'timeline Url', 
        'A game can take place with either two (singles) or four (doubles) players.
            An official match has to be played indoors on the proper court dimensions. The dimensions are 6.1m by 13.4m, The net is situated through the middle of the court and is set at 1.55m.
            To score a point the shuttlecock must hit within the parameters of the opponents court.
            If the shuttlecock hits the net or lands out then a point is awarded to your opponent.
            Players must serve diagonally across the net to their opponent. As points are won then serving stations move from one side to the other. There are no second serves so if your first serve goes out then your opponent wins the point.
            A serve must be hit underarm and below the servers waist. No overarm serves are allowed.
            Each game will start with a toss to determine which player will serve first and which side of the court the opponent would like to start from.
            Once the shuttlecock is ‘live` then a player may move around the court as they wish. They are permitted to hit the shuttlecock from out of the playing area.
            If a player touches the net with any part of their body or racket then it is deemed a fault and their opponent receives the point.
            A fault is also called if a player deliberately distracts their opponent, the shuttlecock is caught in the racket then flung, the shuttlecock is hit twice or if the player continues to infract with the laws of badminton.
            Each game is umpired by a referee on a high chair who overlooks the game. There are also line judges who monitor if the shuttlecock lands in or not. The referee has overriding calls on infringements and faults.
            Let may be called by the referee if an unforeseen or accidental circumstance arose. These may include the shuttlecock getting stuck in the bet, server serving out of turn, one player was not ready or a decision which is too close to call.
            The game has only two rest periods coming the form of a 90 second rest after the first game and a 5 minute rest period after the second game.
            If the laws are continuously broken by a player then the referee holds the power to dock that player of points with persisting fouls receiving a forfeit of the set or even the match.', 
        'Badminton is a sport that has been around since the 16th century. The sport is played indoors and the pinnacle comes from its Olympic events. The sport is very popular in Asian countries such as China and India with these countries leading the way by producing some of the world`s best players.', 
        'https://images.unsplash.com/photo-1595220427358-8cf2ce3d7f89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmFkbWludG9uJTIwZ2FtZXxlbnwwfHwwfHw%3D&w=1000&q=80', 
        'https://www.youtube.com/watch?v=tAS7rOKtpgQ', 
        'https://badmintonisgreat.com/wp-content/uploads/2020/04/Phase-6.png' );

-----------------------------------------------------------------------------
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


