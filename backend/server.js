import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import uploadRoutes from "../backend/routes/uploadImage.js"

// import cors from "cors";
import productRoutes from "./routes/routes.js";
import ConnectDb from "./config/db.js";
import Authroutes from "./routes/auth.js";
import errorHandler from "./middleware/errorHandler.js";
import orderRoutes from "./routes/order.js";

dotenv.config();

ConnectDb();

const app = express();
app.use(morgan("common"));
app.use(express.json());
// app.use(cors());

app.get("/api", (req, res) => {
  res.json({ message: "Api is running..." });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", Authroutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use(errorHandler);

const __dir = path.resolve();
app.use("/uploads", express.static(path.join(__dir, "uploads")));

const port = process.env.NODE_PORT | 9000;
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_MODE} mode at port ${port}.`
      .bgGreen
  );
});
