import hre from "hardhat";

async function main() {
    console.log("Keys in hre:", Object.keys(hre));
    if (hre.ethers) {
        console.log("hre.ethers is present");
    } else {
        console.log("hre.ethers is MISSING");
    }
}

main().catch(console.error);
