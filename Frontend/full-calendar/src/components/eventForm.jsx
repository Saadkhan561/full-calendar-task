import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

const EventForm = ({ formState, setFormState, events, setEvents }) => {
  const [counter, setCounter] = useState(events?.length+1);

  // FUNC TO STORE EVENTS IN LOCAL STORAGE
  const handleFrontendSubmit = (values) => {
    console.log(counter)
      values.id = counter;
      const updatedEvents = [...events, {...values}]
      localStorage.setItem("events", JSON.stringify(updatedEvents))
      setEvents(updatedEvents)
      setCounter(counter+1)
    }

    // FORKIK INITIALIZATION
  const formik = useFormik({
    initialValues: {
      id: "",
      title: "",
      date: new Date().toISOString().split("T")[0],
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      date: Yup.date().required("Date is required"),
    }),
    onSubmit: handleFrontendSubmit,
  });

  return (
    <>
      <Modal
        open={formState}
        onClose={() => setFormState(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal_div">
          <p className="text-2xl font-semibold">Enter event details</p>
          <FormikProvider className="" value={formik}>
            <Form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-500" htmlFor="title">
                  Enter title
                </label>
                <Field className="input_field" name="title" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-500" htmlFor="title">
                  Enter date
                </label>
                <Field className="input_field" name="date" type="date" />
              </div>
              <div className="text-end">
                <button type="submit" className="button">
                  Submit
                </button>
              </div>
            </Form>
          </FormikProvider>
        </Box>
      </Modal>
    </>
  );
};

export default EventForm;
