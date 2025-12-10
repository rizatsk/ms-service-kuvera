import { Request } from "express";
import { validateSessionAuthTokenGraphQl } from "../../business/domain/auth";
import { getDataAccountGraphQl } from "../../business/repositories/account";
import Environment from "../../helper/constan/environment";

async function HandlerAccountGraphQl(req: Request) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    throw new Error('40104');
  }

  const token = auth.split(" ")[1] as string;
  // Verify token JWT
  const data_user = await validateSessionAuthTokenGraphQl(token);

  const account =  await getDataAccountGraphQl(data_user.account_id);

  return {
    ...account,
    photo_profile_url: account.photo_profile_url?.includes('https') ? account.photo_profile_url : `${Environment.BASE_URL}${account.photo_profile_url}`
  }
}

export default HandlerAccountGraphQl;
