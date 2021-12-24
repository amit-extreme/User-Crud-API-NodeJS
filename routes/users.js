var router = require("express").Router();
const {
  GetUsersList,
  CreateUser,
  UpdateUser,
  DeleteUser,
  GetUserById,
} = require("../controllers/users");

/* GET users listing. */
// Get User Detials with there id
router.get("/:id", GetUserById);
//  GET /users
router.get("/", GetUsersList);
//       POST /users
router.post("/", CreateUser);
//       PUT /users/:id
router.put("/:id", UpdateUser);
//       DELETE /users/:id
router.delete("/:id", DeleteUser);

module.exports = router;
