// DisclaimerModal.js

import { useState } from "react";

const DisclaimerModal = ({ onClose }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-8 max-w-4xl w-full rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b rounded-t bg-blue-500 text-white">
          <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
          <button
            onClick={handleAccept}
            className="text-white hover:text-gray-200 rounded-lg text-sm w-10 h-8 inline-flex justify-center items-center focus:outline-none focus:ring focus:border-blue-300"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <p className="text-gray-700 mt-4 text-justify">
          This website is created solely for educational and testing purposes,
          and any data entered, including personal information, is stored in the
          database for the sole purpose of system improvement and simulation.
          However, please be assured that this information is not used for any
          real transactions, and the website is not an operational ecommerce
          platform. No actual orders will be processed, and no genuine payments
          will be made. The payment integration, including Razorpay, is
          implemented exclusively for testing purposes. Users are advised
          against entering any real or confidential information. By using this
          site, you acknowledge and agree that the data stored is for testing
          and improvement purposes only and will not be used for any real-world
          transactions. We appreciate your cooperation and understanding in
          contributing to the enhancement of our systems. Thank you.
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;
