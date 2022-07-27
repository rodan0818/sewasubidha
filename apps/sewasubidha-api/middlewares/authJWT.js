const jwt = require('jsonwebtoken');
const config = require('config');
const UserModel = require('../models/user');
const authUser = (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      jwt.verify(
        req.headers.authorization.split(' ')[1],
        config.get('secretKey'),
        function (err, decode) {
          try {
            if (err) req.user = undefined;
            UserModel.findOne({
              _id: decode.id,
            }).exec((err, user) => {
              if (err) {
                return res.status(500).send({
                  message: err,
                });
              } else if (user.role != 'user') {
                return res.status(401).send({ message: 'Not Authorized' });
              } else {
                req.user = user;
                next();
              }
            });
          } catch (error) {
            return res.status(401).send({ message: 'Not Authorized' });
          }
        }
      );
    } else {
      req.user = undefined;
      return res.status(401).send({ message: 'Not Authorized' });
    }
  } catch (error) {
    return res.status(401).send({ message: 'Not Authorized' });
  }
};
const authAdmin = (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      jwt.verify(
        req.headers.authorization.split(' ')[1],
        config.get('secretKey'),
        function (err, decode) {
          try {
            if (err) req.user = undefined;
            UserModel.findOne({
              _id: decode.id,
            }).exec((err, user) => {
              if (err) {
                return res.status(500).send({
                  message: err,
                });
              } else if (user.role != 'admin') {
                return res.status(401).send({ message: 'Not Authorized' });
              } else {
                req.user = user;
                next();
              }
            });
          } catch (error) {
            return res.status(401).send({ message: 'Not Authorized' });
          }
        }
      );
    } else {
      req.user = undefined;
      return res.status(401).send({ message: 'Not Authorized' });
    }
  } catch (error) {
    return res.status(401).send({ message: 'Not Authorized' });
  }
};
const authServiceProvider = (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      jwt.verify(
        req.headers.authorization.split(' ')[1],
        config.get('secretKey'),
        function (err, decode) {
          try {
            if (err) req.user = undefined;
            UserModel.findOne({
              _id: decode.id,
            }).exec((err, user) => {
              if (err) {
                return res.status(500).send({
                  message: err,
                });
              } else if (user.role != 'serviceProvider') {
                return res.status(401).send({ message: 'Not Authorized' });
              } else {
                req.user = user;
                next();
              }
            });
          } catch (error) {
            return res.status(401).send({ message: 'Not Authorized' });
          }
        }
      );
    } else {
      req.user = undefined;
      return res.status(401).send({ message: 'Not Authorized' });
    }
  } catch (error) {
    return res.status(401).send({ message: 'Not Authorized' });
  }
};
const authAllTypeUser = (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      jwt.verify(
        req.headers.authorization.split(' ')[1],
        config.get('secretKey'),
        function (err, decode) {
          try {
            if (err) req.user = undefined;
            UserModel.findOne({
              _id: decode.id,
            }).exec((err, user) => {
              if (err) {
                return res.status(500).send({
                  message: err,
                });
              } else {
                req.user = user;
                next();
              }
            });
          } catch (error) {
            return res.status(401).send({ message: 'Not Authorized' });
          }
        }
      );
    } else {
      req.user = undefined;
      return res.status(401).send({ message: 'Not Authorized' });
    }
  } catch (error) {
    return res.status(401).send({ message: 'Not Authorized' });
  }
};
const authUserOrServiceProvider = (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      jwt.verify(
        req.headers.authorization.split(' ')[1],
        config.get('secretKey'),
        function (err, decode) {
          try {
            if (err) req.user = undefined;
            UserModel.findOne({
              _id: decode.id,
            }).exec((err, user) => {
              if (err) {
                return res.status(500).send({
                  message: err,
                });
              } else if (
                user.role != 'serviceProvider' &&
                user.role != 'user'
              ) {
                return res.status(401).send({ message: 'Not Authorized' });
              } else {
                req.user = user;
                next();
              }
            });
          } catch (error) {
            return res.status(401).send({ message: 'Not Authorized' });
          }
        }
      );
    } else {
      req.user = undefined;
      return res.status(401).send({ message: 'Not Authorized' });
    }
  } catch (error) {
    return res.status(401).send({ message: 'Not Authorized' });
  }
};
module.exports = {
  authUser,
  authAdmin,
  authServiceProvider,
  authAllTypeUser,
  authUserOrServiceProvider,
};
