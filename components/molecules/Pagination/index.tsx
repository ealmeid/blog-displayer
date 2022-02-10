import { Flex, Button, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

import PageButton from "../../atoms/PageButton";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onNextPage,
  onPrevPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
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
  );
};

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  totalPages: number;
}

export default Pagination;
