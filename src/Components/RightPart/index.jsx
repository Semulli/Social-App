import React from "react";
import {
  Avatar,
  Badge,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { useData } from "../GlobalProvider/GlobalProvider";

const SocialPanel = () => {
  const { user } = useData();

  const onlineFriends = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
  ];

  const latestPhotos = user
    .filter((item) => item.id > 100)
    .map((item) => item.image);

  const latestConversations = [
    { name: "Ali Connors", message: "Brunch this weekend?" },
    { name: "Scott", message: "Summer BBQ plan?" },
  ];

  return (
    <Card sx={{ width: 350, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Online Friends
      </Typography>
      <Grid container spacing={1} alignItems="center">
        {onlineFriends.slice(0, 5).map((src, index) => (
          <Grid item key={index}>
            <Avatar src={src} />
          </Grid>
        ))}
        {onlineFriends.length > 5 && (
          <Grid item>
            <Avatar sx={{ bgcolor: "gray" }}>
              +{onlineFriends.length - 5}
            </Avatar>
          </Grid>
        )}
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Latest Photos
      </Typography>
      <Grid container spacing={1}>
        {latestPhotos.map((src, index) => (
          <Grid item xs={6} key={index}>
            <img
              src={src}
              alt="photo"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Latest Conversations
      </Typography>
      {latestConversations.map((conv, index) => (
        <Card key={index} sx={{ mb: 1, p: 1 }}>
          <CardContent>
            <Typography variant="body1" fontWeight="bold">
              {conv.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {conv.message}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Card>
  );
};

export default SocialPanel;
