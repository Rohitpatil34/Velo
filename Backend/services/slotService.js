// services/slotService.js

export const generateSlots = (
  venue,
  selectedDate,
  existingBookings
) => {
  const slots = [];

  const openTime = venue.operatingHours.open;
  const closeTime = venue.operatingHours.close;
  const slotDuration = venue.slotDuration;
  const totalCourts = venue.totalCourts;

  const start = new Date(`${selectedDate}T${openTime}:00`);
  const end = new Date(`${selectedDate}T${closeTime}:00`);

  while (start < end) {
    const slotStart = new Date(start);
    const slotEnd = new Date(
      start.getTime() + slotDuration * 60000
    );

    const courts = [];

    for (let i = 1; i <= totalCourts; i++) {
      const isBooked = existingBookings.some((booking) => {
        if (booking.courtNumber !== i) return false;

        const bookingStart = new Date(
          `${booking.date}T${booking.startTime}:00`
        );
        const bookingEnd = new Date(
          `${booking.date}T${booking.endTime}:00`
        );

        return slotStart < bookingEnd && slotEnd > bookingStart;
      });

      courts.push({
        courtNumber: i,
        isAvailable: !isBooked,
      });
    }

    slots.push({
      startTime: slotStart.toTimeString().slice(0, 5),
      endTime: slotEnd.toTimeString().slice(0, 5),
      courts,
    });

    start.setMinutes(start.getMinutes() + slotDuration);
  }

  return slots;
};