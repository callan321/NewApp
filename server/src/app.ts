import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";

const app = express();

// 1. Parse JSON
app.use(express.json());

// 2. Log incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 3. Health check / root route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});

// 4. Main API routes
app.use("/api", router);

// 5. Fallback 404 handler (optional but recommended)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// 6. Error handler (last)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong" });
});

export default app;
