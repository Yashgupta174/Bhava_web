import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    console.error("[AUTH ERROR] JWT Verification failed:", err.message);
    res.status(401).json({ success: false, message: "Token invalid or expired" });
  }
};

const admin = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access required" });
  }
  next();
};

export { protect, admin };
