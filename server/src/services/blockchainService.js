const { getContract } = require("../config/blockchain");

const registerDevice = async (deviceAddress) => {
    try {
        const contract = await getContract();
        const tx = await contract.registerDevice(deviceAddress);
        await tx.wait();
        return { success: true, txHash: tx.hash };
    } catch (error) {
        console.error("Error registering device:", error);
        throw error;
    }
};

const grantPermission = async (deviceAddress, resource) => {
    try {
        const contract = await getContract();
        const tx = await contract.grantPermission(deviceAddress, resource);
        await tx.wait();
        return { success: true, txHash: tx.hash };
    } catch (error) {
        console.error("Error granting permission:", error);
        throw error;
    }
};

const checkAccess = async (deviceAddress, resource) => {
    try {
        const contract = await getContract();
        // checkAccess is a read-only or state-changing function depending on implementation.
        // In our solidity it is 'public' and emits an event, so it might need a transaction if we want the event on chain,
        // OR we can use staticCall if we just want the result without mining a block.
        // However, the requirements say "Blockchain emits event: AccessChecked", so we should execute it as a transaction 
        // if we want that permanent log. But typically for "checking" we might want speed.
        // Let's stick to the Solidity definition which is a transaction (implied by not being view/pure).

        // Wait, if it returns bool and we send a transaction, we won't get the return value directly in the tx receipt.
        // We have to rely on the event or use callStatic to simulate.
        // For the purpose of this system (Security), likely we want to Log it on chain.
        // So we send a tx.

        const tx = await contract.checkAccess(deviceAddress, resource);
        const receipt = await tx.wait();

        // Parse logs to find the result if needed, or just trust the execution if it didn't revert.
        // But our contract returns a boolean.
        // Let's also do a static call to get the return value for the API response
        // strictly speaking, the real on-chain check happens when the tx is mined.

        const allowed = await contract.checkAccess.staticCall(deviceAddress, resource);

        // If we want the event on chain:
        // await tx.wait(); 

        return allowed;
    } catch (error) {
        console.error("Error checking access:", error);
        throw error;
    }
};

module.exports = {
    registerDevice,
    grantPermission,
    checkAccess
};
