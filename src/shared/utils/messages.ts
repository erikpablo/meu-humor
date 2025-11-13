export const messages = {
  success: 'Logout successful.',
  missingToken: 'Missing authentication token.',
  invalidToken: 'Invalid or expired token.',
  revoked: 'Token revoked.',
  internalError: 'Internal server error while logging out.',

  logs: {
    redisError: 'Error logging out (Redis or logic issue)',
  },

  // Middleware / Auth
  missingBearer: 'Unauthorized: Missing Bearer token.',
  invalidJWT: 'Unauthorized: Invalid or expired token.',
  revokedJWT: 'Unauthorized: Token revoked (blacklist).',
}
