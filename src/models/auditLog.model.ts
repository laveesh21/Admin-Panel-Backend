import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Adjust path as necessary

interface AuditLogAttributes {
  id: string;
  action: string;
  performedBy: string;
  performedAt?: Date;
  targetResource?: string;
}

// Define the optional attributes for creation (excluding `id` which is auto-generated)
interface AuditLogCreationAttributes extends Optional<AuditLogAttributes, 'id' | 'performedAt' | 'targetResource'> { }

// Define the AuditLog model class
class AuditLog extends Model<AuditLogAttributes, AuditLogCreationAttributes> implements AuditLogAttributes {
  public id!: string;
  public action!: string;
  public performedBy!: string;
  public performedAt!: Date;
  public targetResource?: string;
}

// Initialize the AuditLog model
AuditLog.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  performedBy: {
    type: DataTypes.UUID,
    references: {
      model: 'Users', // Ensure 'Users' matches the name of your User model
      key: 'id',
    },
    allowNull: false,
  },
  performedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  targetResource: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'audit_logs',
  timestamps: false, // You might want to disable timestamps if you're manually managing them
});

export default AuditLog;
