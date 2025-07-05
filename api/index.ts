import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expense";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

export const runtime = "edge";

export const app = new Hono().basePath("/api");

// Middleware to log requests
app.use("*", logger());
app.use("*", cors({ origin: "*" }));

app.route("/expenses", expensesRoute);

export const GET = handle(app);
export const POST = handle(app);
