const LocationModel = require("../models/location");

function createLocation({ userId, userType = "user", coordinates }) {
  //TODO: userId and userTypes to be extracted from jwt token
  return LocationModel.create({
    userId,
    userType,
    country: "Nepal",
    city: "Kathmandu",
    streetName: "Narayangopal Chowk",
    location: {
      coordinates,
    },
  });
}

function updateLocation({ coordinates, userId }) {
  return LocationModel.findOneAndUpdate(
    { userId },
    { coordinates },
    { new: true }
  ).exec();
}

function findLocationByUserId({ userId }) {
  return LocationModel.findOne({ userId }).exec();
}

async function findNearestServiceProvider({ coordinates }) {
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
    },
    {},
    { limit: 5 }
  );
}

module.exports = {
  createLocation,
  updateLocation,
  findLocationByUserId,
  findNearestServiceProvider,
};
