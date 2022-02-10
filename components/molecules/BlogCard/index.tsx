import { ChatIcon } from "@chakra-ui/icons";
import { Flex, Text, Image } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import dayjs from "dayjs";
import imageData from "../../../utils/imageData";
import Card from "../../atoms/Card";
import AuthorsInfo from "../AuthorsInfo";

const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  const { id, title, description, createdAt, authors, comments } = blog;

  const numOfComments = comments.length;

  return (
    <Card
      data_test_id="blog-card"
      key={id}
      bg={useColorModeValue("white", "#171c28")}
      maxW="300px"
      cursor="pointer"
      transitionProperty="background-color"
      transitionDuration="0.15s"
      onClick={onClick}
      _hover={{
        bg: useColorModeValue("#efefef", "#252d41"),
      }}
      boxShadow="md"
    >
      <Flex direction="column" padding="4">
        <Image
          src={imageData[parseInt(id)]}
          h="20"
          borderRadius="lg"
          objectFit="cover"
          marginBottom="2"
          alt="Blog Cover Photo"
        />
        <Text
          my="2"
          fontSize="12"
          color={useColorModeValue("blackAlpha.500", "gray.500")}
        >
          {dayjs(createdAt).format("MMMM DD, YYYY")}
        </Text>
        <Text fontWeight="bold" fontSize="18">
          {title}
        </Text>
        <Text
          noOfLines={3}
          fontSize="14"
          color={useColorModeValue("blackAlpha.700", "gray.400")}
        >
          {description}
        </Text>
        <Flex
          mt="4"
          alignItems="center"
          gridGap="4"
          justifyContent="space-between"
        >
          <AuthorsInfo authors={authors} />
          <Flex display="flex" alignItems="center" gridGap="2">
            <ChatIcon />
            <Text>{numOfComments}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
}

export default BlogCard;
