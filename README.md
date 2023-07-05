# SG ID Boiler Plate Code
A code repository which provides boiler plate for a 3 tier app using SG ID authentication. 

## Front End:
React (TS) frontend built using vite, tailwind, and daisyUI. 

Required env variables (.env file in ./client):
- VITE_SERVER_URL="your server url"
- VITE_AUTHORISE="set to true for deployment. set to false to bypass authorization during development"

## Server:
NodeJS (TS) server built using expressJS. Connects to a database using Prisma

Required env variables (.env file in ./server):
- DATABASE_URL="your database url"
- JWT_SECRET="a unique secret to sign and verify JWT tokens"
- LOGIN_REDIRECT_PATH="a url to direct clients after logging in using SG ID"
- AUTHORISE="set to true for deployment. set to false to bypass authorization during development"
