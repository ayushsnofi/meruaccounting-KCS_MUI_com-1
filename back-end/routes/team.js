import express from "express";
import { authPass } from "../middleware/authMiddleware.js";
import { managerPass, adminPass } from "../middleware/roleMiddleware.js";

import {
  createTeam,
  updateMember,
  removeMember,
  getTeamById,
  getTeam,
  deleteTeam,
  getTeamMemberData,
} from "../controllers/team.js";
import { makePause } from "../controllers/pause.js";

const router = express.Router();

router.route("/create").post(authPass, createTeam);

router.route("/updateMember").patch(authPass, updateMember);

router.route("/removeMember").delete(authPass, removeMember);

router.route("/getTeam").get(authPass, getTeam);

router.route("/:id").delete(authPass, deleteTeam);

router.route("/pause").patch(authPass, makePause);

router.route("/getTeam/:id").get(authPass, getTeamById);

router.route("/getTeamData").post(authPass, getTeamMemberData);
export default router;
