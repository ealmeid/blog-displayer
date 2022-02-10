import { Button, useColorModeValue } from "@chakra-ui/react";

const PageButton: React.FC<PageButtonProps> = ({
  i,
  setCurrentPage,
  colors,
  ...props
}) => (
  <Button
    onClick={() => setCurrentPage(i + 1)}
    color={useColorModeValue("black", "white")}
    cursor="pointer"
    bg={useColorModeValue(colors[0], colors[1])}
    {...props}
  >
    {i + 1}
  </Button>
);

interface PageButtonProps {
  i: number;
  setCurrentPage: any;
  colors: string[];
  data_test_id: string;
}

export default PageButton;
