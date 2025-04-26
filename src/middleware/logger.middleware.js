module.exports = function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const route = req.baseUrl + (req.route && req.route.path ? req.route.path : '');

  // after response is finished, log status code
  res.on('finish', () => {
      console.log(
          `[${timestamp}] ${method} ${url} [${res.statusCode}] - router: ${route}`
      );
  });

  next();
};