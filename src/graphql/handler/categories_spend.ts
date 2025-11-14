import { Request } from "express";
import { validateSessionAuthTokenGraphQl } from "../../business/domain/auth";
import { getCategorySpendByAccountId, getCategorySpendByAccountIdAndStatus } from "../../business/repositories/category_spend";

async function HandlerCategorySpendGraphQl(req: Request, status?: Boolean) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    throw new Error('40104');
  }

  const token = auth.split(" ")[1] as string;
  // Verify token JWT
  const data_user = await validateSessionAuthTokenGraphQl(token);

  if (typeof status === 'boolean') {
    const results = await getCategorySpendByAccountIdAndStatus(data_user.account_id, status);
    return results;
  } else {
    const result = await getCategorySpendByAccountId(data_user.account_id);
    return result;
  }

}

export default HandlerCategorySpendGraphQl;
