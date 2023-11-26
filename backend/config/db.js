import mongoose from "mongoose";
import colors from "colors";

const ConnectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Database connected with host: ${connect.connection.host}`.bgGreen
    );
  } catch (err) {
    console.error(`Unable to connect with database: ${err.message}`.bgRed);
  }
};

export default ConnectDb;
