import { getDataUserGoogle } from "../../../service/google/get-data-account";
import { saveAndGenereateToken } from "../../domain/auth";
import { addAccount, getAccountByEmail } from "../../repositories/account";

async function usecasesAuth(token: string) {
    const dataGoogleUser = await getDataUserGoogle(token);
    const email = dataGoogleUser.email;
    const account = await getAccountByEmail(dataGoogleUser.email);

    // If account is null register user
    let account_id = account?.id;
    if (!account) {
        const resultAddAccount = await addAccount({
            name: dataGoogleUser.name,
            email: dataGoogleUser.email,
            photo_profile: dataGoogleUser.picture
        });

        account_id = resultAddAccount.account_id;
    }

    // Generate and save token
    const { accessToken, refreshToken } = await saveAndGenereateToken(account_id as string, email);

    return {
        accessToken,
        refreshToken,
    }
}

export default usecasesAuth;
