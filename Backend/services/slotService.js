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

    /* Count how many courts are booked for this slot */
    let bookedCourts = 0;

    existingBookings.forEach((booking) => {
      const bookingStart = new Date(
        `${selectedDate}T${booking.startTime}:00`
      );
      const bookingEnd = new Date(
        `${selectedDate}T${booking.endTime}:00`
      );

      const overlap =
        slotStart < bookingEnd &&
        slotEnd > bookingStart;

      if (overlap) {
        bookedCourts++;
      }
    });

    slots.push({
      startTime: slotStart.toTimeString().slice(0, 5),
      endTime: slotEnd.toTimeString().slice(0, 5),
      availableCourts: totalCourts - bookedCourts,
      isAvailable: bookedCourts < totalCourts,
    });

    start.setMinutes(start.getMinutes() + slotDuration);
  }

  return slots;
};
