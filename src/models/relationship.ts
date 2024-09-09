import User from './user.model';
import Role from './role.model';
import Project from './project.model';
import AuditLog from './auditLog.model';

// Define relationships
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

Project.belongsTo(User, { foreignKey: 'createdBy' });
User.hasMany(Project, { foreignKey: 'createdBy' });

AuditLog.belongsTo(User, { foreignKey: 'performedBy' });
User.hasMany(AuditLog, { foreignKey: 'performedBy' });

export {
  User,
  Role,
  Project,
  AuditLog,
};

