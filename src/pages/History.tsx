
import { categories } from "@/utils/categories";
import { IndianRupee } from "lucide-react";
import { useEntries } from "@/hooks/useEntries";
import { HeroSection } from "@/components/HeroSection";

export default function History() {
  const { data: entries, isLoading, error } = useEntries();

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-8">
      <HeroSection
        title={<>History</>}
        subtitle={<>View all your entries across time, category, and type.</>}
      />
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
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center text-muted-foreground py-14">Loading...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={5} className="text-center text-red-600 py-10">Error loading entries</td>
            </tr>
          ) : (!entries || entries.length === 0) ? (
            <tr>
              <td colSpan={5} className="text-center text-muted-foreground py-14">
                No entries yet.
              </td>
            </tr>
          ) : (
            entries.map((entry: any) => (
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
                  {Number(entry.amount).toFixed(2)}
                </td>
                <td className="py-2 px-3">{entry.note}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
