import * as React from "react";
import { mount } from "@cypress/react";
import Pagination from "../../components/molecules/Pagination";
import { ChakraProvider } from "@chakra-ui/react";

describe("Test functionality of pagination component", () => {
  it("Create 3 buttons when total page size is 3", () => {
    mount(
      <ChakraProvider>
        <Pagination
          currentPage={1}
          setCurrentPage={() => {}}
          onPrevPage={() => {}}
          onNextPage={() => {}}
          totalPages={3}
        />
      </ChakraProvider>
    );
    cy.get('[data_test_id="page-button"').should("have.length", 3);
  });

  it("Next button is not visible if current page is equal to the maximum page limit", () => {
    mount(
      <ChakraProvider>
        <Pagination
          currentPage={1}
          setCurrentPage={() => {}}
          onPrevPage={() => {}}
          onNextPage={() => {}}
          totalPages={1}
        />
      </ChakraProvider>
    );
    cy.get("button")
      .contains("Next Page")
      .should("have.css", "visibility", "hidden");
  });

  it("Previous button is not visible if current page is equal to the first page", () => {
    mount(
      <ChakraProvider>
        <Pagination
          currentPage={1}
          setCurrentPage={() => {}}
          onPrevPage={() => {}}
          onNextPage={() => {}}
          totalPages={1}
        />
      </ChakraProvider>
    );
    cy.get("button")
      .contains("Prev. Page")
      .should("have.css", "visibility", "hidden");
  });

  it("No navigation buttons should be visible if there is only one page", () => {
    mount(
      <ChakraProvider>
        <Pagination
          currentPage={1}
          setCurrentPage={() => {}}
          onPrevPage={() => {}}
          onNextPage={() => {}}
          totalPages={1}
        />
      </ChakraProvider>
    );
    cy.get("button")
      .contains("Prev. Page")
      .should("have.css", "visibility", "hidden");

    cy.get("button")
      .contains("Next Page")
      .should("have.css", "visibility", "hidden");
  });
});
