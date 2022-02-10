import * as React from "react";
import { mount } from "@cypress/react";
import AuthorsInfo from "../../components/molecules/AuthorsInfo";

describe("Test different views of AuthorsInfo component", () => {
  const emptyAuthorsList = [];

  const oneAuthorList = [
    {
      createdAt: "2021-01-10T14:40:32.683Z",
      name: "John Smith",
      avatar: "https://cdn.fakercloud.com/avatars/ruehldesign_128.jpg",
      updatedAt: "2021-09-17T00:22:12.343Z",
      id: "7",
      postId: "7",
    },
  ];

  const twoAuthorsList = [
    {
      createdAt: "2021-01-10T14:40:32.683Z",
      name: "John Smith",
      avatar: "https://cdn.fakercloud.com/avatars/ruehldesign_128.jpg",
      updatedAt: "2021-09-17T00:22:12.343Z",
      id: "7",
      postId: "7",
    },
    {
      createdAt: "2020-11-09T09:42:25.737Z",
      name: "Gretchen Morar",
      avatar: "https://cdn.fakercloud.com/avatars/pifagor_128.jpg",
      updatedAt: "2021-09-16T21:27:57.850Z",
      id: "20",
      postId: "7",
    },
  ];

  it("Shows default text if no authors are in list", () => {
    mount(<AuthorsInfo authors={emptyAuthorsList} />);
    cy.get("p").contains("No Authors.");
  });

  it("Shows single author", () => {
    // let convertedBlogPostData = convertBlogDataToHash(normalBlogPostData, 5);
    mount(<AuthorsInfo authors={oneAuthorList} />);
    cy.get("p").contains(oneAuthorList[0].name);
  });

  it("Shows two authors", () => {
    // let convertedBlogPostData = convertBlogDataToHash(normalBlogPostData, 5);
    mount(<AuthorsInfo authors={twoAuthorsList} />);
    cy.get("p").contains(
      `By ${twoAuthorsList[0].name} & ${twoAuthorsList.length - 1} more authors`
    );
  });
});
