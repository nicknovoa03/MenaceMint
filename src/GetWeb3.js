import Web3 from "web3";

const getWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    return window.web3;
  }
  else {
    const provider = new Web3.providers.HttpProvider(
      'https://mainnet.infura.io/v3/bad8cc770bef49dc88683bf2290205c8'
    );
    return new Web3(provider);
  }
}


export default getWeb3;
