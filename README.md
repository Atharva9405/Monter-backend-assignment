# Monter Backend Assignment

This project is a backend application built with Express.js and MongoDB, designed to handle user registration, authentication, and profile management. It provides RESTful APIs for user registration, account validation via OTP (One-Time Password) sent to the user's email, login, and retrieval of user information using JWT (JSON Web Token) authentication.

## Features

1. **User Registration**: Users can register into the website using their email and password.
2. **Email Verification**: Upon registration, an OTP is sent to the user's email for validation.
3. **Additional User Information**: After validation, users can add extra information such as location, age, and work details, which are saved in the database.
4. **User Login**: Users can log in using their email and password, and a JWT token is generated for authentication.
5. **Retrieve User Information**: A GET request is provided to retrieve all the information of the user when logged in using the JWT token.

## Setup

To run this project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Atharva9405/Monter-backend-assignment.git
    ```

2. Navigate into the project directory:

    ```bash
    cd Monter-backend-assignment
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Define the following environment variables:
     ```
     PORT=3000             # Port on which the server will run
     MONGODB_URI=your_mongodb_uri     # MongoDB connection URI
     JWT_SECRET=your_jwt_secret        # Secret key for JWT token generation
     EMAIL_USERNAME=your_email_username     # Email address for sending OTP
     EMAIL_PASSWORD=your_email_password     # Password of the email account
     ```

5. Run the project:

    ```bash
    npm run dev
    ```

6. Once the server is running, you can test the APIs using tools like Postman.

## Technologies Used

- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database for storing user information.
- Nodemailer: A module for sending emails to users for OTP verification.
- JSON Web Tokens (JWT): For user authentication and authorization.

