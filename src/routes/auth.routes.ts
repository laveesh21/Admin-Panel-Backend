import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import Role from '../models/role.model';
import { DataTypes } from 'sequelize';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';
const saltRounds = 10;

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const role = await Role.findOne({ where: { name: 'Employee' } });

    const newUser = await User.create({
      id: DataTypes.UUIDV4,
      username,
      email,
      password: hashedPassword,
      roleId: role?.id,
    });

    const token = jwt.sign({ id: newUser.id, role: newUser.roleId }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({ token, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



// User login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, role: user.roleId }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;
