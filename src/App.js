import React, { Component } from 'react';
import getWeb3 from './GetWeb3'
import Pixatar from './contracts/Pixatar.json'
import './App.css';

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
      accounts: null,
      contract: null,
      totalSupply: 0,
      pixatars: []
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            Pixatar
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account"></span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>MINT</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const pixatar = this.pixatar.value
                  this.mint(pixatar)
                }}>
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='e.g. #FFFFFF'
                    ref={(input) => { this.pixatar = input }}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='MINT'
                  />
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            { this.state.pixatars.map((pixatar, key) => {
              return(
                <div key={key} className="col-md-3 mb-3">
                  <div className="token" style={{ backgroundColor: pixatar }}></div>
                  <div>{pixatar}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default App;


