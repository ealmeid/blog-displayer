import { Flex, Text } from "@chakra-ui/react";
import UserPhoto from "../../atoms/UserPhoto";

const AuthorsInfo: React.FC<AuthorsInfoProps> = ({ authors }) => {
  const firstAuthor = authors[0];
  const remainingAuthors = authors.slice(1);

  if (authors.length === 0 || authors === null) {
    return <Text>No Authors.</Text>;
  }

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
      <Text fontSize="14" noOfLines={3} flex="1">
        By {firstAuthor.name}
        {remainingAuthors.length !== 0 && (
          <> & {remainingAuthors.length} more authors</>
        )}
      </Text>
    </Flex>
  );
};

interface AuthorsInfoProps {
  authors: Author[];
}

export default AuthorsInfo;
