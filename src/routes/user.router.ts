import express from 'express';
// import { createUser, getUsers, getUserById, updateUser, deleteUser, restoreUser } from '../controllers/userController';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

// Create User
router.post('/users', createUser);

// Get All Users
router.get('/users', getUsers);

// Get User by ID
router.get('/users/:id', getUserById);

// Update User
router.put('/users/:id', updateUser);

// Soft Delete User
router.delete('/users/:id', deleteUser);

// Restore Soft Deleted User
// router.patch('/users/restore/:id', restoreUser);

export default router;
