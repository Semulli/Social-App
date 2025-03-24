import axios from "axios";

const Api = axios.create({
  baseURL: "https://blog-api-t6u0.onrender.com/posts",
});

export const getPosts = async () => {
  try {
    const response = await Api.get("/");

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (post) => {
  try {
    const response = await Api.post("/", post);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id) => {
  try {
    const response = await Api.delete(`/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
