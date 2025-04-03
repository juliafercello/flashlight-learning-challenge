# Running app locally
## Run Server
1. Make sure the database is up and running locally. 

2. Add a .env file with the following properties: 
* POSTGRES_HOST
* POSTGRES_USER
* POSTGRES_PASSWORD
* POSTGRES_DB
* POSTGRES_PORT

3. From within the server directory, run the following commands:

```
$ npm ci
$ npm run dev
```
Note: The server is available at http://localhost:8080.

## Run Client
The client is available at http://localhost:5173/. 

To start up the client, from within the client directory run the following:

```
$ npm ci
$ npm run dev
```

# Future considerations
* Validate input in frontend
* Validate input in handlers
* API security / input 
* Routes for delete, update
* Frontend for delete, update
* List of valid values for grades, does this vary by country? 
* What value do you use for kindergarten? 
* Pagination
* Remove placeholder vite things
* Improve UX/Add Theming
* Enhance list endpoint/frontend to support search 
* Figure out db pool and if it is connecting and closing as expected
* Write a lot of tests
    - Client tests:
        - List page happy path
        - List page get request fails
        - client utils
        - create student happy path
        - create student failure 
        - create student validation
    - Server tests:
        - Error scenarios for handlers
        - Error middleware
        - utils file
        - router