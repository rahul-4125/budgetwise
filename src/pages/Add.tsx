
import { EntryForm } from "@/components/EntryForm";
import { HeroSection } from "@/components/HeroSection";

const Add = () => (
  <div className="p-2 pt-6 max-w-2xl mx-auto flex flex-col gap-8">
    <HeroSection
      title={<>Add Entry</>}
      subtitle={<>Log a new income or expense to keep your records fresh.</>}
    />
    <EntryForm />
  </div>
);

export default Add;
