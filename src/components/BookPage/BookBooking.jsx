import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── Icon helpers (inline SVG to avoid extra deps) ──────────────────────────
const SportIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
    <circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const CalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const CourtIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
    <rect x="2" y="3" width="20" height="18" rx="2" /><line x1="12" y1="3" x2="12" y2="21" /><line x1="2" y1="12" x2="22" y2="12" />
  </svg>
);
const MoneyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);
const TrashIcon = () => null;
const XCircleIcon = () => null;
const ChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400 pointer-events-none">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Row wrapper ─────────────────────────────────────────────────────────────
const Row = ({ label, children }) => (
  <div className="grid grid-cols-5 items-center gap-4 py-5 border-b last:border-b-0">
    <span className="col-span-2 text-sm font-medium text-gray-700">{label}</span>
    <div className="col-span-3">{children}</div>
  </div>
);

// ─── Custom select wrapper ────────────────────────────────────────────────────
const SelectWrap = ({ icon, children }) => (
  <div className="relative flex items-center">
    {icon && <span className="absolute left-3 flex items-center">{icon}</span>}
    <div className={`w-full ${icon ? "pl-9" : "pl-3"} pr-8 h-11 border border-gray-200 rounded-lg bg-white flex items-center overflow-hidden`}>
      {children}
    </div>
    <span className="absolute right-3 flex items-center"><ChevronDown /></span>
  </div>
);

const NativeSelect = ({ icon, value, onChange, disabled, children, className = "" }) => (
  <div className="relative flex items-center">
    {icon && <span className="absolute left-3 z-10 pointer-events-none flex items-center">{icon}</span>}
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full appearance-none h-11 border border-gray-200 rounded-lg bg-white font-medium text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-400 ${icon ? "pl-9" : "pl-3"} pr-8 ${className}`}
    >
      {children}
    </select>
    <span className="absolute right-3 pointer-events-none flex items-center"><ChevronDown /></span>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const BookBooking = ({ venue }) => {
  const navigate = useNavigate();
  const [sport, setSport] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(1); // 1 unit = 30 mins
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (venue?.sports?.length > 0) setSport(venue.sports[0]);
  }, [venue]);

  useEffect(() => {
    if (!venue || !date) return;
    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);
        const res = await fetch(`http://localhost:5000/api/venues/slots?venueId=${venue._id}&date=${date}`);
        const data = await res.json();
        setSlots(data.slots || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [date, venue]);

  if (!venue) return null;

  /* ================= PRICE (original logic) ================= */
  const pricePerHour =
    venue.sportPricing?.find((s) => s.sport === sport)?.price ||
    venue.pricePerHour;

  const totalCost = duration * pricePerHour;

  /* ================= END TIME — HH:MM for backend ================= */
  const calculateEndTime = () => {
    if (!startTime) return "";
    const [hour, minute] = startTime.split(":").map(Number);
    const start = new Date();
    start.setHours(hour, minute);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);
    return end.toTimeString().slice(0, 5); // "HH:MM" — same as original
  };

  /* ================= DISPLAY HELPERS (UI only) ================= */
  const formatStartTimeDisplay = (t) => {
    if (!t) return "";
    const [hour, minute] = t.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayH = hour % 12 || 12;
    return `${String(displayH).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${ampm}`;
  };

  const formatEndTimeDisplay = () => {
    const raw = calculateEndTime();
    if (!raw) return "";
    const [hour, minute] = raw.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayH = hour % 12 || 12;
    return `${String(displayH).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${ampm}`;
  };

  const formatDateDisplay = (d) => {
    if (!d) return "";
    const dt = new Date(d + "T00:00:00");
    return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    try {
      setLoadingPayment(true);

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        alert("Razorpay failed to load");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          venueId: venue._id,
          sport,
          date,
          startTime,
          endTime: calculateEndTime(),
          courtNumber: selectedCourt,
        }),
      });

      const data = await response.json();

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: venue.name,
        description: `${sport} Booking`,
        order_id: data.orderId,
        handler: function () {
          alert("Payment successful 🎉");

          const details = {
            venueName: venue.name,
            sport,
            date,
            startTime,
            endTime: calculateEndTime(),
            courtNumber: selectedCourt,
            amount: totalCost,
            status: "Confirmed",
            orderId: data.orderId,
          };

          setBookingDetails(details);
          setIsBooked(true);
        },
        theme: { color: "#16a34a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed");
    } finally {
      setLoadingPayment(false);
    }
  };

  const canProceed = !!(sport && date && startTime);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">

          {/* ── LEFT FORM ── */}
          <div className="w-full md:w-7/12 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-6 pb-4">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">{venue.name}</h1>
              <p className="text-sm text-gray-400 mt-0.5">{venue.city}</p>
              <div className="mt-3 bg-green-500 text-white text-center py-2.5 rounded-xl text-sm font-semibold tracking-wide">
                Make Your Bookings..!
              </div>
            </div>

            <div className="px-6 pb-6">
              {/* Sport */}
              <Row label="Sports">
                <NativeSelect
                  icon={<SportIcon />}
                  value={sport}
                  onChange={(e) => {
                    setSport(e.target.value);
                  }}
                >
                  {venue.sports.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </NativeSelect>
              </Row>

              {/* Date */}
              <Row label="Date">
                <div className="relative flex items-center">
                  <span className="absolute left-3 z-10 pointer-events-none flex items-center"><CalIcon /></span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 border border-gray-200 rounded-lg bg-white text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
                  />
                </div>
              </Row>

              {/* Start Time */}
              <Row label="Start Time">
                <NativeSelect
                  icon={<ClockIcon />}
                  value={startTime}
                  onChange={(e) => {
                    const time = e.target.value;
                    setStartTime(time);

                    const slotObj = slots.find(
                      (s) => s.startTime === time
                    );

                    setSelectedSlot(slotObj || null);
                    setSelectedCourt(""); // reset court
                  }}
                  disabled={!date || loadingSlots}
                >
                  <option value="">
                    {loadingSlots ? "Loading..." : "Select Time"}
                  </option>

                  {slots
                    .filter((s) => s.isAvailable)
                    .map((slot) => (
                      <option key={slot.startTime} value={slot.startTime}>
                        {formatStartTimeDisplay(slot.startTime)}
                      </option>
                    ))}
                </NativeSelect>
              </Row>

              {/* Duration */}
              <Row label="Duration">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => duration > 1 && setDuration(duration - 1)}
                    className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg hover:border-gray-400 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold text-gray-800 min-w-[70px] text-center">
                    {duration * 60} Mins
                  </span>
                  <button
                    onClick={() => setDuration(duration + 1)}
                    className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg hover:bg-green-700 transition-colors shadow-sm"
                  >
                    +
                  </button>
                </div>
              </Row>
              {selectedSlot && (
                <Row label="Court">
                  <div className="flex flex-wrap gap-3">
                    {selectedSlot.courts.map((court) => (
                      <button
                        key={court.courtNumber}
                        disabled={!court.isAvailable}
                        onClick={() => setSelectedCourt(court.courtNumber)}
                        className={`px-4 py-2 rounded-lg border text-sm font-semibold transition ${selectedCourt === court.courtNumber
                          ? "bg-green-600 text-white"
                          : court.isAvailable
                            ? "bg-white border-gray-300 hover:border-green-500"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                      >
                        Court {court.courtNumber}
                      </button>
                    ))}
                  </div>
                </Row>
              )}

            </div>
          </div>

          {/* ── RIGHT CART (desktop) ── */}
          <div className="hidden md:block w-5/12 sticky top-6">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-lg text-gray-900">Cart </h2>
                <button
                  onClick={() => { setDate(""); setStartTime(""); setDuration(1); setSlots([]); }}
                  title="Clear cart"
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>

              <div className="border border-gray-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <SportIcon />
                  <span className="text-sm font-semibold text-gray-600">{sport}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <CalIcon />
                    <span className="text-sm font-semibold text-gray-600">{formatDateDisplay(date) || "—"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ClockIcon />
                    <span className="text-sm font-semibold text-gray-600">
                      {startTime ? `${formatStartTimeDisplay(startTime)} to ${formatEndTimeDisplay()}` : "—"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <MoneyIcon />
                  <span className="text-sm font-semibold text-gray-600">INR {totalCost}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!canProceed || loadingPayment}
                className={`mt-6 w-full py-3.5 rounded-xl font-semibold text-sm transition-all shadow-sm ${canProceed && !loadingPayment
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {loadingPayment ? "Processing..." : `Proceed INR ${totalCost.toFixed(2)}`}
              </button>
              {isBooked && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full py-2 text-sm font-semibold text-green-700 border border-green-600 rounded-lg hover:bg-green-50 transition"
                  >
                    {showDetails ? "Hide Details" : "View Details"}
                  </button>
                  {showDetails && bookingDetails && (
                    <div className="mt-4 p-4 border rounded-xl bg-gray-50 text-sm space-y-2">
                      <p><strong>Venue:</strong> {bookingDetails.venueName}</p>
                      <p><strong>Sport:</strong> {bookingDetails.sport}</p>
                      <p><strong>Date:</strong> {formatDateDisplay(bookingDetails.date)}</p>
                      <p>
                        <strong>Time:</strong>{" "}
                        {formatStartTimeDisplay(bookingDetails.startTime)} -{" "}
                        {formatEndTimeDisplay()}
                      </p>
                      <p><strong>Court:</strong> {bookingDetails.courtNumber}</p>
                      <p><strong>Amount:</strong> INR {bookingDetails.amount}</p>
                      <p><strong>Status:</strong> {bookingDetails.status}</p>
                      <p><strong>Order ID:</strong> {bookingDetails.orderId}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE STICKY BAR ── */}
      <div className="fixed bottom-0 left-0 w-full border-t bg-white md:hidden px-5 py-3.5 flex justify-between items-center shadow-lg z-50">

        {/* LEFT SIDE - VIEW BUTTON */}
        <button
          onClick={() => navigate("/profile/myprofile")}
          className="px-5 py-2.5 rounded-full font-semibold text-sm border border-green-600 text-green-600 hover:bg-green-50 transition"
        >
          View
        </button>

        {/* RIGHT SIDE - PROCEED */}
        <div>
          <p className="text-xs text-gray-400">Total Cost</p>
          <p className="font-bold text-gray-900">INR {totalCost}</p>
        </div>

        <button
          onClick={handlePayment}
          disabled={!canProceed || loadingPayment}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm ${canProceed && !loadingPayment
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          {loadingPayment ? "Processing..." : "Proceed"}
        </button>

      </div>
    </main>
  );
};

export default BookBooking;