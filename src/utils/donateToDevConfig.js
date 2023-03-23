import { ethers } from "ethers";
import DonateToDev from "../artifacts/contracts/DonateToDev.sol/DonateToDev.json";

const contractAddress = "0x5F0c4D5592204AD8F1d409ea7e9d8d81676B508E";

// Donate
export async function donate(signer, name, message, amount) {
  const factory = new ethers.Contract(contractAddress, DonateToDev.abi, signer);
  return factory.buyCoffee(name, message, { value: amount });
}

//Providers and Contract promises
export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const contract = new ethers.Contract(
  contractAddress,
  DonateToDev.abi,
  provider
);
