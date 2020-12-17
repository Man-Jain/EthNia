import getWeb3 from "./utils/getWeb3.js";
import Travel from "./contracts/Travel.json";

let web3 = null;
let accounts = null;
let contract = null;

export const web3Fetch = () => web3;
export const accountsFetch = () => accounts;
export const contractFetch = async () => {
  if (!contract) {
    await getContractInstance();
  }

  return contract;
};

export const web3DataFetch = async () => {
  if (!contract) {
    await getContractInstance();
  }

  return {
    web3: web3,
    accounts: accounts,
    contract: contract,
  };
};

const getContractInstance = async () => {
  try {
    // Get network provider and web3 instance.
    web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    accounts = await web3.eth.getAccounts();

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Travel.networks[networkId];
    contract = new web3.eth.Contract(
      Travel.abi,
      deployedNetwork && deployedNetwork.address
    );

    console.log("deployedNetwork", deployedNetwork);

    const obj = {
      web3: web3,
      accounts: accounts,
      contract: contract,
    };

    return obj;
  } catch (error) {
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
    return error;
  }
};

export default getContractInstance;
