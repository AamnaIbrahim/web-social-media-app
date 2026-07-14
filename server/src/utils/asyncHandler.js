// Wraps async controllers so any thrown/rejected error is automatically
// forwarded to Express's error handler via next() — without this, every
// controller in every future phase would need its own try/catch just to
// avoid unhandled promise rejections crashing the process.
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}