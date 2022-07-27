const express = require("express");
const locationRouter = express.Router();
const locationService = require("../services/location");

locationRouter.post("/", async (req, res, next) => {
  const location = await locationService.findLocationByUserId({
    userId: req.body.userId,
  });
  if (location) {
    const updatedLocation = await locationService.updateLocation({
      coordinates: req.body.coordinates,
      userId: req.body.userId,
    });
    return res.send({
      message: "Successfully Updated Location",
      ...updatedLocation,
    });
  } else {
    const newLocation = await locationService.createLocation({
      userId: req.body.userId,
      coordinates: req.body.coordinates,
    });
    return res.send({
      message: "Successfully created Location",
      ...newLocation,
    });
  }
});
// get nearest service provider
locationRouter.get("/near", async (req, res, next) => {
  const serviceProviders = await locationService.findNearestServiceProvider({
    coordinates: [30.864058, 76.54762696],
  });
  return res.send(serviceProviders);
});
module.exports = locationRouter;
