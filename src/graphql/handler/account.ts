import { Request } from "express";
import { verifyAuthToken } from "../../business/domain/auth/auth-token";
import { sequelize } from "../../config/database_pg";
import { QueryTypes } from "sequelize";

async function HandlerAccountGraphQl(req: Request) {
    const auth = req.headers.authorization;

      if (!auth || !auth.startsWith("Bearer ")) {
        throw new Error("Unauthorized");
      }

      const token = auth.split(" ")[1] as string;
      // Verify token JWT
      const data_user = verifyAuthToken(token);

      const [results] = await sequelize.query(
        `SELECT name, email, photo_profile_url, created_dt, updated_dt 
          FROM accounts
          JOIN users ON accounts.id = users.account_id
          WHERE accounts.id = :id`,
        {
          replacements: { id: data_user.account_id },
          type: QueryTypes.SELECT,
        }
      );

      return results;
}

export default HandlerAccountGraphQl;
