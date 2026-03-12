const router = require("express").Router();
const authMiddleware = require("../middlewares/auth");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");
const { validate, eventSchema } = require("../middlewares/validation");

router.get("/getAllEvents", authMiddleware, getAllEvents);
router.get("/getEvent/:id", authMiddleware, getEventById);
router.post("/addEvent", authMiddleware, validate(eventSchema), createEvent);
router.put(
  "/updateEvent/:id",
  authMiddleware,
  validate(eventSchema),
  updateEvent,
);
router.delete("/deleteEvent/:id", authMiddleware, deleteEvent);

module.exports = router;
