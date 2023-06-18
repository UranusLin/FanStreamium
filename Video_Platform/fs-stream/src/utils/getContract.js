import ContractAbi from '../pages/artifacts/contracts/YouTube.sol/YouTube.json';
import {ethers} from 'ethers';

export default async function getContract() {
    // Creating a new provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // Creating a new contract factory with the signer, address and ABI
    // Returning the contract
    return new ethers.Contract(
        '0x1a1B7fEeA4233F9F6DEdA0252F8758751fECa004',
        ContractAbi.abi,
        signer,
    );
}
