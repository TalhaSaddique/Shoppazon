import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-4  lg:mx-8 mt-16 ssm:mt-20 lg:mt-96">
      <div className="p-1 w-full bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl "></div>
      <div className="">
        <div className="flex flex-col md:flex-row items-center justify-between md:space-x-40 lg:space-x-80 xl:space-x-[600px] my-4 md:my-6 lg:my-16 text-lg lg:text-lg font-bold text-white">
          <div className="mb-2 md:mb-0 ">
            Developer: &nbsp;&nbsp;
            <a
              className="text-transparent tracking-wide bg-clip-text bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:underline hover:underline-offset-8 hover:decoration-cyan-500 hover:bg-gradient-to-bl "
              href="https://talhasaddique.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Talha Saddique &nbsp;
            </a>
            ↗
          </div>
          <div className="mb-2 md:mb-0 ">
            LinkTree: &nbsp;&nbsp;
            <a
              className="text-transparent tracking-wide bg-clip-text bg-gradient-to-r from-red-200 via-red-300 to-yellow-200  hover:underline hover:underline-offset-8 hover:decoration-cyan-500 hover:bg-gradient-to-bl "
              href="https://linktr.ee/TalhaSaddique"
              target="_blank"
              rel="noopener noreferrer"
            >
              Talha Saddique &nbsp;
            </a>
            ↗
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;