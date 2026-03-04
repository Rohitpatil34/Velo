import React, { useState, useEffect } from "react";

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 3;

  // 🔥 Refetch when page OR tab changes
  useEffect(() => {
    fetchBookings();
  }, [page, activeTab]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const status =
        activeTab === "cancelled" ? "cancelled" : "confirmed";

      const res = await fetch(
        `http://localhost:5000/api/bookings/my-bookings?page=${page}&limit=${limit}&status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setBookings(data.bookings || []);
      setTotalPages(data.totalPages || 1);

      // 🔥 Auto move to previous page if current page becomes empty
      if (page > 1 && data.bookings.length === 0) {
        setPage(page - 1);
      }

    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Booking cancelled successfully 💸 Refund initiated");

      // 🔥 Stay on same tab and refresh properly
      fetchBookings();

    } catch (error) {
      console.error("Cancel error:", error);
      alert("Error cancelling booking");
    }
  };

  return (
    <section className="w-full p-4">

      {/* ================= TABS ================= */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => {
            setActiveTab("all");
            setPage(1);
          }}
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === "all"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
            }`}
        >
          All Bookings
        </button>

        <button
          onClick={() => {
            setActiveTab("cancelled");
            setPage(1);
          }}
          className={`px-4 py-2 rounded-lg font-semibold ${activeTab === "cancelled"
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
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">
          {activeTab === "all"
            ? "No bookings found."
            : "No cancelled bookings."}
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {bookings.map((booking) => (
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
                  <span className={`font-semibold ${booking.status === "confirmed"
                      ? "text-green-600"
                      : "text-red-500"
                    }`}>
                    {booking.status}
                  </span>
                </p>
                <p><strong>Order ID:</strong> {booking.orderId}</p>

                {booking.status === "confirmed" && (() => {
                  const now = new Date();
                  const slotStart = new Date(`${booking.date}T${booking.startTime}:00`);
                  const slotEnd = new Date(`${booking.date}T${booking.endTime}:00`);

                  if (now < slotStart) {
                    return (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Cancel Booking
                      </button>
                    );
                  }

                  if (now >= slotStart && now <= slotEnd) {
                    return (
                      <div className="mt-3 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold">
                        Game in progress
                      </div>
                    );
                  }

                  if (now > slotEnd) {
                    return (
                      <div className="mt-3 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                        Game completed
                      </div>
                    );
                  }

                  return null;
                })()}
              </div>
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          <div className="flex justify-center items-center space-x-4 mt-8">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className={`px-4 py-2 rounded-lg ${page === 1
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
              className={`px-4 py-2 rounded-lg ${page === totalPages
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