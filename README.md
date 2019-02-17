# Express JS API template (server)

### Purpose:

The benefit of this template is to handle the majority of the boilerplate as well as simple User creation / management logic.

### Features:

1. User creation with user profile photo upload
2. User login with JWT token creation

### Dependencies:

1. Database (currently using PostgreSQL)
2. express
3. sequelize
4. sequelize-cli
5. jsonwebtoken
6. multer

### Installation:

1. Clone this repository
2. Install all dependencies
3. Connect to database
   a. In `config/config.json`, fill the objects with the following information related to your db of choice for each environment:

   - username
   - password
   - database (name)
   - host
   - port
   - dialect (type of sql or db used ex: "postgresql")

   b. run the following command: `sequelize db:migrate`

### Usage:

The basic template will provide you with simple routes and models to get started with creating an API that uses user creation and authentication.

#### Log in user - `POST` `/users/login` - `{ String email, String password }`

- logs in user using email and password sent in the request. Takes user object container email and password

#### Create new user - `POST` `/users/` - `{ String email, String password }`

- creates new user in the user table - takes in an email and a password to be saved with the object. This route also takes an optional Photo upload, and creates a user file using the user ID within the file system which will be used to save all future photos to this user.

#### Get all users - `GET` `/users`

- returns a list of all users within the database

#### Get useer by ID - `GET` `/users/:userId`

- returns a specific user - takes a user Id appended to the URL

#### Update user - `PATCH` `/users/:userId` - `{ String? email, String? password }`

- update user that already exists in the database. Takes an appended user Id in the URL as well as an a user object with optional params

#### Is email taken - `GET` `users/:userEmail`

- returns boolean value determining if email entered is taken in Database

#### Set user password - `PATCH` `users/password/:userId` - `{ String password }`

- sets the password for a specific user
