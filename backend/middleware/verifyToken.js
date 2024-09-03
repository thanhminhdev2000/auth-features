import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: true,
      message: "Unauthorized - no token provided",
    });
  }

  try {
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: true,
        message: "Unauthorized - invalid token",
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
