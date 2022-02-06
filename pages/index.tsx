import type { NextPage } from "next";
import { Flex, Text, Heading, Skeleton } from "@chakra-ui/react";
import { useQuery } from "react-query";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import getBlogPosts from "../api";
import { useState } from "react";
import BlogCard from "../components/BlogCard";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const blogPosts = useQuery("blogs", getBlogPosts, {
    onSuccess: () => setIsLoading(false),
  });

  return (
    <Flex
      minH="100vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg="#f6f7fc"
      gridGap="6"
      padding="4"
    >
      <Heading as="h1" textAlign="center">
        Blog <br /> Displayer
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
      {isLoading ? (
        <Text>Retrieving Blogs</Text>
      ) : (
        <Flex wrap="wrap" gridGap="4" justifyContent="center">
          {blogPosts.data
            .slice(0, 5)
            .sort(
              (a: Blog, b: Blog) =>
                new Date(a.createdAt).valueOf() -
                new Date(b.createdAt).valueOf()
            )
            .map((blog: Blog) => (
              <BlogCard blog={blog} />
            ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Home;
