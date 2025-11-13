import { Request } from "express";
import { QueryTypes } from "sequelize";
import { verifyAuthToken, verifyAuthTokenGraphQl } from "../../business/domain/auth/auth-token";
import { sequelize } from "../../config/database_pg";

async function HandlerCategorySpendGraphQl(req: Request) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    throw new Error('40104');
  }

  const token = auth.split(" ")[1] as string;
  // Verify token JWT
  const data_user = verifyAuthTokenGraphQl(token);

  const results = await sequelize.query(
    `SELECT id, name
          FROM categories_spend
          WHERE account_id IN('all', :id)`,
    {
      replacements: { id: data_user.account_id },
      type: QueryTypes.SELECT,
    }
  );

  return results;
}

export default HandlerCategorySpendGraphQl;
