## Task Description

Create a mini-Chat App using socket.io with 2 separate service (User service and Message service)
that should communicate seamlessly via a microservice architecture.

Procedure:
The USER MS should receive User details upon sign up.
Authentication should be based on details on the USER MS

Only a valid User should be able to send message on the Message MS by passing a JWT token via the header for validation.

Expected Columns/Fields for Message MS:
- MessageId
- SenderUserId (User ID of the sender)
- ReceiverUserId (User ID of the recipient)
- MessageBody (The content of the message)
- TimeStamp

Note:
The below endpoints would be expected:

1. Create message endpoint
2. User Login endpoint
3. User Sign up endpoint

User NestJs/Node.js/Express.js as the backend tech
All endpoints must be probably secured with JWT
Use docker and docker-compose to build the application locally
Push your update to git repo and share the repo as response to your assessment.

## Swagger API Doc
[API DOC](https://localhost:3000/api-chat-app)

## Requirements
- node
- docker
- npm
- MySQL

## Config
Make a copy of `.env.sample` to `.env` in the root directory
```bash
$ cp .env.sample .env
```

## Create Database and Tables
Open any mysql client and run the SQL query in `script.sql` in the `src` directory

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Stay in touch
- Author - Adaa Mgbede (adaamgbede@gmail.com)

## License
Nest is [MIT licensed](LICENSE).
