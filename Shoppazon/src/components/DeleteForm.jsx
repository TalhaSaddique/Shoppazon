import React, { useState } from "react";
import { ethers } from "ethers";

const DeleteForm = ({ setShowDeleteForm, contract, signer, itemId }) => {
  const deleteProduct = async (index) => {
    try {
      const deleteProduct = await contract.removeProduct(index, {
        from: signer.address,
      });
      await deleteProduct.wait();
      const txHash = await deleteProduct.hash;
      alert(
        `Your Product is Deleted Successfully. Here is your Transaction Hash: ${txHash}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error Deleting product:", error);
      alert("Got Some Error While Deleting Your Product");
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target.id === "container") {
          setShowDeleteForm(false);
        }
      }}
      id="container"
      className="flex flex-col items-center justify-center fixed inset-0 bg-slate-900 bg-opacity-40 backdrop-blur-sm"
    >
      <div className="flex flex-col items-end justify-start bg-slate-400 w-[305px] md:w-[450px] p-2 md:p-0 rounded-2xl">
        <div
          className="text-2xl md:text-3xl font-bold text-black text-start mr-4 md:mt-2 mt-0 cursor-pointer"
          onClick={() => setShowDeleteForm(false)}
        >
          x
        </div>
        <div className="flex flex-col items-center justify-start pb-2">
          <div className="flex flex-row justify-between items-center">
            <div className="text-xl md:text-2xl font-bold text-black tracking-wide items-start justify-start text-start -mt-4 ml-32 md:ml-4">
              Delete Product:
            </div>
          </div>
            <div className="text-base font-semibold md:text-lg text-black mt-4  ml-32 md:ml-4">
              Are You sure, you want to delete this product.
            </div>
          <div className=" mt-4 ml-32 md:ml-4">
            <button
              id="closeAfterListing"
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-2 
              focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold tracking-wide rounded-full text-lg md:text-xl w-[290px] md:w-[400px] h-[40px] md:h-[60px] text-center 
              mr-0 md:mr-2 mb-2 hover:shadow-cyan-500 hover:shadow-md"
              onClick={async (e) => {
                if (e.target.id === "closeAfterListing") {
                  await deleteProduct(itemId);
                }
              }}
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;
