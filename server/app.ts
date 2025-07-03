import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expense";

const app = new Hono();

// Middleware to log requests
app.use("*", logger());

app.get("/test", (c) =>
  c.json({
    message: "Hello, world!",
  })
);

app.route("api/expenses", expensesRoute);
export default app;
