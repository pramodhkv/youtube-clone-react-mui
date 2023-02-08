import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../../utils/api";
import Loader from "../Loader";
import Videos from "../Videos";

const SearchFeed = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>();

  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);

    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => {
        setVideos(data.items);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm]);

  if (loading) return <Loader />;

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
