import { useAuth0 } from "@auth0/auth0-react";
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
  const { isLoading, loginWithRedirect } = useAuth0();
  const { onClose } = useDisclosure();

  if (isLoading) return null;

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
            <Button onClick={() => loginWithRedirect()}>Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
