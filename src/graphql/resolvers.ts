
import { Sequelize } from "sequelize";
import { Account } from "../models/account";
import { User } from "../models/user";
import { verifyAuthToken } from "../business/domain/auth/auth-token";

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

      const resultAccount = await Account.findOne({
        raw: true,
        where: {
          id: data_user.account_id
        },
      });

      return resultAccount;
    },
  },
};
