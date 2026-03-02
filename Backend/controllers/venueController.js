import Venue from "../model/VenueModel.js";
import Booking from "../model/BookingModel.js";
import { generateSlots } from "../services/slotService.js";


/* =======================================================
   GET VENUES (Location + Sport Filter + Pagination)
======================================================= */
export const getVenues = async (req, res) => {
  try {
    const {
      lat,
      lng,
      distance = 15, // km
      sport,
      page = 1,
      limit = 9,
    } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: "Location required" });
    }

    const skip = (Number(page) - 1) * Number(limit);

    const pipeline = [];

    /* GEO SEARCH */
    pipeline.push({
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [Number(lng), Number(lat)],
        },
        distanceField: "distance",
        maxDistance: Number(distance) * 1000,
        spherical: true,
      },
    });

    /* SPORT FILTER */
    if (sport) {
      pipeline.push({
        $match: {
          sports: sport, // works automatically with array
        },
      });
    }

    /* PAGINATION */
    pipeline.push({
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: Number(limit) }],
      },
    });

    const result = await Venue.aggregate(pipeline);

    const venues = result[0].data;
    const total = result[0].metadata[0]?.total || 0;

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      count: venues.length,
      venues,
    });

  } catch (error) {
    console.error("Get Venues Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =======================================================
   GET SINGLE VENUE DETAILS
======================================================= */
export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json(venue);

  } catch (error) {
    console.error("Get Venue Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// /* =======================================================
//    GET VENUE SLOTS (Auto Generated)
// ======================================================= */
// export const getVenueSlots = async (req, res) => {
//   try {
//     const { venueId, date } = req.query;

//     if (!venueId || !date) {
//       return res.status(400).json({ message: "VenueId and date required" });
//     }

//     const venue = await Venue.findById(venueId);
//     if (!venue) {
//       return res.status(404).json({ message: "Venue not found" });
//     }

//     /* Get bookings for that day */
//     const startOfDay = new Date(date);
//     startOfDay.setHours(0, 0, 0, 0);

//     const endOfDay = new Date(date);
//     endOfDay.setHours(23, 59, 59, 999);

//     const bookings = await Booking.find({
//       venue: venueId,
//       startTime: { $gte: startOfDay, $lte: endOfDay },
//     });

//     /* Generate slots dynamically */
//     const slots = generateSlots(venue, date, bookings);

//     res.status(200).json({ slots });

//   } catch (error) {
//     console.error("Get Slots Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* =======================================================
//    BOOK A SLOT
// ======================================================= */
// export const bookSlot = async (req, res) => {
//   try {
//     const { venueId, startTime, endTime, sport } = req.body;
//     const userId = req.user.id;

//     /* Prevent double booking */
//     const existingBooking = await Booking.findOne({
//       venue: venueId,
//       startTime: new Date(startTime),
//     });

//     if (existingBooking) {
//       return res.status(400).json({ message: "Slot already booked" });
//     }

//     const booking = await Booking.create({
//       venue: venueId,
//       user: userId,
//       sport,
//       startTime: new Date(startTime),
//       endTime: new Date(endTime),
//     });

//     res.status(201).json({
//       message: "Slot booked successfully",
//       booking,
//     });

//   } catch (error) {
//     console.error("Book Slot Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

export const getAvailableSlots = async (req, res) => {
  try {
    const { venueId, date } = req.query;

    if (!venueId || !date) {
      return res.status(400).json({ message: "Venue and date required" });
    }

    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    const bookings = await Booking.find({
      venue: venueId,
      date,
      status: { $in: ["confirmed", "pending"] },
    });

    // 🔥 USE SLOT SERVICE HERE
    const slots = generateSlots(venue, date, bookings);

    res.status(200).json({ slots });

  } catch (error) {
    console.error("Get Slots Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

