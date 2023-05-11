# README

## Installation

- cd into `/api` and run `npm i` to install dependencies
- create `.env` file in `/api` folder with the environment variables `PORT=` server port (e.g. 3000), `DB_URL=` postgres db connection string - database must have PostGIS extension installed
- add your Mapbox API key to `client/index.js`
## How to run the server

- cd into `/api` 
- run `npm run setup-db` to setup the database
- run the server with `npm run dev`