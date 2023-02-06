import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Sidebar from "../Sidebar";
import Videos from "../Videos";
import { fetchFromAPI } from "../../utils/api.js";
import { categories } from "../../utils/constants";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].name
  );
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    if (localStorage.getItem("videos")) {
      setVideos(JSON.parse(localStorage.getItem("videos") || ""));
    } else {
      fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
        .then((data) => {
          localStorage.setItem("videos", JSON.stringify(data.items));
          setVideos(data.items);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
    //   localStorage.setItem("videos", JSON.stringify(data.items));
    //   setVideos(data.items);
    // });
  }, [selectedCategory]);

  return (
    <Stack
      sx={{
        flexDirection: {
          sm: "column",
          md: "row",
        },
      }}
    >
      <Box
        sx={{
          height: {
            sm: "auto",
            md: "92vh",
          },
          borderRight: "1px solid #3d3d3d",
          px: {
            sm: 0,
            md: 2,
          },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2023 Pramodh
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} color="white">
          {selectedCategory} <span style={{ color: "#f31503" }}>videos</span>
        </Typography>

        <Videos videos={videos}></Videos>
      </Box>
    </Stack>
  );
};

export default Feed;
