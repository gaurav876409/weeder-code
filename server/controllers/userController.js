const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      let userDetails = await user.toObject();
      delete userDetails["password"];
      return res.json({
        match: true,
        user: userDetails,
      });
    } else {
      return res.json({
        match: false,
      });
    }
  } catch {
    return res.json({
      userNotFound: true,
    });
  }
};

module.exports.register = async (req, res) => {
  const { email, password, name } = req.body;
  const userCheck = await userModel.findOne({ email: email });
  try {
    if (userCheck) {
      return res.json({ userAlreadyExists: true });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    let user = await createdUser.toObject();
    delete user["password"];
    res.json({
      userCreated: true,
      user: user,
    });
  } catch {
    res.json({ userCreated: false });
  }
};
