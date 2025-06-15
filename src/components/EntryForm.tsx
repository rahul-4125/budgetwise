
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { categories } from "../utils/categories";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

const FormSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Category required"),
  note: z.string().max(100).optional(),
  date: z.date(),
});

export function EntryForm() {
  const [open, setOpen] = useState(false); // for category dropdown
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "expense",
      date: new Date(),
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "Entry added!",
      description: (
        <div className="flex flex-col gap-1">
          <span>Amount: <b>{data.amount}</b></span>
          <span>Type: <b>{data.type}</b></span>
          <span>Category: <b>{data.category}</b></span>
        </div>
      )
    });
    reset({ type: "expense", date: new Date() });
  };

  const dateValue = watch("date");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-card border border-border rounded-lg p-8 shadow space-y-5">
      <div className="text-2xl font-bold mb-3">Add Entry</div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="font-medium">Amount</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount")}
            className="mt-1 w-full px-3 py-2 border rounded bg-input"
          />
          <p className="text-red-600 text-xs min-h-4">{errors.amount?.message}</p>
        </div>
        <div className="flex-1">
          <label className="font-medium">Type</label>
          <select
            {...register("type")}
            className="mt-1 w-full px-3 py-2 border rounded bg-input"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>

      <div>
        <label className="font-medium">Category</label>
        <select {...register("category")} className="mt-1 w-full px-3 py-2 border rounded bg-input">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.name}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
        <p className="text-red-600 text-xs min-h-4">{errors.category?.message}</p>
      </div>
      <div>
        <label className="font-medium block">Date</label>
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 opacity-80" />
          <input
            type="date"
            {...register("date", {
              valueAsDate: true,
            })}
            className="w-full px-3 py-2 border rounded bg-input"
            value={dateValue ? format(dateValue as Date, "yyyy-MM-dd") : ""}
            onChange={e => setValue("date", new Date(e.target.value))}
          />
        </div>
      </div>
      <div>
        <label className="font-medium">Note</label>
        <input
          type="text"
          {...register("note")}
          maxLength={100}
          className="mt-1 w-full px-3 py-2 border rounded bg-input"
          placeholder="Optional note"
        />
      </div>
      <div className="pt-2 flex justify-end">
        <Button type="submit" className="px-6">
          Add Entry
        </Button>
      </div>
    </form>
  );
}
