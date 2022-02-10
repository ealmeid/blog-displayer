import type { NextPage } from "next";
import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  Spinner,
  Box,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import getBlogPosts from "../api";
import { useState } from "react";
import Header from "../components/molecules/Header";
import BlogPosts from "../components/organisms/BlogPosts";
import BlogModal from "../components/organisms/BlogModal";
import Pagination from "../components/molecules/Pagination";

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const blogPostsQuery = useQuery(
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
      <Head>
        <title>Blog Displayer | Home</title>
        <meta property="og:title" content="Blog Displayer | Home" key="title" />
      </Head>
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
        {isLoading || !blogPostsQuery.data ? (
          <Flex direction="column" alignItems="center" gridGap="4">
            <Text color="blackAlpha.600">Retrieving Blog Posts...</Text>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        ) : (
          <>
            <Flex direction="column" gridGap="12" margin="auto" maxW="1000px">
              {currentBlog !== null && (
                <BlogModal
                  blog={currentBlog}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                />
              )}
              <BlogPosts
                posts={blogPostsQuery.data[currentPage] as Blog[]}
                onBlogPostClick={(blog: Blog) => {
                  setCurrentBlog(blog);
                  onOpen();
                }}
              />
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onNextPage={() => setCurrentPage(currentPage + 1)}
                onPrevPage={() => setCurrentPage(currentPage - 1)}
                totalPages={Object.keys(blogPostsQuery.data).length}
              />
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Home;
