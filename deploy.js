const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const accountMnemonic = 'wash exercise isolate since behave divorce pear system lamp small water rabbit';
const infura = {
    endpoints: {
        rinkeby: 'https://rinkeby.infura.io/v3/023a9858cbba44b69d73919b72d1006b',
        ropstein: 'https://ropsten.infura.io/v3/023a9858cbba44b69d73919b72d1006b'
    }
}

const provider = new HDWalletProvider(
    accountMnemonic,
    infura.endpoints.ropstein
)
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(`deployment account: ${accounts[0]}`)
    const contract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Initial message'] })
        .send({ from: accounts[0], gas: '1000000', gasPrice: '5000000000' })
        .catch(error => {
            console.log(`Error: ${error}`)
        })
    console.log(contract.options.address);
}

deploy();
