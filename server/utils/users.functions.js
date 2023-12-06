const bcrypt = require("bcrypt");

//models
const User = require("../models/users.model");

const signup = async (userDetails) => {
  const { email, username, password, name, phoneNumber } = userDetails;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      email,
      username,
      name,
      password: hashedPassword,
      phoneNumber,
    };
    const user = new User(newUser);
    await user.save();
    return user;
  } catch (error) {
    console.error("Error creating user", error);
  }
};

const login = async (user, password) => {
  try {
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) {
      return user;
    } else {
      throw "Incorrect Password";
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

const changeUserDetails = async (userId, newUserDetails) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      Object.assign(user, newUserDetails);
      await user.save();
      return user;
    } else {
      throw "User not found";
    }
  } catch (error) {
    console.error("Error changing username:", error);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.error("User not found:", error);
  }
};

const deleteUserById = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    return user;
  } catch (error) {
    console.error("User not found:", error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
  }
};

const addAddress = async (userId, addressBody) => {
  const { house_no, city, state, country, pin_code } = addressBody;
  try {
    const newAddress = { house_no, city, state, country, pin_code };
    const user = await User.findById(userId);
    user.address.push(newAddress);
    await user.save();
    return user;
  } catch (error) {
    console.error("Error adding new address", error);
  }
};

const deleteAddress = async (userId, addressId) => {
  try {
    const user = await User.findById(userId);
    const updatedAddress = user.address.filter(
      ({ _id }) => _id.toString() !== addressId
    );
    user.address = updatedAddress;
    await user.save();
    return user;
  } catch (error) {
    console.error("Error deleting address", error);
  }
};

module.exports = {
  signup,
  getAllUsers,
  login,
  changeUserDetails,
  getUserById,
  deleteUserById,
  addAddress,
  deleteAddress,
};
