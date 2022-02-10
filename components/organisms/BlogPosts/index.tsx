import { Flex, Button, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import PageButton from "../../atoms/PageButton";
import BlogCard from "../../molecules/BlogCard";
import BlogModal from "../BlogModal";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const BlogPosts: React.FC<BlogPostsProps> = ({
  posts,
  currentPage,
  onPrevPage,
  onNextPage,
  totalPages,
  setCurrentPage,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);

  if (posts.length === 0) {
    return <Text>No blog posts found.</Text>;
  }

  return (
    <Flex direction="column" gridGap="12" margin="auto" maxW="1000px">
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
                setCurrentBlog(blog);
                onOpen();
              }}
            />
          ))}
      </Flex>
      {currentBlog !== null && (
        <BlogModal
          blog={currentBlog}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      )}
      <Flex
        justifyContent="space-between"
        maxW="700px"
        m="auto"
        gridGap={["2", "8"]}
      >
        <Button
          visibility={currentPage !== 1 ? "visible" : "hidden"}
          gridGap="2"
          w="auto"
          mr="auto"
          onClick={onPrevPage}
        >
          <ArrowBackIcon />
          <Text display={["none", "block"]}>Prev. Page</Text>
        </Button>
        <Flex gridGap={["2", "4"]} flex="1">
          {Array.from(new Array(totalPages)).map((_x, i) => {
            const colors =
              currentPage === i + 1
                ? ["#e0e1e4", "#6e7ca1"]
                : ["#edf2f7", "#3d475d"];

            return (
              <PageButton
                i={i}
                key={i}
                setCurrentPage={setCurrentPage}
                colors={colors}
              />
            );
          })}
        </Flex>
        <Button
          visibility={currentPage !== totalPages ? "visible" : "hidden"}
          gridGap="2"
          w="auto"
          ml="auto"
          onClick={onNextPage}
        >
          <Text display={["none", "block"]}>Next Page</Text>
          <ArrowForwardIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

interface BlogPostsProps {
  posts: Blog[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  totalPages: number;
}

export default BlogPosts;
