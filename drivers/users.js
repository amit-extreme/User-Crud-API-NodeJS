const User = require("../model/user");
const users = {
  findAll: findAll,
  create: create,
  findById: findById,
  deleteById: deleteById,
  updateUser: updateUser,
};

function findAll() {
  return User.findAll();
}

function findById(id) {
  return User.findByPk(id);
}

function deleteById(id) {
  return User.destroy({ where: { id: id } });
}

function create(user) {
  var newUser = new User(user);
  return newUser.save();
}

function updateUser(user, id) {
  var updateUser = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    address: user.address,
    contact_number: user.contact_number,
  };
  return User.update(updateUser, { where: { id: id } });
}
module.exports = users;
