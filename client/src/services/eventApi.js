import { baseApi } from "./baseApi";
import { EVENT_SERVICE } from "./endpoint";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: (params) => ({
        url: EVENT_SERVICE.getAllEvents,
        method: "GET",
        params,
      }),
      providesTags: ["Events"],
    }),
    getEventById: builder.query({
      query: (id) => ({
        url: `${EVENT_SERVICE.getEventById}/${id}`,
        method: "GET",
      }),
      providesTags: (result, err, id) => [{ type: "Events", id }],
    }),
    createEvent: builder.mutation({
      query: (data) => ({
        url: EVENT_SERVICE.createEvent,
        method: "POST",
        data,
      }),
      invalidatesTags: ["Events"],
    }),
    updateEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `${EVENT_SERVICE.updateEvent}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `${EVENT_SERVICE.deleteEvent}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
