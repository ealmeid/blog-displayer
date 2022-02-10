import { Box } from "@chakra-ui/react";

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <Box borderRadius="lg" borderColor="black" boxShadow="black" {...props}>
      {children}
    </Box>
  );
};

interface CardProps {
  children: React.ReactNode;
  [x: string]: any;
}

export default Card;
