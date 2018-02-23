# Flying-orange
Nutritional app for any diet



Explanations of the technologies used

#TECHNOLOGIES UTILIZED
- axios
  Used to facilitate get/put/post/delete requests between client-side react views and express back-end
-bcryptjs
  Used to create password hashes to be stored in our database for future log-ins
-body-parser
  Used to parse request with res.body being sent 
-cookie-parser

-cors
-dotenv
  Used to secure sensitive information in a .env file to keep the secret keys a secret 
-express
  Used to serve data from server to Client based on respective client requests 
-express-session

-moment (CALCULATES TIMES-TBD)

-morgan
  Used to log all requests to the server as well as log error messages
-mustache-express(NOT USED)

-passport
-passport-local
-pg-promise
  Used to communicate with DataBase and server
-react
  Used to serve views from the react-app
-react-router-dom
  Used to route to specified views depending on the given route 

A couple of paragraphs about the general approach you took

#THE APPROACH
  Chewsy is an app that aids users in finding recipes that fit thier dietary restrictions.

  By using the third party API from edamam.com,  users can input items they are craving and recived a list of matched selections from the api.

  From the resulting list, users can click on a recipe they would like to know more information about and go to a page that gives that full respective recipes information

  Users then have the option to save the recipie displayed on the more information page to be referenced at a different part of the site.

  If a user does not have an account with Chewsy when they decide to click the 'save' button they will be directed to the user sign up page

  if a user is logged in, at their profile they will see the list of saved recipies they have created.


Installation instructions for any dependencies
## APP installation
- In top level directory, on the command line interphase run the command:
      ```npm install```
After the dependencies are installed in this directory enter the client directory and run the same command as before:
  ```npm install```

after all the dependencies are installed in both directories, run this command in the client directory
```npm start```
this will start the react-app on a local port that the terminal will prompt you on.

in order to start the server, within the top level directory run the command:
```nodemon -e css, js, sql index.js```
this will start the express server on the port specified in the top level index.js file

once both servers are running you can use the app on your local ports

Link to your ERDs - Diagrams of your models and their relationships

Link to your user stories – who are your users, what do they want, and why?


# About Kate
  Kate is 24 years old and lives in Orlando, FL 
She is allergic to peanuts, tree nuts and dairy  
She has a car and lives within driving distance of a few major grocery stores
She frequents Whole Foods, Publix and Trader Joe’s on a weekly basis 
One of her biggest challenges is spending excess time at the store reading labels 
She follows blogs of other people who have the same allergies and buys the products they recommend 
She has yet to find a faster, more efficient way to find what she needs  



Link to your wireframes – sketches of views and interfaces in your application
Descriptions of any unsolved problems or hurdles your team had to overcome



