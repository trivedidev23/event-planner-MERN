import React, { useEffect } from "react";
import EventItem from "../../components/event/EventItem";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetAllEventsQuery } from "../../services/eventApi";
const EventList = () => {
  const { data, isError, error } = useGetAllEventsQuery();
  const navigate = useNavigate();

  const events = data?.data || [];

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Events</h3>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-event")}
        >
          Add Event
        </button>
      </div>
      <div className="row g-4">
        {events?.length ? (
          events?.map((event, index) => {
            return (
              <div className="col-md-6 col-lg-4" key={event?._id}>
                <EventItem event={event} />
              </div>
            );
          })
        ) : (
          <div className="text-center">No Events Found</div>
        )}
      </div>
    </div>
  );
};

export default EventList;
