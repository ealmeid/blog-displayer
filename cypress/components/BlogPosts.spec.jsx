import * as React from "react";
import { mount } from "@cypress/react";
import BlogPosts from "../../components/organisms/BlogPosts";
import convertBlogDataToHash from "../../utils/helpers";
import dummyBlogData from "../../utils/dummyBlogData";
import { ChakraProvider } from "@chakra-ui/react";

describe("Test different views of BlogPosts component", () => {
  const normalBlogPostData = dummyBlogData;
  const emptyBlogPostData = [];

  it("Shows default text if no Blog Posts exist", () => {
    mount(
      <ChakraProvider>
        <BlogPosts
          posts={[]}
          currentPage={1}
          setCurrentPage={() => {}}
          onPrevPage={() => {}}
          onNextPage={() => {}}
          totalPages={1}
        />
      </ChakraProvider>
    );
    cy.get("p").contains("No blog posts found");
  });

  it("Shows 5 blog posts", () => {
    // let convertedBlogPostData = convertBlogDataToHash(normalBlogPostData, 5);
    mount(
      <ChakraProvider>
        <BlogPosts
          posts={normalBlogPostData.slice(0, 5)}
          currentPage={1}
          setCurrentPage={() => {}}
          onPrevPage={() => {}}
          onNextPage={() => {}}
          totalPages={1}
        />
      </ChakraProvider>
    );
    cy.get('[data_test_id="blog-card"]').should("have.length", 5);
  });
});
