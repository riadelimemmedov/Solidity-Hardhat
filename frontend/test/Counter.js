const { expect } = require('chai')


//!Counter
describe('Counter', function() {
    let contract;

    beforeEach(async function() {
        // Deploy a new instance of the Counter contract before each test
        const contracts = await ethers.getContractFactory('Counter');
        contract = await contracts.deploy();
        await contract.waitForDeployment(); // Wait until the deployment process completes
    });

    it('Should start with a count of 0', async function() {
        // Verify that the initial count is 0
        expect(await contract.get()).to.be.equal(0);
    });

    it('Should increment the count by 1', async function() {
        // Increment the count and verify that it increases by 1
        await contract.inc();
        expect(await contract.get()).to.be.equal(1);
    });

    it('Should decrement the count by 1', async function() {
        // Increment the count, then decrement it and verify that it returns to 0
        await contract.inc();
        await contract.dec();
        expect(await contract.get()).to.be.equal(0);
    });

    it('Should fail to decrement the count below 0', async function() {
        // Verify that attempting to decrement the count below 0 results in a revert with 'underflow' error
        await expect(contract.dec()).to.be.revertedWith('underflow');
    });
});
