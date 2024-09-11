import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import { Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

// APIs IMPORTS
import { postEvent } from "@/services/event.service";

const EventForm = ({ formState, setFormState, events, setEvents }) => {

  // STATE FOR HANDELING ID OF EVETNS IN LOCAL STORAGE
  const [counter, setCounter] = useState(events?.length+1);

  // FUNC TO STORE EVENTS IN LOCAL STORAGE
  // const handleFrontendSubmit = (values) => {
  //   console.log(counter)
  //     values.id = counter;
  //     const updatedEvents = [...events, {...values}]
  //     localStorage.setItem("events", JSON.stringify(updatedEvents))
  //     setEvents(updatedEvents)
  //     setCounter(counter+1)
  //   }

  // FUCNTION TO STORE EVENTS IN DATABASE
  const handleSubmit = (values) =>  {
    try {
      postEvent(values)
      setFormState(false)
    } catch(err) {
      console.log(err)
    }
  }

    // FORKIK INITIALIZATION
  const formik = useFormik({
    initialValues: {
      title: "",
      date: new Date().toISOString().split("T")[0],
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title is required"),
      date: Yup.date().required("Date is required"),
    }),
    onSubmit: handleSubmit,
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
                {formik.errors.title && (
                  <p className="text-xs text-red-500">{formik.errors.title}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-gray-500" htmlFor="title">
                  Enter date
                </label>
                <Field className="input_field" name="date" type="date" />
                {formik.errors.date && (
                  <p className="text-xs text-red-500">{formik.errors.date}</p>
                )}
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
