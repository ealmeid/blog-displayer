import { Flex, Text } from "@chakra-ui/react";
import UserPhoto from "../../atoms/UserPhoto";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

const Comments: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  if (comments.length === 0) return <Text>No Comments Yet.</Text>;

  return (
    <Flex direction="column" gridGap="4" maxH="44" overflowY="auto">
      {comments.map((comment: Comment, index: number) => {
        const { title, description, createdAt } = comment;

        // It's not good to use index as a key, but since this is a simple example
        // and we're not changing the resulting comment list, it's fine in this case.
        return (
          <Flex gridGap="4" key={index}>
            <UserPhoto src="" />
            <Flex direction="column">
              <Text fontWeight="medium">{title}</Text>
              <Text fontSize="16">{description}</Text>
              <Text fontSize="12">{dayjs(createdAt).from(dayjs())}</Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Comments;
