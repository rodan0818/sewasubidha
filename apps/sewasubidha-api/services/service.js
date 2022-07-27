const ServiceModel = require("../models/service");

function requestAService(serviceName, requestorId) {
  return ServiceModel.create({
    name: serviceName,
    requestorId,
    status: "pending",
  });
}
function acceptAService( serviceId, providerId ) {
  return ServiceModel.findOneAndUpdate(
    { _id: serviceId },
    { providerId },
    { new: true }
  ).exec(); 
}
function changeServiceStatus({ serviceId }, newStatus) {
  return ServiceModel.findOneAndUpdate(
    { _id: serviceId },
    { status: newStatus },
    { new: true }
  ).exec();
}
function getAllServices() {
  return ServiceModel.find({}).exec();
}
function getServicesByStatus(status) {
  return ServiceModel.find({ status }).exec();
}

module.exports = {
  requestAService,
  getAllServices,
  getServicesByStatus,
  acceptAService,
  changeServiceStatus,
};
