
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { TabsNav } from "./components/TabsNav";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Add from "./pages/Add";
import History from "./pages/History";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

// Create a QueryClient instance for React Query
const queryClient = new QueryClient();

// The main layout, conditionally rendering Sidebar for non-auth pages
function MainLayout() {
  const location = useLocation();
  // Routes where sidebar (and nav) should be hidden
  const hideSidebar = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div className="font-sans min-h-screen flex flex-col bg-background transition-colors">
      <div className="flex flex-1 w-full">
        {/* Only show Sidebar if NOT on signin/signup */}
        {!hideSidebar && <Sidebar />}
        <main className="flex-1 min-w-0 px-2 md:px-10 pb-24 pt-6">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<Add />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
            {/* New, creative Auth pages */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            {/* Remove old /login route */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      {!hideSidebar && <TabsNav />}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
