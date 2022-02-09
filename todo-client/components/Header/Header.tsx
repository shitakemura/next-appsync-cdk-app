import { useAuth0 } from "@auth0/auth0-react";
import { Box, Flex, Text } from "@chakra-ui/react";

type HeaderContainerProps = {
  children: React.ReactNode;
};

const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <Flex
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      p={8}
      bg='blue.400'
      color='white'>
      {children}
    </Flex>
  );
};

const MenuLinks = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <Box>
      {isAuthenticated ? (
        <Text
          fontWeight='bold'
          _hover={{ textDecoraration: "underline" }}
          onClick={() =>
            logout({
              returnTo: process.env.NEXT_PUBLIC_AUTH0_REDIERCT_URL ?? "",
            })
          }>
          Logout
        </Text>
      ) : null}
    </Box>
  );
};

export const Header = () => {
  return (
    <HeaderContainer>
      <Text fontSize={24} fontWeight='bold'>
        Todo App
      </Text>
      <MenuLinks />
    </HeaderContainer>
  );
};
