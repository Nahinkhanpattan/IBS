import hre from "hardhat";

async function main() {
    console.log("HRE Keys:", Object.keys(hre));
    if (hre.ethers) {
        console.log("hre.ethers is present");
    } else {
        console.log("hre.ethers is MISSING");
    }
}

main().catch(console.error);
