# Fullstack-Typescript-Project

MongoDb, Express.js, and Node.js are the tools to be commonly used in backend development, whereas React.js and Redux are amazing in frontend development. This project demonstrates a MERN full stack project combining these powerful tools together used in TypeScript. This is my first full stack project and my first experience working with databases.<br>

Frontend is incomplete, but functional: it is possible to register new users of the web service, login and logout using the designed interface with react/redux toolkit.

The backend is complete: managed to implement the CRUD functionality for all endpoints necessary for the complete project. The 'services' folder wasn't used, but was kept in case of a need for additional functionality in the future. The controllers handle requests and responses because there isn't much functionality needed for CRUD, but later might be moved to 'services' if additional functionality is added.<br>

Used JWT as a primary tool for authentification and authorization to eliminate possibilities of different users to access other users' data. Implemented a protective middleware to protect routes.

## Logic, simplified ERD
### Users
Newly registered users can be registered as admins only directly by adding admin field to the request field, by default they are registered as just users with no rights to add or edit products or categories.
Each logged in user has the following protected fields:
- address
- cart
- reviews

### Products
Products can only be added by admins.
Each product has the following unprotected fields:
- categories
- reviews

### Cart
There can only be 1 cart per user. Carts are protected and belong to users and contain:
- array of products
- paid status (boolean, set false by default)

### Reviews
Contains a text field and rate [1 - 5], as well as IDs of:
- reviewer
- product

### Category
Consists of the following data fields:
- name (or title)
- image (string link)
- admin ID who created it (to be able to edit it)

### Address
Holds user's data related to their address, holds user's ID as well
