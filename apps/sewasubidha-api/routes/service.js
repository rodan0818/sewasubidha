const express = require("express");
const serviceRouter = express.Router();
const serviceManager = require("../services/service");
const serviceListService = require("../services/serviceList");
const locationService = require("../services/location");

// get all services
serviceRouter.get("/", async function (req, res, next) {
  try {
    const services = await serviceManager.getAllServices();
    return res.send(services);
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
// endpoints for admin
serviceRouter.get("/pending", async function (req, res, next) {
  try {
    const pendingServices = await serviceManager.getServicesByStatus("pending");
    return res.send(pendingServices);
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
serviceRouter.get("/completed", async function (req, res, next) {
  try {
    const completedServices = await serviceManager.getServicesByStatus(
      "completed"
    );
    return res.send(completedServices);
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
serviceRouter.get("/cancelled", async function (req, res, next) {
  try {
    const cancelledServices = await serviceManager.getServicesByStatus(
      "cancelled"
    );
    return res.send(cancelledServices);
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
//endpoint for user to request a service
serviceRouter.post("/request", async function (req, res, next) {
  try {
    const serviceListing = await serviceListService.getServiceListingByName(
      req.body.name
    );
    if (!serviceListing) {
      return res
        .status(404)
        .send(`Service name ${req.body.name} doesn't exist`);
    }
    const newService = await serviceManager.requestAService(req.body);
    return res.send({
      message: "Successfully requested the service",
      service: newService,
    });
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
//endpoint for service provider to accept/complete/cancel the service
serviceRouter.post("/accept", async function (req, res, next) {
  try {
    const service = await serviceManager.acceptAService(req.body);
    if (!service) {
      return res
        .status(400)
        .send(`Service #${req.body.serviceId} doesn't exists`);
    }
    return res.send({
      message: "Successfull accepted the service",
      service,
    });
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
serviceRouter.post("/complete", async function (req, res, next) {
  try {
    const service = await serviceManager.changeServiceStatus(
      req.body,
      "completed"
    );
    if (!service) {
      return res
        .status(400)
        .send(`Service #${req.body.serviceId} doesn't exists`);
    }
    return res.send({
      message: "Successfull completed the service",
      service,
    });
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
// user can also cancel the service
serviceRouter.post("/cancel", async function (req, res, next) {
  try {
    const service = await serviceManager.changeServiceStatus(
      req.body,
      "cancelled"
    );
    if (!service) {
      return res
        .status(400)
        .send(`Service #${req.body.serviceId} doesn't exists`);
    }
    return res.send({
      message: "Successfull accepted the service",
      service,
    });
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
serviceRouter.post("/pick", async function (req, res, next) {
  const serviceListing = await serviceListService.getServiceListingByName(
    req.body.serviceName
  );
  if (!serviceListing) {
    return res
      .status(400)
      .send(`Service ${req.body.serviceName} doesn't exists`);
  } else {
    const addedService = await locationService.pickService({
      serviceName: req.body.serviceName,
      serviceProviderId: req.body.serviceProviderId,
    });
    if (!addedService) {
      return res.status(400).send({ message: "Invalid Request" });
    }
    return res.send({
      message: `Successfully picked ${req.body.serviceName}`,
      ...addedService,
    });
  }
});

module.exports = serviceRouter;
