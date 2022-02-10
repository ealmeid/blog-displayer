import { Flex, Button, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import BlogCard from "../../molecules/BlogCard";

const BlogPosts: React.FC<BlogPostsProps> = ({ posts, onBlogPostClick }) => {
  if (posts.length === 0) {
    return <Text>No blog posts found.</Text>;
  }

  return (
    <Flex wrap="wrap" gridGap="4" justifyContent="center">
      {posts
        .sort(
          (a: Blog, b: Blog) =>
            new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
        )
        .map((blog: Blog) => (
          <BlogCard
            blog={blog}
            key={blog.id}
            onClick={() => {
              onBlogPostClick(blog);
            }}
          />
        ))}
    </Flex>
  );
};

interface BlogPostsProps {
  posts: Blog[];
  onBlogPostClick: (blog: Blog) => void;
}

export default BlogPosts;
