import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./routes/routes";

mongoose
  .connect(process.env.DB_URI as string)
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(router);

    app.listen(process.env.PORT, () => {
      console.log("Running...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
