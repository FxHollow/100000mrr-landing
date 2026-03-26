const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { logger } = require('../utils/logger');

const prisma = new PrismaClient();

// Generate JWT token
const generateToken = (user, expiresIn = '7d') => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn }
  );
};

// Generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  );
};

// Register new user
const registerUser = async (email, password, name = null, role = 'USER') => {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return {
        success: false,
        error: {
          code: 'USER_EXISTS',
          message: 'An account with this email already exists.'
        }
      };
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role
      }
    });

    // Generate tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    logger.info('User registered successfully', { userId: user.id, email });

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token,
        refreshToken
      }
    };
  } catch (error) {
    logger.error('Registration error:', error);
    return {
      success: false,
      error: {
        code: 'REGISTRATION_FAILED',
        message: 'Failed to create account.'
      }
    };
  }
};

// Login user
const loginUser = async (email, password) => {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Use same message to prevent user enumeration
      return {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password.'
        }
      };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password.'
        }
      };
    }

    // Generate tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    logger.info('User logged in successfully', { userId: user.id, email });

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token,
        refreshToken
      }
    };
  } catch (error) {
    logger.error('Login error:', error);
    return {
      success: false,
      error: {
        code: 'LOGIN_FAILED',
        message: 'Failed to log in.'
      }
    };
  }
};

// Get user by ID
const getUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    if (!user) {
      return {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found.'
        }
      };
    }

    return {
      success: true,
      data: user
    };
  } catch (error) {
    logger.error('Get user error:', error);
    return {
      success: false,
      error: {
        code: 'FETCH_FAILED',
        message: 'Failed to fetch user.'
      }
    };
  }
};

// Refresh access token using refresh token
const refreshAccessToken = async (refreshToken) => {
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Get user to ensure they still exist and are active
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        name: true
      }
    });

    if (!user) {
      return {
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User no longer exists.'
        }
      };
    }

    // Generate new access token
    const newToken = generateToken(user);

    logger.info('Access token refreshed', { userId: user.id });

    return {
      success: true,
      data: {
        token: newToken
      }
    };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return {
        success: false,
        error: {
          code: 'REFRESH_TOKEN_EXPIRED',
          message: 'Refresh token has expired. Please log in again.'
        }
      };
    }

    logger.error('Refresh token error:', error);
    return {
      success: false,
      error: {
        code: 'INVALID_REFRESH_TOKEN',
        message: 'Invalid refresh token.'
      }
    };
  }
};

// Logout user (for token blacklisting - requires Redis for production)
const logoutUser = async (userId, refreshToken = null) => {
  try {
    // In production with Redis, you would:
    // 1. Add token to blacklist with TTL
    // 2. Store token jti in database for persistent blacklist

    // For now, just log the logout
    logger.info('User logged out', { userId });

    return {
      success: true,
      data: {
        message: 'Logout successful'
      }
    };
  } catch (error) {
    logger.error('Logout error:', error);
    return {
      success: false,
      error: {
        code: 'LOGOUT_FAILED',
        message: 'Failed to process logout.'
      }
    };
  }
};

module.exports = { registerUser, loginUser, getUserById, refreshAccessToken, logoutUser };
