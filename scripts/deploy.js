const hre = require("hardhat");

async function main() {
  const TicketToken = await hre.ethers.getContractFactory("TicketToken");
  const ticketToken = await TicketToken.deploy(
    "Event Ticket",  // name
    "TICKET",        // symbol
    0               // decimals (0 since each token is one ticket)
  );

  await ticketToken.waitForDeployment();

  console.log("TicketToken deployed to:", await ticketToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 