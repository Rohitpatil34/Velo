import React, { useState } from "react";

const BookBooking = () => {
  const [sport, setSport] = useState("Pickleball");
  const [date, setDate] = useState("2026-03-02");
  const [startTime, setStartTime] = useState("06:00 AM");
  const [duration, setDuration] = useState(2);
  const [court, setCourt] = useState("");
  const [pricePerHour] = useState(500); // example price

  const totalCost = duration * pricePerHour;

  const increaseDuration = () => {
    setDuration((prev) => prev + 1);
  };

  const decreaseDuration = () => {
    if (duration > 1) {
      setDuration((prev) => prev - 1);
    }
  };

  return (
    <div className="relative flex justify-center w-full h-full mt-10 px-3 py-8 bg-white">
      <div className="w-full md:w-11/12 lg:w-9/12">

        {/* Venue Title */}
        <div className="border rounded-lg p-5 mb-6">
          <h1 className="font-bold text-xl text-gray-800">
            Klutch JC Road
            <div className="text-sm font-medium text-gray-500">
              Town Hall
            </div>
          </h1>

          <div className="mt-3 bg-green-500 text-white text-center py-2 rounded-md font-medium">
            Earn 3 karma points on every booking
          </div>
        </div>

        {/* Booking Form */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 border p-6 rounded-lg">

          {/* Sport */}
          <label className="md:col-span-2 font-semibold">Sport</label>
          <select
            className="md:col-span-3 border rounded-lg h-12 px-3"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            <option>Pickleball</option>
            <option>Badminton</option>
            <option>Football</option>
          </select>

          {/* Date */}
          <label className="md:col-span-2 font-semibold">Date</label>
          <input
            type="date"
            className="md:col-span-3 border rounded-lg h-12 px-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {/* Start Time */}
          <label className="md:col-span-2 font-semibold">Start Time</label>
          <select
            className="md:col-span-3 border rounded-lg h-12 px-3"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            <option>06:00 AM</option>
            <option>07:00 AM</option>
            <option>08:00 AM</option>
          </select>

          {/* Duration */}
          <label className="md:col-span-2 font-semibold">Duration</label>
          <div className="md:col-span-3 flex items-center gap-4">
            <button
              onClick={decreaseDuration}
              className="bg-blue-500 text-white px-3 py-2 rounded-full"
            >
              -
            </button>

            <span className="font-semibold text-gray-700">
              {duration} hr
            </span>

            <button
              onClick={increaseDuration}
              className="bg-blue-500 text-white px-3 py-2 rounded-full"
            >
              +
            </button>
          </div>

          {/* Court */}
          <label className="md:col-span-2 font-semibold">Court</label>
          <select
            className="md:col-span-3 border rounded-lg h-12 px-3"
            value={court}
            onChange={(e) => setCourt(e.target.value)}
          >
            <option value="">--Select Court--</option>
            <option>Court 1</option>
            <option>Court 2</option>
          </select>

          {/* Add to Cart */}
          <div className="col-span-5 mt-4">
            <button
              disabled={!court}
              className={`w-full py-3 rounded-md font-semibold ${
                court
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Add To Cart
            </button>
          </div>
        </div>

        {/* Desktop Cart Summary */}
        <div className="hidden md:block mt-6 border p-5 rounded-lg text-center">
          {court ? (
            <>
              <p className="font-semibold">Total Cost</p>
              <p className="text-xl font-bold text-gray-800">
                INR {totalCost}
              </p>
            </>
          ) : (
            <p className="text-gray-400 font-semibold">
              Cart Is Empty
            </p>
          )}
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full border-t bg-white md:hidden px-4 py-3 flex justify-between items-center shadow-lg">
        <div>
          <p className="text-sm">Total Cost</p>
          <p className="font-bold">INR {totalCost}</p>
        </div>

        <button
          disabled={!court}
          className={`px-6 py-2 rounded-full font-semibold ${
            court
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default BookBooking;