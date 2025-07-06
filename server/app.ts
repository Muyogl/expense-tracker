import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expense";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors"; // <-- Add this import

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: ["https://expense-tracker-frontend-66p3.onrender.com", "*"], // Replace/add your frontend domain
    allowMethods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

// Middleware to log requests
app.use("*", logger());

app.route("/api/expenses", expensesRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
