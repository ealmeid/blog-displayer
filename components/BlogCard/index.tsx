import { ChatIcon } from "@chakra-ui/icons";
import { Button, Flex, Text, Image } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import dayjs from "dayjs";
import Card from "../Card";

const AuthorsInfo: React.FC<AuthorsInfoProps> = ({ authors }) => {
  const firstAuthor = authors[0];
  const remainingAuthors = authors.slice(1);

  return (
    <Flex gridGap="4" alignItems="flex-start">
      <Flex w="8" position="relative">
        {authors.map((author, index) => (
          <Image
            src={firstAuthor.avatar}
            fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            zIndex={authors.length - index}
            left={index}
            borderColor="black"
            borderWidth="2px"
            position="absolute"
            borderRadius="full"
            boxShadow={index > 0 ? "lg" : "none"}
            w="8"
            h="8"
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

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
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
      _hover={{
        bg: useColorModeValue("#e6e6e6", "#252d41"),
      }}
    >
      <Flex direction="column" padding="4">
        <Image
          borderRadius="lg"
          h="20"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YWJzdHJhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
          marginBottom="2"
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
}

export default BlogCard;
