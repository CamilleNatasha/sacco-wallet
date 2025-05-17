const { ethers } = require("hardhat");

async function main() {
  const SaccoPool = await ethers.getContractFactory("SaccoPool");
  const pool = await SaccoPool.deploy(
    process.env.USDC_ADDRESS,
    process.env.AAVE_POOL_ADDRESS
  );
  console.log("SaccoPool deployed to:", pool.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});