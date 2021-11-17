import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
config();

import { routes } from "./routes/index";

// MODELS

// HELPERS
// const CONSTANTS = {
//   rinkeby: {
//     contractAddress: "0xnone",
//     rpc: process.env.RINKEBY_URL as string,
//   },
// };

const MONGO_URI = process.env.MONGO_URI as string;

const PORT = process.env.PORT || 4000;

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(routes);

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  mongoose.connect(MONGO_URI, () => {
    console.log("DB connected successfully");
  });
});
