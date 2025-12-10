import Environment from "../../../helper/constan/environment";
import { handlePhotoProfileExisting, uploadPhotoProfile } from "../../domain/account/photo-profile";
import { updateUserByAccountId } from "../../repositories/account";
import { UsecaseUpdateUserByAccountIdParam } from "./type";

const usecaseUpdateUserByAccountId = async ({
    account_id,
    name = null,
    photo_profile
}: UsecaseUpdateUserByAccountIdParam) => {
    let photo_profile_url: string | null = null;
    if (photo_profile) {
        // delete existing photo profile if any
        await handlePhotoProfileExisting(account_id);

        // upload new photo profile
        photo_profile_url = uploadPhotoProfile(photo_profile);
    }

    await updateUserByAccountId({
        account_id,
        name,
        photo_profile_url: photo_profile_url
    });

    return {
        update_name: name,
        photo_profile_url: `${Environment.BASE_URL}${photo_profile_url}`
    }
};

export default usecaseUpdateUserByAccountId;
