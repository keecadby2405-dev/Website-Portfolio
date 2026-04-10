import { useState, useEffect, useRef } from "react";

const NAV = ["Home","About","Experience","Skills","Achievements","Goals","Contact"];

const EXPERIENCE = [
  {
    role: "Apprentice Business Administrator",
    company: "Auxilio Care Ltd",
    period: "Aug 2025 – Present",
    type: "Full-time Apprenticeship · 30 hrs/week",
    bullets: [
      "Day-to-day administrative support across Auxilio Care and Aurum Housing",
      "Maintaining accurate records, filing systems and databases",
      "Managing correspondence — emails, letters and phone calls",
      "Diary and calendar management for managers and teams",
      "HR admin: personnel files, training records and compliance documentation",
      "Supporting compliance audits and regulatory requirements",
      "Preparation and documentation for interviews",
    ],
  },
  {
    role: "Assistant Administrator",
    company: "Auxilio Care Ltd",
    period: "Jul 2024 – Sep 2024",
    type: "Work Experience · 2 days/week",
    bullets: [
      "Managed and updated client files and internal systems",
      "Maintained spreadsheets for staff training records",
      "Checked and monitored PPE stock for care staff",
      "Supported co-workers with outstanding tasks",
    ],
  },
  {
    role: "Charity Shop Volunteer",
    company: "YMCA",
    period: "May 2023 – Jun 2023",
    type: "Volunteer",
    bullets: [
      "Designed attractive window and shop floor displays",
      "Provided advice and guidance to customers",
      "Processed, labelled and displayed donations to maximise sales",
      "Assessed donated goods to ensure quality and presentation",
    ],
  },
];

const SKILLS = [
  "Administration Support","Microsoft 365","Data Entry","Document Management",
  "Office Administration","Diary Management","Attention to Detail","Confidentiality",
  "Written Communication","Verbal Communication","Multitasking","Organisation",
  "Presentation Skills","Decision Making","Calm Under Pressure","Active Listening",
  "Leadership","Team Building","Social Media","Willingness to Learn",
];

const ACHIEVEMENTS = [
  { icon: "✈️", title: "RAFAC International Exchange 2026", desc: "Competitively selected for a prestigious international exchange programme to the USA — involving aviation exposure and leadership engagement with allied air cadet organisations." },
  { icon: "🎖️", title: "Flight Sergeant – RAF Air Cadets", desc: "Progressed to Flight Sergeant since joining in 2021. Qualified to teach new cadets in classifications and various areas of learning as part of the training team." },
  { icon: "🛡️", title: "Leadership Courses", desc: "Completed Bronze and Silver Leadership Courses, Method of Instruction, Cadet Drill Course, and Master Air Cadet Classification." },
  { icon: "🔐", title: "Cyber Security", desc: "Introduction to Cyber Security (OpenLearn), Bronze and Silver Cyber Courses. Passionate about pursuing a career in cybersecurity or aviation technology." },
  { icon: "🤝", title: "OVOS Volunteer", desc: "Part of Our Voice Our Service since ~2017, supporting care-experienced young people. Chaired interview panels and represented young people's voices at events." },
  { icon: "🏥", title: "Care Certificate & VTQs", desc: "Care Certificate (Sep 2025), Customer Service L2, Complaint Handling L1, Presentation Skills L1, GDPR Certified, Equality Act 2010 Certified." },
  { icon: "🚶", title: "Road Marching", desc: "Completed 15km, 20km and 25km road marches, Basic First Aid, and Radio Basic Operator qualification." },
];

const EDUCATION = [
  { year: "2024", qual: "Level 2 Business Support & Level 1 Business Admin", place: "Barnardo's Study Programme, Midlands ETS" },
  { year: "2023", qual: "GCSE English Language (5), GCSE Fine Art (4), ASDAN L1 Award of Personal Effectiveness", place: "The Triple Crown Centre, Solihull" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, y = 24 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const progress = Math.min(scrollY / (document.body?.scrollHeight - window.innerHeight || 1), 1);

  const s = styles;

  return (
    <div style={s.page}>
      {/* Progress bar */}
      <div style={{ ...s.progressBar, width: `${progress * 100}%` }} />

      {/* Backgrounds */}
      <div style={s.bgBase} />
      <div style={s.orbL} />
      <div style={s.orbR} />
      <div style={s.bgGlow} />
      <div style={s.bgGrid} />

      {/* Header */}
      <header style={s.header}>
        <div style={s.headerInner}>
          <div style={s.brand}>
            <div style={s.logoCircle}>KC</div>
            <div>
              <p style={s.brandTop}>Keelie Cadby</p>
              <p style={s.brandSub}>Portfolio</p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav style={s.desktopNav}>
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} style={s.navBtn}>{n}</button>
            ))}
          </nav>

          <button onClick={() => scrollTo("contact")} style={s.contactBtnTop}>Contact Me</button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)} style={s.hamburger} aria-label="Menu">
            <span style={{ ...s.bar, transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
            <span style={{ ...s.bar, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...s.bar, transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={s.mobileMenu}>
            {NAV.map(n => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} style={s.mobileNavBtn}>{n}</button>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section id="home" style={s.hero}>
          <div style={s.heroInner}>
            <div style={s.heroLeft}>
              <div style={s.heroTag}>Business Admin Apprentice · Birmingham, UK</div>
              <h1 style={s.heroTitle}>
                Building my future with <span style={s.pink}>confidence,</span> resilience & ambition.
              </h1>
              <p style={s.heroText}>
                From RAF Air Cadets to a Business Admin Apprenticeship — I'm Keelie Cadby, a driven and organised professional growing every day in a real working environment.
              </p>
              <div style={s.heroBtns}>
                <a href="mailto:keecadby2405@gmail.com" style={s.btnPrimary}>✉ Email Me</a>
                <a href="https://www.linkedin.com/in/keelie-cadby-967321337/" target="_blank" rel="noreferrer" style={s.btnSecondary}>in LinkedIn</a>
              </div>
            </div>

            <div style={s.heroCards}>
              {[
                { label: "Current Role", val: "Apprentice Business Admin" },
                { label: "Organisation", val: "Auxilio Care Ltd" },
                { label: "RAF Cadets Rank", val: "Flight Sergeant" },
                { label: "Since", val: "2021" },
              ].map((c, i) => (
                <div key={i} style={{ ...s.statCard, ...(i % 2 === 1 ? s.statCardPink : {}) }}>
                  <p style={s.statLabel}>{c.label}</p>
                  <p style={s.statVal}>{c.val}</p>
                </div>
              ))}
            </div>
          </div>

          <a href="#about" onClick={e => { e.preventDefault(); scrollTo("about"); }} style={s.scrollPill}>
            Scroll ↓
          </a>
        </section>

        {/* ABOUT */}
        <section id="about" style={s.section}>
          <div style={s.container}>
            <FadeIn>
              <p style={s.eyebrow}>About Me</p>
              <h2 style={s.secTitle}>My journey has shaped the person I'm becoming.</h2>
              <p style={s.secText}>
                I'm a highly organised and efficient Business Support student with strong administrative experience. I haven't had the easiest journey, but that's exactly what has built my strength. From progressing through the RAF Air Cadets to earning a competitive place on an international exchange to the USA, I've learned to show up with discipline, pride, and ambition every single day.
              </p>
            </FadeIn>

            <div style={s.twoCol}>
              {[
                { t: "Where I Come From", p: "My background has built resilience, patience and self-respect. Everything I've faced has made me more determined and more capable. I've learned that growth takes effort — and I put that effort in every day." },
                { t: "Where I'm Going", p: "I'm passionate about cybersecurity, aviation and technology. I'm building the professional foundation now through my apprenticeship so I can move confidently towards a career I'm truly excited about.", pink: true },
              ].map((c, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div style={c.pink ? s.cardPinkLg : s.cardGlassLg}>
                    <p style={{ ...s.eyebrow, color: c.pink ? "rgba(255,232,242,.85)" : undefined }}>{c.t}</p>
                    <p style={{ ...s.lgCopy, color: c.pink ? "rgba(255,255,255,.92)" : undefined }}>{c.p}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Education */}
            <FadeIn delay={0.1}>
              <p style={{ ...s.eyebrow, marginTop: 56 }}>Education</p>
              <div style={s.eduGrid}>
                {EDUCATION.map((e, i) => (
                  <div key={i} style={s.eduCard}>
                    <span style={s.eduYear}>{e.year}</span>
                    <div>
                      <p style={s.eduQual}>{e.qual}</p>
                      <p style={s.eduPlace}>{e.place}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" style={s.sectionAlt}>
          <div style={s.container}>
            <FadeIn>
              <p style={s.eyebrow}>Experience</p>
              <h2 style={s.secTitle}>Real work. Real growth. Real results.</h2>
              <p style={s.secText}>From voluntary work to a full apprenticeship — every role has added to my professional development and shaped how I work.</p>
            </FadeIn>

            <div style={s.expList}>
              {EXPERIENCE.map((ex, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div style={s.expCard}>
                    <div style={s.expHeader}>
                      <div>
                        <h3 style={s.expRole}>{ex.role}</h3>
                        <p style={s.expCompany}>{ex.company}</p>
                      </div>
                      <div style={s.expMeta}>
                        <span style={s.expPeriod}>{ex.period}</span>
                        <span style={s.expType}>{ex.type}</span>
                      </div>
                    </div>
                    <ul style={s.expBullets}>
                      {ex.bullets.map((b, j) => (
                        <li key={j} style={s.expBullet}>
                          <span style={s.bulletDot} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div style={s.cardLine} />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={s.section}>
          <div style={s.container}>
            <FadeIn>
              <p style={s.eyebrow}>Skills</p>
              <h2 style={s.secTitle}>The strengths I bring to every role.</h2>
              <p style={s.secText}>Developed through my apprenticeship, volunteering, RAF Cadets and lived experience — these are the skills I offer.</p>
            </FadeIn>
            <div style={s.skillsGrid}>
              {SKILLS.map((sk, i) => (
                <FadeIn key={sk} delay={i * 0.03}>
                  <div style={s.skillBox}>{sk}</div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section id="achievements" style={s.sectionAlt}>
          <div style={s.container}>
            <FadeIn>
              <p style={s.eyebrow}>Achievements & Interests</p>
              <h2 style={s.secTitle}>Beyond the job description.</h2>
              <p style={s.secText}>My accomplishments span military leadership, community volunteering, cybersecurity and martial arts — each one shaping who I am professionally and personally.</p>
            </FadeIn>
            <div style={s.achGrid}>
              {ACHIEVEMENTS.map((a, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div style={s.achCard}>
                    <div style={s.achIcon}>{a.icon}</div>
                    <h3 style={s.achTitle}>{a.title}</h3>
                    <p style={s.achDesc}>{a.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* GOALS */}
        <section id="goals" style={s.sectionGoals}>
          <div style={s.container}>
            <FadeIn>
              <p style={s.eyebrow}>My Goals</p>
              <h2 style={s.secTitle}>Focused on creating a future I can be proud of.</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={s.goalPanel}>
                <p style={s.goalText}>
                  My goal is to build a successful and stable career — ideally in cybersecurity, aviation or technology. I'm laying the groundwork now through my Business Admin Apprenticeship, developing the professional skills, qualifications and mindset I need to progress. I want to be someone who is confident, capable and respected — and I'm committed to putting in the work every single day to get there.
                </p>
                <div style={s.goalTags}>
                  {["Cybersecurity", "Aviation", "Technology", "Leadership", "Professionalism", "Continuous Learning"].map(t => (
                    <span key={t} style={s.goalTag}>{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={s.section}>
          <div style={s.container}>
            <FadeIn>
              <div style={s.contactPanel}>
                <div style={s.contactGrid}>
                  <div>
                    <p style={s.eyebrow}>Get In Touch</p>
                    <h2 style={s.secTitle}>Ready for new opportunities & connections.</h2>
                    <p style={s.secText}>I'm focused on moving forward with confidence, pride and commitment. Whether it's a new opportunity or just a conversation — I'd love to hear from you.</p>
                    <div style={s.contactInfo}>
                      <p style={s.contactLine}>📍 Birmingham, United Kingdom</p>
                      <p style={s.contactLine}>📞 07391 025873</p>
                      <p style={s.contactLine}>✉ keecadby2405@gmail.com</p>
                    </div>
                  </div>
                  <div style={s.contactBtns}>
                    <a href="mailto:keecadby2405@gmail.com" style={s.btnPrimary}>✉ Email Me</a>
                    <a href="https://www.linkedin.com/in/keelie-cadby-967321337/" target="_blank" rel="noreferrer" style={s.btnSecondary}>in LinkedIn</a>
                    <a href="tel:07391025873" style={s.btnSecondary}>📞 Call Me</a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer style={s.footer}>
        <p style={s.footerText}>© 2025 Keelie Cadby · Built with pride</p>
      </footer>
    </div>
  );
}

const pink = "#f472b6";
const pinkDim = "rgba(244,114,182,";

const styles = {
  page: { minHeight: "100dvh", background: "#0d1117", color: "#fff", fontFamily: "Inter,system-ui,sans-serif", overflowX: "hidden", WebkitFontSmoothing: "antialiased" },
  progressBar: { position: "fixed", top: 0, left: 0, height: 3, background: pink, zIndex: 100, transition: "width .1s linear" },
  bgBase: { position: "fixed", inset: 0, zIndex: -20, background: "linear-gradient(to bottom,#090b10,#0d1117,#11151d)" },
  orbL: { position: "fixed", left: -80, top: 0, zIndex: -10, width: 400, height: 400, borderRadius: "50%", background: pinkDim+"0.13)", filter: "blur(80px)" },
  orbR: { position: "fixed", right: -80, top: 320, zIndex: -10, width: 440, height: 440, borderRadius: "50%", background: "rgba(217,70,239,0.09)", filter: "blur(80px)" },
  bgGlow: { position: "fixed", inset: 0, zIndex: -10, background: `radial-gradient(circle at top,${pinkDim}0.13),transparent 28%),radial-gradient(circle at 80% 20%,rgba(217,70,239,0.09),transparent 18%)` },
  bgGrid: { position: "fixed", inset: 0, zIndex: -10, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(circle at center,black,transparent 88%)" },

  header: { position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,0.09)", background: "rgba(13,17,23,0.75)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" },
  headerInner: { maxWidth: 1280, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 },
  brand: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },
  logoCircle: { width: 40, height: 40, borderRadius: "50%", border: `1px solid ${pinkDim}0.35)`, background: pinkDim+"0.12)", color: "#f9a8d4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 },
  brandTop: { margin: 0, fontSize: 14, fontWeight: 600, color: "#fff" },
  brandSub: { margin: "2px 0 0", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#9ca3af" },
  desktopNav: { display: "flex", gap: 4, alignItems: "center", "@media(max-width:768px)": { display: "none" } },
  navBtn: { background: "none", border: "none", color: "#d1d5db", fontSize: 13, cursor: "pointer", padding: "6px 10px", borderRadius: 8, fontFamily: "inherit" },
  contactBtnTop: { display: "inline-flex", alignItems: "center", borderRadius: 999, background: pink, color: "#0f172a", textDecoration: "none", padding: "10px 18px", fontSize: 13, fontWeight: 700, flexShrink: 0, whiteSpace: "nowrap" },
  hamburger: { display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 6 },
  bar: { display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "all .25s" },
  mobileMenu: { display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "8px 0" },
  mobileNavBtn: { background: "none", border: "none", color: "#d1d5db", fontSize: 15, cursor: "pointer", padding: "12px 24px", fontFamily: "inherit", textAlign: "left" },

  hero: { position: "relative", minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 20px 60px" },
  heroInner: { maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" },
  heroLeft: { display: "flex", flexDirection: "column", gap: 20 },
  heroTag: { display: "inline-flex", alignSelf: "flex-start", borderRadius: 999, border: `1px solid ${pinkDim}0.22)`, background: pinkDim+"0.10)", color: "rgba(251,207,232,0.9)", padding: "8px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.3em" },
  heroTitle: { margin: 0, fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f8e7f1" },
  pink: { color: pink },
  heroText: { margin: 0, fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.8)", maxWidth: 580 },
  heroBtns: { display: "flex", flexWrap: "wrap", gap: 12 },
  btnPrimary: { display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, background: pink, color: "#111827", textDecoration: "none", padding: "14px 22px", fontSize: 14, fontWeight: 700, boxShadow: `0 10px 28px ${pinkDim}0.20)` },
  btnSecondary: { display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)", color: "#fff", textDecoration: "none", padding: "14px 22px", fontSize: 14, fontWeight: 600, backdropFilter: "blur(10px)" },
  heroCards: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  statCard: { borderRadius: 20, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.06)", padding: "20px", backdropFilter: "blur(16px)" },
  statCardPink: { border: `1px solid ${pinkDim}0.22)`, background: pinkDim+"0.11)" },
  statLabel: { margin: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(251,207,232,0.7)" },
  statVal: { margin: "8px 0 0", fontSize: 17, fontWeight: 700, color: "#f8e7f1", lineHeight: 1.3 },
  scrollPill: { alignSelf: "center", marginTop: 48, display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.05)", color: "#9ca3af", textDecoration: "none", padding: "9px 16px", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.25em" },

  section: { padding: "72px 20px", borderTop: "1px solid rgba(255,255,255,0.07)" },
  sectionAlt: { padding: "72px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.025)" },
  sectionGoals: { padding: "72px 20px", borderTop: "1px solid rgba(255,255,255,0.07)", background: `radial-gradient(circle at top right,${pinkDim}0.10),transparent 32%)` },
  container: { maxWidth: 1200, margin: "0 auto" },
  eyebrow: { margin: 0, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.38em", color: "rgba(251,207,232,0.7)" },
  secTitle: { margin: "14px 0 0", fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#f8e7f1" },
  secText: { marginTop: 16, fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.78)", maxWidth: 760 },
  lgCopy: { marginTop: 16, fontSize: 17, lineHeight: 1.9, color: "rgba(231,229,228,0.86)" },

  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 36 },
  cardGlassLg: { borderRadius: 24, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.06)", padding: 28, backdropFilter: "blur(16px)", height: "100%" },
  cardPinkLg: { borderRadius: 24, border: `1px solid ${pinkDim}0.22)`, background: pinkDim+"0.11)", padding: 28, backdropFilter: "blur(16px)", height: "100%" },

  eduGrid: { display: "flex", flexDirection: "column", gap: 14, marginTop: 20 },
  eduCard: { display: "flex", gap: 20, alignItems: "flex-start", borderRadius: 18, border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.04)", padding: "18px 22px" },
  eduYear: { fontSize: 13, fontWeight: 700, color: pink, minWidth: 38, paddingTop: 2 },
  eduQual: { margin: 0, fontSize: 14, fontWeight: 600, color: "#f8e7f1", lineHeight: 1.5 },
  eduPlace: { margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.55)" },

  expList: { display: "flex", flexDirection: "column", gap: 24, marginTop: 36 },
  expCard: { borderRadius: 24, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(19,26,35,0.90)", padding: "28px 28px 24px", backdropFilter: "blur(16px)" },
  expHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" },
  expRole: { margin: 0, fontSize: 22, fontWeight: 700, color: "#f8e7f1" },
  expCompany: { margin: "4px 0 0", fontSize: 15, color: pink, fontWeight: 600 },
  expMeta: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 },
  expPeriod: { fontSize: 13, color: "rgba(255,255,255,0.55)", whiteSpace: "nowrap" },
  expType: { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(251,207,232,0.6)" },
  expBullets: { margin: "20px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 },
  expBullet: { display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, lineHeight: 1.7, color: "rgba(214,211,209,0.82)" },
  bulletDot: { display: "block", width: 6, height: 6, borderRadius: "50%", background: pink, flexShrink: 0, marginTop: 8 },
  cardLine: { marginTop: 24, height: 1, background: `linear-gradient(to right,${pinkDim}0.45),${pinkDim}0.15),transparent)` },

  skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 14, marginTop: 36 },
  skillBox: { borderRadius: 16, border: `1px solid ${pinkDim}0.15)`, background: pinkDim+"0.09)", padding: "14px 12px", textAlign: "center", fontSize: 14, fontWeight: 500, color: "#fce7f3", backdropFilter: "blur(12px)" },

  achGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20, marginTop: 36 },
  achCard: { borderRadius: 22, border: "1px solid rgba(255,255,255,0.09)", background: "rgba(255,255,255,0.05)", padding: 24, backdropFilter: "blur(14px)" },
  achIcon: { fontSize: 28, marginBottom: 12 },
  achTitle: { margin: 0, fontSize: 16, fontWeight: 700, color: "#f8e7f1", lineHeight: 1.3 },
  achDesc: { margin: "10px 0 0", fontSize: 14, lineHeight: 1.8, color: "rgba(214,211,209,0.78)" },

  goalPanel: { marginTop: 36, borderRadius: 28, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.05)", padding: "40px", backdropFilter: "blur(20px)" },
  goalText: { margin: 0, fontSize: 18, lineHeight: 2, color: "rgba(231,229,228,0.88)", maxWidth: 900 },
  goalTags: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 },
  goalTag: { borderRadius: 999, border: `1px solid ${pinkDim}0.24)`, background: pinkDim+"0.12)", color: "#fce7f3", padding: "8px 16px", fontSize: 13, fontWeight: 500 },

  contactPanel: { borderRadius: 26, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.05)", padding: "40px", backdropFilter: "blur(18px)" },
  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" },
  contactInfo: { marginTop: 24, display: "flex", flexDirection: "column", gap: 10 },
  contactLine: { margin: 0, fontSize: 15, color: "rgba(255,255,255,0.72)" },
  contactBtns: { display: "flex", flexDirection: "column", gap: 14, paddingTop: 8 },

  footer: { borderTop: "1px solid rgba(255,255,255,0.07)", padding: "24px 20px", textAlign: "center" },
  footerText: { margin: 0, fontSize: 13, color: "rgba(255,255,255,0.35)" },
};

// Inject responsive CSS
const css = `
  @media (max-width: 900px) {
    .hero-inner { grid-template-columns: 1fr !important; }
    .hero-cards { grid-template-columns: 1fr 1fr !important; }
    .two-col { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 640px) {
    .desktop-nav { display: none !important; }
    .hamburger { display: flex !important; }
    .contact-btn-top { display: none !important; }
    .hero-cards { grid-template-columns: 1fr 1fr !important; }
    .exp-header { flex-direction: column !important; }
    .exp-meta { align-items: flex-start !important; }
    .hero-btns { flex-direction: column !important; }
    .hero-btns a { justify-content: center; }
  }
`;

// Apply via style tag
if (typeof document !== "undefined") {
  const existing = document.getElementById("kc-styles");
  if (!existing) {
    const tag = document.createElement("style");
    tag.id = "kc-styles";
    tag.textContent = css;
    document.head.appendChild(tag);
  }
}
