import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export const Login = () => {
  const { onClose } = useDisclosure();

  return (
    <Stack>
      <Modal onClose={onClose} isOpen={true} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome to the Todo App</ModalHeader>
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Please login to continue
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button>Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
