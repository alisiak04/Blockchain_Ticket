async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const TicketToken = await ethers.getContractFactory("TicketToken");

  // Example values: ticket price = 0.01 ETH (in wei), 100 initial tickets
  const ticketPriceInWei = ethers.parseUnits("0.01", "ether"); // 0.01 ETH
  const initialTickets = 100;

  const ticketToken = await TicketToken.deploy(ticketPriceInWei, initialTickets);
  await ticketToken.waitForDeployment();

  console.log("TicketToken deployed to:", ticketToken.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });