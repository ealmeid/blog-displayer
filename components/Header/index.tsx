import { Flex, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const iconProps: any = {
    color: () => useColorModeValue("black", "white"),
    w: "8",
    h: "8",
    p: "1",
    cursor: "pointer",
    ml: "auto",
    onClick: toggleColorMode,
    borderRadius: "md",
    transitionProperty: "background-color",
    transitionDuration: "0.15s",
    _hover: {
      bg: useColorModeValue("#f6f7fc", "#2d374f"),
    },
  };

  return (
    <Flex
      h="10vh"
      bg={useColorModeValue("white", "#171c28")}
      w="100%"
      alignItems="center"
      paddingX="6"
      paddingY="2"
    >
      {colorMode === "light" ? (
        <SunIcon {...iconProps} />
      ) : (
        <MoonIcon {...iconProps} />
      )}
    </Flex>
  );
};

export default Header;
