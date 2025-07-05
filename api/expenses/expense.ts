import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3, "Title is required").max(30),
  amount: z.number().int().positive(),
});

type Expenses = z.infer<typeof expenseSchema>;

const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: Expenses[] = [
  { id: 1, title: "Groceries", amount: 50 },
  { id: 2, title: "Utilities", amount: 100 },
  { id: 3, title: "Rent", amount: 1200 },
  { id: 4, title: "Internet", amount: 60 },
  { id: 5, title: "Transportation", amount: 80 },
];

const app = new Hono().basePath("/api/expenses");

app.get("/", (c) => {
  return c.json({ expenses: fakeExpenses });
});

app.post("/", zValidator("json", createPostSchema), async (c) => {
  const expense = await c.req.valid("json");
  fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
  c.status(201);
  return c.json(expense);
});

app.get("/total-spent", (c) => {
  const total = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0);
  return c.json({ total });
});

app.get("/:id{[0-9]+}", (c) => {
  const id = Number.parseInt(c.req.param("id"));
  const expense = fakeExpenses.find((expense) => expense.id === id);
  if (!expense) {
    return c.notFound();
  }
  return c.json({ expense });
});

app.delete("/:id{[0-9]+}", (c) => {
  const id = Number.parseInt(c.req.param("id"));
  const index = fakeExpenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return c.notFound();
  }
  const deletedExpense = fakeExpenses.splice(index, 1)[0];
  return c.json({ expense: deletedExpense });
});

export default handle(app);
