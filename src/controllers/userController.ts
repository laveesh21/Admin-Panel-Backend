
// controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/user.model';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { username, email, password, roleId } = req.body;
  try {
    const newUser = await User.create({ username, email, password, roleId });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      const { username, email, password, roleId } = req.body;
      await user.update({ username, email, password, roleId });
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Soft delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update({ deletedAt: new Date() }); // Soft delete
      res.json({ message: 'User soft-deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

// export const restoreUser = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findByPk(req.params.id, { where: { deletedAt: { $ne: null } } });
//     if (user) {
//       await user.update({ deletedAt: null });
//       res.json({ message: 'User restored' });
//     } else {
//       res.status(404).json({ error: 'User not found or not deleted' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error restoring user' });
//   }
// };
