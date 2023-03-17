import { ethers } from "ethers";
import CrowdGaming from "../artifacts/contracts/CrowdGaming.sol/CrowdGaming.json";

//Contract address
const contractAddress = "0x4d075cBE13Be39d97c5D786958Dc0C167f59FAD9";

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

export async function cancelCampaign(owner, id) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, owner);
  return factory.cancelCampaign(id);
}

export async function pledgeTo(id, donor, amount) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, donor);
  return factory.pledgeTo(id, amount);
}
export async function withdrawFrom(owner, id) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, owner);
  return factory.withdrawFrom(id);
}
export async function refund(id, donor, amount) {
  const factory = new ethers.Contract(contractAddress, CrowdGaming.abi, donor);
  return factory.refund(id, amount);
}
