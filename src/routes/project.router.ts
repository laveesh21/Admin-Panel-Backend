
import express from 'express';
// import { createProject, getProjects, getProjectById, updateProject, deleteProject, restoreProject } from '../controllers/projectController';
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from '../controllers/projectController';

const router = express.Router();

// Create Project
router.post('/project', createProject);

// Get All Projects
router.get('/project', getProjects);

// Get Project by ID
router.get('/project/:id', getProjectById);

// Update Project
router.put('/project/:id', updateProject);

// Soft Delete Project
router.delete('/project/:id', deleteProject);

// Restore Soft Deleted Project
// router.patch('/project/restore/:id', restoreProject);

export default router;
