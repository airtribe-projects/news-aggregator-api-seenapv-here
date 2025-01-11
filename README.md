# News Aggregator API

## Overview
The News Aggregator API is a backend service that allows users to register, log in, set their news preferences, and fetch personalized news articles. It integrates with an external news API to provide relevant articles based on user-selected categories and languages. This project emphasizes authentication, input validation, and error handling.

---

## Features
- **User Authentication**:
  - Secure registration and login using hashed passwords and JWT tokens.
- **User Preferences**:
  - Manage preferred news categories and languages.
- **News Fetching**:
  - Fetch personalized news articles from external APIs based on user preferences.
- **Input Validation**:
  - Custom validation for inputs such as email format, password length, and preferences data.
- **Error Handling**:
  - Handles invalid inputs, unauthorized access, and external API errors.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud-hosted via MongoDB Atlas)
- [Postman](https://www.postman.com/) or similar tool for API testing

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd news-aggregator
2. Install dependencies:
    npm install
3. Create a .env file in the root directory and configure the following:
    PORT=3000
    JWT_SECRET=<your_jwt_secret>
    MONGO_URI=<your_mongodb_connection_string>
    NEWS_API_KEY=<your_news_api_key>
4. Start the server:
    npm start

### API Endpoints

Users

Method	Endpoint	Description	Protected

POST	/signup	    Register a new user	No
POST	/login	    Log in and get a token	No

User Preferences

Method	Endpoint	Description	Protected
GET	/preferences	Retrieve user's news preferences	Yes
PUT	/preferences	Update user's news preferences	Yes

News Fetching
Method	Endpoint	Description	Protected
GET	    /news	    Fetch news based on user preferences	Yes

Input Validation
SignUp
- Email: Must be a valid email format.
- Password: Must be at least 6 characters long.
Preferences
- Preferences: Must be an array of strings.

Technologies Used
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose ODM)
- Authentication: JWT, bcrypt
- HTTP Requests: Axios
- Validation: Custom validation logic
- Testing: Postman, Tap

Error Handling

The API includes robust error handling for:

- Missing or invalid inputs.
- Unauthorized access attempts.
- External news API failures.
- General server-side errors.

How to Test
- Use Postman or a similar API testing tool.
- Test the endpoints in the following sequence:
- Signup: /signup (POST)
- Login: /login (POST)
- Set Preferences: /preferences (PUT)
- Fetch News: /news (GET)

Project Structure

news-api/
├── routes/
│   ├── users.js          # User registration and login endpoints
│   ├── preferences.js   # User preferences endpoints
│   ├── news.js          # Fetch news articles
├── models/
│   ├── User.js          # Mongoose schema for users
├── utils/
│   ├── validation.js    # Helper functions for validation
├── app.js               # Express server setup
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables

External Dependencies
- NewsAPI: Used for fetching news articles.

Future Enhancements
- Support for additional news APIs.
- Advanced filtering for more personalized news.
- Admin-level features for user management.
- Rate limiting to prevent abuse of the API.

> test/server.test.js
Connected to the MongoDB
Server is listening on 3000

 PASS  test/server.test.js 15 OK 4.373s


  🌈 TEST COMPLETE 🌈


Asserts:  15 pass  0 fail  15 of 15 complete
Suites:    1 pass  0 fail    1 of 1 complete

# No coverage generated
# { total: 15, pass: 15 }
# time=4438.876ms