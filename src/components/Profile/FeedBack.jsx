import React, { useState } from "react";

function FeedBack() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    console.log("Feedback submitted:", feedback);
    setFeedback("");
  };

  return (
    <div className="flex flex-col p-1 space-y-5 bg-white rounded-lg h-11/12">

      {/* Heading */}
      <div className="flex flex-row items-start justify-start px-3 py-6 text-lg font-bold md:text-xl text-start">
        Please tell us what do you think, any kind of feedback is highly appreciated. 
      </div>

      {/* Textarea */}
      <div className="flex flex-col items-center justify-center w-full py-4 md:py-10 text-start bg-surface">
        <div className="flex flex-col w-11/12 m-auto md:w-6/12">
          <label className="mb-2 font-medium">Enter Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="You can type your feedback here"
            className="w-full p-3 font-semibold bg-white border h-36 border_container placeholder-gray-400"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex flex-row items-end justify-end w-full p-3 px-5">
        <button
          onClick={handleSubmit}
          className="px-3 py-2 font-semibold text-white bg-primary text-md border border_container"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default FeedBack;
