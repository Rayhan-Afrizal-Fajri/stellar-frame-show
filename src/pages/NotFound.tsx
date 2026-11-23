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
        className="ios-glass-card p-8 sm:p-12 text-center rounded-[32px] max-w-md w-full shadow-2xl relative overflow-hidden"
      >
        <div className="w-16 h-16 rounded-3xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-6">
          <Compass size={32} />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-blue-500 font-semibold block mb-2">
          Error 404
        </span>

        <h1 className="text-3xl font-extrabold text-foreground tracking-tight mb-2">
          Page Not Found
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          The destination route <code className="font-mono text-xs px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/10">{location.pathname}</code> does not exist or has been moved.
        </p>

        <Link
          to="/"
          onClick={() => sound.playPop()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm shadow-[0_4px_16px_rgba(59,130,246,0.35)] hover:scale-105 active:scale-95 transition-all w-full"
        >
          <Home size={16} />
          <span>Return to Home</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
