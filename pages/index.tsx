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
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import getBlogPosts from "../api";
import { useState } from "react";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import BlogModal from "../components/BlogModal";

const BlogPosts: React.FC<{
  posts: Blog[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  totalPages: number;
}> = ({
  posts,
  currentPage,
  onPrevPage,
  onNextPage,
  totalPages,
  setCurrentPage,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (posts.length === 0) {
    return <Text>No blog posts found.</Text>;
  }

  const [currentBlog, setCurrentBlog] = useState<Blog>(posts[0]);

  return (
    <Flex direction="column" gridGap="8" margin="auto">
      <Flex wrap="wrap" gridGap="4" justifyContent="center">
        {posts
          .sort(
            (a: Blog, b: Blog) =>
              new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
          )
          .map((blog: Blog, index: number) => (
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
      <BlogModal
        blog={currentBlog}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
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
        <Flex gridGap="4" maxW="100%" overflowX="auto">
          {Array.from(new Array(totalPages)).map((_x, i) => (
            <Text
              onClick={() => setCurrentPage(i + 1)}
              color={useColorModeValue("black", "white")}
              cursor="pointer"
              p="2"
              px="4"
              borderRadius="lg"
              _hover={{ bg: useColorModeValue("#eef2f7", "#3f475d") }}
            >
              {i + 1}
            </Text>
          ))}
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
    <Box
      minH="100vh"
      bg={useColorModeValue("#f6f7fc", "#2d374f")}
      transitionProperty="background-color"
      transitionDuration="0.15s"
    >
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
          📑 Blog Displayer
        </Heading>
        <Heading
          as="h4"
          fontSize="18"
          textAlign="center"
          color={useColorModeValue("blackAlpha.600", "gray.400")}
          fontWeight="normal"
          display="flex"
          gridGap="2"
          marginBottom="8"
        >
          Displaying randomly generated lorem ipsum blogs. All day, every day.
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
            setCurrentPage={setCurrentPage}
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
