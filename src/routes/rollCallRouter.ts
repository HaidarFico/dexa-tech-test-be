import express  from "express";
import { CreateRollCall, UpdateRollCall, ViewLatestRollCallById, ViewManyRollCall, ViewPhotoByPhotoId, ViewRollCallById } from "../controllers/rollCallController";
import {upload} from "../middleware/multer";
import { validateHRFromJWTToken, validateUserFromJWTToken } from "../middleware/jwt";

const rollCallRouter = express.Router()

rollCallRouter.route('/roll-call')
    .post(validateUserFromJWTToken, upload.single('photo'), CreateRollCall)
    .put(validateUserFromJWTToken, UpdateRollCall)
    .get(validateHRFromJWTToken, ViewManyRollCall);

rollCallRouter.get('/roll-call/:rollCallId', validateHRFromJWTToken, ViewRollCallById);

rollCallRouter.get('/roll-call/latest/:userId', validateUserFromJWTToken, ViewLatestRollCallById);

rollCallRouter.get('/roll-call/photo/:photoId', validateHRFromJWTToken, ViewPhotoByPhotoId);

export default rollCallRouter;