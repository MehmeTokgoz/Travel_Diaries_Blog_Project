# SHA Final-Project: Travel Diaries Blog

# Table Of Contents:  
  - [Overview](#overview)
  - [Description](#description)
  - [Technologies](#technologies)
  - [Installation and Running Application](#installation-and-running-application)
  - [Dependencies](#dependencies)
  - [How to Use?](#how-to-use)
  - [Credits](#credits)
  - [Demo](#demo)


## Overview

It is a travel diary blog. The basis of the project is to allow users to share their travel diaries and help others with their travel plans. I used MongoDB for the database, as well as Node.js & Express.js for the back-end, and ReactJS and Material UI for the front-end. The challenges i faced was to learn json web token and authentification of users and passing props between pages and components.

## Description

This is an application created with MERN stack. Users can share their travel diaries and give an idea to others who want to go to travel.

The blog can be used without registration or as a registration. Users can review all diaries and browse diaries by location, without registration. After registration, users can share update, delete their diaries.  

This project aimed to build an application from scratch in one month and consolidate what has been learned. So, created RESTful APIs, the users get authenticated via a token, using the JsonWebToken library, used React states, props, and components.  

In the future, I would like to add some more features to the project such as "favorites", "recently", and "nearby". Then, users can save their favorite places, browse recently added diaries, and search locations near to themselves.

## Technologies

This project created using MERN Stack. **MERN Stack** was preferred for this project because it allows faster application development using only javascript and without combining different programming languages.  

   **MongoDB** **(mongoose)** is a high-performance, cost-effective database system with a schemaless database feature.  

   **Express.js** was used with Node.js, as it links easily and fast to databases.  

   **React**, **Material UI**, **Sass** were used to enhance the web design.  

   **Node.js** was chosen for this application, as it is lightweight, efficient, has good performance, and is very fast in building web applications. In addition, there is a vast amount of tools in npm to support the developer.


## Installation and Running Application

The project is uploaded to Github.

To get the project on your computer follow these steps:
1. Fork the project's repository to your Github account
2. Clone the repository from your Github account to your local hard drive `git clone [url]`
3. Open a command prompt and go to the project's repository
4. Type `npm install` to install the node package dependencies
5. Go to the *server* folder by typing `cd server`
6. Type `npm start` to run the server
7. The server should be available at `http://localhost:4000`
8. Go to the *client* folder and type `npm run dev`
9. Application should be available at `http://localhost:5173`

## Dependencies
The project has the following dependencies,  

For the NodeJS:  

    "bcryptjs": "^2.4.3",  
    "body-parser": "^1.20.1",  
    "cors": "^2.8.5",  
    "dotenv": "^16.0.3",  
    "express": "^4.18.2",  
    "jsonwebtoken": "^9.0.0",  
    "mongoose": "^6.9.1"  
      
Development dependencies:  

    "nodemon"  
    
    "@types/react": "^18.0.27",  
    
    "@types/react-dom": "^18.0.10",  
    
    "@vitejs/plugin-react": "^3.1.0",  
    
    "sass": "^1.58.0",  
    
    "vite": "^4.1.0"  
    
  
React dependencies:  
  
    "@emotion/react": "^11.10.5",  
    
    "@emotion/styled": "^11.10.5",  
    
    "@mui/icons-material": "^5.11.0",  
    
    "@mui/material": "^5.11.8",  
    
    "axios": "^1.3.3",  
    
    "react": "^18.2.0",  
    
    "react-dom": "^18.2.0",  
    
    "react-router-dom": "^6.8.1"  
      
Environmental requirements:  
  
    Create a    .env file and fill in the following properties with your preferences: MONGO_URI, PORT, JWT_SECRET.
   
## How to Use?  
  
Initially, at the beginning of the project, the user lands at the home page `/`. There, using the navigation bar or `VIEW DIARIES` button, the user can register, log in or browse the diaries. If the user wants to share a diary, he/she can use `SHARE STORY` button. The button will direct the user to the "add" page. If the user isn't logged in the user will be directed to the login page. Users can log in or go to the signup page using the `GO TO SIGNUP` button.  
Once the user login, the user will be redirected to the profile page. Users can add new post using `ADD NEW POST` button. Also, users can edit or delete their previous posts using the icons on the bottom-right corner of the card. Users can finally log out using the `LOGOUT` button.  



## Credits  
Project owner is Mehmet TOKGOZ. This project is available for private, non-commercial use. If you want it for commercial use, please contact.

## Demo

You can watch a demo of the application here: [Live-Demo](https://vimeo.com/807415000) 




