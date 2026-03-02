import React, { useState, useEffect } from "react";

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 3;

  useEffect(() => {
    fetchBookings();
  }, [page]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/bookings/my-bookings?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setBookings(data.bookings || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings =
    activeTab === "cancelled"
      ? bookings.filter((b) => b.status === "cancelled")
      : bookings;

  return (
    <section className="w-full p-4">

      {/* ================= TABS ================= */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "all"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          All Bookings
        </button>

        <button
          onClick={() => setActiveTab("cancelled")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "cancelled"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Cancelled
        </button>
      </div>

      {/* ================= BOOKINGS LIST ================= */}
      {loading ? (
        <p>Loading bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <p className="text-gray-500">
          {activeTab === "all"
            ? "No bookings found."
            : "No cancelled bookings."}
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="border rounded-xl p-4 shadow-sm bg-white"
              >
                <p><strong>Venue:</strong> {booking.venue?.name}</p>
                <p><strong>Sport:</strong> {booking.sport}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.startTime} - {booking.endTime}</p>
                <p><strong>Court:</strong> {booking.courtNumber}</p>
                <p><strong>Amount:</strong> ₹{booking.amount}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`font-semibold ${
                    booking.status === "confirmed"
                      ? "text-green-600"
                      : booking.status === "cancelled"
                      ? "text-red-500"
                      : "text-yellow-600"
                  }`}>
                    {booking.status}
                  </span>
                </p>
                <p><strong>Order ID:</strong> {booking.orderId}</p>
              </div>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          <div className="flex justify-center items-center space-x-4 mt-8">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded-lg ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Previous
            </button>

            <span className="font-semibold text-gray-700">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className={`px-4 py-2 rounded-lg ${
                page === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Next
            </button>

          </div>
        </>
      )}
    </section>
  );
};

export default MyBookings;