
const Settings = () => (
  <div className="max-w-2xl mx-auto bg-card border border-border rounded-lg p-10 shadow my-10">
    <div className="text-2xl font-bold mb-4">Settings</div>
    <div className="text-muted-foreground mb-2">Profile and app preferences coming soon.</div>
    <div className="mb-4">
      <label className="font-semibold block mb-2">Username</label>
      <input
        className="border px-3 py-2 rounded w-full bg-input"
        defaultValue="(mock user)"
        disabled
      />
    </div>
    <button className="px-5 py-2 bg-secondary rounded font-semibold text-primary mt-2 cursor-not-allowed opacity-70" disabled>
      Sign Out (Supabase Auth pending)
    </button>
  </div>
);

export default Settings;
