import express  from "express";
import { CreateRollCall, UpdateRollCall, ViewRollCallById } from "../controllers/rollCallController";

const rollCallRouter = express.Router()

rollCallRouter.route('/roll-call')
    // .get(ViewRollCallById)
    .post(CreateRollCall)
    .put(UpdateRollCall);

rollCallRouter.get('/roll-call/:rollCallId', ViewRollCallById);

export default rollCallRouter;