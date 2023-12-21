import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import routeUsers from "./routes/routesUsers";
import { authentication } from "./middlewares/authentication";
import routePosts from "./routes/routesPosts";

mongoose
  .connect(process.env.DB_URI as string)
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(routeUsers);
    app.use(authentication);
    app.use(routePosts);

    app.listen(process.env.PORT, () => {
      console.log("Running...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
