const convertBlogDataToHash = (
  blogPosts: Blog[],
  pageSize: number
): BlogPostResponse => {
  let blogPostHash: any = {};
  let counter = 1;

  if (blogPosts.length === 0) return { 1: [] };

  for (var i = 0; i < blogPosts.length; i++) {
    if (blogPostHash[counter]) {
      blogPostHash[counter].push(blogPosts[i]);
    } else {
      blogPostHash[counter] = [blogPosts[i]];
    }

    if ((i + 1) % pageSize === 0 && i !== 0) counter++;
  }

  return blogPostHash;
};

export default convertBlogDataToHash;
