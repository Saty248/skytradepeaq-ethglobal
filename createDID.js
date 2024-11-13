import { Sdk } from "@peaq-network/sdk";

const createDID = async (sdk, nameDID) => {
    const block_hash = await sdk.did.create({name: nameDID});
    return block_hash;
};

const createSdkInstance = async (baseUrl) => {
    try {
        const sdkInstance = await Sdk.createInstance({
            baseUrl: baseUrl
        });
        return sdkInstance;
    } 
    catch (error) {
        console.error(`Failed to create SDK instance: ${error}`);
        throw error;
    }
};

  
// Example usage
const main = async () => {
    const nameDID = 'myDID';
    // see SDK Quickstart for createSdkInstance() function
    const sdk = await createSdkInstance("wss://wsspc1-qa.agung.peaq.network");
    await sdk.connect();

    try {
        const hash = await createDID(sdk, nameDID);
        console.log(hash);
    }
    catch(error) {
        console.error(`Failed to create SDK instance: ${error}`);
        throw error;
    } 
    finally {
        await sdk.disconnect();
    }
};

main();