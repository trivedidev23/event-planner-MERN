import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "../../services/eventApi";
import { useFormik } from "formik";
import TextInputField from "../../components/common/fields/TextInput";
import Flatpickr from "react-flatpickr";
import * as Yup from "yup";
import "flatpickr/dist/themes/material_green.css";
import Select from "react-select";
import toast from "react-hot-toast";

const recurrenceOptions = [
  { value: "none", label: "No Recurrence" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const EventRegister = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const { data } = useGetEventByIdQuery(id, { skip: !id });
  const event = data?.data || null;
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date must be after start date")
      .required("End date is required"),
    recurrenceType: Yup.object().required("Recurrence type is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: event?.title || "",
      description: event?.description || "",
      startDate: event?.startDate || "",
      endDate: event?.endDate || "",
      recurrenceType: event?.recurrenceType
        ? recurrenceOptions.find((opt) => opt.value === event?.recurrenceType)
        : null,
    },
    validationSchema,
    onSubmit: async (values) => await handleSubmit(values),
  });
  const handleSubmit = async (values) => {
    try {
      const payload = {
        title: values.title,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        recurrenceType: values.recurrenceType?.value,
      };

      let data;

      if (isEditMode) {
        data = await updateEvent({ id, data: payload }).unwrap();
      } else {
        data = await createEvent(payload).unwrap();
      }
      if (data?.success) {
        toast.success(data.message || "Event created successfully");
        navigate("/");
        console.log("navigated");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <div className="card-title text-center mb-3">{`${!isEditMode ? "Create Event" : "Edit Event"}`}</div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <TextInputField
                    label={"Event Title"}
                    name={"title"}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    err={formik.errors.title && formik.touched?.title}
                    errorMessage={formik?.errors?.title}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className={`form-control ${
                      formik.errors.description && formik.touched.description
                        ? "is-invalid"
                        : ""
                    }`}
                    rows="4"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.description && formik.touched.description && (
                    <div className="invalid-feedback">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <Flatpickr
                    className={`form-control ${
                      formik.errors.startDate && formik.touched.startDate
                        ? "is-invalid"
                        : ""
                    }`}
                    options={{
                      enableTime: true,
                      dateFormat: "Y-m-d H:i",
                      minDate: Date.now(),
                    }}
                    value={formik.values?.startDate}
                    onChange={(date) =>
                      formik.setFieldValue("startDate", date?.[0])
                    }
                  />
                  {formik.errors.startDate && formik.touched.startDate && (
                    <div className="invalid-feedback d-block">
                      {formik.errors.startDate}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">End Date</label>

                  <Flatpickr
                    className={`form-control ${
                      formik.errors.endDate && formik.touched.endDate
                        ? "is-invalid"
                        : ""
                    }`}
                    options={{
                      enableTime: true,
                      dateFormat: "Y-m-d H:i",
                    }}
                    value={formik.values.endDate}
                    onChange={(date) =>
                      formik.setFieldValue("endDate", date[0])
                    }
                  />

                  {formik.errors.endDate && formik.touched.endDate && (
                    <div className="invalid-feedback d-block">
                      {formik.errors.endDate}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Recurrence Type</label>
                  <Select
                    options={recurrenceOptions}
                    value={formik.values.recurrenceType}
                    onChange={(value) =>
                      formik.setFieldValue("recurrenceType", value)
                    }
                    onBlur={() =>
                      formik.setFieldTouched("recurrenceType", true)
                    }
                  />

                  {formik.errors.recurrenceType &&
                    formik.touched.recurrenceType && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.recurrenceType}
                      </div>
                    )}
                </div>
                <div className="d-flex gap-3">
                  <button
                    type="submit"
                    className="btn btn-outline-primary mt-3 w-100"
                  >
                    {`${!isEditMode ? "Create Event" : "Edit Event"}`}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="btn btn-outline-secondary mt-3 w-100"
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
