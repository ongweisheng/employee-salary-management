# employee-salary-management

This repo consists of a backend and frontend folder that runs differently. Tech stack being used is MERN stack.

# Backend

To start the backend server

1. Open up a terminal at the backend directory
2. Run command `npm install`
3. Create a `.env` file in the directory
4. Specify `NODE_ENV` value, `PORT` value, `DB_URL` value and `TEST_DB_URL` value in the `.env` file. `DB_URL` and `TEST_DB_URL` are the connection string required for mongodb and they have to be of different values to ensure normal environment and test environment works as intended. An example can be shown below.
```
NODE_ENV=production
PORT=3000
DB_URL={insert mongodb connection url here}
TEST_DB_URL={insert mongodb connection url here}
```
5. Run command `node index.js`

Upon running `node index.js`, backend server would be started up on localhost port 3000 and API calls can be made to the backend server to retrieve employee data. An example can be shown below using Postman.
![image](https://user-images.githubusercontent.com/57165946/191042357-23357574-87de-42cd-9c02-0f93f7ddb3b2.png)

6. For running tests, run command `npm run test` and the written test cases will be ran and checked for pass/failure

# Frontend

To start the frontend

1. Open up a terminal at the frontend directory
2. Run command `npm install`
3. Run command `npm start`

Upon running `npm start`, frontend would be started up on localhost port 3001. Browser window would also pop up as well showing the frontend.

# Implementations

1. For user story 1, uploading of CSV files, the uploading of CSV files is done through Postman with the following parameters as shown below.
<img width="868" alt="image" src="https://user-images.githubusercontent.com/57165946/190983207-5f46c76e-85c2-4eb6-bfe0-c34c13273247.png">
Name of the key has to be `file`