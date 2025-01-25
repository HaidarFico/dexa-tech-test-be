# Back-end Setup Guide

Requirements for setup:
- MySQL Server 8.x
- Node and NPM


## Steps

- Clone the repository.
- Run npm install.
- Create the .env file from the .env.example and fill it with the relevant information.
- run npm run seed
- run `npm run start:dev` OR `npm run build && npm run start`
- The Postman collection is available should one want to test the BE endpoints with a postman client.

## Note
- Make sure the PHOTO_DIRECTORY ends with a '/', example: PHOTO_DIRECTORY=/home/haidar-wsl/programmingLinux/dexatechtesttest/dexa-tech-test-be/uploads/