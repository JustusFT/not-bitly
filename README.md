# Not bitly

A URL shortener webapp. Features ability to keep track of your shortened link's data such as total visits and how many visits you have per day.
Site availble at https://not-bitly.herokuapp.com/

## Screenshots

TODO

## Local setup

Requires:

- `yarn` version 1.12.3+
- `node` version 10.14.2

1. Clone this repository
2. Install dependencies

```
yarn
```

3. Create the development database

```
yarn task tasks/db/create.js
```

4. Run the db migrations

```
yarn knex migrate:latest
```

5. Run the development server

```
yarn dev
```
