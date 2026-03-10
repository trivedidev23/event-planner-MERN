const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");
const { validateEvent } = require("../middlewares/validation");

router.get("/getAllEvents", authMiddleware, getAllEvents);
router.get("/getEvent/:id", authMiddleware, getEventById);
router.post("/addEvent", authMiddleware, validateEvent, createEvent);
router.put("/updateEvent/:id", authMiddleware, validateEvent, updateEvent);
router.delete("/deleteEvent/:id", authMiddleware, deleteEvent);

module.exports = router;
