import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Adjust path as necessary

// Define the attributes of the Role model
interface RoleAttributes {
  id: string;
  name: 'Admin' | 'Manager' | 'Employee';
  permissions: string[]; // Assuming permissions are stored as an array of strings
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the optional attributes for creation (excluding `id` which is auto-generated)
interface RoleCreationAttributes extends Optional<RoleAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

// Define the Role model class
class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: string;
  public name!: 'Admin' | 'Manager' | 'Employee';
  public permissions!: string[];
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the Role model
Role.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.ENUM('Admin', 'Manager', 'Employee'),
    allowNull: false,
    unique: true,
  },
  permissions: {
    type: DataTypes.JSON, // Store permissions as JSON array
    defaultValue: [],
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'roles',
  timestamps: true,
});

export default Role;
