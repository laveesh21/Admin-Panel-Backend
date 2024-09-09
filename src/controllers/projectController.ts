import { Request, Response } from 'express';
import Project from '../models/project.model';

// Create a new project
export const createProject = async (req: Request, res: Response) => {
  const { name, description, createdBy, assignedTo } = req.body;
  try {
    const newProject = await Project.create({ name, description, createdBy, assignedTo });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project' });
  }
};

// Get all projects
export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
};

// Get project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching project' });
  }
};

// Update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      const { name, description } = req.body;
      await project.update({ name, description });
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating project' });
  }
};

// Soft delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await project.update({ deletedAt: new Date() }); // Soft delete
      res.json({ message: 'Project soft-deleted' });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting project' });
  }
};

// export const restoreProject = async (req: Request, res: Response) => {
//   try {
//     const project = await Project.findOne({
//       where: { id: req.params.id, deletedAt: { $ne: null } }
//     });
//     if (project) {
//       await project.update({ deletedAt: null });
//       res.json({ message: 'Project restored' });
//     } else {
//       res.status(404).json({ error: 'Project not found or not deleted' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error restoring project' });
//   }
// };
