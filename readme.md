# Drone Remote ID Verification with peaq Network

![Screenshot 2024-11-16 at 4 44 22 PM](https://github.com/user-attachments/assets/f478f5ea-37db-4a5f-8b99-4c493f677fb6)

## How it Works:

1. Drone Registration:
Each drone is registered on the peaq network and assigned a unique DID with user's instance.

2. Signing the Signal:
Before transmitting the Remote ID signal, the drone uses its private key to cryptographically sign 
the drone's `Remote ID`.

3. Verification on Reception:
Upon receiving the signal, the receiver retrieves the drone's public key from the peaq network based on the peaqID.
The receiver then uses the public key to verify the cryptographic signature on the received signal.

4. Fraudulent Signal Detection:
Any signal that fails the verification process is flagged as potentially fraudulent.


### Code

1. The `CreateDID.js` uses `createPeaqDID` function to create a DID of the drone with the user instance.

2. Signing of the `RemoteId` is an internal process on chain.

3. The `verification.js` function will help to verify the signature using `signatureVerify` function by `@polkadot/util-crypto` sdk.

4. If the verification process is good, then the Drone will be given access to the airspace.





