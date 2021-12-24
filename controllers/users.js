const { createUserValidator } = require("../validators/user");
const UserDriver = require("../drivers/users");

const handleError = (error, res) => {
  console.log(error);
  return res.status(400).send({
    error: {},
    message: error.message,
    status: 409,
    data: {},
  });
};

module.exports.GetUsersList = async (req, res, next) => {
  try {
    const userList = await UserDriver.findAll();
    res.status(200).send({
      error: {},
      message: "All Users List",
      status: 200,
      data: userList,
    });
  } catch (error) {
    return handleError(error, res);
  }
};
module.exports.CreateUser = async (req, res, next) => {
  const { body } = req;
  const { error, value: userData } = createUserValidator(body);
  if (error) {
    return res.status(409).send({
      error,
      message: "Failed Form Validation",
      status: 409,
      data: {},
    });
  }
  try {
    // Submit user to database
    const addedUser = await UserDriver.create(userData);
    res.status(200).send({
      error: null,
      message: "User Added Successfuly",
      status: 200,
      data: addedUser,
    });
  } catch (error) {
    // user winston or another logger to log the error ;
    handleError(error, res);
  }
};
module.exports.DeleteUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    if (Number(id) === NaN) {
      return res.status(409).send({
        error: {},
        message: "Invalid user id",
        status: 409,
        data: null,
      });
    }
    const DeletedUser = await UserDriver.deleteById(id);
    if (!DeletedUser) {
      return res.status(200).send({
        error: null,
        message: "User Not Found.",
        status: 404,
        data: {},
      });
    }
    res.status(200).send({
      error: null,
      message: "User Deleted Successfully",
      status: 200,
      data: DeletedUser,
    });
  } catch (error) {
    return handleError(error, res);
  }
};
module.exports.GetUserById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    if (Number(id) === NaN) {
      return res.status(409).send({
        error: {},
        message: "Invalid user id",
        status: 409,
        data: null,
      });
    }
    const userDetails = await UserDriver.findById(id);
    if (!userDetails) {
      return res.status(200).send({
        error: null,
        message: "User Not Found.",
        status: 404,
        data: {},
      });
    }
    res.status(200).send({
      error: null,
      message: "User Fetched Successfully",
      status: 200,
      data: userDetails,
    });
  } catch (error) {
    return handleError(error, res);
  }
};
module.exports.UpdateUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    if (Number(id) === NaN) {
      return res.status(409).send({
        error: {},
        message: "Invalid user id",
        status: 409,
        data: null,
      });
    }
    const { body } = req;
    const { error, value: userData } = createUserValidator(body);
    if (error) {
      return res.status(409).send({
        error,
        message: "Failed Form Validation",
        status: 409,
        data: {},
      });
    }
    const updatedUser = await UserDriver.updateUser(body, id);
    res.status(201).send({
      error: null,
      message: "User Updated Successfuly",
      status: 201,
      data: updatedUser,
    });
  } catch (error) {
    return handleError(error, res);
  }
};
