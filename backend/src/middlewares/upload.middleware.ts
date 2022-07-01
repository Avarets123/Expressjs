import * as multer from 'multer';
import { join } from 'path';



const storage = multer.diskStorage({
    destination(req, file, callback): void {

        callback(null, join(__dirname, '../images'))
    },
    filename(req, file: Express.Multer.File, callback) {
        callback(null, new Date() + file.originalname);
    },
});


const types: string[] = ['image/png', 'image/jpg', 'image/jpeg'];


const fileFilter = (req, file: Express.Multer.File, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 10
}



export const upload = multer({
    storage, fileFilter, limits
})