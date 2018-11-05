[![Build Status](https://www.travis-ci.com/ashley-breunich/lab-11.svg?branch=master)](https://www.travis-ci.com/ashley-breunich/lab-11)

![CF](http://i.imgur.com/7v5ASc8.png) LAB - ORM
===============================================


## Before you begin
* You will be continuing to work on your API server
* Provided for you is a working server, which you may use as a starter

## Assignment
###### Requirements
* Create a new `mongo` database called `store`
* Add support to the `storage` system to support `mongoose` schemas
* Re-Implement the `categories` and `products` models to use mongo schemas when the `mongo` storage mechanism is activated


###### Testing
* test the full CRUD operations of your server and both models
* use supertest for your route testing so you don't spin up a web server
* use `mongodb-memory-server` as a stand-in for `mogngod` so you don't have to spin up a mongo database to test


##  Documentation
[Heroku Server Link](https://lab-11-breunich.herokuapp.com/)

###### APP.JS MODULE:
Airty: 1

Expected Data: The data will be the PORT number so the program can run and the server itself. 

Behavior: If the server isn't running, the program will run on the given port. 


###### MODELS/PRODUCTS.JS MODULE:
Behavior: This module holds the PRODUCTS class and all of the functions associated with it. These functions are called from the API - v1.js. It calls the products.js schema in the mongo folder. 

###### MODELS/CATEGORIES.JS MODULE:
Behavior: This module holds the CATEGORIES class and all of the functions associated with it. These functions are called from the API - v1.js. It calls the categories.js schema in the mongo folder. 

###### MONGO/CATEGORIES.JS MODULE:
Behavior: This is where the schema for the categories class is located. It exports that schema.

###### MONGO/PRODUCTS.JS MODULE:
Behavior: This is where the schema for the products class is located. It exports that schema.

###### MODEL-FINDER MODULE:
Airty: 3
Expected Data: Request, Response, Next
Behavior: This module tells the program which model to use. When a model is found, it will set the req.model. When a model is not found, it will throw 'Invalid Model.' 

###### ERROR MODULE:
Airty: 4
Expected Data: Error, Request, Response, Next
Behavior: If there is a server error, it will go through this function and explain what the error is.  

###### 404 MODULE:
Airty: 3
Expected Data: Request, Response, Next
Behavior: If a page cannot be found, it will go through this function and throw a 404 error.

###### STORAGE/STORAGE MODULE:
Airty: 1
Expected Data: process.env.STORAGE
Behavior: This function takes in the process.env.STORAGE variable and uses a switch case to let the program know what kind of storage to use.  

###### STORAGE/MEMORY MODULE:
Airty: 1
Expected Data: Each funtion in this page takes in 1 paramater - either a query, ID or data
Behavior: Depending on which function is called, memory is accessed to either send data, resave data or delete data. 

###### STORAGE/FILESYSTEM MODULE:
Airty: 1
Expected Data: Each funtion in this page takes in 1 paramater - either a query, ID or data
Behavior: Depending on which function is called, code runs that then saves the changes to the db.json file. 

###### STORAGE/MONGO MODULE:
Airty: 1
Expected Data: Each funtion in this page takes in 1 paramater - either a schema, query, ID or data
Behavior: Depending on which function is called, code runs that then saves the changes to the Mongo database. 

###### V1 MODULE:
Airty: 3
Expected Data: Each funtion in this page takes in 3 parameters - Request, Response, Next
Behavior: This file interacts with the API. It makes API calls depending on which HTTP method is used (get, put, patch, delete, post). The JSON that is sent through the front end is stringified and then sent to whichever function is related. Then the appropriate save functions are called to accurately update the db.json file. 

#### Collaborations
I want to note that I rewatched the videos from lecture and followed along to get the schemas set up and the storage system to support those schemas. I also referred to videos from Lecture 12 to fill in the gaps to get the app working.