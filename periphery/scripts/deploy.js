// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const FACTORY_ADDRESS = '0xDa6B2F63a95aa61c828ADe3eB91Ae105336466Fc'
  
 
  const Router = await hre.ethers.getContractFactory("UniswapV2Router02")
 
  
  let weth; 

  if(hre.network.name === 'mainnet') {
    weth = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
  } else {
    console.log('***************************************************************************')
    console.log('Not on mainnet, deploying weth contract')
    const Weth = await hre.ethers.getContractFactory("WETH")
    const wethDeploy = await Weth.deploy();
    await wethDeploy.deployed();
    console.log('The address of the deployed wrapped ether is ' + wethDeploy.address)
    weth = wethDeploy.address
  }

  console.log('*********************************************************************')
  let routerDeploy = await Router.deploy(FACTORY_ADDRESS, weth)
  await routerDeploy.deployed();

  console.log('THe address of the deployed Router contract is ' +  routerDeploy.address)
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
})


// The address of the deployed wrapped ether is 0x26698088E11144B24686E977E77C4B39Fc99f695
// *********************************************************************
// THe address of the deployed Router contract is 0x7c0D4679581E50EAC66F904BD8808385808CF32B