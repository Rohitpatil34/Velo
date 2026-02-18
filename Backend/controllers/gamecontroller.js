import Game from "../model/Gamemodel.js"

/* ================= DATE HELPERS ================= */
const startOfDay = (date) => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

const endOfDay = (date) => {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}

/* =========================================================
   GET ALL GAMES (FILTER + GEO + SORT + PAGINATION + HELPERS)
   ========================================================= */
export const getGames = async (req, res) => {
  try {
    const {
      lat,
      lng,
      distance = 10,
      city,
      sport,
      time,
      skill,
      bookingType,
      date,
      from,
      to,
      page = 1,
      limit = 10,
      sortBy = "date",
    } = req.query

    const userId = req.user?.id || null
    const filters = {}

    /* ================= BASIC FILTERS ================= */
    if (city) filters["location.city"] = city
    if (sport) {
      if (Array.isArray(sport)) filters.sport = { $in: sport }
      else filters.sport = sport
    }
    if (time) filters.timeCategory = time
    if (skill) filters.skillLevel = skill
    if (bookingType) filters.bookingType = bookingType

    /* ================= DATE FILTER ================= */
    const today = new Date()

    if (date === "today") {
      filters.date = { $gte: startOfDay(today), $lte: endOfDay(today) }
    } else if (date === "tomorrow") {
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      filters.date = {
        $gte: startOfDay(tomorrow),
        $lte: endOfDay(tomorrow),
      }
    } else if (date) {
      filters.date = {
        $gte: startOfDay(date),
        $lte: endOfDay(date),
      }
    } else if (from && to) {
      filters.date = {
        $gte: startOfDay(from),
        $lte: endOfDay(to),
      }
    } else {
      // default → upcoming games
      filters.date = { $gte: startOfDay(today) }
    }

    const skip = (Number(page) - 1) * Number(limit)
    const pipeline = []

    /* ================= GEO ================= */
    if (lat && lng) {
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
      })
    }

    /* ================= MATCH ================= */
    pipeline.push({ $match: filters })

    /* ================= SORT ================= */
    let sortStage = { date: 1, startTime: 1 }

    if (sortBy === "distance" && lat && lng) sortStage = { distance: 1 }
    else if (sortBy === "price_low") sortStage = { price: 1 }
    else if (sortBy === "price_high") sortStage = { price: -1 }
    else if (sortBy === "slots") sortStage = { availableSlots: -1 }

    pipeline.push({ $sort: sortStage })

    /* ================= PAGINATION ================= */
    pipeline.push({
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: Number(limit) }],
      },
    })

    const result = await Game.aggregate(pipeline)

    const gamesRaw = result[0].data
    const total = result[0].metadata[0]?.total || 0

    /* ================= FRONTEND HELPER FIELDS ================= */
    const games = gamesRaw.map((game) => {
      const isCreator =
        userId && game.createdBy?.toString() === userId

      const isJoined =
        userId &&
        game.participants?.some(
          (p) => p.user.toString() === userId
        )

      const isFull = game.availableSlots <= 0

      const gameStartDateTime = new Date(game.date)
      if (game.startTime) {
        const [h, m] = game.startTime.split(":")
        gameStartDateTime.setHours(h, m, 0, 0)
      }

      const gameStarted = new Date() >= gameStartDateTime

      return {
        ...game,
        isCreator,
        isJoined,
        isFull,
        canJoin: !isCreator && !isJoined && !isFull && !gameStarted,
      }
    })

    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
      count: games.length,
      games,
    })
  } catch (error) {
    console.error("Get Games Error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

/* ================= JOIN GAME ================= */
export const joinGame = async (req, res) => {
  try {
    const gameId = req.params.id
    const userId = req.user.id

    const game = await Game.findById(gameId)
    if (!game) return res.status(404).json({ message: "Game not found" })

    /*  CREATOR */
    if (game.createdBy.toString() === userId) {
      return res.status(400).json({ message: "Creator cannot join own game" })
    }

    /*  GAME STARTED */
    const gameStart = new Date(game.date)
    const [h, m] = game.startTime.split(":")
    gameStart.setHours(h, m, 0, 0)

    if (new Date() >= gameStart) {
      return res.status(400).json({ message: "Game already started" })
    }

    /*  ALREADY JOINED */
    if (game.participants.some(p => p.user.toString() === userId)) {
      return res.status(400).json({ message: "Already joined" })
    }

    /*  FULL */
    if (game.availableSlots <= 0) {
      return res.status(400).json({ message: "Game is full" })
    }

    /*  JOIN */
    game.participants.push({ user: userId })
    game.availableSlots -= 1
    await game.save()

    res.status(200).json({
      message: "Successfully joined the game",
      availableSlots: game.availableSlots,
    })
  } catch (error) {
    console.error("Join Game Error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

/* ================= MY GAMES ================= */
export const getMyGames = async (req, res) => {
  try {
    const userId = req.user.id

    const games = await Game.find({
      "participants.user": userId,
    })
      .sort({ date: 1, startTime: 1 })
      .populate("createdBy", "name email")
      .populate("participants.user", "name email")

    res.status(200).json({
      count: games.length,
      games,
    })
  } catch (error) {
    console.error("Get My Games Error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

/* ================= LEAVE GAME ================= */
export const leaveGame = async (req, res) => {
  try {
    const gameId = req.params.id
    const userId = req.user.id

    const game = await Game.findById(gameId)
    if (!game) return res.status(404).json({ message: "Game not found" })

    /*  CREATOR */
    if (game.createdBy.toString() === userId) {
      return res.status(400).json({ message: "Creator cannot leave game" })
    }

    /*  GAME STARTED */
    const gameStart = new Date(game.date)
    const [h, m] = game.startTime.split(":")
    gameStart.setHours(h, m, 0, 0)

    if (new Date() >= gameStart) {
      return res.status(400).json({ message: "Game already started" })
    }

    const index = game.participants.findIndex(
      (p) => p.user.toString() === userId
    )

    if (index === -1) {
      return res.status(400).json({ message: "Not joined" })
    }

    /*  LEAVE */
    game.participants.splice(index, 1)
    game.availableSlots += 1
    await game.save()

    res.status(200).json({
      message: "Successfully left the game",
      availableSlots: game.availableSlots,
    })
  } catch (error) {
    console.error("Leave Game Error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}
export const getGameById = async (req, res) => {
  try {
    const userId = req.user?.id || null; // ✅ SAFE ACCESS

    const game = await Game.findById(req.params.id)
      .populate("createdBy", "name avatar")
      .populate("participants.user", "name avatar");

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    /* ==== HELPER FIELDS (same logic as getGames) ==== */

    const isCreator =
      userId && game.createdBy?._id?.toString() === userId;

    const isJoined =
      userId &&
      game.participants?.some(
        (p) => p.user?._id?.toString() === userId
      );

    const isFull = game.availableSlots <= 0;

    res.json({
      ...game.toObject(),
      isCreator: !!isCreator,
      isJoined: !!isJoined,
      isFull,
    });

  } catch (error) {
    console.error("Get Game By Id Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


