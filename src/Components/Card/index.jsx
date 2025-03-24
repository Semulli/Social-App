import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import { Favorite, Share, Delete, MoreVert } from "@mui/icons-material";
import { useData } from "../GlobalProvider/GlobalProvider";
import { getPosts, deletePost } from "../../Services/api";

const PostCard = () => {
  const { user, setUser, searchQuery } = useData();
  const [timestamps, setTimestamps] = useState({});
  const [open, setOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [loading, setLoading] = useState(true); 

  const getAllPosts = async () => {
    setLoading(true); 
    try {
      const response = await getPosts();
      setUser(response);

      const timeData = response.reduce((acc, post) => {
        acc[post.id] = Date.now();
        return acc;
      }, {});
      setTimestamps(timeData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamps((prevTimestamps) => ({ ...prevTimestamps }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async () => {
    if (postToDelete) {
      try {
        await deletePost(postToDelete);
        const newPosts = user.filter((post) => post.id !== postToDelete);
        setUser(newPosts);
        setOpen(false);
      } catch (error) {
        console.log("Error deleting post:", error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (id) => {
    setPostToDelete(id);
    setOpen(true);
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return "Just now";
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  };

  const handleLike = (id) => {
    setLikedPosts((prevLikedPosts) => ({
      ...prevLikedPosts,
      [id]: !prevLikedPosts[id],
    }));
  };

  const filteredPosts = user.filter(
    (item) =>
      item.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) &&
      item.id > 100
  );

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      {loading ? (
        <CircularProgress size={50} />
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((item) => (
          <Card
            key={item.id}
            sx={{
              maxWidth: 500,
              padding: 2,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "blue" }}>
                  {item.title?.slice(0, 1)}
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVert />
                </IconButton>
              }
              title={item.title}
              subheader={getTimeAgo(timestamps[item.id])}
            />

            <CardMedia
              component="img"
              image={
                item?.image && item.image.trim() !== ""
                  ? item.image
                  : "https://via.placeholder.com/500x300?text=No+Image+Available"
              }
              alt="Post image"
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "auto",
                borderRadius: "0px",
              }}
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.body}
              </Typography>
            </CardContent>

            <CardActions disableSpacing>
              <IconButton aria-label="like" onClick={() => handleLike(item.id)}>
                <Favorite
                  sx={{
                    color: likedPosts[item.id] ? "red" : "gray",
                  }}
                />
              </IconButton>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleOpen(item.id)}
              >
                <Delete sx={{ color: "red" }} />
              </IconButton>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant="h6" color="text.secondary">
          No posts found for your search. 📭
        </Typography>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this post?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PostCard;
