const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    const DeviceAccess = await hre.ethers.getContractFactory("DeviceAccess");
    const deviceAccess = await DeviceAccess.deploy();

    await deviceAccess.waitForDeployment();

    const address = await deviceAccess.getAddress();
    console.log("DeviceAccess deployed to:", address);

    // Save address and ABI for server usage
    const configDir = path.join(__dirname, "../../server/src/config");
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }

    const contractData = {
        address: address,
        abi: JSON.parse(fs.readFileSync(path.join(__dirname, "../artifacts/contracts/DeviceAccess.sol/DeviceAccess.json"), "utf8")).abi
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
