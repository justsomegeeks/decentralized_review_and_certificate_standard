import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { providers } from "ethers";
import { config } from "dotenv";
config();

import { routes } from "./routes/index";

// MODELS

// HELPERS
const CONSTANTS = {
  rinkeby: {
    contractAddress: "0x3185619aD5192b0f728f4874F92A630d0793E179",
    rpc: process.env.RINKEBY_URL as string,
  },
};
const MONGO_URI = process.env.MONGO_URI as string;

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors);
app.use(express.json());
app.use(routes);

// const provider = new providers.JsonRpcProvider(CONSTANTS.rinkeby.rpc);

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  mongoose.connect(MONGO_URI, () => {
    console.log("DB connected successfully");
  });
});
