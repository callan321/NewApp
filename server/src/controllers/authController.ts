import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import DB from '../../shared/db';
import { asyncHandler } from '../utils/asyncHandler';
import { User } from '../models/userModel';
import { generateToken } from '../utils/generateToken';
import { v4 as uuidv4 } from 'uuid';

const db = DB.getInstance();

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { user_name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();
  const stmt = db.prepare(
    'INSERT INTO users (id, user_name, email, password) VALUES (?, ?, ?, ?)'
  );

  try {
    const result = stmt.run(id, user_name, email, hashedPassword);
    if (result.changes > 0) {
      res.status(201).json({ status: true, message: 'User created successfully' });
    } else {
      res.status(400).json({ status: false, message: 'User creation failed' });
    }
  } catch (err: any) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      const message = err.message || '';
  
      if (message.includes('email')) {
        return res.status(400).json({ status: false, message: 'Email already in use' });
      } else if (message.includes('user_name')) {
        return res.status(400).json({ status: false, message: 'Username already taken' });
      }
  
      return res.status(400).json({ status: false, message: 'User already exists' });
    }
  
    return res.status(500).json({ status: false, message: 'Server error' });
  }
});


export const loginUser = asyncHandler(async (req: Request, res : Response) => {
    const  {  email, password } = req.body;
    // Find user by email
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  const user = stmt.get(email) as User | undefined;

  if (!user) {
    return res.status(401).json({ status: false, message: 'Invalid credentials' });
  }

  // Compare the entered password with stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ status: false, message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = generateToken(user.id);

  return res.status(200).json({
    status: true,
    user: {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
      },
    token,
  });
})

