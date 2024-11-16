
// import necessary libraries and functions
import fs from "fs/promises";
import { generateKeyPair, makeExtrinsicCall } from "./utils.js";
import { hexToU8a, u8aToHex } from "@polkadot/util";
import { cryptoWaitReady } from "@polkadot/util-crypto";

const store = async () => {
  await cryptoWaitReady();
  const seeds = JSON.parse(await fs.readFile("seeds.json", "utf8"));
  const machineSeed = seeds.machineSeed;
  const machineKeypair = generateKeyPair(machineSeed);
  const dataHex = u8aToHex(JSON.stringify("test-data"));
  const signature = u8aToHex(machineKeypair.sign(hexToU8a(dataHex)));

  const payload = {
    data: dataHex,
    signature: signature,
  };

  const payloadHex = u8aToHex(JSON.stringify(payload));

  await makeExtrinsicCall(
    "peaqStorage",
    "addItem",
    [machineKeypair.address, payloadHex],
    true,
    machineKeypair
  );
};

store();

