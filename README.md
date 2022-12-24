# Raidenn : Movie Finder
## A fully functional movie finder written in React with a Node JS Express backend connecting to MongoDB
#### Put Website hosted link here


![Landing Page ReadMe](https://user-images.githubusercontent.com/41709116/209307840-67e7f118-ce5a-4ac4-8641-9a8f56bd7a0f.png)

<br />
<br />

## Index

1. [Features](#features)
2. [Summary](#summary)
3. [Getting Started](#getting-started)
4. [Thoughts, Challenegs and Future improvements](#thoughts-challenegs-and-future-improvements)
5. [Links to NPM Packages used](#links-to-npm-packages-used)

## Features

* Search for the latest and upcoming movies
* Save movies to your watchlist
* Get a link directly to the service where you can watch the movie
* Leave a comment on your thoughts on the movie with a rating
* View the movies you put on your previously watched and want to watch list.

<br />
<br />

## Summary

Raidenn is a portfolio project which was built to further improve the author's skills. This project can be thought of as a guide to a developer interested in building a React site built around redux that makes use of MondoDB as their cloud solution. This project also implements a good standard practice for web security, [JWT](https://jwt.io/). Raidenn also makes use of a free database api service known as [MovieDB](https://developers.themoviedb.org/3) in order to get the movies shown in the project. This project can be broken up into two parts which consist of the main packages used:

* Backend
    * Node JS
    * Express
    * Bcrypt
    * Jsonwebtoken
    * Mongoose

* Frontend
    * React
    * React Router Dom
    * Axios
    * Redux Toolkit
    * Node-sass
    * Tailwind

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
   - The routes is the final piece that binds each CRUD function to a specific route. As below you can see getWatched function which is imported from the          controllers file is being binded with the route `/watched`. Additionally you can see that same line containts a `protect` function, which is imported        from an addidional folder called middelware. This protect function contains the logic to only allow an authorized user to hit our api endpoint, which        is done with a JWT token.
   
   ![watchlistRoutes](https://user-images.githubusercontent.com/41709116/209451469-c79eb23e-0e88-4518-bb67-04aeb041cc96.PNG)

    <br />
   Now for the <b>Frontend</b> side of the project with the example still being the watchlist.
   
   The important files will be located in the src folder. Every Schema from the backend will be referenced in a folder called `features`. In features there      is a `watchlists` folder containing two files, `watchlistService`(Makes use of Axios) and `watchlistSlice`(Makes use of Redux Toolkit).
   
1. 
   
   
   
## Getting Started
If you are interested in getting started on your own personal project structured like this one I would recommend the Youtube channel [Traversy Media](https://www.youtube.com/@TraversyMedia), he has a 5 part series on the MERN Stack which was used as guidance on this project.

## Thoughts, Challenges and Future improvements
## Links to NPM Packages used
