import ContractAbi from '../pages/artifacts/contracts/FanStreamium.sol/FanStreamium.json';
import {ethers} from 'ethers';

export default async function getContract() {
    // Creating a new provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // Creating a new contract factory with the signer, address and ABI
    // Returning the contract
    return new ethers.Contract(
        process.env.NEXT_PUBLIC_FAN_STREAMIUM_CONTRACT,
        ContractAbi.abi,
        signer,
    );
}
