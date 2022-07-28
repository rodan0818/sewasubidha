const ServiceModel = require('../models/service');

function requestAService(serviceName, requestorId) {
  return ServiceModel.create({
    name: serviceName,
    requestorId,
    status: 'pending',
  });
}
function acceptAService(serviceId, providerId) {
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
function getServicesByDate({ from, to }) {
  const fromDate = from.split('-');
  console.log(fromDate);
  const toDate = to.split('-');
  /**
   * Remember that that in the Date() function, the month argument starts counting at 0, not 1.
   * On the other hand, the days start counting at 1
   */
  return ServiceModel.find({
    createdAt: {
      $gte: new Date(
        parseInt(fromDate[0]),
        parseInt(fromDate[1] - 1),
        parseInt(fromDate[2]),
        0,
        0,
        0
      ),
      $lt: new Date(
        parseInt(toDate[0]),
        parseInt(toDate[1] - 1),
        parseInt(toDate[2]),
        23,
        59,
        59
      ),
    },
  }).exec();
}

module.exports = {
  requestAService,
  getAllServices,
  getServicesByStatus,
  acceptAService,
  changeServiceStatus,
  getServicesByDate,
};
