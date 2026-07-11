import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "motion/react"
import {
  Mail, Phone, MapPin, Github, Linkedin, Download,
  ExternalLink, Code2, Database, Globe, Wrench,
  GraduationCap, Award, ChevronUp, Menu, X, Send,
  User, Calendar, Eye, Instagram,
} from "lucide-react"

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Education", href: "education" },
  { label: "Skills", href: "skills" },
  { label: "Certificates", href: "certificates" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
]

const PERSONAL = [
  { icon: User, label: "Full Name", value: "IJAZ AHAMED A" },
  { icon: Code2, label: "Role", value: "Computer Science Student & Developer" },
  { icon: Mail, label: "Email", value: "ijasahamed0123@gmail.com", href: "mailto:ijasahamed0123@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 63810 28931", href: "tel:+916381028931" },
  { icon: MapPin, label: "Location", value: "Manalikarai, Kanniyakumari district, Tamilnadu, India", href: "https://www.google.com/maps/search/?api=1&query=Manalikarai,+Kanniyakumari+district,+Tamilnadu,+India" },
  { icon: Github, label: "GitHub", value: "github.com/ijazAhamed1234", href: "https://github.com/ijazAhamed1234" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/ijaz-ahamed-a-b255b3328", href: "https://linkedin.com/in/ijaz-ahamed-a-b255b3328" },
  { icon: Instagram, label: "Instagram", value: "@_miracle_boy_ijaz__", href: "https://www.instagram.com/_miracle_boy_ijaz__/" },
]

const EDUCATION = [
  {
    level: "Secondary School — Class X",
    institution: "St Mary Goretty Hr Sec School, Manalikarai",
    duration: "2021 – 2022",
    grade: "431/500 — 86.2%",
    desc: "Completed Class X with 431 out of 500 marks (86.2%). Active participant in school-level mathematics and science activities.",
  },
  {
    level: "Higher Secondary — Class XII (Maths Biology Group)",
    institution: "St Mary Goretty Hr Sec School, Manalikarai",
    duration: "2023 – 2024",
    grade: "458/600 — 76.33%",
    desc: "Completed Class XII in the Maths Biology group with 458 out of 600 marks (76.33%).",
  },
  {
    level: "Diploma in Computer Application (DCA)",
    institution: "CSC Computer Education, Colachel",
    duration: "2024",
    grade: "Grade: A - Excellent",
    desc: "Completed comprehensive coursework covering C programming, OOP in C++, MS Office Suite, and internet technologies.",
  },
  {
    level: "B.E. Computer Science & Engineering",
    institution: "Knowledge Institute of Technology (Autonomous), Salem",
    duration: "2024 – 2028",
    grade: "CGPA 8.23 / 10",
    desc: "Specializing in software engineering, AI/ML, and Embedded Systems. Serving as Synergy Squad 4.0 Student Ambassador and actively participating in coding contests and technical workshops.",
  },
]

const SKILLS = [
  {
    title: "Programming Languages",
    icon: Code2,
    items: [
      { name: "C", level: 78 },
      { name: "C++", level: 75 },
      { name: "Java", level: 80 },
      { name: "Python (Basics)", level: 65 },
      { name: "HTML & CSS (Basics)", level: 70 },
    ],
  },
  {
    title: "Emerging Technologies",
    icon: Globe,
    items: [
      { name: "IoT & Embedded Systems (Basics)", level: 68 },
      { name: "AI / ML (Fundamentals)", level: 60 },
    ],
  },
  {
    title: "Tools & Design",
    icon: Wrench,
    items: [
      { name: "Figma (UI Design)", level: 72 },
      { name: "Arduino IDE", level: 75 },
    ],
  },
  {
    title: "Soft Skills",
    icon: User,
    items: [
      { name: "Communication (Basic English)", level: 70 },
      { name: "Teamwork & Collaboration", level: 78 },
    ],
  },
]

const CERT_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "internship", label: "Internships" },
  { id: "award", label: "Awards & Honors" },
  { id: "course", label: "Courses & Workshops" },
  { id: "symposium", label: "Symposia & Competitions" },
]

const CERTS = [
  {
    name: "Java Full Stack Development Internship",
    org: "DEV Technology Solutions, Salem",
    year: "2026",
    color: "#e28743",
    category: "internship",
    image: `${import.meta.env.BASE_URL}Portfolio/Dev.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/Dev.pdf`,
    desc: "Completed a 30-day intensive industry internship focused on end-to-end full stack development using Java."
  },
  {
    name: "Artificial Intelligence & ML Internship",
    org: "VEI Technologies Pvt Ltd, Chennai",
    year: "2025 – 2026",
    color: "#22d3ee",
    category: "internship",
    image: `${import.meta.env.BASE_URL}Portfolio/vei.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/vei.pdf`,
    desc: "Undertook an industry internship implementing and fine-tuning AI and Machine Learning algorithms."
  },
  {
    name: "Embedded Systems & IoT Internship",
    org: "SAN Technovation / Knowledge Institute of Technology",
    year: "2025",
    color: "#3b82f6",
    category: "internship",
    image: `${import.meta.env.BASE_URL}Portfolio/SAN TECHNOLOGIES.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/San Intern.pdf`,
    desc: "Successfully completed hands-on training from concept to product development using microcontrollers and IoT sensors."
  },
  {
    name: "Student Ambassador Excellence Award",
    org: "SCINTEL Association / Knowledge Institute of Technology",
    year: "2025 – 2026",
    color: "#f59e0b",
    category: "award",
    image: `${import.meta.env.BASE_URL}Portfolio/Synergy.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/Ambassador synergy.pdf`,
    desc: "Recognized for excellence in leadership as a Student Ambassador for the Synergy Squad 4.0."
  },
  {
    name: "1st Place in Programming / Coding",
    org: "SCINTEL Association / Knowledge Institute of Technology",
    year: "2025 – 2026",
    color: "#10b981",
    category: "award",
    image: `${import.meta.env.BASE_URL}Portfolio/Synergy 1st.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/Synergy 1st.pdf`,
    desc: "Secured first prize in the programming/coding challenge organized by the CSE department."
  },
  {
    name: "1st Prize in UI/UX Design Challenge",
    org: "K.S.R. College of Engineering",
    year: "2025",
    color: "#ec4899",
    category: "award",
    image: `${import.meta.env.BASE_URL}Portfolio/KSR.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/Ksr 1st.pdf`,
    desc: "Secured first prize at the Spring Fest 2K25 National Level Technical Symposium UI/UX Design Challenge."
  },
  {
    name: "Diploma in Computer Application (DCA)",
    org: "CSC Computer Education, Colachel",
    year: "2023 – 2024",
    color: "#8b5cf6",
    category: "course",
    image: `${import.meta.env.BASE_URL}Portfolio/CSC.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/CSC.pdf`,
    desc: "Awarded Grade A (Excellent) for successfully completing the Diploma in Computer Application."
  },
  {
    name: "Embedded Systems & IoT Value Added Course",
    org: "SAN Technovation / Knowledge Institute of Technology",
    year: "2025",
    color: "#3b82f6",
    category: "course",
    image: `${import.meta.env.BASE_URL}Portfolio/value added.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/value added.pdf`,
    desc: "Value-added course covering hardware, embedded systems architecture, and IoT cloud platforms."
  },
  {
    name: "Hands-on UI/UX Design Workshop",
    org: "IEEE Computer Society Student Branch Chapter",
    year: "2026",
    color: "#ec4899",
    category: "course",
    image: `${import.meta.env.BASE_URL}Portfolio/IEEE.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/IEEE UIUX.pdf`,
    desc: "Participated in a one-day workshop on modern UI/UX workflows and wireframing."
  },
  {
    name: "Game Development (Unity) Workshop",
    org: "Sona College of Technology",
    year: "2025",
    color: "#ef4444",
    category: "course",
    image: `${import.meta.env.BASE_URL}Portfolio/Sona.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/Sona.pdf`,
    desc: "Participated in the game development workshop covering Unity engine and C# scripting."
  },
  {
    name: "Idea Pitching Competition (தீர்வு'ATHON)",
    org: "PSG College of Arts & Science",
    year: "2025",
    color: "#14b8a6",
    category: "symposium",
    image: `${import.meta.env.BASE_URL}Portfolio/PSG.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/PSG.pdf`,
    desc: "Participated in the தீர்வு'ATHON 2025 National Level Inter-Collegiate Idea Pitching Competition."
  },
  {
    name: "PROGEN'i 26.0 Technical Symposium",
    org: "Government College of Engineering, Salem",
    year: "2026",
    color: "#f59e0b",
    category: "symposium",
    image: `${import.meta.env.BASE_URL}Portfolio/GCE.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/GCE.pdf`,
    desc: "Participated in the National Level Technical Symposium organized by the Dept of CSE."
  },
  {
    name: "ORION 2K25 Technical Symposium",
    org: "Kongu Engineering College",
    year: "2025",
    color: "#a855f7",
    category: "symposium",
    image: `${import.meta.env.BASE_URL}Portfolio/Kongu.png`,
    link: `${import.meta.env.BASE_URL}Portfolio/Kongu.pdf`,
    desc: "Participated in the one-day National Level Technical Symposium organized by the MCA department."
  }
]

const PROJECTS = [
  {
    title: "MedChain – Secure Hospital Management System",
    desc: "A full-stack, secure hospital workflow platform featuring Spring Boot backend REST APIs, JWT role-based access control, a React-based interactive administration dashboard, and Solidity smart contracts for immutable, tamper-proof medical records and decentralized patient file storage.",
    tags: ["Java", "Spring Boot", "React", "JWT", "Smart Contracts", "MySQL"],
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=700&h=420&fit=crop&auto=format",
    github: "https://github.com/Kanishk0224/Medchain-Besu",
    demo: null,
  },
  {
    title: "IoT-Based Smart Parking System",
    desc: "End-to-end multi-sensor parking system combining ESP32 microcontroller ultrasonic hardware, YOLOv8 real-time computer vision vehicle detection, and a Firebase Realtime Database for instant state synchronization. React dashboard displays occupancy metrics and real-time alerts.",
    tags: ["React", "Firebase RTDB", "YOLOv8", "ESP32", "Python", "Twilio"],
    img: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=700&h=420&fit=crop&auto=format",
    github: "https://github.com/ijazAhamed1234/Smart-Parking-System",
    demo: null,
  },
  {
    title: "StealthSense – AI PostgreSQL Security Extension",
    desc: "A C-based PostgreSQL database extension that intercepts raw SQL queries and classifies them using a machine learning Random Forest model. Calculates a composite risk score using complexity, source IP trust, and frequency analysis to prevent injection attacks and data leaks.",
    tags: ["C", "PostgreSQL", "Python", "scikit-learn", "Random Forest", "Database Security"],
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&h=420&fit=crop&auto=format",
    github: "https://github.com/ijazAhamed1234/stealthsense-postgresql-ml-security",
    demo: null,
  },
]

const FLOATING_TECH = [
  { label: "Java", emoji: "☕", style: { top: "4%", left: "-8%" }, delay: "0s" },
  { label: "Python", emoji: "🐍", style: { top: "48%", left: "-20%" }, delay: "0.5s" },
  { label: "C++", emoji: "⚡", style: { bottom: "12%", left: "-4%" }, delay: "1.0s" },
  { label: "C", emoji: "⚙️", style: { top: "4%", right: "-8%" }, delay: "0.3s" },
  { label: "Arduino", emoji: "🤖", style: { top: "48%", right: "-20%" }, delay: "0.8s" },
  { label: "HTML", emoji: "🌐", style: { bottom: "4%", right: "-4%" }, delay: "0.6s" },
]

// ─── Shared Components ───────────────────────────────────────────────────────

function FadeIn({ children, className = "", delay = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px 0px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Glass({ children, className = "", glow = false }: {
  children: React.ReactNode
  className?: string
  glow?: boolean
}) {
  return (
    <div
      className={`
        backdrop-blur-md bg-white/[0.05] border border-white/10 rounded-2xl
        transition-all duration-300
        hover:bg-white/[0.08] hover:border-white/20
        ${glow ? "hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

function SectionLabel({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center mb-16">
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-violet-400 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mt-4 mb-3">{title}</h2>
      {sub && <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">{sub}</p>}
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("home")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:ijasahamed0123@gmail.com?subject=${encodeURIComponent(form.subject || "New Contact from Portfolio")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
    window.location.href = mailtoLink;
  };
  const [certCat, setCertCat] = useState("all")
  const [activeCert, setActiveCert] = useState<typeof CERTS[0] | null>(null)

  const filteredCerts = certCat === "all"
    ? CERTS
    : CERTS.filter(c => c.category === certCat)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const ids = NAV_LINKS.map(l => l.href)
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <div
      className="min-h-screen bg-black text-[#F8FAFC] overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        {/* Static background optimized for all platforms */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.07) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ── Nav ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-xl bg-black/80 border-b border-white/[0.07] shadow-xl shadow-black/30" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => goto("home")}
            className="text-2xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent tracking-tight"
          >
            IA
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => goto(link.href)}
                className={`px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  active === link.href
                    ? "text-violet-400 bg-violet-500/12"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <a 
            href={`${import.meta.env.BASE_URL}Portfolio/Resume.pdf`}
            download="Resume.pdf"
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-semibold shadow-lg shadow-violet-700/30 hover:shadow-violet-600/50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <Download size={14} />
            Resume
          </a>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/8 text-slate-400"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden backdrop-blur-xl bg-black/95 border-b border-white/[0.07] px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => goto(link.href)}
                className="text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-violet-400 hover:bg-violet-500/10 transition-all"
              >
                {link.label}
              </button>
            ))}
            <a 
              href={`${import.meta.env.BASE_URL}Portfolio/Resume.pdf`}
              download="Resume.pdf"
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-semibold"
            >
              <Download size={15} />
              Download Resume
            </a>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center pt-16">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-widest">Available for hire</span>
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
                Hi, I'm <br />
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  IJAZ AHAMED A
                </span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed">
                Computer Science student & aspiring developer passionate about building modern,
                performant, and visually stunning web experiences.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <button
                onClick={() => goto("projects")}
                className="px-6 py-3.5 rounded-xl bg-white text-black font-bold hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 transition-all duration-200"
              >
                View Work
              </button>
              <button
                onClick={() => goto("contact")}
                className="px-6 py-3.5 rounded-xl bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                Let's Talk
              </button>
            </div>

            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
              {[
                { icon: Github, href: "https://github.com/ijazAhamed1234" },
                { icon: Linkedin, href: "https://linkedin.com/in/ijaz-ahamed-a-b255b3328" },
                { icon: Instagram, href: "https://www.instagram.com/_miracle_boy_ijaz__/" },
                { icon: Mail, href: "mailto:ijasahamed0123@gmail.com" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-200"
                >
                  <item.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — avatar + floating badges */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-88 md:h-88 lg:w-96 lg:h-96">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600 to-fuchsia-500 opacity-25 blur-3xl animate-pulse" />
              {/* Gradient ring */}
              <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-violet-500 via-fuchsia-400 to-violet-600">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                  <img
                    src={`${import.meta.env.BASE_URL}Portfolio/Profile_v2.jpeg`}
                    alt="IJAZ AHAMED A"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Floating tech badges - CSS optimized */}
              {FLOATING_TECH.map((t) => (
                <div
                  key={t.label}
                  className="absolute flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-[9px] sm:text-[11px] font-bold text-slate-200 shadow-lg whitespace-nowrap floating-badge"
                  style={{ ...t.style, animationDelay: t.delay }}
                >
                  <span className="text-sm sm:text-base">{t.emoji}</span>
                  {t.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PERSONAL DETAILS
      ══════════════════════════════════════════════════════ */}
      <section id="about" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionLabel eyebrow="About Me" title="Personal Details" sub="Everything you need to know — my background, contact info, and where to find my work." />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PERSONAL.map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.07}>
                <Glass glow className="p-5 h-full group cursor-default">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-violet-500/12 border border-violet-500/20 text-violet-400 group-hover:bg-violet-500/22 transition-colors shrink-0">
                      <item.icon size={19} />
                    </div>
                    <div className="min-w-0 w-full pr-2">
                      <p className="text-[10px] text-slate-500 uppercase tracking-[0.15em] font-semibold mb-1">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href}
                          target={item.href.startsWith("mailto") || item.href.startsWith("tel") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="text-sm text-slate-200 font-medium hover:text-violet-400 transition-colors break-words whitespace-normal block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-200 font-medium break-words whitespace-normal">{item.value}</p>
                      )}
                    </div>
                  </div>
                </Glass>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          EDUCATION
      ══════════════════════════════════════════════════════ */}
      <section id="education" className="py-28 relative">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <SectionLabel eyebrow="Academic Journey" title="Education" sub="From school to engineering — milestones that shaped my technical foundation." />
          </FadeIn>

          <div className="relative">
            <div className="space-y-6 md:space-y-10">
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.14, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 relative z-10"
                >
                  {/* Icon node */}
                  <div className="shrink-0 flex items-center justify-center sm:block">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-600/25">
                      <GraduationCap size={20} className="text-white sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  <Glass glow className="flex-1 p-5 md:p-6 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row flex-wrap items-center sm:items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[11px] font-bold text-violet-400 uppercase tracking-wider">{edu.level}</span>
                        <h3 className="text-base font-bold text-slate-100 mt-1">{edu.institution}</h3>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/25 text-fuchsia-400 text-xs font-bold whitespace-nowrap">
                        {edu.grade}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
                      <Calendar size={12} />
                      {edu.duration}
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{edu.desc}</p>
                  </Glass>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SKILLS
      ══════════════════════════════════════════════════════ */}
      <section id="skills" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionLabel eyebrow="Technical Expertise" title="Skills" sub="Languages, frameworks, databases, and tools I use to build production-grade software." />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILLS.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
              >
                <div className="backdrop-blur-md bg-white/[0.04] border border-white/10 rounded-2xl p-6 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-violet-500/12 border border-violet-500/20 text-violet-400">
                      <cat.icon size={19} />
                    </div>
                    <h3 className="font-bold text-slate-200 text-sm">{cat.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {cat.items.map((skill, si) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.1 + si * 0.05 }}
                      >
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm text-slate-300 font-medium">{skill.name}</span>
                          <span className="text-xs text-slate-500">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-400"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.3, delay: ci * 0.1 + si * 0.05, ease: "easeOut" }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CERTIFICATES
      ══════════════════════════════════════════════════════ */}
      <section id="certificates" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionLabel eyebrow="Achievements" title="Certificates" sub="Professional certifications validating expertise across software engineering, AI/ML, and IoT/Embedded systems." />
          </FadeIn>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {CERT_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCertCat(cat.id)}
                className={`
                  px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200
                  ${certCat === cat.id
                    ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/25"
                    : "border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200 bg-white/[0.02]"
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredCerts.map((cert) => (
                <motion.div
                  key={cert.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => setActiveCert(cert)}
                  className="cursor-pointer flex"
                >
                  <div
                    className="backdrop-blur-md bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-xl flex flex-col w-full"
                    style={{
                      ["--glow-color" as string]: cert.color,
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="h-36 relative flex items-center justify-center shrink-0"
                      style={{ background: `linear-gradient(135deg, ${cert.color}12, ${cert.color}03)` }}
                    >
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
                      >
                        <Award size={30} style={{ color: cert.color }} />
                      </div>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-2xl"
                        style={{ background: `radial-gradient(ellipse at center, ${cert.color}12, transparent 70%)` }}
                      />
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-bold text-slate-200 text-sm mb-1 leading-snug min-h-[40px] flex items-center">{cert.name}</h3>
                      <p className="text-xs text-slate-500 mb-1 leading-snug">{cert.org}</p>
                      <p className="text-xs font-semibold mb-3 shrink-0" style={{ color: cert.color }}>{cert.year}</p>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-grow">{cert.desc}</p>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCert(cert);
                        }}
                        className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold border border-white/10 text-slate-400 hover:border-violet-500/50 hover:text-violet-400 hover:bg-violet-500/10 transition-all duration-200"
                      >
                        <Eye size={13} />
                        View Certificate
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════════════════ */}
      <section id="projects" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <SectionLabel eyebrow="Portfolio" title="Projects" sub="Selected work spanning IoT systems, full-stack web apps, and systems programming." />
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {PROJECTS.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`group ${i === PROJECTS.length - 1 && PROJECTS.length % 2 !== 0 ? "md:col-span-2" : ""}`}
              >
                <div className="backdrop-blur-md bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/8 transition-all duration-400 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-slate-800">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/20 to-transparent" />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-slate-100 mb-2">{project.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">{project.desc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[11px] font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/12 text-slate-400 text-sm font-medium hover:border-white/25 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <Github size={15} />
                        GitHub
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 transition-all"
                        >
                          <ExternalLink size={15} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════ */}
      <section id="contact" className="py-28 relative">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <SectionLabel eyebrow="Get In Touch" title="Contact Me" sub="Have an internship opportunity or project in mind? I'd love to hear from you." />
          </FadeIn>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Info cards */}
            <div className="md:col-span-2 space-y-4">
              {[
                { icon: Mail, label: "Email", value: "ijasahamed0123@gmail.com", href: "mailto:ijasahamed0123@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 63810 28931", href: "tel:+916381028931" },
                { icon: Github, label: "GitHub", value: "github.com/ijazAhamed1234", href: "https://github.com/ijazAhamed1234" },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/ijaz-ahamed-a", href: "https://linkedin.com/in/ijaz-ahamed-a-b255b3328" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                >
                  <Glass glow className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-violet-500/12 border border-violet-500/20 text-violet-400 shrink-0">
                        <item.icon size={17} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.14em] font-semibold">{item.label}</p>
                        <a
                          href={item.href}
                          target={item.href?.startsWith("mailto") || item.href?.startsWith("tel") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="text-sm text-slate-200 font-medium truncate block hover:text-violet-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      </div>
                    </div>
                  </Glass>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, x: 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 }}
            >
              <div className="backdrop-blur-md bg-white/[0.04] border border-white/10 rounded-2xl p-7">
                <form className="space-y-5" onSubmit={handleSendMail}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {[
                      { key: "name", label: "Name", type: "text", placeholder: "John Doe" },
                      { key: "email", label: "Email", type: "email", placeholder: "john@company.com" },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="text-[10px] text-slate-400 uppercase tracking-[0.14em] font-semibold mb-2 block">{f.label}</label>
                        <input
                          type={f.type}
                          value={form[f.key as keyof typeof form]}
                          onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.14)] transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase tracking-[0.14em] font-semibold mb-2 block">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      placeholder="Internship Opportunity at Acme Corp."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.14)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase tracking-[0.14em] font-semibold mb-2 block">Message</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="Hi Ijaz, I came across your portfolio and would love to discuss..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/60 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.14)] transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold shadow-lg shadow-violet-700/25 hover:shadow-violet-600/45 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/[0.07] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <div className="text-lg font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-0.5">
              Ijaz Ahamed A
            </div>
            <p className="text-xs text-slate-500">© 2024 All rights reserved.</p>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/ijazAhamed1234" },
              { icon: Linkedin, href: "https://linkedin.com/in/ijaz-ahamed-a-b255b3328" },
              { icon: Instagram, href: "https://www.instagram.com/_miracle_boy_ijaz__/" },
              { icon: Mail, href: "mailto:ijasahamed0123@gmail.com" }
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-violet-400 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
              >
                <item.icon size={17} />
              </a>
            ))}
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-slate-400 text-xs font-medium hover:text-violet-400 hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-200"
          >
            <ChevronUp size={15} />
            Back to top
          </button>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl p-2 flex flex-col"
            >
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-950/60 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-950/90 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
              <img
                src={activeCert?.image}
                alt="Certificate View"
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl select-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes float-badge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .floating-badge {
          animation: float-badge 3.5s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  )
}
