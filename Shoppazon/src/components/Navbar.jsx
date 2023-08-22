import { useEffect, useState } from "react";
import ListForm from "./ListForm";
import { ethers } from "ethers";

const Navbar = ({
  account,
  setAccount,
  contract,
  signer,
  owner,
  isSeller,
  contractBalance,
  provider,
}) => {
  const [contractT, setContractT] = useState();
  const [showListForm, setShowListForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(true);
  const isAndroid = /android/i.test(navigator.userAgent);

  const connect = async () => {
    if (window.ethereum) {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(account);
    } else {
      alert("Please Install MetaMask to use this DAPP");
    }
  };

  const withdraw = async () => {
    try {
      const shouldWithdraw = window.confirm(
        `Are you sure you want to withdraw ${contractBalance} ETH?`
      );
      if (shouldWithdraw) {
        const withdraw = await contract.withdraw();
        await withdraw.wait();
        const txHash = await withdraw.hash;
        alert(
          `Your Contract Balance withdrawed Successfully. Here is your Transaction Hash: ${txHash}`
        );
        window.location.reload();
      }
    } catch (error) {
      console.error("Error Withdrawing Balance:", error);
      alert("Got Some Error While Withdraing Your Contract Balance");
    }
  };

  const becomeASeller = async () => {
    try {
      const shouldBecomeASeller = window.confirm(
        `Are you sure you want to Become  Shoppazaon Seller. You have to pay 0.5 ETH to Become a Seller?`
      );
      if (shouldBecomeASeller) {
        const becomeSeller = await contract.becomeSeller({
          from: signer.address,
          value: ethers.parseEther("0.05"),
        });
        await becomeSeller.wait();
        const txHash = await becomeSeller.hash;
        alert(
          `You have Become a Shoppazon Seller Successfully. Here is your Transaction Hash: ${txHash}`
        );
        window.location.reload();
      }
    } catch (error) {
      console.error("Error Becoming A Seller:", error);
      alert("Got Some Error While Becoming a Shoppazon Seller");
    }
  };

  useEffect(() => {
    if (!account) {
      connect();
    }
  }, []);

  useEffect(() => {
    setContractT(contract);
  }, [contract]);

  const slicedAddress = `${account.slice(0, 5)}...${account.slice(
    account.length - 4
  )}`;

  // Compare the owner and account as strings
  const isOwner =
    account && owner && account.toLowerCase() === owner.toLowerCase();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between ">
      <div className="items-start justify-start">
        <div className="text-3xl lg:text-4xl font-bold text-transparent tracking-wide bg-clip-text bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 ">
          <a
            className="hover:bg-gradient-to-bl text-transparent bg-clip-text"
            href=""
          >
            Shoppazon
          </a>
        </div>
      </div>
      <div className="mt-10 md:mt-0 flex flex-wrap-reverse items-center justify-center ">
        {isSeller === true && account ? (
          <button
            className=" text-white hover:text-gray-900 hover:border-transparent border-2 border-l-red-200 border-y-red-300 border-r-yellow-200 from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-2 
      focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold tracking-wide rounded-full text-base sm:text-lg xl:text-xl px-5 lg:px-9 xl:px-12 ssm:px-6 py-2 lg:py-3 ssm:py-2 xl:py-4 text-center 
      mr-16 ssm:mr-2 mb-2 hover:shadow-cyan-500 hover:shadow-md"
            onClick={() => setShowListForm(true)}
          >
            + List
          </button>
        ) : null}

        {!isSeller && account ? (
          <button
            className=" text-white hover:text-gray-900 hover:border-transparent border-2 border-l-red-200 border-y-red-300 border-r-yellow-200 from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-2 
      focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold tracking-wide rounded-full text-base sm:text-lg xl:text-xl px-5 lg:px-9 xl:px-12 ssm:px-6 py-2 lg:py-3 ssm:py-2 xl:py-4 text-center 
      mr-2 mb-2 hover:shadow-cyan-500 hover:shadow-md"
            onClick={() => becomeASeller()}
          >
            Become A Seller
          </button>
        ) : null}

        {isOwner && account ? (
          <button
            className={`text-white hover:text-gray-900 hover:border-transparent border-2 border-l-red-200 border-y-red-300 border-r-yellow-200 from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-2 
      focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold tracking-wide rounded-full text-base sm:text-lg xl:text-xl px-5 lg:px-9 xl:px-12 ssm:px-6 py-2 lg:py-3 ssm:py-2 xl:py-4 text-center 
      mr-2 mb-2 hover:shadow-cyan-500 hover:shadow-md `}
            onClick={() => withdraw()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? "Withdraw" : `${contractBalance} ETH`}
          </button>
        ) : null}
        {!isAndroid ? (
          <button
            className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-2 
    focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold tracking-wide rounded-full text-base sm:text-lg xl:text-xl px-5 lg:px-9 xl:px-12 ssm:px-6 py-2 lg:py-3 ssm:py-2 xl:py-4 text-center 
    mr-2 mb-4 ssm:mb-2 hover:shadow-cyan-500 hover:shadow-md"
            onClick={() => {
              connect();
            }}
          >
            {account ? slicedAddress : <div> Connect </div>}
          </button>
        ) : (
          <button
            className=" text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-2 
    focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold tracking-wide rounded-full text-base sm:text-lg xl:text-xl px-5 lg:px-9 xl:px-12 ssm:px-6 py-2 lg:py-3 ssm:py-2 xl:py-4 text-center 
    mr-2 mb-4 ssm:mb-2 hover:shadow-cyan-500 hover:shadow-md"
          >
            {account ? (
              slicedAddress
            ) : (
              <div>
                <a
                  href="https://metamask.app.link/dapp/talha-shoppazon.netlify.app/"
                  rel="noopener noreferrer"
                ></a>
                Connect
              </div>
            )}
          </button>
        )}
      </div>
      {showListForm === true ? (
        <ListForm
          setShowListForm={setShowListForm}
          contract={contractT}
          signer={signer}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
