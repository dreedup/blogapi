# blogapi

In this API, A Blog API, you are able to create, update, delete and see all blog posts made. To first do this you have to create a user. You will also be able to do the same thing with the user as well as login and logout the user.

This API is created by using Node, Express, and MongoDB.

#Are You Ready?

Before beginning this project you must check to see if you have Node.js installed as well as Nodemon.

To Install you can follow the following instructions.

- Open your terminal and run the following command
```npm instal - nodemon```

#To get started

1. Clone this repository by clicking on the <> Code button
2. Open your terminal and create a folder youd like to clone this app to
3. From there run git clone plus the SSH key
4. cd into your folder
5. run 'code .' to open your files in VS code.
6. From here you shoukd create an .env file
7. In this env file you will place your own private MONGO_URI
8. install the necessary packages by running npm install (express mongoose dotenv bcrypt jsonwebtoken morgan --save-dev jest supertest mongodb-memorey-server artillery@1.7.9 )
9. start the app by running rpm run dev

#Testing

1. Run in terminal testing by just pushing the following command ```npm run test``
2. Run ```npm run load```

#Manual Testing

From here we can open Postman to run the same test but manually.

1. Create a User
    - open Postman and connect to port 3000 @ htttp://localhost:3000/users
    - set the Postman method to post
    - set to raw and JSON
    - fill in require strings {"name": , "email": , "password":  }
    - press send

