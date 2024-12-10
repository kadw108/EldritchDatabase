# Getting Started

## Client

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Server

server folder stores the server that mediates communication between the client (src/app) and the database (MongoDB Atlas cloud database accessible from their website).

Go into the `server` folder and run `node app.js`.

## Database

Also make sure that you can connect to the database with your IP address.

Go to https://account.mongodb.com/account/login and login with your MongoDB credentials (make sure you're using the right set). Use Brave and you will need to turn off browser shields blocking 3rd party cookies, etc. If you get a "server error" message, you probably just entered your password wrong. You CAN use a VPN.

After logging in, make sure the IP address the server is running from has permission to access the database.

The client works if the server is up and has database access.