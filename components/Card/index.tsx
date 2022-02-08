import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

const Card: React.FC<any> = ({ children, ...props }) => {
  return (
    <Box borderRadius="lg" borderColor="black" boxShadow="black" {...props}>
      {children}
    </Box>
  );
};

export default Card;
