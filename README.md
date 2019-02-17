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

# Log in user - logs in user using email and password sent in the request. Takes user object container email and password

`/users/login` `POST` - params `{ String email, String password }`

# Create new user - creates new user in the user table - takes in an email and a password to be saved with the object. This route also takes an optional Photo upload, and creates a user file using the user ID within the file system which will be used to save all future photos to this user.

`/users/` - `POST` - params: `{ String email, String password }`

# Get all users - returns a list of all users within the database

`/users` - `GET`

# Get useer by ID - returns a specific user - takes a user Id appended to the URL

`/users/:userId` - `GET`

# Update user - update user that already exists in the database. Takes an appended user Id in the URL as well as an a user object with optional params

`/users/:userId` - `PATCH` - params: `{ String? email, String? password }`

# Is email taken - returns boolean value determining if email entered is taken in Database

`users/:userEmail` - `GET`

# Set user password - sets the password for a specific user

`users/password/:userId` - `PATCH` params: `{ String password }`
