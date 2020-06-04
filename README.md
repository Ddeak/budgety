# Budgety

## What is it?

A small demo project written to display my current approach to creating a web application using React. The project
is written in Typescript, and generally showcases the project structure I currently adopt, and some of the practices
/ coding style I use.

Additionally, I wanted to try create a cloud-based mongo collection on MongoDB Atlas. This project gave me a good
opportunity to build a small micro-service that would access that database for persistence.

Finally, I wanted to expand my testing knowledge, particularly testing GraphQL on the client / frontend.

## What does it do?

The goal of the application is to create items (products), with a name, category and a price. The user can see the
total price of the items within the list. The list can be further refined / filtered by category or a date range.

Basically, the motivation to create this app was: "How much did I spend on take away this month?"

### How do you run it?

- Run `yarn install` in both the `api` and `frontend` folders.
- Create a collection on [MongoDB Altas](https://www.mongodb.com/cloud/atlas) and obtain the connection string.
- Either set the MONGO_PATH env variable, or create a `.env` file within `api` and add `MONGO_PATH=<connection string>`
- Run the API via `yarn dev` or `yarn start`
- Run the frontend via `yarn start` and open a browser tab at: `localhost:3000`

- Alternatively, the api has `concurrently` package included, and the both client and api can be run via a single terminal
  via `yarn start-conc` within the `api` folder.
