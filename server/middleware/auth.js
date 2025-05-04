import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;
  
  // Get token from header or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Not authenticated. Please log in.'
    });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, 'your_jwt_secret'); // In a real app, use process.env.JWT_SECRET
    
    // Attach user to request
    req.user = {
      id: decoded.id,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid or expired token. Please log in again.'
    });
  }
};

// Restrict access to certain roles
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 403,
        message: 'You do not have permission to perform this action'
      });
    }
    
    next();
  };
};