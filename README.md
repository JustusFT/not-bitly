# Not bitly

A URL shortener webapp. Features ability to keep track of your shortened link's data such as total visits and visits per day.
Site availble at https://not-bitly.herokuapp.com/

The backend uses [Express](https://expressjs.com/). The frontend uses [React](https://reactjs.org/). [PostgreSQL](https://www.postgresql.org/) is used for the database.

## Screenshots

Homepage:
![Home page](/screenshots/homepage.png?raw=true)

Dashboard:
![Dashboard](/screenshots/dashboard.png?raw=true)

## Local setup

Requires:

- `yarn` version 1.12.3+
- `node` version 10.14.2
- `postgresql` version 10.9

1. Clone this repository
2. Install dependencies

```
yarn
```

3. Setup development enviroment variables

Create a .env in the project root folder, and fill it with the following:

```
NODE_ENV=development
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
SESSION_SECRET=<random string>
HASHID_SALT=<random string>
```

Change `postgres` to your development database details if yours is different.

4. Create the development database

```
yarn task tasks/db/create.js
```

5. Run the db migrations

```
yarn knex migrate:latest
```

6. Run the development server

```
yarn dev
```

The development server should now be running on `localhost:3000`
