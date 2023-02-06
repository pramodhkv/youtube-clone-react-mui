import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../../utils/api";
import ChannelCard from "../ChannelCard";
import Videos from "../Videos";

const ChannelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [channelDetail, setChannelDetail] = useState<any>();
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    if (localStorage.getItem(`channelDetail-${id}`)) {
      setChannelDetail(
        JSON.parse(localStorage.getItem(`channelDetail-${id}`) || "")
      );
    } else {
      fetchFromAPI(`channels?part=snippet&id=${id}`)
        .then((data) => {
          localStorage.setItem(
            `channelDetail-${id}`,
            JSON.stringify(data?.items[0])
          );
          setChannelDetail(data?.items[0]);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (localStorage.getItem(`videos-${id}`)) {
      setVideos(JSON.parse(localStorage.getItem(`videos-${id}`) || ""));
    } else {
      fetchFromAPI(`search?part=snippet&channelId=${id}&order=date`)
        .then((data) => {
          localStorage.setItem(`videos-${id}`, JSON.stringify(data?.items));
          setVideos(data?.items);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>

      <Box display="flex" p={2}>
        <Box
          sx={{
            mr: { sm: "100px" },
          }}
        />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetails;
