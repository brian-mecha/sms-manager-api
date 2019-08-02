# SMS Management Application API
A simple SMS management API that manages the sending and receiving of messages.

## Getting started
### Setting up
- Make sure you have [NodeJS](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/).
- Clone the repo.
- `cd` into the project directory.
- Create a copy of the `.env.example` and rename it to `.env`.
- Fill in the required values in the newly crreated `.env` file above.
- Install dependencies: `npm i`
- Start the serverby running: `npm run start:dev`.

### Testing with Postman
Make sure you have [Postman](https://getpostman.com/) installed then click the button below to get a collection of all the endpoints used in this API.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/14c9afe7be094173c1c0)

### Hosted Link
The API is hosted: [here](https://sms-manger.herokuapp.com/api/v1).

### API Documentation
The documentation of all the endpoints can be found [here](https://documenter.getpostman.com/view/1489197/SVYouKbV).


## Features
- User should be able to regiser and login using email and password.
- User should be able to get all contacts.
- User should be able to create a contact.
- User should be able to delete a contact.
- User should be able to send a message to any of the created contacts.
- User should be able to retrieve all sent messages.

## License

&copy; Brian Mecha

Licensed under the [MIT License](https://github.com/brian-mecha/sms-manager-api/blob/master/LICENSE)
