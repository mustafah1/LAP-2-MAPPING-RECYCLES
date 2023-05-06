DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS restaurant_locations;

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    PRIMARY KEY (post_id)
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

CREATE TABLE restaurant_locations (
  id SERIAL PRIMARY KEY,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  geom GEOMETRY(Point, 4326)
);

INSERT INTO restaurant_locations (name, address, city, state, zip, geom)
VALUES (
  'Example Restaurant',
  '123 Main St',
  'San Francisco',
  'CA',
  '94105',
  ST_SetSRID(ST_MakePoint(-122.4090, 37.7837), 4326)
);

