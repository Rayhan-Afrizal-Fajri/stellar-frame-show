import {NavLink, useLocation} from "react-router-dom";
import {
    Home,
    Award,
    FolderOpen,
    Mail,
    Sun,
    Moon
} from "lucide-react";
import {motion} from "framer-motion";
import {useTheme} from "@/hooks/useTheme";

const navItems = [
    {
        to: "/",
        icon: Home,
        label: "Home"
    }, {
        to: "/certifications",
        icon: Award,
        label: "Certs"
    }, {
        to: "/projects",
        icon: FolderOpen,
        label: "Projects"
    }, {
        to: "/contact",
        icon: Mail,
        label: "Contact"
    }
];

const FloatingNav = () => {
    const {theme, toggleTheme} = useTheme();
    const location = useLocation();

    return (
        <motion.nav
            initial={{
                y: 100,
                opacity: 0
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
            transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 25
            }}
            className="fixed bottom-6 left-14 lg:bottom-1/2 lg:left-6 lg:translate-x-0 lg:-translate-y-1/2 z-50 glass-nav rounded-full px-2 py-2 lg:py-6 flex flex-row lg:flex-col items-center gap-1 backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/10">
            {
                navItems.map(({to, icon: Icon, label}) => {
                    const isActive = location.pathname === to;
                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className="relative flex items-center gap-2 px-4 py-2.5 md:px-4 md:py-4 rounded-full transition-colors duration-200 group">
                            {
                                isActive && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 bg-primary rounded-full"
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 30
                                        }}/>
                                )
                            }
                            <span
                                className={`relative z-10 transition-colors duration-200 ${isActive
                                    ? "text-primary-foreground"
                                    : "text-muted-foreground group-hover:text-foreground"}`}>
                                <Icon size={18}/>
                            </span>
                        </NavLink>
                    );
                })
            }
            <div className="w-px h-6 bg-border mx-1"/>
            <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-accent"
                aria-label="Toggle theme">
                {
                    theme === "dark"
                        ? <Sun size={18}/>
                        : <Moon size={18}/>
                }
            </button>
        </motion.nav>
    );
};

export default FloatingNav;
