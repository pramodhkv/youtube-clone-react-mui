import React from "react";
import { Stack, Box } from "@mui/material";
import VideoCard from "../VideoCard";
import ChannelCard from "../ChannelCard";

interface IVideosProps {
  videos: any[];
  direction?: "row" | "column";
}
const Videos = (props: IVideosProps) => {
  const { videos, direction } = props;

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="flex-start"
      gap={2}
    >
      {videos.map((video: any, index: number) => (
        <Box key={`video-${index}`}>
          {video.id.videoId && <VideoCard video={video} />}
          {video.id.channelId && <ChannelCard channelDetail={video} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
