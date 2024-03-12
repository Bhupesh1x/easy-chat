"use client";

import { ClipLoader } from "react-spinners";

const LoadingModal = () => {
  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center">
          <ClipLoader size={40} color="#0284c7" />
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
