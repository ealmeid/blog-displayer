import axios, { AxiosResponse } from "axios";

// We're just returning the entire payload with this endpoint
// Normally we'd be able to pass filter/sort/pagination parameters so that we
// can only get portions of the dataset for efficiency purposes
export const getBlogPosts = (searchTerm: string = "", pageSize: number = 5) =>
  axios
    .get("https://6144e843411c860017d256f0.mockapi.io/api/v1/posts")
    .then((res: AxiosResponse<Blog[]>) => {
      let blogPostData: Blog[] = res.data.filter((x) =>
        x.title.includes(searchTerm)
      );

      let blogPostHash: any = {};
      let counter = 1;

      if (blogPostData.length === 0) return { 1: [] };

      for (var i = 0; i < blogPostData.length; i++) {
        if (blogPostHash[counter]) {
          blogPostHash[counter].push(blogPostData[i]);
        } else {
          blogPostHash[counter] = [];
        }

        if (i % pageSize === 0 && i !== 0) counter++;
      }

      return blogPostHash;
    });

// interface BlogPostResponse {}

export default getBlogPosts;
