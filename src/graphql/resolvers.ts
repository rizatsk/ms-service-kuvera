import { QueryTypes } from "sequelize";
import { verifyAuthToken } from "../business/domain/auth/auth-token";
import { sequelize } from "../config/database_pg";

export const resolvers = {
  Query: {
    account: async (_: any, __: any, { req }: { req: any }) => {
      const auth = req.headers.authorization;

      if (!auth || !auth.startsWith("Bearer ")) {
        throw new Error("Unauthorized");
      }

      const token = auth.split(" ")[1];
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
    },
  },
};
