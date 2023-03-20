import { ethers } from "ethers";
import CrowdGaming from "../artifacts/contracts/CrowdGaming.sol/CrowdGaming.json";

//Contract address
const contractAddress = "0x882978f7Afef5bc38c73461f4Bf096e5dF03Ef5C";

// Create new campaign
export async function launchCampaign(
  signer,
  title,
  description,
  goal,
  startAt,
  endAt
) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, signer);
  return factory.launchCampaign(title, description, goal, startAt, endAt);
}

// Cancel a campaign
export async function cancelCampaign(signer, id) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, signer);
  return factory.cancelCampaign(id);
}

// Pledge to a campaign
export async function pledgeTo(signer, id, amount) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, signer);
  return factory.pledgeTo(id, { value: amount });
}

// Withdraw from a campaign
export async function withdrawFrom(signer, id) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, signer);
  return factory.withdrawFrom(id);
}

// Refund from a campaign
export async function refund(signer, id, amount) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, signer);
  return factory.refund(id, { value: amount });
}

//Providers and Contract promises
export const provider = new ethers.providers.Web3Provider(window.ethereum);
export const contract = new ethers.Contract(
  contractAddress,
  CrowdGaming.abi,
  provider
);
