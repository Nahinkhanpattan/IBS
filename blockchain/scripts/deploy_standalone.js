import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    console.log("Deploying contract (Standalone Mode)...");

    // Local Hardhat Node Provider
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

    // Account #0 Private Key (Standard Hardhat)
    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const wallet = new ethers.Wallet(privateKey, provider);

    // Read Artifacts
    const artifactPath = path.join(__dirname, "../artifacts/contracts/DeviceAccess.sol/DeviceAccess.json");
    if (!fs.existsSync(artifactPath)) {
        throw new Error(`Artifact not found at ${artifactPath}. Please run 'npx hardhat compile' first.`);
    }
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

    // Deploy
    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
    const contract = await factory.deploy();

    await contract.waitForDeployment();
    const address = await contract.getAddress();

    console.log("DeviceAccess deployed to:", address);

    // Save Data
    const configDir = path.join(__dirname, "../../server/src/config");
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }

    const contractData = {
        address: address,
        abi: artifact.abi
    };

    fs.writeFileSync(
        path.join(configDir, "contractData.json"),
        JSON.stringify(contractData, null, 2)
    );
    console.log("Contract data saved to server/src/config/contractData.json");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
