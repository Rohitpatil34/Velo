import React from "react";

const ViewQueryModal = ({ query, onClose }) => {
  if (!query) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl p-6 w-full max-w-[600px] relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Query</h2>

        <div className="bg-gray-100 p-4 rounded-2xl">
          <p>{query.message}</p>
          <p className="text-xs text-right mt-2 text-gray-500">
            {new Date(query.createdAt).toLocaleString()}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ViewQueryModal;
