# LAP-2-MAPPING-RECYCLES

## Deploying site with Static site and Web Services on Render.com.

1.  Create account with username and password on Render.com

### Create Web Service

1.  Click on the new button and choose Web Service
2.  Connect Render.com with your Github repository
3.  Select specified repository your project is located
4.  Name your site
5.  Select region closest to where your project will be accessed
6.  Choose branch to deploy
7.  Select Root Directory ie `/api` to deploy
8.  In this case we will use Node as a runtime environment
9.  Build command depending on you `packge.json` file.
10. Use concatination to carry out multiple build commands at once ie. `npm i -D && npm run setup-db`
11. Finally Start command to deploy your project will be `node index.js`.
12. Click on Create Web Service.

### Create static site

1.  connect Render.com with Github repository
2.  Select specified repository
3.  Name your site
4.  Choose branch to deploy
5.  choose Root Directory ie. `/client`
6.  Leave build command empty as render build automatically for us
7.  Publish directory will be current directory so use `.` to specify current directory.
8.  Click on Create Static Site button to deploy your static site.

# Connecting front end(static site) and back end(web services)

So far we have been running our server localy helce we used this fech command:
`const response = await fetch("http://localhost:3000/users/login", options);` conecting to our local server.

Now that our server is hosted by and deployed on Render.com, To establish a connection between front end and backend server, we will use server URL for all `fetch` requests on our front end.

a good example of this is replacing:
`const response = await fetch("http://localhost:3000/users/login", options);`
with:
`"https://<your Web Services URL>/users/login",`

once all `fetch` requrestes are updated, your connection with the server will be established.

#### This guide is for applications using Node, MVC, PostgreSQL, EXPRESS, pg and CORS on Render.com. These steps may be different depending on your environment.
