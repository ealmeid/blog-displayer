import {
  Flex,
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Divider,
} from "@chakra-ui/react";
import UserPhoto from "../UserPhoto";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import imageData from "../../utils/imageData";

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

const BlogModal: React.FC<BlogModalProps> = ({
  blog,
  isOpen,
  onOpen,
  onClose,
}) => {
  const { id, title, description, authors, comments, createdAt } = blog;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
      <ModalOverlay />
      <ModalContent borderRadius="lg">
        <ModalCloseButton />
        <Image
          src={imageData[parseInt(id)]}
          alt="Blog Cover Photo"
          h="24"
          borderTopRadius="lg"
          objectFit="cover"
          marginBottom="2"
        />
        <ModalHeader fontSize="28" textAlign="center" pb="0">
          {title}
        </ModalHeader>
        <ModalBody textAlign="center">
          <Text fontSize="14">{dayjs(createdAt).format("MMM DD, YYYY")}</Text>
        </ModalBody>
        <ModalBody textAlign="center">
          <Flex
            direction="column"
            gridGap="2"
            justifyContent="center"
            alignItems="center"
          >
            {authors.map((author) => (
              <Box textAlign="center" key={author.id}>
                <Flex gridGap="2" alignItems="center">
                  <UserPhoto src={author.avatar} w="6" h="6" />
                  <Text>{author.name}</Text>
                </Flex>
              </Box>
            ))}
          </Flex>
        </ModalBody>
        <Divider m="4" />
        <ModalBody>
          {description}
          <Flex alignItems="center" gridGap="2">
            <Divider />
            <Text
              my="4"
              display="flex"
              textAlign="center"
              fontWeight="semibold"
            >
              Comments ({comments.length})
            </Text>
            <Divider />
          </Flex>
          <Comments comments={comments} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

interface BlogModalProps {
  blog: Blog;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default BlogModal;
