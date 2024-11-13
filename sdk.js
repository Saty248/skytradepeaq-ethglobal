import { Sdk } from "@peaq-network/sdk";

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

const main = async () => {
    const baseUrl = "wss://wsspc1-qa.agung.peaq.network";     // agung base url as given above
    const sdk = await createSdkInstance(baseUrl);
    await sdk.connect();
    await sdk.disconnect();
}

main();