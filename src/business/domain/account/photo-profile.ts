import * as fs from 'fs';
import logger from '../../../config/logger';
import { getDataAccountGraphQl } from '../../repositories/account';

export function uploadPhotoProfile(photo_profile: Express.Multer.File): string {
    try {
        const saveFolder = `./public/images/photo_profiles`;
        if (!fs.existsSync(saveFolder)) {
            fs.mkdirSync(saveFolder, { recursive: true });
        }

        const pathFile = `${saveFolder}/${Date.now()}_${photo_profile.originalname}`;

        fs.writeFileSync(`${pathFile}`, photo_profile.buffer);

        return pathFile.replace('./public', '/public');
    } catch (error) {
        logger.error({ message: 'Error save or delete file', error });
        throw error;
    };
};

export async function handlePhotoProfileExisting(account_id: string) {
    try {
        const account = await getDataAccountGraphQl(account_id);

        if (account.photo_profile_url) {
            const existingFilePath = `.${account.photo_profile_url}`;
            if (fs.existsSync(existingFilePath)) {
                fs.unlinkSync(existingFilePath);
            }
        };
    } catch (error) {
        logger.error({ message: 'Error handlePhotoProfileExisting', error });
        throw error;
    }
}