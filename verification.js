import fs from 'fs/promises';
import { hexToU8a } from '@polkadot/util';
import { signatureVerify } from '@polkadot/util-crypto';
import { getStorage, generateKeyPair } from './utils.js';
const verifyData = async (publicKey, dataHex, signatureHex) => {
  const dataU8a = hexToU8a(dataHex);
  const signatureU8a = hexToU8a(signatureHex);

  return signatureVerify(dataU8a, signatureU8a, publicKey).isValid;
};

const verify = async () => {
  const seeds = JSON.parse(await fs.readFile('seeds.json', 'utf8'));
  const machineSeed = seeds.machine;
  const machineKeypair = generateKeyPair(machineSeed);

  const itemType = 'your_item_type_here';
  const storedDataHex = await getStorage(itemType);

  if (!storedDataHex) {
    throw new Error('Data not found.');
  }

  const { data: dataHex, signature: signatureHex } = JSON.parse(hexToU8a(storedDataHex).toString());

  const isValid = await verifyData(machineKeypair.publicKey, dataHex, signatureHex);

  if (isValid) {
    console.log('Data verified successfully.');
  } else {
    console.log('Verification failed.');
  }
};

verify();