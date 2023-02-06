import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../../utils/api";
import Videos from "../Videos";

const SearchFeed = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>();

  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setVideos(data.items);
    });
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} color="white">
        Showing results for{" "}
        <span style={{ color: "#f31503" }}>{searchTerm}</span>
      </Typography>

      <Videos videos={videos}></Videos>
    </Box>
  );
};

export default SearchFeed;
