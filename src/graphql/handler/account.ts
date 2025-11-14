import { Request } from "express";
import { validateSessionAuthTokenGraphQl } from "../../business/domain/auth";
import { getDataAccountGraphQl } from "../../business/repositories/account";

async function HandlerAccountGraphQl(req: Request) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    throw new Error('40104');
  }

  const token = auth.split(" ")[1] as string;
  // Verify token JWT
  const data_user = await validateSessionAuthTokenGraphQl(token);

  return getDataAccountGraphQl(data_user.account_id);
}

export default HandlerAccountGraphQl;
