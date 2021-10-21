import React, { Component } from 'react';
import getWeb3 from './GetWeb3'
import Pixatar from './contracts/Pixatar.json'
import './App.css';

import SideScreen from './SideScreen.js'

class App extends Component {

  async componentDidMount() {
    await this.connectWeb3()
    //await this.loadBlockChainData()
  }

  connectWeb3 = async () => {
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
      console.log("contract:",contract)

      // Get total supply
      const totalSupply = await contract.methods.totalSupply.call()
      console.log("total supply:",totalSupply)

      // Set accounts, contract, and total supply to the state
      this.setState({ accounts: accounts, contract: contract, totalSupply: totalSupply });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  async loadBlockChainData() {
    try{
      //Load Pixatars
      for (var i = 1; i< this.state.totalSupply; i++){
        const newPixatar = await this.contract.methods.pixatars(i-1).call()
        this.setState({
          pixatars: [...this.state.pixatars,newPixatar]
        })
      }
    } catch (error) {
      alert (
        'Error Loading Blockchain data'
      )
      console.error(error);
    }
  }

  mint = (pixatar) => {
    console.log(pixatar)
    this.state.contract.methods.mint(pixatar).send({ from: this.state.accounts[0] })
    .once('receipt', (receipt) => {
      this.setState({
        pixatars: [...this.state.pixatars, pixatar]
      })
    })
  }

  constructor(props){
    super(props)
    this.state = {
      accounts: [],
      contract: null,
      totalSupply: 0,
      pixatars: [],
      sideSign: SideScreen(),
    }
  }

  render() {
    return SideScreen()
  }
}
export default App;


