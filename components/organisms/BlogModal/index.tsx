import {
  Flex,
  Box,
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
import UserPhoto from "../../atoms/UserPhoto";
import dayjs from "dayjs";
import imageData from "../../../utils/imageData";
import Comments from "../../molecules/Comments";

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
