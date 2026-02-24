import React from "react";

const LoadMoreButton = ({ onClick }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        className="bg-primary text-white h-14 px-4 py-3 mt-12 rounded leading-7
                   active:bg-green-700 focus:outline-none"
      >
        LOAD MORE
      </button>
    </div>
  );
};

export default LoadMoreButton;
