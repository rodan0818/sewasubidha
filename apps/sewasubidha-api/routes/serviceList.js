const express = require("express");
const serviceListRouter = express.Router();
const serviceListService = require("../services/serviceList");

serviceListRouter.get("/", async function (req, res, next) {
  try {
    const services = await serviceListService.getAllServiceList();
    return res.send(services);
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});

serviceListRouter.post("/", async function (req, res, next) {
  try {
    const serviceListing = serviceListService.getServiceListingByName(
      req.body.name
    );
    if (serviceListing) {
      return res
        .status(400)
        .send(`Service name ${req.body.name} already exists.`);
    }
    await serviceListService.createServiceListing(req.body);
    return res.send("Successfully created service");
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
serviceListRouter.delete("/:name", async function (req, res, next) {
  try {
    const deletedService = await serviceListService.deleteServiceListingByName(
      req.params.name
    );
    console.log(deletedService);
    if (!deletedService) {
      return res.status(404).send(`Service ${req.params.name} doesn't exist`);
    }
    return res.send(`Successfully deleted ${req.params.name} listing`);
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});

module.exports = serviceListRouter;
