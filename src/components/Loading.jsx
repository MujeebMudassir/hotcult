import React, { useEffect, useState } from "react";

const LineLoadingScreen = () => {
  return (
    <div
      className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#FDB10D] via-[#F31335] to-[#433FD4] rounded-lg animate-line-expand filter blur-[0.3] backdrop-blur-2xl"
      aria-label="Loading... Please wait."
    >
      <style>
        {`
          @keyframes lineExpand {
            0% {
              width: 0%;
              transform: translateX(0);
            }
            50% {
              width: 50%;
              transform: translateX(50);
            }
            100% {
              width: 100%;
              transform: translateX(100);
            }
          }

          .animate-line-expand {
            animation: lineExpand 1s ease-in ;
          }
        `}
      </style>
    </div>
  );
};

export default LineLoadingScreen;
