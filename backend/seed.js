import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import ConnectDb from "./config/db.js";
import Product from "./Model/product.js";
import User from "./Model/user.js";
import products from "./Data/products.js";
import users from "./Data/users.js";

dotenv.config();
ConnectDb();

const SeedData = async () => {
  try {
    const savedUsers = await User.insertMany(users);
    const AdminUserId = savedUsers[0]._id;
    const UpdatedProduct = products.map((product) => {
      return {
        ...product,
        user: AdminUserId.toString(),
      };
    });
    //Inside the function, a new object is created using the spread operator (...product). This copies all the properties of the original product object into a new object. This is a way of making a shallow copy of the object.
    await Product.insertMany(UpdatedProduct);

    console.log(`Data added successfully`.bgGreen);
  } catch (error) {
    console.log(`Unable to add data ${error.message}`.bgRed);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log(`Data deleted successfully`.bgGreen);
  } catch (error) {
    console.log(`Unable to delete data ${error.message}`.bgRed);
  }
};
if (process.argv[2] === "-d") {
  deleteData();
} else {
  SeedData();
}


