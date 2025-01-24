import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, '/uploads');
        cb(null, '/home/haidar-wsl/programmingLinux/dexaTechTestBE/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, crypto.randomUUID());
    }
});

const upload = multer({storage: storage});
export {upload, storage};