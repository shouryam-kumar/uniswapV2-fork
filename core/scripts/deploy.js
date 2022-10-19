// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { artifacts, ethers } = require("hardhat");
const hre = require("hardhat"); 


async function main() {

  const [addr1, addr2, addr3] = await ethers.getSigners()
  

  const Factory = await hre.ethers.getContractFactory("UniswapV2Factory");
  const factoryDeploy = await Factory.deploy(addr1.address);
  await factoryDeploy.deployed()

  console.log("The address of the UniswapV2Factory is " + factoryDeploy.address)
  console.log("--------------------------------------------------------------")

  const Token1 = await hre.ethers.getContractFactory("Token1");
  const Token2 = await hre.ethers.getContractFactory("Token2");

  await factoryDeploy.deployed();
  
  let token1Address, token2Address

  if(network == 'mainnet') {
    token1Address = '';
    token2Address = '';
  } else {
    console.log("------------------------------------------------------------")
    console.log("Deploying Token1 contract")
      const token1Deploy = await Token1.deploy()
      await token1Deploy.deployed();
      token1Address = token1Deploy.address
      console.log("The Token1 deployment address is " + token1Address);
      console.log("------------------------------------------------------------------")

      console.log("------------------------------------------------------------------")
      const token2Deploy = await Token2.deploy()
      await token2Deploy.deployed()
      token2Address = token2Deploy.address
      console.log("The token2 deployment address is " + token2Address)
  }


  await factoryDeploy.createPair(token1Address, token2Address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(()=> {
    console.log('*****************************************************************')
    console.log("Successfully compiled and deployed ")
    console.log('*****************************************************************')
    process.exit(0)
  })
  .catch((err)=> {
    console.error("code phatt gya!!")
    console.error(err)
    process.exit(1)
  })
