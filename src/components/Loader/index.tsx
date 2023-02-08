import React from "react";
import { Stack } from "@mui/material";
import { GridLoader } from "react-spinners";

const Loader = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "95vh",
      }}
    >
      <GridLoader color="#f31503" size={30} />
    </Stack>
  );
};

export default Loader;
