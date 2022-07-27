const LocationModel = require("../models/location");

function createLocation({ serviceProviderId, coordinates }) {
  //TODO: userId and userTypes to be extracted from jwt token
  return LocationModel.create({
    serviceProviderId,
    country: "Nepal",
    city: "Kathmandu",
    streetName: "Narayangopal Chowk",
    location: {
      coordinates,
    },
  });
}

function updateLocation({ coordinates, serviceProviderId }) {
  return LocationModel.findOneAndUpdate(
    { serviceProviderId },
    { coordinates },
    { new: true }
  ).exec();
}

function findLocationByUserId({ userId }) {
  return LocationModel.findOne({ userId }).exec();
}

async function findNearestServiceProvider({ coordinates, serviceName }) {
  return LocationModel.find(
    {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: coordinates,
          },
        },
      },
      userType: "serviceProvider",
      services: {
        $elemMatch: { $eq: serviceName },
      },
    },
    {},
    { limit: 5 }
  );
}
//picked by serviceProvider
// convention: every user should provide/create their location before picking the service
async function pickService({ serviceName, serviceProviderId }) {
  return LocationModel.findOneAndUpdate(
    {
      serviceProviderId: serviceProviderId,
      userType: "serviceProvider",
    },
    {
      $addToSet: {
        services: serviceName,
      },
    },
    { upsert: false }
  ).exec();
}

module.exports = {
  createLocation,
  updateLocation,
  findLocationByUserId,
  findNearestServiceProvider,
  pickService,
};
