import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../../services/eventApi";
import moment from "moment";
import toast from "react-hot-toast";

const EventDetail = () => {
  const { id } = useParams();
  const { data, isError, error } = useGetEventByIdQuery(id);
  const event = data?.data || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [error, isError]);

  useEffect(() => {
    if (data?.success) {
      toast.success(data?.message);
    }
  }, [data]);

  return (
    <div className="container mt-4">
      <button
        className="btn btn-outline-primary mb-4"
        onClick={() => navigate("/")}
      >
        Back
      </button>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="card-title fw-bold mb-4">{event?.title}</div>
          <div className="mb-4">
            <h6 className="text-secondary">Event Dates</h6>
            <p className="mb-0">{`📅 ${moment(event?.startDate).format("DD/MM/YYYY")} - ${moment(event?.endDate).format("DD/MM/YYYY")}`}</p>
          </div>
          <div className="mb-4">
            <h6 className="text-secondary">Description</h6>
            <p className="text-muted">{event?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
