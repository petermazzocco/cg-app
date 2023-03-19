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
export async function cancelCampaign(owner, id) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, owner);
  return factory.cancelCampaign(id);
}

// Pledge to a campaign
export async function pledgeTo(signer, amount) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, signer);
  return factory.pledgeTo(amount);
}

// Withdraw from a campaign
export async function withdrawFrom(owner, id) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, owner);
  return factory.withdrawFrom(id);
}

// Refund from a campaign
export async function refund(id, donor, amount) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, donor);
  return factory.refund(id, amount);
}
