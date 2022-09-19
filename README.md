# employee-salary-management

This repo consists of a backend and frontend folder that runs differently.

# Backend

To start the backend server

1. Open up a terminal at the backend directory
2. Run command `npm install`
3. Create a `.env` file in the directory
4. Specify `PORT` value and `DB_URL` value in the `.env` file. An example can be shown below.
```
PORT=3000
DB_URL={insert mongodb connection url here}
```
5. Run command `node index.js`

Upon running `node index.js`, backend server would be started up on localhost port 3000 and API calls can be made to the backend server to retrieve employee data

# Frontend

To start the frontend

1. Open up a terminal at the frontend directory
2. Run command `npm install`
3. Run command `npm start`

Upon running `npm start`, frontend would be started up on localhost port 3001. Browser window would also pop up as well showing the frontend.

# Implementations

1. For user story 1, uploading of CSV files, the uploading of CSV files is done through Postman as shown below.
<img width="868" alt="image" src="https://user-images.githubusercontent.com/57165946/190983207-5f46c76e-85c2-4eb6-bfe0-c34c13273247.png">
The uploading of CSV files to the backend server may or may not be implemented in the frontend in the future.