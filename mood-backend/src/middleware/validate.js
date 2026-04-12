// Zod 验证中间件

const { handleZodError } = require('./error');

/**
 * 验证中间件工厂
 * @param {ZodSchema} schema - Zod schema
 * @returns {Function} Express 中间件
 */
function validate(schema) {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.body);
      req.validatedData = validated;
      next();
    } catch (err) {
      return handleZodError(err, res);
    }
  };
}

/**
 * 查询参数验证
 * @param {ZodSchema} schema - Zod schema
 */
function validateQuery(schema) {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.query);
      req.validatedQuery = validated;
      next();
    } catch (err) {
      return handleZodError(err, res);
    }
  };
}

/**
 * URL 参数验证
 * @param {ZodSchema} schema - Zod schema
 */
function validateParams(schema) {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.params);
      req.validatedParams = validated;
      next();
    } catch (err) {
      return handleZodError(err, res);
    }
  };
}

module.exports = {
  validate,
  validateQuery,
  validateParams,
};
