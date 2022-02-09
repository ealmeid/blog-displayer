import axios, { AxiosResponse } from "axios";
import convertBlogDataToHash from "../utils/helpers";

// We're just returning the entire payload with this endpoint
// Normally we'd be able to pass filter/sort/pagination parameters so that we
// can only get portions of the dataset for efficiency purposes
export const getBlogPosts = (
  searchTerm: string = "",
  pageSize: number = 5
): Promise<BlogPostResponse> =>
  axios
    .get("https://6144e843411c860017d256f0.mockapi.io/api/v1/posts")
    .then((res: AxiosResponse<Blog[]>) => {
      let blogPostData: Blog[] = res.data.filter((x) =>
        x.title.includes(searchTerm)
      );

      let blogHash = convertBlogDataToHash(blogPostData, pageSize);
      return blogHash;
    });

export default getBlogPosts;
