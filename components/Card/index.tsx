import { Box } from "@chakra-ui/react";

const Card: React.FC<any> = ({ children, ...props }) => {
  return (
    <Box
      borderRadius="lg"
      bg="white"
      maxW="300px"
      borderColor="black"
      boxShadow="black"
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
