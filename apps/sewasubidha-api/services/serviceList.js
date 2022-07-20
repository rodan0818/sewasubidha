const ServiceListModel = require("../models/serviceList");

function getAllServiceList() {
  const services = ServiceListModel.find({}).exec();
  return services;
}

function createServiceListing(newService) {
  return ServiceListModel.create(newService);
}
function getServiceListingByName(name) {
  return ServiceListModel.findOne({ name }).exec();
}

function deleteServiceListingByName(name) {
  return ServiceListModel.findOneAndDelete({ name }).exec();
}

module.exports = {
  getAllServiceList,
  createServiceListing,
  getServiceListingByName,
  deleteServiceListingByName,
};
