// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const bonusToken = await hre.ethers.getContractFactory("BonusToken");
  const bonusTokenDeploy = await bonusToken.deploy();
  await bonusTokenDeploy.deployed();

  console.log("******************************************************")
  console.log(`Bonus Token deployed at ${bonusTokenDeploy.address}`);
  console.log("********************************************************")

  const routerAddress = ''
  const pairAddress = ''
  const routerForkAddress = ''
  const pairForkAddress = '';


  const liquidityMigrator = await hre.ethers.getContractFactory("LiquidityMigrator");
  const liquidityMigratorDeploy = await LiquidityMigrator.deploy(
   routerAddress,
   pairAddress,
   routerForkAddress,
   pairForkAddress,
   bonusTokenDeploy.address
  )
  await liquidityMigratorDeploy.deployed();
  console.log("**********************************************************");
  console.log(`The address of the deployed liquidity migrator is ${liquidityMigratorDeploy.address}`) ;

  const tx = await bonusTokenDeploy.setLiquidator(liquidityMigratorDeploy.address)
  await tx.wait(1)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
