import { Request, Response } from 'express';
import AuditLog from '../models/auditLog.model';

// Get all audit logs
export const getAuditLogs = async (_req: Request, res: Response) => {
  try {
    const logs = await AuditLog.findAll();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching audit logs' });
  }
};
