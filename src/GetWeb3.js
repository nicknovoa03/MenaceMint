import { useState, useEffect } from 'react';
import Pixatar from './contracts/Pixatar.json'
import Web3 from "web3";


const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Accounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:7545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

  function AsyncConnect() {
    const [account, setAccount] = useState();
    const [contract, setContract] = useState();
    const [contractAddress, setContractAddress] = useState();
    async function connectWeb3() {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            console.log("accounts:", accounts);

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            console.log("network:", networkId);
            const deployedNetwork = Pixatar.networks[networkId];
            const contract = new web3.eth.Contract(
                Pixatar.abi,
                deployedNetwork && deployedNetwork.address,
            );
            console.log("contract address:", contract)

            // Set accounts, contract, and total supply to the state
            setAccount(accounts[0]);
            setContract(contract);
            setContractAddress(contract._address);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    }

    useEffect(() => {
        connectWeb3();
    }, []);

    return [account, contract, contractAddress];
}

export default AsyncConnect;
