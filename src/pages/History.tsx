
import { categories } from "@/utils/categories";
import { IndianRupee } from "lucide-react";
const mockEntries = [
  { id: 1, type: "expense", amount: 42.25, category: "Food", note: "Groceries", date: "2025-06-10" },
  { id: 2, type: "income", amount: 4000, category: "Salary", note: "Paycheck", date: "2025-06-01" },
  { id: 3, type: "expense", amount: 55.55, category: "Utilities", note: "Electric bill", date: "2025-06-02" },
];

export default function History() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-2xl font-bold mb-4">Entry History</div>
      <table className="min-w-full bg-card border rounded-lg overflow-hidden shadow">
        <thead className="bg-accent">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Note</th>
          </tr>
        </thead>
        <tbody>
          {mockEntries.map(entry => (
            <tr key={entry.id} className="odd:bg-background even:bg-muted">
              <td className="py-2 px-3">{entry.date}</td>
              <td className="py-2 px-3">
                {categories.find(c => c.name === entry.category)?.icon} {entry.category}
              </td>
              <td className="py-2 px-3">
                <span className={entry.type === "income" ? "text-green-600" : "text-red-600"}>
                  {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                </span>
              </td>
              <td className="py-2 px-3 flex items-center gap-1">
                <IndianRupee className="w-4 h-4 inline-block text-green-700" />
                {entry.amount.toFixed(2)}
              </td>
              <td className="py-2 px-3">{entry.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
