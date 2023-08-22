import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "./constants/contract.js";
import { Navbar, Home, Footer } from "./components/index.js";

const App = () => {
  // Account
  const [account, setAccount] = useState("");
  // Owner
  const [owner, setOwner] = useState("");
  // Seller
  const [isSeller, setIsSeller] = useState(false);
  // Provider Use State Hook
  const [provider, setProvider] = useState(null);
  // Signer Use State Hook
  const [signer, setSigner] = useState(null);
  // Contract Use State Hook
  const [contract, setContract] = useState(null);
  // Get Contract Balance
  const [contractBalance, setContractBalance] = useState(0);

  // Get Blockchain Data
  const getBlockchainData = async () => {
    if (!account) {
      // provider
      const provider = new ethers.JsonRpcProvider(
        "https://sepolia.infura.io/v3/eecbadcbbac24be89ff1ae66bb2c9201"
      );
      setProvider(provider);
      // Contract
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );
      setContract(contract);
    }
    // Provider
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);
    // Signer
    const signer = await provider.getSigner();
    setSigner(signer);

    // Contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contract);

    // Get Owner
    const owner = await contract.owner();
    setOwner(owner);

    // Get Seller
    const isSellerResult = await contract.sellers(signer.address);
    setIsSeller(isSellerResult);

    // Get Contract Balance
    const contractBalance = await contract.getContractBalance();
    setContractBalance(ethers.formatEther(contractBalance));
  };

  // Use Effect Hook
  useEffect(() => {
    getBlockchainData();
  }, [account]);
  return (
    <div className="bg-gradient-to-r from-slate-800 to-zinc-900 min-w-screen min-h-screen ">
      <div className=" mx-1.5  sm:mx-16 lg:mx-36 2xl:mx-28 pt-8 flex flex-col">

        <Navbar
          account={account}
          setAccount={setAccount}
          provider={provider}
          signer={signer}
          contract={contract}
          owner={owner}
          isSeller={isSeller}
          contractBalance={contractBalance}
        />
        <Home
          provider={provider}
          signer={signer}
          contract={contract}
          owner={owner}
          account={account}
        />
      </div>
        <Footer />
    </div>
  );
};

export default App;
