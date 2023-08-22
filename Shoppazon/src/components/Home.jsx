import { ethers } from "ethers";
import { useEffect, useState } from "react";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";

import editButton from "../assets/edit.png";
import deleteButton from "../assets/bin.png";

const Home = ({
  provider,
  setProvider,
  signer,
  setSigner,
  contract,
  setContract,
  owner,
  account,
}) => {
  const [product, setProduct] = useState([]); // Initialize as an empty array
  const [contractT, setContractT] = useState();
  const [loading, setLoading] = useState(true);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [itemId, setItemId] = useState();

  const getProducts = async () => {
    try {
      const products = await contractT.getItems();
      setProduct(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  const buyProduct = async (index, value) => {
    try {
      // Ensure value is a string
      const stringValue = value.toString();

      const buy = await contractT.buy(index, {
        from: signer.address,
        value: stringValue,
      });
      await buy.wait();

      alert(
        `You Successfully bought this Product. Here is Your Transaction Hash ${buy.hash} `
      );
      window.location.reload();
    } catch (error) {
      console.error("Error While Buying The Product", error);
      alert("Got Some Error While Buying This Product");
    }
  };

  useEffect(() => {
    setContractT(contract);
  }, [contract]);

  useEffect(() => {
    if (contractT) {
      getProducts();
    }
  }, [contractT]);

  return (
    <div className="flex flex-row items-center justify-center mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[50px] ">
        {/* Check if products is empty */}
        {loading ? (
          // Show a loading message while products are being fetched
          <>
            <div className="flex flex-row items-center justify-center text-3xl text-white">
              Loading...
            </div>
            <div className="w-8 h-8 flex flex-row items-center justify-center border-2 border-t-4 border-white rounded-full animate-spin"></div>
          </>
        ) : product.length === 0 ? (
          // Show a message when no items are found
          <div className="flex flex-row items-center justify-center text-white text-3xl text-center">
            No items found ..!
          </div>
        ) : (
          // Render the product cards if products is not empty
          product.map((productItem) => (
            <div
              key={productItem.id}
              className="w-[300px] h-[500px]  ssm:w-[325px] ssm:h-[525px] rounded-xl bg-slate-700 hover:shadow-lg hover:shadow-slate-600 items-center justify-center overflow-hidden"
            >
              <div>
                <img
                  className="w-full h-[300px] rounded-xl "
                  src={
                    productItem.image
                      ? productItem.image
                      : "https://via.placeholder.com/400"
                  }
                  alt="Product Image"
                />
                {productItem.seller &&
                  account &&
                  (productItem.seller.toLowerCase() === account.toLowerCase() ||
                    owner.toLowerCase() === account.toLowerCase()) && (
                    <div className="flex flex-row items-center justify-between -translate-y-[290px] space-x-44 mx-2 ">
                      <div className="text-white text-2xl">
                        <button
                          onClick={() => {
                            setItemId(productItem.id);
                            setShowEditForm(true);
                          }}
                        >
                          <img
                            className="w-12 h-12"
                            src={editButton}
                            alt="Edit Button Image"
                          />
                        </button>
                      </div>
                      <div className="text-white text-2xl">
                        <button
                          onClick={() => {
                            setItemId(productItem.id);
                            setShowDeleteForm(true);
                          }}
                        >
                          <img
                            className="w-12 h-12"
                            src={deleteButton}
                            alt="Delete Button Logo"
                          />
                        </button>
                      </div>
                    </div>
                  )}
              </div>
              <div className="text-xl text-white font-bold px-2 pt-1  break-words line-clamp-1 ssm:line-clamp-2 ">
                {productItem.name}
              </div>
              <div className="text-sm text-white font-normal px-2 pt-1.5 break-words line-clamp-1 leading-normal tracking-wide ">
                {productItem.description}
              </div>
              <div className="text-lg text-white font-normal break words line-clamp-1 tracking-wide px-2 pt-2 text-start ">
                Stock: &nbsp;
                {productItem.stock > 0 
                  ? Number(productItem.stock)
                  : "Out of Stock"}
              </div>
              <div className="flex flex-row items-center justify-between px-2 -pt-2 ">
                <div className="text-md text-white font-normal break-words line-clamp-1 ">{`Price: ${ethers.formatEther(
                  productItem.cost
                )} ETH`}</div>
                <button
                  className={`text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-2 
                  focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold tracking-wide rounded-full text-lg py-1 px-8 text-center 
                  hover:shadow-cyan-500 hover:shadow-md ${
                    productItem.stock <= 0  || !account
                      ? "opacity-50 cursor-not-allowed pointer-events-none  "
                      : ""
                  }`}
                  onClick={async () => {
                    const shouldBuy = window.confirm(
                      "Are you sure you want to buy this product?"
                    );
                    if (shouldBuy) {
                      await buyProduct(productItem.id, productItem.cost);
                    }
                  }}
                >
                  Buy
                </button>
              </div>
              {showEditForm === true && (
                <EditForm
                  setShowEditForm={setShowEditForm}
                  itemId={itemId}
                  contract={contractT}
                  signer={signer}
                />
              )}
              {showDeleteForm === true && (
                <DeleteForm
                  setShowDeleteForm={setShowDeleteForm}
                  itemId={itemId}
                  contract={contractT}
                  signer={signer}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
