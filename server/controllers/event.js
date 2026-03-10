const asyncHandler = require("../utils/asyncHandler");
const EventModel = require("../models/Event");

const getAllEvents = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, recurranceType } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);
  let skip = (page - 1) * limit;
  const allowedTypes = ["daily", "weekly", "monthly", "yearly"];
  if (recurranceType && allowedTypes?.includes(recurranceType)) {
    return res.status(400).json({
      message: "Invalid recurranceType.",
      success: false,
    });
  }
  const totalEvents = await EventModel.countDocuments({ recurranceType });
  const events = await EventModel.find({ recurranceType })
    .skip(skip)
    .limit(limit)
    .sort({ startDate: 1 });
  return res.status(200).json({
    data: events,
    pagination: {
      total: totalEvents,
      page,
      limit,
      totalPages: Math.ceil(totalEvents / limit),
    },
    message: "All Events fetched successfully",
    success: true,
  });
});
const getEventById = asyncHandler(async (req, res) => {
  const event = await EventModel.findById(req.params.id);
  if (!event)
    return res.status(404).json({ message: "Event not found", success: false });
  return res.status(200).json({
    data: event,
    message: "Event fetched successfully",
    success: true,
  });
});
const createEvent = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { title, description, startDate, endDate, recurranceType } = req.body;
  const event = await EventModel.findOne({ title });
  if (event)
    return res
      .status(400)
      .json({ message: "Event already exist", success: false });
  let newEvent = new EventModel({
    title,
    description,
    startDate,
    endDate,
    recurranceType,
    createdBy: id,
  });
  await newEvent.save();
  return res.status(201).json({
    message: "Event created successfully",
    data: newEvent,
    success: true,
  });
});
const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { title, description, startDate, endDate, recurranceType } = req.body;
  const event = await EventModel.findById(req.params.id);
  if (!event)
    return res.status(404).json({ message: "Event not found", success: false });

  if (event.createdBy?.toString() !== id)
    return res.status(403).json({
      message: "You are not authorized to update this event",
      success: false,
    });

  const newEvent = await EventModel.findOneAndUpdate(
    req.params.id,
    {
      title,
      description,
      startDate,
      endDate,
      recurranceType,
    },
    { new: true },
  );
  return res
    .status(200)
    .json({ message: "Event updated successfully", success: true });
});
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await EventModel.findByIdAndDelete(req.params.id);
  if (!event)
    return res.status(404).json({ message: "Event not found", success: false });
  return res.status(200).json({
    message: "Event deleted successfully",
    success: true,
  });
});

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
