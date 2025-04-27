module.exports = function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  const method    = req.method;
  const url       = req.originalUrl;

  res.on('finish', () => {
    // now that routing has happened, req.baseUrl and req.route.path are populated
    const route = req.baseUrl + (req.route?.path || '');
    console.log(
      `[${timestamp}] ${method} ${url} [${res.statusCode}] - req: ${req}`
    );
  });

  next();
};