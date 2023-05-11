DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS favourites;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS points;

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    PRIMARY KEY (post_id)
);

CREATE TABLE points (
  points_id SERIAL PRIMARY KEY,
  description TEXT,
  icon TEXT,
  geom GEOMETRY(Point, 4326)
);

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

CREATE TABLE favourites (
  fav_id INT GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user_account("user_id"),
  points_id INT NOT NULL,
  FOREIGN KEY (points_id) REFERENCES points("points_id")
);


-- INSERT INTO points (description, icon, geom)
-- VALUES (
--   '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
--   'theatre',
--   (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-77.038659, 38.931567]}'))
-- ),
-- (
--   '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
--   'theatre',
--   (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-77.003168, 38.894651]}'))
-- ),
-- (
--   '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
--   'bar',
--   (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-77.090372, 38.881189]}'))
-- );

INSERT INTO points (description, icon, geom)
VALUES (
  '<strong>Tottenham Hotspur Stadium</strong><p><a href="https://tottenhamhotspur.com/" target="_blank" title="Opens in a new window">Tottenham Hotspur Stadium</a> is the home of Premier League club Tottenham Hotspur in north London. With a seating capacity of 62,850, it is the third-largest football stadium in England and the largest club ground in London.</p>',
  'monument',
  (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-0.06611328156916915, 51.6041455227453]}'))
),
(
  '<strong>The Bluecoats Pub</strong><p><a href="http://thebluecoatspub.com/" target="_blank" title="Opens in a new window">The Bluecoats Pub</a>, Old-school haunt offering pub grub, cocktails & draught beer, plus a heated garden terrace.</p>',
  'bar',
  (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-0.06730105623667597, 51.59704355802653]}'))
),
(
  '<strong>Bruce Castle Museum</strong><p><a href="http://www.brucecastle.org/" target="_blank" title="Opens in a new window">Bruce Castle Museum</a>, 16th-century manor house in parkland setting with art and exhibits tracing the local history of Haringey.</p>',
  'monument',
  (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-0.07507161838920046, 51.59925581074638]}'))
),
(
  '<strong>The Dare Skywalk</strong><p><a href="https://www.tottenhamhotspur.com/the-stadium/visitor-attractions/the-dare-skywalk/" target="_blank" title="Opens in a new window">The Dare Skywalk</a>, Are you ready? Book Now Test Your Nerve This adrenaline-pumped, 90-minute experience will challenge adventure-seekers to take it to the edge by scaling the height of one of the newest landmarks in London - The Tottenham Hotspur Stadium.</p>',
  'monument',
  (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-0.0674780314463801, 51.604350467808146]}'))
),
(
  '<strong>Craving - Asian fusion restaurant</strong><p><a href="http://www.craving.london/" target="_blank" title="Opens in a new window">Craving</a> is an industrial space with wooden stools and tables, for artisan espressos, light meals and cocktails.</p>',
  'restaurant',
  (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-0.0641145241201505, 51.58334776558324]}'))
),
(
  '<strong>Walthamstow Wetlands</strong><p><a href="https://www.wildlondon.org.uk/walthamstow-wetlands-nature-reserve" target="_blank" title="Opens in a new window">Walthamstow Wetlands</a>, urban nature reserve comprising 10 reservoirs, with birdwatching plus a cafe & visitors centre.</p>',
  'park',
  (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-0.051528573004545046, 51.58487322016508]}'))
),
(
  '<strong>Lee Valley Park</strong><p><a href="https://www.visitleevalley.org.uk/" target="_blank" title="Opens in a new window">Lee Valley Park</a> is a 10,000-acre 26 miles long linear park, much of it green spaces, running through the northeast of Greater London, Essex and Hertfordshire from the River Thames to Ware, through areas such as Stratford, Clapton, Tottenham, Enfield, Walthamstow, Waltham Abbey, Cheshunt, Broxbourne and Hoddesdon in an area generally known as the Lea Valley.</p>',
  'park',
  (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-0.05608350852467861, 51.57224856390182]}'))
);


-- INSERT INTO favourites(user_id, points_id)
-- VALUES (1, 3);

  -- 'Make it Mount Pleasant',
  -- 'theatre-15',
  -- (SELECT ST_GeomFromGeoJSON('{"type": "Point", "coordinates": [-77.038659, 38.931567]}'))


