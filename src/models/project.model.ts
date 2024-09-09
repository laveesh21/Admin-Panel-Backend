import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Adjust path as necessary

// Define the attributes of the Project model
interface ProjectAttributes {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  assignedTo: string[]; // Assuming assignedTo is an array of user IDs
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the optional attributes for creation (excluding `id` which is auto-generated)
interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'description' | 'deletedAt' | 'createdAt' | 'updatedAt'> { }

// Define the Project model class
class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: string;
  public name!: string;
  public description?: string;
  public createdBy!: string;
  public assignedTo!: string[];
  public deletedAt?: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the Project model
Project.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.UUID,
    references: {
      model: 'Users', // Ensure 'Users' matches the name of your User model
      key: 'id',
    },
    allowNull: false,
  },
  assignedTo: {
    type: DataTypes.JSON, // Store assigned user IDs as JSON array
    defaultValue: [],
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
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
  tableName: 'projects',
  timestamps: true,
  paranoid: true, // Enable soft delete (set `deletedAt` to null for restore)
});

export default Project;
