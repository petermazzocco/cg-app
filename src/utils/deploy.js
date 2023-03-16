import { ethers } from "ethers";
import CrowdGaming from "../artifacts/contracts/CrowdGaming.sol/CrowdGaming.json";

export default async function deploy(
  owner,
  title,
  description,
  goal,
  startAt,
  endAt
) {
  const factory = new ethers.ContractFactory(
    CrowdGaming.abi,
    CrowdGaming.bytecode,
    owner,
    title,
    description,
    goal,
    startAt,
    endAt
  );
  return factory.deploy();
}
