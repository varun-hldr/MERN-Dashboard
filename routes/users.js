const router = require("express").Router();
const verify = require("./verifyToken");

// User Model
const User = require("../models/User");

// User Route
router.get("/", verify, async (req, res) => {
  // checking admin
  const user = await User.findById(req.user.user._id);
  if (user.role !== "admin") return res.json("User is not admin");

  // Getting all users
  const users = await User.find();
  res.json(users);
});

// Get User By ID
router.post("/user", verify, async (req, res) => {
  // checking admin
  const user = await User.findById(req.user.user._id);
  if (user.role !== "admin") return res.json("User is not admin");

  const USER = await User.findById(req.body.id);
  if (!USER) return res.json("No user found");
  res.json(USER);
});

// Delete User
router.delete("/deleteuser", verify, async (req, res) => {
  // checking admin
  const user = await User.findById(req.user.user._id);
  if (user.role !== "admin") return res.json("User is not admin");

  try {
    const USER = await User.deleteOne({ _id: req.body.id });
    res.json(USER);
  } catch (err) {
    res.json({ message: err });
  }
});

// // Update User
// router.put("/updateuser", (req, res) => {
//   const user = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     role: req.body.role ? req.body.role : "user",
//     isActive: true,
//   };
//   const user = await Users.updateOne(
//     { _id: new ObjectId(req.body._id) },
//     { $set: user },
//     { upsert: true },
//     (err, result) => {
//       if (err) return res.json(err);
//       res.json("User Updated");
//     }
//   );
// });

// // Deactivate User || Soft Delete
// router.put("/deactivateuser", (req, res) => {
//   collection.updateOne(
//     { _id: new ObjectId(req.body._id) },
//     { $set: { isActive: false } },
//     { upsert: true },
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       res.json("User Deactivated");
//     }
//   );
// });

// // Activate User
// router.put("/activateuser", (req, res) => {
//   collection.updateOne(
//     { _id: new ObjectId(req.body._id) },
//     { $set: { isActive: true } },
//     { upsert: true },
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       res.json("User Activated");
//     }
//   );
// });

module.exports = router;
