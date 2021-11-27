import Block from "../models/Block";
import { create } from "ipfs-http-client";

const IPFS = create({ url: "https://infura.io:5001" });

export default async function handleUpdateBlock(blockNumber: number) {
  try {
    //   Checking if we are running server for the first time
    // TODO: Update Block Number with your deployed address block
    if (blockNumber === 16947958) {
      await Block.create({ name: "LastRecorded", number: blockNumber });
    } else {
      await Block.findOneAndUpdate(
        { name: "LastRecorded", $expr: { $gt: [blockNumber, "$number"] } },
        { number: blockNumber },
        { new: true }
      );
      console.log("Updated Block Number");
    }
  } catch (err) {
    console.log(err);
    console.log("Unable to create or update!");
  }
};
