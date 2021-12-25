import express from 'express';
import { authPass } from '../middleware/authMiddleware.js';
import {
  createProject,
  projectTeam,
  deleteProject,
  editProject,
  getProject,
} from '../controllers/project.js';

const router = express.Router();

router
  .route('/')
  .post(authPass, createProject)
  .patch(authPass, projectTeam)
  .delete(authPass, deleteProject);

router.route(':/id').get(authPass, getProject).patch(authPass, editProject);

export default router;
