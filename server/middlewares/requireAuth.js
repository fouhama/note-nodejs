import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      success: false,
      error: "You must be logged in to access this resource",
    });
  }

  const token = authorization.replace("Bearer ", ""); // remove the 'bearer ' prefix
  jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).json({
        success: false,
        error: "You must be logged in ",
      });
    }
    const { id } = payload;
    req.userId = id;
    next();
  });
};
