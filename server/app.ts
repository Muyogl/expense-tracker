import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expense";
import { serveStatic } from "hono/bun";

const app = new Hono();

// Middleware to log requests
app.use("*", logger());

app.route("/api/expenses", expensesRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
