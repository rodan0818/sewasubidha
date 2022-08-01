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

### `TODOS and Improvements`

- Admin page can be made to consume admin apis with the help of React Admin library
- Service Provider app can have a login page with authentication and more services can be added to operation
- The major feature that can be added to the user app and provider app is to show map of the provider and user implementing the React Leaflet
- Persistent login session can be added to all of the apps using local storage
- Instead of only requesting the single provider, if the provider ignores the request it can be again routed to another provider (to do this, when user acknowledges that the request has been ignored, requesting to another provider like before) also routing the service request if the provider hasn't responded to the request (this can be done just by simple timeout logic and then redoing the provider request but with different service provider)
