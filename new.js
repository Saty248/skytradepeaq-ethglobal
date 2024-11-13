import { Sdk } from "@peaq-network/sdk";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import { u8aToHex } from '@polkadot/util';
import { mnemonicToMiniSecret } from '@polkadot/util-crypto';

const generateMnemonicSeed = () => {
  const seed = "flash saddle love forget purchase when gather spin skate setup page ride";
  console.log(seed);
  const privateKey = mnemonicToMiniSecret(seed);
  console.log("private key: ",u8aToHex(privateKey));
  return seed;
};

const createPeaqDID = async (name, seed) => {
  const sdkInstance = await Sdk.createInstance({
    baseUrl: "wss://wsspc1-qa.agung.peaq.network",
    seed
  });

  const { hash } = await sdkInstance.did.create({
    name,
  });

  await sdkInstance.disconnect();

  return hash;
};

// Example usage
const name = 'droneDID';
const mnemonicSeed = generateMnemonicSeed();

// Make sure to have some balance in your generated seed before creating the DID
createPeaqDID(name, mnemonicSeed)
  .then((hash) => {
    console.log(`Created peaq DID for drone: ${hash}`);
  })
  .catch((error) => {
    console.log(error);
  });