import { Hono } from "hono";
import { z } from "zod";
import { validator } from "hono/validator";
import { zValidator } from "@hono/zod-validator";
import { accepts } from "hono/accepts";

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

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(expense);
  })

  .get("/total-spent", (c) => {
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    c.header("Cache-Control", "no-store"); // 👈 force no caching
    return c.json({ total });
  })

  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  });

//.put
