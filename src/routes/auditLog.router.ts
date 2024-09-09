import express from 'express';
import { getAuditLogs } from '../controllers/auditLogController';

const router = express.Router();

// Get Audit Logs
router.get('/audit-logs', getAuditLogs);

export default router;

