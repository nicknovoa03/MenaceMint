import Web3 from "web3";
import abi from "./abi.json";

const contractAddr = "0x6Da0D84695a6d3E0C1f8d526838abDc6aCab69d7";
const web3 = new Web3("https://mainnet.infura.io/v3/bad8cc770bef49dc88683bf2290205c8");
let contract = new web3.eth.Contract(abi, contractAddr);

export { 
    contractAddr, 
    contract
};