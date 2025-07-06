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

  // Example usage in frontend/src/App.tsx
  const apiUrl = import.meta.env.VITE_API_URL || "/api";

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await fetch(`${apiUrl}/expenses/total-spent`);
      const data = await res.json();
      console.log(data); // <-- Should log: { total: 1490 }
      setTotalSpent(data.total);
    }
    fetchTotalSpent();
  }, [apiUrl]);

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
