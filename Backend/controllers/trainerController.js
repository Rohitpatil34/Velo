import mongoose from "mongoose";
import Trainer from "../model/TrainerModel.js";

/* ================= GET TRAINERS ================= */
export const getTrainers = async (req, res) => {
  try {
    const {
      lat,
      lng,
      distance = 10,
      sport,
      age,
      batch,
      type,
      page = 1,
      limit = 9,
    } = req.query;

    const userId = req.user?.id || null;

    const filters = {};
    if (sport) filters.services = { $in: sport.split(",") };
    if (age) filters.ageGroups = { $in: age.split(",") };
    if (batch) filters.batchTypes = { $in: batch.split(",") };
    if (type) filters.type = type;

    const skip = (Number(page) - 1) * Number(limit);

    const pipeline = [];

    if (lat && lng) {
      pipeline.push({
        $geoNear: {
          near: { type: "Point", coordinates: [Number(lng), Number(lat)] },
          distanceField: "distance",
          maxDistance: Number(distance) * 1000,
          spherical: true,
        },
      });
    }

    pipeline.push({ $match: filters });

    /* ADD USER QUERY */
    if (userId) {
      pipeline.push({
        $addFields: {
          userQuery: {
            $first: {
              $filter: {
                input: "$contactedUsers",
                as: "c",
                cond: {
                  $eq: ["$$c.user", new mongoose.Types.ObjectId(userId)],
                },
              },
            },
          },
        },
      });
    }

    pipeline.push({
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: Number(limit) }],
      },
    });

    const result = await Trainer.aggregate(pipeline);

    res.status(200).json({
      trainers: result[0].data,
      total: result[0].metadata[0]?.total || 0,
    });

  } catch (error) {
    console.error("Get Trainers Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET SINGLE TRAINER ================= */
export const getTrainerById = async (req, res) => {
  try {
    const trainerId = req.params.id;
    const userId = req.user?.id || null;

    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    let userQuery = null;

    if (userId) {
      userQuery = trainer.contactedUsers.find(
        (c) => c.user?.toString() === userId.toString()
      );
    }

    res.status(200).json({
      ...trainer.toObject(),
      userQuery,   // IMPORTANT
    });

  } catch (error) {
    console.error("Get Trainer Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= CONTACT TRAINER ================= */
export const contactTrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;
    const userId = req.user.id;
    const { message } = req.body;

    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const already = trainer.contactedUsers.find(
      (c) => c.user?.toString() === userId.toString()
    );

    if (already) {
      return res.status(400).json({ message: "Already contacted" });
    }

    trainer.contactedUsers.push({
      user: userId,
      message: message || "Hi, I am interested.",
      createdAt: new Date(),
    });

    trainer.interestCount += 1;

    await trainer.save();

    res.status(200).json({
      message: "Trainer contacted successfully",
      interestCount: trainer.interestCount,
    });

  } catch (error) {
    console.error("Contact Trainer Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET SIMILAR TRAINERS ================= */
export const getSimilarTrainers = async (req, res) => {
  try {
    const trainerId = req.params.id;

    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    const similar = await Trainer.find({
      _id: { $ne: trainerId },
      "location.city": trainer.location.city,
      services: { $in: trainer.services },
    })
      .limit(10)
      .select("name location images interestCount");

    res.json(similar);

  } catch (err) {
    console.error("Similar trainers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
