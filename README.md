# User service (server)

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

### Getting started:
