document.getElementById("createWalletBtn").addEventListener("click", () => {
  const password = document.getElementById("password").value;
  if (!password) {
    alert("Please enter a password!");
    return;
  }

  //making a new wallet
  const web3 = new Web3();
  const wallet = web3.eth.accounts.create();

  //showing user the wallet details
  document.getElementById("walletDetails").classList.remove("hidden");
  document.getElementById("walletAddress").value = wallet.address;
  document.getElementById("privateKey").value = wallet.privateKey;

  //making keystore file that user can download
  const keystore = web3.eth.accounts.encrypt(wallet.privateKey, password);
  const keystoreStr = JSON.stringify(keystore);
  document.getElementById("keystore").value = keystoreStr;

  //create download blob
  const blob = new Blob([keystoreStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.getElementById("downloadKeystore");
  downloadLink.href = url;
  downloadLink.download = `${wallet.address}.json`;
});

function copyToClipboard(id) {
  const field = document.getElementById(id);
  field.select();
  field.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Copied to clipboard!");
}