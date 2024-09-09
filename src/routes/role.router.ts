import express from 'express';
import { assignRole, revokeRole } from '../controllers/roleController';

const router = express.Router();

// Assign Role to User
router.post('/users/:id/assign-role', assignRole);

// Revoke Role from User
router.post('/users/:id/revoke-role', revokeRole);

export default router;

