import express  from "express";
import { CreateRollCall, UpdateRollCall, ViewLatestRollCallById, ViewManyRollCall, ViewPhotoByPhotoId, ViewRollCallById } from "../controllers/rollCallController";
import {upload} from "../middleware/multer";

const rollCallRouter = express.Router()

rollCallRouter.route('/roll-call')
    .post(upload.single('photo'), CreateRollCall)
    .put(UpdateRollCall)
    .get(ViewManyRollCall);

rollCallRouter.get('/roll-call/:rollCallId', ViewRollCallById);

rollCallRouter.get('/roll-call/latest/:userId', ViewLatestRollCallById);

rollCallRouter.get('/roll-call/photo/:photoId', ViewPhotoByPhotoId);

export default rollCallRouter;