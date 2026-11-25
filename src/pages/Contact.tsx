import React, { useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import {
  Send,
  Mail,
  Copy,
  Check,
  MapPin,
  Clock,
  Sparkles,
  MessageSquare,
  Github,
  Linkedin,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { socials, personalInfo } from "@/data/portfolio";
import { sound } from "@/lib/audio";

const subjectOptions = [
  "Enterprise ERP System",
  "Full-Stack Web Application",
  "Inventory / POS System",
  "Full-Time Role Offer",
  "General Collaboration",
];

const faqs = [
  {
    q: "What systems do you specialize in?",
    a: "I specialize in architecting end-to-end enterprise software, such as Manufacturing Execution Systems (MES), ERPs, multi-location inventory & POS platforms, and automated workflow solutions using Laravel, React, and MySQL.",
  },
  {
    q: "Are you open to full-time or contract work?",
    a: "Yes! I am actively open to full-time software engineering roles, hybrid/remote contracts, and select freelance system development opportunities.",
  },
  {
    q: "What is your typical response time?",
    a: "I typically respond within 12 to 24 hours on business days via email or LinkedIn.",
  },
];

export const Contact: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjectOptions[0]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const cleanEmail = personalInfo.email.replace("mailto:", "");

  const handleCopyEmail = () => {
    sound.playPop();
    navigator.clipboard.writeText(cleanEmail);
    setCopied(true);
    toast.success("Email copied to clipboard!", { description: cleanEmail });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playPop();
    setIsSubmitting(true);

    // Prepare mailto link with encoded subject and body
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${selectedSubject}`);
    const mailtoBody = encodeURIComponent(
      `Hi Rayhan,\n\nName: ${form.name}\nEmail: ${form.email}\nSubject: ${selectedSubject}\n\nMessage:\n${form.message}\n`
    );

    setTimeout(() => {
      window.location.href = `mailto:${cleanEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
      toast.success("Opening your email client to send the message!", {
        description: `Subject: ${selectedSubject}`,
      });
      setIsSubmitting(false);
      setForm({ name: "", email: "", message: "" });
    }, 500);
  };

  return (
    <PageTransition>
      <div className="container max-w-4xl mx-auto px-5 sm:px-6 pt-24 sm:pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 sm:mb-12"
        >
          <div className="theme-badge-accent inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium mb-3">
            <MessageSquare size={13} />
            <span>Direct Channels</span>
          </div>
          <h1 className="theme-hero-title text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Let's Start a Conversation
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            Have a project in mind, an engineering role to fill, or want to discuss system architecture? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Main Grid: Form + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="theme-card p-6 sm:p-8 space-y-5"
            >
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span>Send a Direct Message</span>
                <Sparkles size={16} className="theme-accent-text" />
              </h2>

              {/* Subject Selector Pills */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-2">
                  What would you like to discuss?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {subjectOptions.map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => {
                        sound.playTap();
                        setSelectedSubject(subj);
                      }}
                      className={`text-xs px-3 py-1.5 transition-all ${
                        selectedSubject === subj
                          ? "theme-btn-primary"
                          : "theme-chip text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="theme-input w-full px-4 py-3 text-sm placeholder:text-muted-foreground"
                  placeholder="e.g. Alex Graham"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="theme-input w-full px-4 py-3 text-sm placeholder:text-muted-foreground"
                  placeholder="alex@company.com"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Project Details / Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="theme-input w-full px-4 py-3 text-sm placeholder:text-muted-foreground resize-none"
                  placeholder="Tell me about your goals, timeline, or tech stack requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="theme-btn-primary w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm disabled:opacity-50"
              >
                <Send size={15} />
                <span>{isSubmitting ? "Opening Mail..." : "Send Message via Email"}</span>
              </button>
            </form>
          </motion.div>

          {/* Quick Connect & Availability Column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Quick Email Copy Card */}
            <div className="theme-card p-5 sm:p-6 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                Primary Contact
              </span>
              <div className="text-sm sm:text-base font-semibold text-foreground break-all">
                {cleanEmail}
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="theme-btn-secondary flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium"
                >
                  {copied ? (
                    <>
                      <Check size={14} style={{ color: "var(--theme-status)" }} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${cleanEmail}`}
                  onClick={() => sound.playPop()}
                  className="theme-btn-primary inline-flex items-center justify-center gap-1.5 py-2 px-4 text-xs"
                >
                  <Mail size={14} />
                  <span>Compose</span>
                </a>
              </div>
            </div>

            {/* Availability & Turnaround Widget */}
            <div className="theme-card p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: "var(--theme-status)" }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2.5 w-2.5"
                    style={{ backgroundColor: "var(--theme-status)" }}
                  />
                </span>
                <span className="text-xs font-semibold text-foreground">
                  Status: Open for Engagements
                </span>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="theme-accent-text flex-shrink-0" />
                  <span>Response time: within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="theme-accent-2-text flex-shrink-0" />
                  <span>Indonesia (WIB / UTC+7) · Remote Worldwide</span>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="theme-card p-5 sm:p-6 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                Connect on Networks
              </span>

              <div className="grid grid-cols-2 gap-2">
                {socials
                  .filter((s) => s.type !== "email")
                  .map((item) => {
                    const Icon = item.type === "github" ? Github : Linkedin;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playPop()}
                        className="theme-chip flex items-center gap-2.5 p-3 text-xs font-medium text-foreground"
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle size={18} className="theme-accent-text" />
            <h2 className="text-xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="theme-card overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => {
                      sound.playTap();
                      setOpenFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4"
                  >
                    <span className="font-semibold text-sm text-foreground">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </PageTransition>
  );
};

export default Contact;
