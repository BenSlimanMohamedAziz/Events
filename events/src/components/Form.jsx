import * as React from 'react';
import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";

import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "./style/forms.css";

import axios from "axios";

import useMediaQuery from "@mui/material/useMediaQuery";


const Form = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = async (values) => {
        try {
          const res = await axios.post(
            "http://localhost:4000/api/Users/addUser",
            values
          );
          if (res.status !== 200) {
            throw error;
          }
          navigate("/home");
        } catch (error) {
          setError(true);
        }
      };
      const handleClose = () => {
        setError(false);
      };
    
      const initialValues = {
        FirstName: "",
        LastName: "",
        email: "",
        Class: "",
      };

  return (
    <Box m="20px" height="100%">
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} className="forms">
          <h2>Participation Form :</h2>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
        
            <TextField className='input'
              type="text"
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              name="FirstName"
       
 
              sx={{ gridColumn: "span 4" }}
            />
            <TextField className='input'
              type="text"
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="LastName"

              sx={{ gridColumn: "span 4" }}
            />

            <TextField className='input'
              type="email"
              label="E-mail"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"

              sx={{ gridColumn: "span 4" }}
            />
              <TextField className='input'
              type="text"
              label="Class"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.class}
              name="class"

              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <br/> 
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Join Now !!
            </Button>
          </Box>
        </form>
      )}
    </Formik>
    <Dialog
      open={error}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"No Service !"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Sorry There is Technical probleme please comeback later !
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  </Box>
  );
};

export default Form;
