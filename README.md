# Sewasubidha App

## To Run

- Install Dependencies using command: `yarn`
- Execute using: `yarn dev`

## Functionalities available

The backend app includes most of the apis. The frontend app hasn't utilized all of the api. The functionality available through the frontend implementation is given below. Since, the app is divided between admin, service provider and user (service seeker), the module in `apps/sewasubidha` corresponds to the user app, the module in `apps/sewasubidha-provider` corresponds to the service provider app; the module in `apps/sewasubidha-api` is the same backend for all apps. The admin app is not made yet.

### `Service Provider`

- Service provider app has no any login but the login is immitated by creating a fake db.js file.
- Provider lands to a single page where they get incoming request from the user and for now they can accept the request (ignore can be implemented by sending a different payload including metadata telling it has been ignored to acknowledge the user so that the request then can be send to other providers)

### `Users App`

- User can login, find list of services available and go to the specific service section and search for the nearest service provider and request the service to that service provider and gets acknowledged with provider details if the service has been accepted
