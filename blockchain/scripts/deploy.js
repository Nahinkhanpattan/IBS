import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    console.log("Deploying contract...");

    // In ESM with hardhat-ethers, hre.ethers should be available if plugin is loaded
    if (!hre.ethers) {
        throw new Error("hre.ethers is NOT defined. Ensure 'import \"@nomicfoundation/hardhat-ethers\";' is in hardhat.config.js");
    }

    const DeviceAccess = await hre.ethers.getContractFactory("DeviceAccess");
    const deviceAccess = await DeviceAccess.deploy();

    await deviceAccess.waitForDeployment();

    const address = await deviceAccess.getAddress();
    console.log("DeviceAccess deployed to:", address);

    const configDir = path.join(__dirname, "../../server/src/config");
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }

    const artifactPath = path.join(__dirname, "../artifacts/contracts/DeviceAccess.sol/DeviceAccess.json");
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

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
