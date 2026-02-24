export const generateSlots = (
  openingTime,
  closingTime,
  slotDuration
) => {
  const slots = [];

  const [openHour, openMin] = openingTime.split(":").map(Number);
  const [closeHour, closeMin] = closingTime.split(":").map(Number);

  let start = new Date();
  start.setHours(openHour, openMin, 0);

  const end = new Date();
  end.setHours(closeHour, closeMin, 0);

  while (start < end) {
    const slotStart = new Date(start);
    const slotEnd = new Date(start);
    slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);

    if (slotEnd <= end) {
      slots.push({
        startTime: slotStart.toTimeString().slice(0, 5),
        endTime: slotEnd.toTimeString().slice(0, 5),
      });
    }

    start.setMinutes(start.getMinutes() + slotDuration);
  }

  return slots;
};
