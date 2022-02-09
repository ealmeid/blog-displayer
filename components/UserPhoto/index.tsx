import { Image } from "@chakra-ui/react";

const UserPhoto: React.FC<UserPhotoProps> = ({ src, ...props }) => (
  <Image
    src={src}
    fallbackSrc="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    alt="User Photo"
    w="8"
    h="8"
    borderColor="black"
    borderWidth="2px"
    borderRadius="full"
    {...props}
  />
);

interface UserPhotoProps {
  src: string;
  [x: string]: any;
}

export default UserPhoto;
