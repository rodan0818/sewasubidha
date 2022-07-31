const express = require("express");
const serviceListRouter = express.Router();
const serviceListService = require("../services/serviceList");
const authJWT = require("../middlewares/authJWT");

// gives all the service listing
serviceListRouter.get("/", async function (req, res, next) {
  try {
    const services = await serviceListService.getAllServiceList();
    return res.send(services);
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});

// create a service listing
serviceListRouter.post("/", authJWT.authAdmin, async function (req, res, next) {
  try {
    const serviceListing = await serviceListService.getServiceListingByName(
      req.body.serviceName
    );
    if (serviceListing) {
      return res
        .status(400)
        .send(`Service name ${req.body.serviceName} already exists.`);
    }
    await serviceListService.createServiceListing({
      name: req.body.serviceName,
      adminId: req.user._id,
    });
    return res.send("Successfully created service");
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
// delete a service listing
serviceListRouter.delete(
  "/:name",
  authJWT.authAdmin,
  async function (req, res, next) {
    try {
      const deletedService =
        await serviceListService.deleteServiceListingByName(req.params.name);
      console.log(deletedService);
      if (!deletedService) {
        return res.status(404).send(`Service ${req.params.name} doesn't exist`);
      }
      return res.send(`Successfully deleted ${req.params.name} listing`);
    } catch (error) {
      return res.status(500).send(`Error: ${error}`);
    }
  }
);

module.exports = serviceListRouter;
