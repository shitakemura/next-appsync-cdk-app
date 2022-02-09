import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getAccessToken = async () => {
      setIsLoading(true);
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.NEXT_PUBLIC_AUTH0_AUTHORIZER_IDENTIFIER,
          scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
        });
        setAccessToken(accessToken);
      } catch (e: any) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAccessToken();
  }, [getAccessTokenSilently, user?.sub]);

  return { accessToken, isLoading };
};
