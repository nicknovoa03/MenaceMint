import getWeb3 from './GetWeb3'
//import Pixatar from './contracts/Menace_Test_Ganache.json'
import Menace from './contracts/Menace.json'
//import Menace from './contracts/Menace_Test_Rinkeby.json'
import { useState, useEffect } from 'react';

function AsyncConnect() {
    const [account, setAccount] = useState();
    const [contract, setContract] = useState();
    const [contractAddress, setContractAddress] = useState();
    const [web3, setWeb3] = useState();
   
    async function connectWeb3() {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            setWeb3(window.web3);

            // Use web3 to get the user's accounts.
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            console.log("accounts:", accounts);

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            console.log("network:", networkId);
            const contract = new web3.eth.Contract(
                Menace.abi,
                "0x6Da0D84695a6d3E0C1f8d526838abDc6aCab69d7"
            );
            console.log("contract", contract)

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

    return [account, contract, contractAddress, web3];
}

export default AsyncConnect;