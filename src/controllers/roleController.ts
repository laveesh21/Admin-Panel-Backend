import { Request, Response } from 'express';
import User from '../models/user.model';

// Assign role to user
export const assignRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { roleId } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update({ roleId });
      res.json({ message: 'Role assigned successfully', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error assigning role' });
  }
};

// Revoke role from user
export const revokeRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update({ roleId: null });
      res.json({ message: 'Role revoked successfully', user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error revoking role' });
  }
};
