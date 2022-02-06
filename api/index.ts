import axios from "axios";

// We're just returning the entire payload with this endpoint
// Normally we'd be able to pass filter/sort/pagination parameters so that we
// can only get portions of the dataset for efficiency purposes
export const getBlogPosts = () =>
  axios
    .get("https://6144e843411c860017d256f0.mockapi.io/api/v1/posts")
    .then((res) => res.data);

export default getBlogPosts;
