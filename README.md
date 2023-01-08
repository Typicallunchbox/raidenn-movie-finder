# Raidenn : Movie Finder
 A fully functional movie finder written in React with a Node JS Express backend connecting to MongoDB
#### Put Website hosted link here


![Landing Page ReadMe](https://user-images.githubusercontent.com/41709116/209307840-67e7f118-ce5a-4ac4-8641-9a8f56bd7a0f.png)

<br />
<br />

## Index

1. [Features](#features)
2. [Summary](#summary)
3. [Getting Started](#getting-started)
4. [Project Journey Explained](#project-journey-explained)

## Features

* Search for the latest and upcoming movies
* Save movies to your watchlist
* Get a link directly to the service where you can watch the movie
* Leave a comment on your thoughts on the movie with a rating
* View the movies you put on your previously watched and want to watch list.

<br />
<br />

## Summary

Raidenn is a portfolio project which was built to further improve the author's skills. This project can be thought of as a guide to a developer interested in building a React site built around redux that makes use of MondoDB as their cloud database solution. This project also implements a good standard practice for web security, [JWT](https://jwt.io/). Raidenn also makes use of a free database api service known as [MovieDB](https://developers.themoviedb.org/3) in order to get the movies shown in the project. This project can be broken up into two parts which consist of the main packages used:

* Backend
    * [Node JS](https://nodejs.org/en/download/)
    * [Express](https://www.npmjs.com/package/express)
    * [Bcrypt](https://www.npmjs.com/package/bcrypt)
    * [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
    * [Mongoose](https://www.npmjs.com/package/mongoose)

* Frontend
    * [React](https://www.npmjs.com/package/react)
    * [React Router Dom](https://www.npmjs.com/package/react-router-dom)
    * [Axios](https://www.npmjs.com/package/axios)
    * [Redux Toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)
    * [Node-sass](https://www.npmjs.com/package/node-sass)
    * [Tailwind](https://tailwindcss.com/docs/installation)

<br />
<br />
   
## Getting Started
If you are interested in getting started on your own personal project structured like this one I would recommend the Youtube channel [Traversy Media](https://www.youtube.com/@TraversyMedia), he has a 5 part series on the MERN Stack which was used as guidance on this project. Also below I have done a breakdown of explaining the [project journey](#project-journey-explained) from backend to frontend.

### Requirments
 * [Github Account](https://github.com/)
 * [MongoDB Account](https://www.mongodb.com/home)
 * [NodeJS](https://nodejs.org/en/download/)
 * [VSCode Editor](https://code.visualstudio.com/) (Recommended)

Setting up <b>MongoDb Account</b> has a few extra steps and I recommend watching this time tagged [Youtube video from Traversy Media](https://youtu.be/-0exw-9YJBo?t=2205) to get correctly setup. A reminder to also create your own .env file in your project in order to connect to mongoDB. Below is an example of the .env file structure needed for this project :

![envExample23](https://user-images.githubusercontent.com/41709116/209536062-314f2ee6-c457-4fe0-a59a-babddf1fe670.png)


Once setup with all the necessary accounts, now we can clone the repository. 
<br />
[How to Clone a Github Repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

Once cloned you will need to run `npm install` command in your terminal in both the root project folder and the frontend folder as there are two seperate node modules on this project.
Finally, your last step is to run `npm run dev` from the root of the project. This will run both the backend api service as well as the frontend at the same time. Enjoy :)

<br/>
<br />


## Future improvements
This marks the end of the first version of the project, I am doing this as I would love to make improvements in the future for a v2 which would be a much better user experience and as well up the quality of the site in my opinion. Below are a little of a few additional ideas/features I am planning to integrate into Raidenn v2 sometime in the future:
 - A section to get recommended movies to the user based on their genre preferences.
 - Allow the user to update movies genre preferences.
 - Share a movie link to a friend.
 - Restrictions to only allow a user to have 1 comment per movie.
 - Smoother animations when navigating through pages.
 - Smoother load of Images on the site.

<br />
<br />
<br />

## Project Journey Explained
Lets first cover the backend and then explain how that connects with the frontend of the project as well as the MovieDB database api service. For the backend everything has been implemented with NodeJs and Express, with the file structure been created for MondoDB in mind. We will use the Watchlist as an example to get an understanding of the flow, as all other concepts follow a fairly similiar direction.

Watchlist consists of the 3 files all in specific folders. These files are `watchlistModel` found in models folder, `watchlistController` found in controllers folder and `watchlistRoutes` found in routes folder.

1. watchlistModel
   - The purpose of this file is define a set schema for a watchlist instance. Below you can see a schema is created from the mongoose(Related to MongoDB)        library. Each new variable type must contain a `type` and is recommended to have a `required` in order to manage validation later on when adding a new        watchlist instance.
   
   ![watchlistModel](https://user-images.githubusercontent.com/41709116/209451451-12cb6262-7e67-4736-be4c-3408b5d12616.PNG)

    <br />
    
2. watchlistController
   - This controller file holds the functionality we want the `watchlistModel` to be able to. It holds the general CRUD functions for the watchlist instance.

![watchlistController](https://user-images.githubusercontent.com/41709116/209451467-ab9e6852-b810-451e-8f3b-165ecf300f1e.PNG)

   <br />
   
3. watchlistRoutes
   - The routes is the final piece that binds each CRUD function to a specific route. As below you can see getWatched function which is imported from the          controllers file is being binded with the route `/watched`. Additionally you can see that same line containts a `protect` function, which is imported        from an addidional folder called middleware. This protect function contains the logic to only allow an authorized user to hit our api endpoint, which        is done with a JWT token. Later in this breakdown we will review the middleware folder to show how it authorizes and validates requests.
   
   ![watchlistRoutes](https://user-images.githubusercontent.com/41709116/209451469-c79eb23e-0e88-4518-bb67-04aeb041cc96.PNG)

    <br />
    <br />
    
   Now for the <b>Frontend</b> side of the project with the example still being the watchlist.
   
   The important files will be located in the src folder. Every Schema from the backend will be referenced in a frontend folder called `features`. In            features there is a `watchlists` folder containing two files, `watchlistService`(Makes use of Axios) and `watchlistSlice`(Makes use of Redux Toolkit).
   
   <br />
   <br />
   
1.watchlistService
   - This service bridges the gap between the backend and frontend. This file contains all API calls that can be made for the watchlist schema. Axios was          used in making the api requests and attached to each request is the user's [Bearer Token](https://www.devopsschool.com/blog/what-is-bearer-token-and-how-it-works/). Below is an example of the structure of `getWatched` api call:
   
   ![watchlistService](https://user-images.githubusercontent.com/41709116/209457516-32f73784-fdf3-4a06-8399-96b2ba79247e.PNG)

  
2.watchlistSlice
   - This file hands the redux side of the project. Here an exported function is created for each imported api call from the watchlistService. If an api call     is fulfilled the response is then saved to a Redux state variable. This will allow the project to access these variables from any frontend file for           display purposes. Below is an example of a that function mentioned:
   
   <br />
   
   ![watchlistSlice](https://user-images.githubusercontent.com/41709116/209457511-078d0f90-2097-488d-909f-50134d190416.PNG)
   
Finally in the Watchlist.js file under the pages folder we make a reference call to that redux variable in order to get the data it is holding. Below you can see an example of how that reference is done. `useSelector` is a function from the react-redux package.

<br />

![watchlistReact](https://user-images.githubusercontent.com/41709116/209481840-e57ef0c6-88ca-4d5e-ab57-834a94869bfb.PNG)


### Middleware Explained
This folder contains the logic that handles every api request that hits the backend api. This is a good practise to ensure that the user hitting the api endpoint is authorized to do so as an example. In this folder we have 3 files which we will breakdown: `authMiddleware`, `validateMiddleware` and `errorMiddleware`.

1.authMiddleware
  -  This file contains the logic to handle api endpoints we want to be protected, only allowing an authorized user to hit the protected endpoint. This file firstly checks to see if the request sent has a [Bearer Token](https://www.devopsschool.com/blog/what-is-bearer-token-and-how-it-works/), if it does not, it rejects the request and sends a `Not authorized, no token` response. If a token is attached in the request header then a check is done to validate if its a valid token with the `JWT_SECRET`. 
 
 <br />

![authMiddleware](https://user-images.githubusercontent.com/41709116/211188113-424e2775-e628-4938-b208-047fbd2c3b79.PNG)

 
  -  If it passes these checks then it hits the `next()` command which tells the program to hit the next command in the the chain. In the below Image it shows it will go from the protect function that we just reviewed in the `authMiddleware` to the `getWatched` function which is the actual api function the user requested.

<br />

![authMiddlewareNext](https://user-images.githubusercontent.com/41709116/211188232-f1b887a9-ca83-4451-b157-a5923243284c.PNG)
<br />



2.validateMiddleware
  -  This file was created with the purpose of handling input validations a user makes on the site, fields such as passwords, email, username. This         validation ensures the user has entered in a valid input, meeting the requirements. For example making sure the user's new password has 1 Uppercase and symbol included. We don't just want input validation  to be done on the frontend as this can be avoided by a user if they choose to directly hit the API request themselves outside of the site environment. Do server side validation ensures the correct inputs are being accepted in the database. Below we can see we have our `validate` function. It holds 2 regex lines that define the validation which has to be met, one for a secure password and the other for a valid email.
 
  - A check is then done to see if the input type say for example `password` matches its regex pattern. If it fails it will throw an error message back to the user on the frontend. If it passes, then it will hit the `next()` command and then continue to the actual api function in order to update the password or register a new user.
 
 <br />


![validateMiddleware](https://user-images.githubusercontent.com/41709116/211191051-0c30727f-7041-4438-b3b6-cdbed04aa053.PNG)




