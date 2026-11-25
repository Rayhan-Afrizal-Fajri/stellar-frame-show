import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Compass } from "lucide-react";
import { sound } from "@/lib/audio";

export const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Non-existent route accessed:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="theme-card p-8 sm:p-12 text-center max-w-md w-full shadow-2xl relative overflow-hidden"
      >
        <div className="theme-chip-hot w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <Compass size={32} />
        </div>

        <span className="theme-accent-text text-xs font-mono uppercase tracking-widest font-semibold block mb-2">
          Error 404
        </span>

        <h1 className="theme-hero-title text-3xl font-extrabold text-foreground tracking-tight mb-2">
          Page Not Found
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          The destination route <code className="theme-chip font-mono text-xs px-2 py-0.5">{location.pathname}</code> does not exist or has been moved.
        </p>

        <Link
          to="/"
          onClick={() => sound.playPop()}
          className="theme-btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm w-full"
        >
          <Home size={16} />
          <span>Return to Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
