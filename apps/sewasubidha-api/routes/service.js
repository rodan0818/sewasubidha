const express = require("express");
const serviceRouter = express.Router();
const serviceManager = require("../services/service");
const serviceListService = require("../services/serviceList");
const locationService = require("../services/location");
const authJWT = require("../middlewares/authJWT");

// get all services
serviceRouter.get("/", authJWT.authAdmin, async function (req, res, next) {
  try {
    const services = await serviceManager.getAllServices();
    return res.send(services);
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
// endpoints for admin
serviceRouter.get(
  "/pending",
  authJWT.authAdmin,
  async function (req, res, next) {
    try {
      const pendingServices = await serviceManager.getServicesByStatus(
        "pending"
      );
      return res.send(pendingServices);
    } catch (error) {
      return res.status(500).send(`Error: ${error}`);
    }
  }
);
serviceRouter.get(
  "/completed",
  authJWT.authAdmin,
  async function (req, res, next) {
    try {
      const completedServices = await serviceManager.getServicesByStatus(
        "completed"
      );
      return res.send(completedServices);
    } catch (error) {
      return res.status(500).send(`Error: ${error}`);
    }
  }
);
serviceRouter.get(
  "/cancelled",
  authJWT.authAdmin,
  async function (req, res, next) {
    try {
      const cancelledServices = await serviceManager.getServicesByStatus(
        "cancelled"
      );
      return res.send(cancelledServices);
    } catch (error) {
      return res.status(500).send(`Error: ${error}`);
    }
  }
);
//endpoint for user to request a service
serviceRouter.post(
  "/request",
  authJWT.authUser,
  async function (req, res, next) {
    try {
      const serviceListing = await serviceListService.getServiceListingByName(
        req.body.serviceName
      );
      if (!serviceListing) {
        return res
          .status(404)
          .send(`Service name ${req.body.name} doesn't exist`);
      }
      const newService = await serviceManager.requestAService(req.body.serviceName, req.user._id);
      return res.send({
        message: "Successfully requested the service",
        service: newService,
      });
    } catch (error) {
      return res.status(500).send(`Error: ${error}`);
    }
  }
);
//endpoint for service provider to accept/complete/cancel the service
serviceRouter.post(
  "/accept",
  authJWT.authServiceProvider,
  async function (req, res, next) {
    try {
      
      const service = await serviceManager.acceptAService(req.body.serviceId, req.user._id);
      if (!service) {
        return res
          .status(400)
          .send(`Service Id #${req.body.serviceId} doesn't exists`);
      }
      return res.send({
        message: "Successfull accepted the service",
        service,
      });
    } catch (error) {
      return res.status(500).send(`Error: ${error}`);
    }
  }
);
serviceRouter.post(
  "/complete",
  authJWT.authServiceProvider,
  async function (req, res, next) {
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
  }
);
// user can also cancel the service
serviceRouter.post(
  "/cancel",
  authJWT.authUserOrServiceProvider,
  async function (req, res, next) {
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
        message: "Successfull cancelled the service",
        service,
      });
    } catch (error) {
      return res.status(500).send(`Error: ${error}`);
    }
  }
);
serviceRouter.post(
  "/pick",
  authJWT.authServiceProvider,
  async function (req, res, next) {
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
        serviceProviderId: req.user._id,
      });
      if (!addedService) {
        return res.status(400).send({ message: "Invalid Request" });
      }
      return res.send({
        message: `Successfully picked ${req.body.serviceName}`,
        ...addedService,
      });
    }
  }
);

module.exports = serviceRouter;
