import { getDataUserGoogle } from "../../../service/google/get-data-account";
import { addAccount, getAccountByEmail } from "../../domain/account";

async function usecasesAuth(token: string) {
    const dataGoogleUser = await getDataUserGoogle(token);
    const account = await getAccountByEmail(dataGoogleUser.email);

    // If account is null register user
    if (!account) {
        const { account_id, email } = await addAccount({
            name: dataGoogleUser.name,
            email: dataGoogleUser.email,
            photo_profile: dataGoogleUser.picture
        });

        // Save session auth
    }
}

export default usecasesAuth;
