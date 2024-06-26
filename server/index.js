import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { userRouter } from "./routes/users.js";
import { productRouter } from "./routes/product.js";
import { dataBaseConnection } from "./db/connection.js";

const app = express();
const PORT = 8000;
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
dataBaseConnection();
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.listen(PORT, () => {
  console.log(`SERVER IS CONNECTED TO PORT ${PORT}`);
});
