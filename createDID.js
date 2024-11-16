import { Sdk } from "@peaq-network/sdk";
import fs from "fs/promises";


const createPeaqDID = async (name, seed, address) => {
  const sdkInstance = await Sdk.createInstance({
    baseUrl: "wss://wsspc1-qa.agung.peaq.network",
    seed
  });

  const { hash } = await sdkInstance.did.create({
    name,
    address
  });

  await sdkInstance.disconnect();

  return hash;
};

// Example usage
const name = 'droneDID';
const mnemonicSeed = JSON.parse(await fs.readFile("seeds.json", "utf8"));
const userSeed = mnemonicSeed.UserSeed;
const droneAddress = 'droneAddress';

// Make sure to have some balance in your generated seed before creating the DID
createPeaqDID(name, userSeed, droneAddress)
  .then((hash) => {
    console.log(`Created peaq DID for drone: ${hash}`);
  })
  .catch((error) => {
    console.log(error);
  });