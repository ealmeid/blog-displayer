import type { NextPage } from "next";
import {
  Flex,
  Text,
  Heading,
  Skeleton,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import getBlogPosts from "../api";
import { useState } from "react";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";

const BlogPosts: React.FC<{
  posts: Blog[];
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  totalPages: number;
}> = ({ posts, currentPage, onPrevPage, onNextPage, totalPages }) => {
  if (posts.length === 0) {
    return <Text>No blog posts found.</Text>;
  }

  return (
    <Flex direction="column" gridGap="8" maxW="80%" margin="auto">
      <Flex wrap="wrap" gridGap="4" justifyContent="center">
        {posts
          .sort(
            (a: Blog, b: Blog) =>
              new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
          )
          .map((blog: Blog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
      </Flex>
      <Flex justifyContent="space-between">
        {currentPage !== 1 && (
          <Button w="auto" mr="auto" onClick={onPrevPage}>
            {" "}
            Prev. Page{" "}
          </Button>
        )}
        {currentPage !== totalPages && (
          <Button w="auto" ml="auto" onClick={onNextPage}>
            Next Page
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const blogPosts = useQuery(
    ["blogs", searchTerm],
    () => getBlogPosts(searchTerm, 5),
    {
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setErrorMessage("An error occured");
        setIsLoading(false);
      },
    }
  );

  return (
    <Box minH="100vh" bg="#f6f7fc">
      <Header />
      <Flex
        flex="1"
        direction="column"
        alignItems="center"
        justifyContent="center"
        gridGap="6"
        padding="4"
        paddingY="8"
      >
        <Heading as="h1" textAlign="center" fontSize="40">
          Blog Displayer
        </Heading>
        <Heading
          as="h4"
          fontSize="18"
          color="blackAlpha.600"
          fontWeight="normal"
          display="flex"
          gridGap="2"
          marginBottom="8"
        >
          Displaying blogs between <Skeleton>Todays Date</Skeleton> and{" "}
          <Skeleton>Todays Date</Skeleton>
        </Heading>
        {/* <InputGroup w={["100%", "60%", "40%"]}>
          <Input
            bg="white"
            placeholder="Search blog by name"
            value={searchTerm}
            onChange={(e) => {
              setIsLoading(true);
              setSearchTerm(e.target.value);
            }}
          />
          <InputRightElement w="18">
            <Button h="full" w="full" onClick={() => {}}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup> */}
        {isLoading ? (
          <Flex direction="column" alignItems="center" gridGap="4">
            <Text color="blackAlpha.600">Retrieving Blog Posts</Text>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        ) : (
          <BlogPosts
            posts={blogPosts.data[currentPage] as Blog[]}
            currentPage={currentPage}
            onNextPage={() => setCurrentPage(currentPage + 1)}
            onPrevPage={() => setCurrentPage(currentPage - 1)}
            totalPages={Object.keys(blogPosts.data).length}
          />
        )}
      </Flex>
    </Box>
  );
};

export default Home;
