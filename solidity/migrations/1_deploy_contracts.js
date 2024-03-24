const MultiSignatureWallet = artifacts.require("MultiSignatureWallet");

module.exports = function(deployer, network, accounts) {
  const owners = accounts.slice(0, 3);
  const approvalsRequired = 2;

  deployer.deploy(MultiSignatureWallet, owners, approvalsRequired);
};
