const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const TicketToken = await hre.ethers.getContractFactory("TicketToken");
  const ticketToken = await TicketToken.deploy(
    "Event Ticket",  // Token name
    "TICKET",        // Token symbol
    0                // Decimals
  );

  await ticketToken.waitForDeployment();
  const contractAddress = await ticketToken.getAddress();
  console.log("TicketToken deployed to:", contractAddress);

  // Create event with 0.1 ETH per ticket
  const priceInWei = hre.ethers.utils.parseEther("0.1");
  const tx = await ticketToken.createEvent(
    "Summer Concert 2024",
    priceInWei,
    100
  );
  await tx.wait();
  console.log("Initial event created");

  const config = {
    contractAddress: contractAddress,
    network: "sepolia"
  };

  fs.mkdirSync("frontend", { recursive: true });
  fs.writeFileSync("frontend/config.json", JSON.stringify(config, null, 2));
  console.log("Contract address saved to frontend/config.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});