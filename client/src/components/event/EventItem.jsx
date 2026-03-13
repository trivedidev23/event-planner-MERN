import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteEventMutation } from "../../services/eventApi";
import toast from "react-hot-toast";
import ConfirmationModal from "../common/modals/ConfirmationModal";

const EventItem = ({ event }) => {
  const [deleteEvent] = useDeleteEventMutation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const data = await deleteEvent(event?._id).unwrap();
      if (data?.success) {
        toast?.success(data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="card shadow-sm border-0 ">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{event?.title}</h5>
        <p className="card-text text-muted text-truncate w-100">
          {event?.description}
        </p>
        <div className="mb-3">
          <small className="text-secondary">{`📅 ${moment(event?.startDate).format("DD/MM/YYYY")} - ${moment(event?.endDate).format("DD/MM/YYYY")}}`}</small>
        </div>
        <div className="d-flex gap-2 justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary btn-sm w-100"
            onClick={() => navigate(`/event-detail/${event?._id}`)}
          >
            View Event
          </button>
          <button
            className="btn btn-outline-primary btn-sm w-100"
            onClick={() => navigate(`/edit-event/${event?._id}`)}
          >
            Edit Event
          </button>
          <button
            className="btn btn-outline-danger btn-sm w-100"
            onClick={() => handleDeleteClick()}
          >
            Delete Event
          </button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Event"
        message="Are you sure you want to delete this event?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default EventItem;
