import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SafeRent Admin API Running",
    version: "1.0.0"
  });
});

router.get("/health", (req, res) => {
  res.json({
    status: "UP",
    server: "Running"
  });
});

export default router;  