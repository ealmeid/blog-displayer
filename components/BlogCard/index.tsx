import { Button, Flex, Text, Image } from "@chakra-ui/react";
import dayjs from "dayjs";
import Card from "../Card";

const AuthorsInfo: React.FC<AuthorsInfoProps> = ({ authors }) => {
  const firstAuthor = authors[0];
  // const remainingAuthors = authors.slice(1);

  return (
    <Flex gridGap="4" alignItems="center">
      <Image
        w="8"
        h="8"
        src={firstAuthor.avatar}
        fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        borderRadius="full"
      />
      <Text fontSize="14" display="flex" gridGap="1">
        <Text>By</Text>
        <Text fontWeight="semibold">{firstAuthor.name}</Text>
      </Text>
      {/* {remainingAuthors !== null && (
          <Text fontSize="12">& {remainingAuthors.length} more authors</Text>
        )} */}
    </Flex>
  );
};

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { id, title, description, createdAt, authors, comments } = blog;

  const numOfComments = comments.length;

  return (
    <Card cursor="pointer" key={id}>
      <Flex direction="column" padding="4">
        <Flex>
          <Text fontSize="12" color="blackAlpha.500">
            {dayjs(createdAt).format("MMMM DD, YYYY")}
          </Text>
        </Flex>
        <Text fontWeight="bold" fontSize="18">
          {title}
        </Text>
        <Text noOfLines={3} fontSize="14" color="blackAlpha.700">
          {description}
        </Text>
        <Flex my="4">
          <AuthorsInfo authors={authors} />
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Button borderRadius="full">Read more</Button>
          <Text
            _hover={{
              textDecoration: "underline",
            }}
          >
            {numOfComments} comments
          </Text>
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
