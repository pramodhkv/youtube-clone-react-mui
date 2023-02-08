import { CheckCircle } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { fetchFromAPI } from "../../utils/api";
import Loader from "../Loader";
import Videos from "../Videos";

const VideoDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [videoDetail, setVideoDetail] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => {
        setVideoDetail(data?.items[0]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => {
        setVideos(data?.items);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!videoDetail?.snippet || loading) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{
              position: "sticky",
              width: "100%",
              top: "86px",
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />

            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              color="#fff"
              px={2}
              py={1}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography variant="subtitle1" color="#fff">
                  {channelTitle}
                  <CheckCircle
                    sx={{
                      color: "gray",
                      fontSize: "1rem",
                      ml: "5px",
                    }}
                  />
                </Typography>
              </Link>

              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" color="#fff" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>

                <Typography variant="body1" color="#fff" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetails;
