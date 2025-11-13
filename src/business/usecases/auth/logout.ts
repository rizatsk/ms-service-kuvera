import { decyptCredentials } from "../../domain/auth/credential";
import { deleteSessionAuthById } from "../../repositories/session_auth";

async function usecaseLogout(token: string) {
    const decyptToken = decyptCredentials(token);

    // Delete auth
    await deleteSessionAuthById(decyptToken.id)
}

export default usecaseLogout;
