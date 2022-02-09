import { ChatIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, Image } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import dayjs from "dayjs";
import imageData from "../../utils/imageData";
import Card from "../Card";
import UserPhoto from "../UserPhoto";

const AuthorsInfo: React.FC<AuthorsInfoProps> = ({ authors }) => {
  const firstAuthor = authors[0];
  const remainingAuthors = authors.slice(1);

  return (
    <Flex gridGap="4" alignItems="flex-start">
      <Flex w="8" minH="8" position="relative">
        {authors.map((author, index) => (
          <UserPhoto
            key={author.id}
            src={firstAuthor.avatar}
            position="absolute"
            zIndex={authors.length - index}
            left={index * 2}
            boxShadow={
              authors.length !== 1 ? "2px 0px 2px rgba(0, 0, 0, 0.25)" : "none"
            }
          />
        ))}
      </Flex>
      <Text fontSize="14" noOfLines={3}>
        By {firstAuthor.name}
        {remainingAuthors.length !== 0 && (
          <>
            <br />& {remainingAuthors.length} more authors
          </>
        )}
      </Text>
    </Flex>
  );
};

const BlogCard: React.FC<BlogCardProps> = ({ blog, onClick }) => {
  const { id, title, description, createdAt, authors, comments } = blog;

  const numOfComments = comments.length;

  return (
    <Card
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

interface AuthorsInfoProps {
  authors: Author[];
}

interface BlogCardProps {
  blog: Blog;
  onClick: () => void;
}

export default BlogCard;
