import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import FloatingNav from "@/components/FloatingNav";
import { DynamicIsland } from "@/components/DynamicIsland";
import { LiquidBackground } from "@/components/LiquidBackground";
import Index from "./pages/Index";
import Certifications from "./pages/Certifications";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner
        position="top-right"
        toastOptions={{
          className:
            "ios-glass rounded-2xl border-white/30 dark:border-white/10 shadow-lg text-foreground",
        }}
      />
      <BrowserRouter>
        <LiquidBackground />
        <DynamicIsland />
        <AnimatedRoutes />
        <FloatingNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
