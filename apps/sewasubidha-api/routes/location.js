const express = require("express");
const locationRouter = express.Router();
const locationService = require("../services/location");
const authJWT = require("../middlewares/authJWT");
//add service provider location or update them in databse
locationRouter.post("/", authJWT.authServiceProvider, async (req, res, next) => {
  const location = await locationService.findLocationByUserId({
    serviceProviderId: req.user._id,
  });
  if (location) {
    const updatedLocation = await locationService.updateLocation({
      coordinates: req.body.coordinates,
      serviceProviderId: req.user._id,
    });
    return res.send({
      message: "Successfully Updated Location",
      ...updatedLocation,
    });
  } else {
    const newLocation = await locationService.createLocation({
      serviceProviderId: req.user._id,
      coordinates: req.body.coordinates,
    });
    return res.send({
      message: "Successfully created Location",
      ...newLocation,
    });
  }
});
// get nearest service provider
locationRouter.get("/near", authJWT.authUser, async (req, res, next) => {
  const serviceProviders = await locationService.findNearestServiceProvider({
    coordinates: req.body.coordinates,
    serviceName: req.body.serviceName,
  });
  const serviceProvidersId = serviceProviders.map((serviceProvider)=>{
    return serviceProvider._id
  })
  return res.send(serviceProvidersId);
});
module.exports = locationRouter;
