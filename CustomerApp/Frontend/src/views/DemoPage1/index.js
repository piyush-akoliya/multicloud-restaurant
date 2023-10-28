import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";

import img1 from "../../assets/vec2.jpeg";
import Login from "../../auth/login";
import Signup from "../../auth/signup";
const DemoPage1 = () => {

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "65vh" }}
      >
        <Typography variant="h5">Demo page with Navbar Layout</Typography>
        <img
          src={img1}
          alt="Your Description"
          style={{ textAlign: "center" }}
          width={400}
        />

      </Grid>
    </>
  );
};

export default DemoPage1;