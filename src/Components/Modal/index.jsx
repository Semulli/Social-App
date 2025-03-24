import {
  Box,
  Button,
  Modal,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import React from "react";
import { useData } from "../GlobalProvider/GlobalProvider";
import { createPost } from "../../Services/api";

function CreateModal({ handleClose }) {
  const {
    errors,
    setErrors,
    formData,
    setFormData,
    initialState,
    setUser,
    user,
  } = useData();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name field cannot be left blank";
    if (!formData.image) newErrors.image = "Image field cannot be left blank";
    if (!formData.description)
      newErrors.description = "Description field cannot be left blank";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newPost = {
        id: Date.now(),
        title: formData.name,
        body: formData.description,
        image: formData.image,
      };

      await createPost(newPost);
      setUser([newPost, ...user]);


      setFormData(initialState);
      handleClose();
    }
  };
  console.log(user);

  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Create New Post
          </Typography>
          <Box sx={{ width: 400, margin: "auto", padding: 3 }}>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              Enter your information
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData?.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                sx={{ marginBottom: 2 }}
              />

              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                name="image"
                value={formData?.image}
                onChange={handleChange}
                error={!!errors.image}
                helperText={errors.image}
                sx={{ marginBottom: 2 }}
              />

              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                name="description"
                multiline
                rows={4}
                value={formData?.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                sx={{ marginBottom: 2 }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Create
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>

   
    </>
  );
}

export default CreateModal;
