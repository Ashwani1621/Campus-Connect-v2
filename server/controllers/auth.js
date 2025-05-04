import jwt from 'jsonwebtoken';

// Mock user data
const users = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$X7EfnMPlW5zHPzXCUpc2cOHg8jd.4CgFYY/mYgKteVOdXRFGbMUnS', // password123
    role: 'admin',
    avatar: null,
    createdAt: '2023-01-15T08:30:00.000Z',
    updatedAt: '2023-08-20T14:20:00.000Z'
  },
  {
    _id: '2',
    name: 'Faculty Member',
    email: 'faculty@example.com',
    password: '$2a$10$X7EfnMPlW5zHPzXCUpc2cOHg8jd.4CgFYY/mYgKteVOdXRFGbMUnS', // password123
    role: 'faculty',
    avatar: null,
    createdAt: '2023-02-10T09:45:00.000Z',
    updatedAt: '2023-07-15T11:30:00.000Z'
  },
  {
    _id: '3',
    name: 'Student User',
    email: 'student@example.com',
    password: '$2a$10$X7EfnMPlW5zHPzXCUpc2cOHg8jd.4CgFYY/mYgKteVOdXRFGbMUnS', // password123
    role: 'student',
    avatar: null,
    createdAt: '2023-03-20T10:15:00.000Z',
    updatedAt: '2023-06-25T16:40:00.000Z'
  }
];

// Login user
export const loginUser = (req, res) => {
  const { email, password } = req.body;
  
  // For demo purposes, accept any credentials matching the mock users
  // In a real app, this would validate against bcrypt hashed passwords
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid credentials'
    });
  }
  
  // In a real app, would use bcrypt.compare here
  // For demo, we'll accept 'password123' for any user
  if (password !== 'password123') {
    return res.status(401).json({
      status: 401,
      message: 'Invalid credentials'
    });
  }
  
  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, role: user.role },
    'your_jwt_secret', // In a real app, use process.env.JWT_SECRET
    { expiresIn: '24h' }
  );
  
  // Don't send password in response
  const { password: _, ...userWithoutPassword } = user;
  
  // Set cookie in a real app
  // res.cookie('token', token, {
  //   httpOnly: true,
  //   maxAge: 24 * 60 * 60 * 1000, // 24 hours
  //   secure: process.env.NODE_ENV === 'production'
  // });
  
  res.status(200).json({
    user: userWithoutPassword,
    token
  });
};

// Logout user
export const logoutUser = (req, res) => {
  // In a real app, clear the cookie
  // res.clearCookie('token');
  
  res.status(200).json({
    message: 'Logged out successfully'
  });
};

// Get current user
export const getCurrentUser = (req, res) => {
  // The user should be attached to the request by the auth middleware
  const userId = req.user?.id;
  
  if (!userId) {
    return res.status(401).json({
      status: 401,
      message: 'Not authenticated'
    });
  }
  
  const user = users.find(u => u._id === userId);
  
  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'User not found'
    });
  }
  
  // Don't send password in response
  const { password: _, ...userWithoutPassword } = user;
  
  res.status(200).json(userWithoutPassword);
};