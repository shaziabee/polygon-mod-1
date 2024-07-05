// // Import necessary packages and contracts
// const { ethers } = require("hardhat");
// const { FXRootContractAbi } = require('../artifacts/fxRootContractABI.js');
// const ABI = require('../artifacts/contracts/CuteCats.sol/CuteCats.json');
// require('dotenv').config();

// //Transfer ERC721A tokens to the Ethereum FxChain network
// async function main() {

//   // Set up connections to network and wallet
//   const networkAddress = ' https://rpc-amoy.polygon.technology/';
//   const privateKey = process.env.PRIVATE_KEY;
//   const provider = new ethers.providers.JsonRpcProvider(networkAddress);

//   // Create a wallet instance
//   const wallet = new ethers.Wallet(privateKey, provider);

//   // Get the signer instance
//   const [signer] = await ethers.getSigners();
  
//   // Get ERC721A contract instance
//   const NFT = await ethers.getContractFactory("CuteCats");
//   const nft = await NFT.attach('0xcD2A70EF7B554A437bf0a2E9B3fF95298FfD2991');

//   // Get FXRoot contract instance
//   const fxRootAddress = '0xF9bc4a80464E48369303196645e876c8C7D972de';
//   const fxRoot = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

//   // TokenIds to transfer
//   const tokenIds = [0, 1, 2, 3, 4]; 

//   // Approve the nfts for transfer
//   const approveTx = await nft.connect(signer).setApprovalForAll(fxRootAddress, true);
//   await approveTx.wait();
//   console.log('Approved confirmed');

//   // Deposit the nfts to the FXRoot contracts
//   for (let i = 0; i < tokenIds; i++) {
//     const depositTx = await fxRoot.connect(signer).deposit(
//       nft.address,
//       wallet.address, 
//       tokenIds[i],
//       '0x6566'
//     );

//     // Wait for the deposit to be confirmed
//     await depositTx.wait();
//   }

//   console.log("Approved and deposited");

  
//   // Test balanceOf
//   // const balance = await nft.balanceOf(wallet.address);

//   // // Print the balance of the wallet
//   // console.log("CuteCats wallet balance", wallet.address, "is: ", balance.toString(),"BH");
// }


// // Call the main function and handle any errors
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

// Import necessary packages and contracts
const { ethers } = require("hardhat");
const { FXRootContractAbi } = require('../artifacts/fxRootContractABI.js');
const ABI = require('../artifacts/contracts/CuteCats.sol/CuteCats.json');
require('dotenv').config();

// Transfer ERC721A tokens to the Ethereum FxChain network
async function main() {

  // Set up connections to network and wallet
  const networkAddress = 'https://rpc-amoy.polygon.technology/';
  const privateKey = process.env.PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);

  // Create a wallet instance
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get the signer instance
  const [signer] = await ethers.getSigners();
  
  // Get ERC721A contract instance
  const NFT = await ethers.getContractFactory("CuteCats");
  const nft = await NFT.attach('0xcD2A70EF7B554A437bf0a2E9B3fF95298FfD2991');

  // Get FXRoot contract instance
  const fxRootAddress = '0xF9bc4a80464E48369303196645e876c8C7D972de';
  const fxRoot = await ethers.getContractAt(FXRootContractAbi, fxRootAddress);

  // TokenIds to transfer
  const tokenIds = [0, 1, 2, 3, 4]; 

  // Set a gas price
  const gasPrice = ethers.utils.parseUnits('30', 'gwei'); // Example: 30 Gwei

  // Approve the nfts for transfer
  const approveTx = await nft.connect(signer).setApprovalForAll(fxRootAddress, true, {
    gasPrice: gasPrice
  });
  await approveTx.wait();
  console.log('Approved confirmed');

  // Deposit the nfts to the FXRoot contracts
  for (let i = 0; i < tokenIds; i++) {
    const depositTx = await fxRoot.connect(signer).deposit(
      nft.address,
      wallet.address, 
      tokenIds[i],
      '0x6566',
      {
        gasPrice: gasPrice
      }
    );

    // Wait for the deposit to be confirmed
    await depositTx.wait();
  }

  console.log("Approved and deposited");

  // Test balanceOf
  // const balance = await nft.balanceOf(wallet.address);

  // // Print the balance of the wallet
  // console.log("CuteCats wallet balance", wallet.address, "is: ", balance.toString(),"BH");
}

// Call the main function and handle any errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

