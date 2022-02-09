import { AppSyncResolverEventHeaders } from "aws-lambda";
import jwt_decode, { JwtPayload } from "jwt-decode";

export const extractJwtSubject = (headers: AppSyncResolverEventHeaders) => {
  const token = headers.authorization ?? "";
  const sub = jwt_decode<JwtPayload>(token).sub ?? "";
  return sub;
};
