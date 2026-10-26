/**
 * Reusable request validation middleware using Zod schemas.
 * Accepts an object with optional body, query, or params schemas.
 * 
 * @param {Object} schemas - { body?: z.ZodSchema, query?: z.ZodSchema, params?: z.ZodSchema }
 */
export const validateRequest = (schemas) => {
  return async (req, res, next) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }
      if (schemas.query) {
        const parsedQuery = await schemas.query.parseAsync(req.query);
        try {
          req.query = parsedQuery;
        } catch (err) {
          // Express 5 defines query as a getter-only property on IncomingMessage
          Object.defineProperty(req, "query", {
            value: parsedQuery,
            enumerable: true,
            writable: true,
            configurable: true
          });
        }
      }
      if (schemas.params) {
        req.params = await schemas.params.parseAsync(req.params);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
