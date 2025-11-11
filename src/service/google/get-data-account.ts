import axios from "axios";
import Environment from "../../helper/constan/environment";
import logger from "../../config/logger";

type getDataUserGoogleResponse = {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string; // url
    email: string;
    email_verified: boolean;
};

export async function getDataUserGoogle(
    token: string,
): Promise<getDataUserGoogleResponse> {
    const response = await axios({
        method: 'GET',
        url: Environment.URL_AUTH_GOOGLE,
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });

    const responseData = response.data;
    logger.debug({message: 'Response data auth google', data: responseData})
    return responseData;
}