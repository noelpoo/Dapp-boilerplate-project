const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const defaultMessage = 'Default message'

beforeEach(async () => {
    // get a list of test accounts from ganache
    accounts = await web3.eth.getAccounts();

    //deploying contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [defaultMessage] })
        .send({ from: accounts[0], gas: '1000000' });
})

describe('Inbox', () => {
    it('deploys contract', () => {
        assert.ok(inbox.options.address); // check if this value is defined
    });

    it('get message', async () => {
        const message = await inbox.methods.getMessage().call(); // calling a contract object function, an async function
        assert.equal(message, defaultMessage);
    })

    it('set message', async () => {
        const newMessage = 'New message';
        await inbox.methods.setMessage(newMessage).send({from: accounts[0]});
        const returnMessage = await inbox.methods.getMessage().call();
    })

    it('get setMessages counter', async () => {
        const newMessage = "New message";
        await inbox.methods.setMessage(newMessage).send({from: accounts[0]});
        const count = await inbox.methods.getCalledTimes().call();
        assert.equal(count, 1)
    })
})
