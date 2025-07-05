import { useEffect, useState } from "react";
import "./App.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await fetch("/api/expenses/total-spent");
      const data = await res.json();
      setTotalSpent(data.total);
    }
    fetchTotalSpent();
    fetch("/api/expenses/total-spent");
  }, []);

  return (
    <>
      <Card className="max-w-md m-auto mt-10">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>Total amount spent: </CardDescription>
        </CardHeader>
        <CardContent>{totalSpent}</CardContent>
      </Card>
    </>
  );
}

export default App;
