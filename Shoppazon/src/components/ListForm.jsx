import React, { useState } from "react";
import { ethers } from "ethers";
import { NFTStorage } from "nft.storage";

const NFTSTORAGE_API_KEY = import.meta.env.VITE_NFTSTORAGE_API_KEY;


const ListForm = ({ setShowListForm, contract, signer }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [Loading, setLoading] = useState(false);
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();

  const listProduct = async () => {
    if (!title || !description || !category || !image || !price || !stock) {
      alert("Please fill all the fields.");
      return;
    } else {
      try {
        const shouldList = window.confirm(
          "Are you sure you want to list this product?"
        );
        if (shouldList) {
          const list = await contract.list(
            title,
            description,
            category,
            image,
            ethers.parseEther(price), // Convert price to Wei using parseEther
            stock,
            {
              from: signer.address,
            }
          );
          await list.wait();
          const txHash = await list.hash;
          alert(
            `Your Product is listed Successfully. Here is your Transaction Hash: ${txHash}`
          );
          window.location.reload();
        }
      } catch (error) {
        console.error("Error listing product:", error);
        alert("Got Some Error While Listing Your Product");
      }
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target.id === "container") {
          setShowListForm(false);
        }
      }}
      id="container"
      className="flex flex-col items-center justify-center fixed inset-0 z-10 bg-slate-900 bg-opacity-40 backdrop-blur-sm "
    >
      <div className="flex flex-col items-end justify-start bg-slate-400 w-[305px] md:w-[450px] p-2 md:p-0 rounded-2xl ">
        <div
          className="text-2xl md:text-3xl font-bold text-black text-start mr-4 md:mt-2 mt-0 cursor-pointer"
          onClick={() => setShowListForm(false)}
        >
          x
        </div>
        <div className="flex flex-col items-center justify-start pb-2">
          <div className="flex flex-row justify-between items-center">
            <div className="text-xl md:text-2xl font-bold text-black tracking-wide items-start justify-start text-start -mt-4 ml-32 md:ml-4 ">
              Product Detail:
            </div>
          </div>
          <div>
            <div className="text-base md:text-lg text-slate-100 mt-4  ml-32 md:ml-4 ">
              Product Title:
              <input
                className="w-[290px] md:w-[400px] h-10 md:h-14 rounded-full px-4 bg-slate-600 mt-1 "
                type="text"
                placeholder="Product Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="text-base md:text-lg text-slate-100 mt-4 ml-32 md:ml-4 ">
              Product Description:
              <input
                className="w-[290px] md:w-[400px] h-14 md:h-24 rounded-xl px-4 bg-slate-600 mt-1 "
                type="text"
                placeholder="Product Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="text-base md:text-lg text-slate-100 mt-4  ml-32 md:ml-4 ">
              Product Image:
              <input
                className="w-[290px] md:w-[400px] h-10 md:h-14 rounded-full px-2 md:px-4 py-1 md:py-2.5 bg-slate-600 mt-1 line line-clamp-1"
                type="file"
                accept="image/*"
                placeholder="Product Image"
                onChange={async (e) => {
                  setLoading(true);
                  try {
                    const file = e.target.files[0];

                    const client = new NFTStorage({
                      token:
                        NFTSTORAGE_API_KEY,
                    });

                    const metadata = await client.store({
                      name: title,
                      description: description,
                      image: new File([file], title.toLowerCase() + ".jpg", {
                        type: "image/jpeg",
                      }),
                    });

                    // Modify the URL to use the IPFS gateway
                    const imageUrl = metadata.data.image.href.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/"
                    );
                    setImage(imageUrl);
                    setLoading(false);
                  } catch (error) {
                    console.log(
                      "Got Error while uploading image to the ipfs",
                      error
                    );
                  }
                }}
              />
            </div>
            <div className="text-base md:text-lg text-slate-100 mt-4 ml-32 md:ml-4 ">
              Product Category:
              <input
                className="w-[290px] md:w-[400px] h-10 md:h-14 rounded-full px-4 bg-slate-600 mt-1 "
                type="text"
                placeholder="Product Category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </div>
            <div className="text-base md:text-lg text-slate-100 mt-4 ml-32 md:ml-4 ">
              Product Price:
              <input
                className="w-[290px] md:w-[400px] h-10 md:h-14 rounded-full px-4 bg-slate-600 mt-1 "
                type="number"
                placeholder="Product Price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="text-base md:text-lg text-slate-100 mt-4 ml-32 md:ml-4 ">
              Product Stock:
              <input
                className="w-[290px] md:w-[400px] h-10 md:h-14 rounded-full px-4 bg-slate-600 mt-1 "
                type="number"
                placeholder="Product Stock"
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
              />
            </div>
            <div className="mt-4 ml-32 md:ml-4">
              {Loading ? (
                <div className="flex items-center justify-center mb-2 ">
                  <div className="w-6 h-6 md:w-8 md:h-8 border-t-4 md:border-t-4 border-white border-2 md:border-2 border-solid rounded-full animate-spin"></div>
                </div>
              ) : (
                <button
                  id="closeAfterListing"
                  className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-2 
                 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold tracking-wide rounded-full text-lg md:text-xl w-[290px] md:w-[400px] h-[40px] md:h-[60px] text-center 
                 mr-0 md:mr-2 mb-2 hover:shadow-cyan-500 hover:shadow-md"
                  onClick={async (e) => {
                    if (e.target.id === "closeAfterListing") {
                      await listProduct();
                    }
                  }}
                >
                  + List
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListForm;
