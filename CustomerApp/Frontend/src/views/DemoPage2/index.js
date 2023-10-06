import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import img1 from "../../assets/vec1.jpeg";
const DemoPage2 = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "80vh" }}
      >
        <Typography variant="h5">Demo page without Navbar Layout</Typography>
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

export default DemoPage2;
