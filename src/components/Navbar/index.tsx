import React from "react";
import { Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../../utils/constants";
import SearchBar from "../SearchBar";

const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
      }}
    >
      <Link to="/" className="Navbar__logo">
        <img src={logo} alt="logo" height={45} />
      </Link>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <SearchBar />
      </Stack>
    </Stack>
  );
};

export default Navbar;
