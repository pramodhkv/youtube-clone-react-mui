import { CheckCircle } from "@mui/icons-material";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../../utils/constants";

interface IChannelCardProps {
  channelDetail: any;
  marginTop?: string;
}

const ChannelCard = (props: IChannelCardProps) => {
  const { channelDetail, marginTop } = props;

  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "356px", md: "320px" },
        height: "326px",
        margin: "auto",
        marginTop,
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
            height: "100%",
          }}
        >
          <CardMedia
            image={
              channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: "1px solid #e3e3e3",
            }}
          />

          <Typography variant="h6" fontWeight="bold">
            {channelDetail?.snippet?.title}
            <CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px" }} />
          </Typography>

          {channelDetail?.statistics?.subscriberCount && (
            <Typography variant="subtitle1" fontWeight="bold">
              {parseInt(
                channelDetail?.statistics?.subscriberCount
              ).toLocaleString()}{" "}
              subscribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
