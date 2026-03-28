const express = require('express');
const { registerUser, loginUser, getUserById, refreshAccessToken, logoutUser } = require('../services/authService');
const { authMiddleware } = require('../middleware/auth');
const { logger } = require('../utils/logger');

const router = express.Router();

// Validation helpers
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 8;
};

/**
 * POST /api/v1/auth/register
 * Register a new user
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Email and password are required.',
          details: [
            { field: 'email', message: 'Email is required' },
            { field: 'password', message: 'Password is required' }
          ]
        }
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid email format.',
          details: [{ field: 'email', message: 'Must be a valid email address' }]
        }
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Password must be at least 8 characters.',
          details: [{ field: 'password', message: 'Minimum 8 characters required' }]
        }
      });
    }

    // Register user
    const result = await registerUser(email, password, name);

    if (!result.success) {
      const status = result.error.code === 'USER_EXISTS' ? 409 : 500;
      return res.status(status).json(result);
    }

    logger.info('New user registered', { userId: result.data.user.id });

    res.status(201).json(result);
  } catch (error) {
    logger.error('Register route error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred.'
      }
    });
  }
});

/**
 * POST /api/v1/auth/login
 * Login user
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Email and password are required.',
          details: [
            { field: 'email', message: 'Email is required' },
            { field: 'password', message: 'Password is required' }
          ]
        }
      });
    }

    // Login user
    const result = await loginUser(email, password);

    if (!result.success) {
      return res.status(401).json(result);
    }

    res.json(result);
  } catch (error) {
    logger.error('Login route error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred.'
      }
    });
  }
});

/**
 * GET /api/v1/auth/me
 * Get current user profile
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await getUserById(req.user.id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    logger.error('Get profile route error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred.'
      }
    });
  }
});

/**
 * POST /api/v1/auth/refresh
 * Refresh access token using refresh token
 */
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Refresh token is required.',
          details: [{ field: 'refreshToken', message: 'Refresh token is required' }]
        }
      });
    }

    const result = await refreshAccessToken(refreshToken);

    if (!result.success) {
      const status = result.error.code === 'INVALID_REFRESH_TOKEN' || result.error.code === 'REFRESH_TOKEN_EXPIRED' ? 401 : 500;
      return res.status(status).json(result);
    }

    res.json(result);
  } catch (error) {
    logger.error('Refresh token route error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred.'
      }
    });
  }
});

/**
 * POST /api/v1/auth/logout
 * Logout user (requires authentication)
 */
router.post('/logout', authMiddleware, async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const result = await logoutUser(req.user.id, refreshToken);

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.json(result);
  } catch (error) {
    logger.error('Logout route error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred.'
      }
    });
  }
});

module.exports = router;
