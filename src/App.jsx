import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experienceItems = [
  {
    title: "Developing Myself Professionally",
    subtitle: "Growing with purpose",
    description:
      "I am constantly building my communication, organisation and confidence so I can present myself professionally and take on new opportunities with clarity and focus.",
  },
  {
    title: "Overcoming Challenges",
    subtitle: "Turning setbacks into strength",
    description:
      "I have faced challenges that have shaped my mindset. Instead of holding me back, they have made me stronger, more disciplined and more determined to succeed.",
  },
  {
    title: "My Mindset",
    subtitle: "Pride and commitment",
    description:
      "I take pride in who I am becoming. I show up with confidence, put effort into everything I do, and stay committed to building a better future for myself.",
  },
];

const skills = [
  "Communication",
  "Confidence",
  "Adaptability",
  "Teamwork",
  "Creativity",
  "Professionalism",
  "Commitment",
  "Resilience",
];

const storyPoints = [
  "Where I come from has shaped my mindset.",
  "Where I am now reflects growth and perseverance.",
  "Where I am going is driven by ambition and self-belief.",
];

function IconWrapper({ children, size = 20, style = {} }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      aria-hidden="true"
      style={style}
    >
      {children}
    </svg>
  );
}

function MailIcon({ size = 18, style = {} }) {
  return (
    <IconWrapper size={size} style={style}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </IconWrapper>
  );
}

function LinkedInIcon({ size = 18, style = {} }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
      style={style}
    >
      <path d="M6.94 8.5a1.56 1.56 0 1 0 0-3.12 1.56 1.56 0 0 0 0 3.12ZM5.6 9.75h2.68V18H5.6V9.75Zm4.36 0h2.57v1.13h.04c.36-.68 1.23-1.39 2.53-1.39 2.7 0 3.2 1.78 3.2 4.1V18h-2.68v-3.91c0-.93-.02-2.13-1.3-2.13-1.31 0-1.51 1.02-1.51 2.06V18H9.96V9.75Z" />
    </svg>
  );
}

function ArrowDownIcon({ size = 16, style = {} }) {
  return (
    <IconWrapper size={size} style={style}>
      <path d="M12 5v14" />
      <path d="m6 13 6 6 6-6" />
    </IconWrapper>
  );
}

function StarIcon({ size = 18, style = {} }) {
  return (
    <IconWrapper size={size} style={style}>
      <path d="M12 3.5l2.5 5.05 5.58.81-4.04 3.94.95 5.56L12 16.95 7.01 18.86l.95-5.56-4.04-3.94 5.58-.81L12 3.5Z" />
    </IconWrapper>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function SectionIntro({ eyebrow, title, text }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={reveal}
      style={{ maxWidth: 760 }}
    >
      <p style={styles.eyebrow}>{eyebrow}</p>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <p style={styles.sectionText}>{text}</p>
    </motion.div>
  );
}

function StoryCard({ text, wide }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      style={{
        ...styles.glassCard,
        minHeight: 150,
        gridColumn: wide ? "span 2" : "span 1",
      }}
    >
      <p style={styles.smallLabel}>Personal focus</p>
      <p style={{ fontSize: 28, lineHeight: 1.2, fontWeight: 600, marginTop: 16 }}>
        {text}
      </p>
    </motion.div>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);
  const orbOneY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const orbTwoY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

const [verified, setVerified] = useState(false);
useEffect(() => {
  window.onTurnstileSuccess = () => setVerified(true);
  return () => {
    delete window.onTurnstileSuccess;
  };
}, []);
  return (
  <>
    {!verified && (
      <div style={styles.captchaOverlay}>
        <div style={styles.captchaBox}>
          <p style={styles.eyebrow}>Verification</p>
          <h2 style={styles.sectionTitle}>Please verify to enter my portfolio</h2>
          <p style={styles.sectionText}>
            Complete the security check to continue to my website.
          </p>

          <div
  className="cf-turnstile"
  data-sitekey="0x4AAAAAACy9qo372FzJWivY"
  data-theme="dark"
  data-callback="onTurnstileSuccess"
  data-appearance="always"
  data-size="normal"
  style={{ marginTop: "20px" }}
></div>
        </div>
      </div>
    )}

    {verified && (
      <div style={styles.page}>      
       <motion.div
  style={{
    ...styles.progress,
    scaleX: progressScaleX,
    transformOrigin: "0% 50%",
  }}
/>

      <div style={styles.backgroundBase} />
      <motion.div style={{ ...styles.orbLeft, y: orbOneY }} />
      <motion.div style={{ ...styles.orbRight, y: orbTwoY }} />
      <div style={styles.backgroundGlow} />
      <div style={styles.backgroundGrid} />

      <header style={styles.header}>
        <div style={styles.headerInner}>
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={styles.brand}
          >
            <div style={styles.logoCircle}>
              <StarIcon size={18} />
            </div>
            <div>
              <p style={styles.brandTop}>Keelie Cadby</p>
              <p style={styles.brandBottom}>My Portfolio</p>
            </div>
          </motion.div>

          <nav style={styles.nav}>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="#experience" style={styles.navLink}>Experience</a>
            <a href="#skills" style={styles.navLink}>Skills</a>
            <a href="#goals" style={styles.navLink}>Goals</a>
            <a href="#contact" style={styles.navLink}>Contact</a>
          </nav>

          <a href="#contact" style={styles.contactButtonTop}>Contact Me</a>
        </div>
      </header>

      <main>
        <section style={styles.heroSection}>
          <motion.div
            style={{ ...styles.heroGrid, y: heroY, opacity: heroOpacity }}
          >
            <div>
              <motion.p
                initial="hidden"
                animate="visible"
                custom={0}
                variants={fadeUp}
                style={styles.heroTag}
              >
                My story • My growth • My future
              </motion.p>
<motion.h1
  initial="hidden"
  animate="visible"
  custom={1}
  variants={fadeUp}
  className="mt-7 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
>
  I’m a Business Admin Apprentice building my future with confidence, resilience, and ambition.
</motion.h1>

              <motion.p
                initial="hidden"
                animate="visible"
                custom={2}
                variants={fadeUp}
                style={styles.heroText}
              >
                I know where I come from, I know how much I’ve grown, and I’m focused on where I’m going. As a Business Admin Apprentice, I am gaining real experience while continuing to improve, learn, and build a strong future for myself.
              </motion.p>

              <motion.div
                initial="hidden"
                animate="visible"
                custom={3}
                variants={fadeUp}
                style={styles.heroButtons}
              >
                
                <a href="mailto:Keecadby2405@gmail.com" style={styles.primaryButton}>
                  <MailIcon size={16} style={{ marginRight: 8 }} />
                  Email Me
                </a>
                <a
                  href="https://www.linkedin.com/in/keelie-cadby-967321337/"
                  target="_blank"
                  rel="noreferrer"
                  style={styles.secondaryButton}
                >
                  <LinkedInIcon size={16} style={{ marginRight: 8 }} />
                  LinkedIn
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              style={styles.storyGrid}
            >
              <StoryCard text={storyPoints[0]} wide />
              <StoryCard text={storyPoints[1]} />
              <StoryCard text={storyPoints[2]} />
              <motion.div whileHover={{ y: -8 }} style={styles.pinkCard}>
                <p style={{ ...styles.smallLabel, color: "rgba(255,232,242,0.85)" }}>
                  Mindset
                </p>
                <p style={{ fontSize: 17, lineHeight: 1.9, marginTop: 16 }}>
                  I take pride in how far I’ve come, and I stay committed to becoming
                  more capable, more confident, and more ready for every opportunity ahead.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.a
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            style={styles.scrollPill}
          >
            Scroll
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              style={{ display: "inline-flex", marginLeft: 8 }}
            >
              <ArrowDownIcon size={14} />
            </motion.span>
          </motion.a>
        </section>

        <section id="about" style={styles.sectionWrap}>
          <SectionIntro
            eyebrow="About Me"
            title="My journey has shaped the person I am becoming."
            text="I haven’t had the easiest journey, but that is exactly what has built my strength. I have learned how to keep going, stay focused, and believe in myself even through difficult moments. Everything I have been through has developed my confidence and made me more determined to succeed. I take pride in my growth, and I am committed to continuing that progress."
          />

          <div style={styles.twoCol}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              whileHover={{ y: -6 }}
            >
              <div style={styles.glassCardLarge}>
                <p style={styles.eyebrow}>Where I come from</p>
                <p style={styles.largeCopy}>
                  My background has taught me resilience, patience, and self-respect.
                  It has shown me that growth takes effort and that becoming the person
                  I want to be is something I build every day.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div style={styles.pinkCardLarge}>
                <p style={{ ...styles.eyebrow, color: "rgba(255,232,242,0.85)" }}>
                  Where I am now
                </p>
                <p style={{ ...styles.largeCopy, color: "rgba(255,255,255,0.92)" }}>
                  I am in a stage of real growth. I am learning, improving, and pushing
                  myself to become more professional, more capable, and more prepared
                  for the future I want.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="experience" style={styles.sectionAlt}>
          <div style={styles.container}>
            <SectionIntro
              eyebrow="Experience"
              title="My experience reflects growth, discipline, and mindset."
              text="This section highlights how I am developing professionally, how I respond to challenges, and the attitude I bring into everything I do."
            />

            <div style={styles.cardGrid3}>
              {experienceItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  custom={index + 1}
                  whileHover={{ y: -10 }}
                >
                  <div style={styles.darkCard}>
                    <p style={styles.smallLabel}>{item.subtitle}</p>
                    <h3 style={styles.cardTitle}>{item.title}</h3>
                    <p style={styles.cardText}>{item.description}</p>
                    <div style={styles.cardLine} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" style={styles.sectionWrap}>
          <SectionIntro
            eyebrow="Skills"
            title="The strengths I am building into my future."
text="These are the key skills I am developing as a Business Admin Apprentice to grow professionally and succeed in a structured working environment."
          />

          <div style={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                whileHover={{ y: -6, scale: 1.02 }}
                style={styles.skillBox}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </section>

        <section id="goals" style={styles.sectionGoals}>
          <div style={styles.container}>
            <SectionIntro
              eyebrow="My Goals"
              title="I am focused on creating a future I can be proud of."
              text="My goals are centred around growth, independence, professionalism, and becoming someone who is respected for her mindset, consistency, and ambition."
            />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={reveal}
              whileHover={{ y: -6 }}
              style={{ marginTop: 48 }}
            >
              <div style={styles.goalPanel}>
                <p style={styles.goalText}>
                  My goal is to build a successful and stable future for myself. I want
                  to keep improving my skills, gain experience, and become someone who
                  is confident, capable, and respected in a professional environment.
                  I am focused on growth, consistency, and making something of myself
                  that I can truly be proud of.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" style={styles.sectionWrap}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={reveal}
            style={styles.contactPanel}
          >
            <div style={styles.contactGrid}>
              <div>
                <p style={styles.eyebrow}>Contact</p>
                <h2 style={styles.sectionTitle}>
                  I’m ready for new opportunities, growth, and meaningful connections.
                </h2>
                <p style={styles.sectionText}>
                  I want my next steps to reflect the work I’ve put into myself. I’m
                  focused on moving forward with confidence, pride, and commitment.
                </p>
              </div>

              <div style={styles.contactButtons}>
                <a href="mailto:Keecadby2405@gmail.com" style={styles.primaryButton}>
                  <MailIcon size={16} style={{ marginRight: 8 }} />
                  Email Me
                </a>
                <a
                  href="https://www.linkedin.com/in/keelie-cadby-967321337/"
                  target="_blank"
                  rel="noreferrer"
                  style={styles.secondaryButton}
                >
                  <LinkedInIcon size={16} style={{ marginRight: 8 }} />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
               </section>
      </main>
    </div>
  )}
</>
);
}

const styles = {
  captchaOverlay: {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  background: "rgba(9,11,16,0.92)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
},

captchaBox: {
  width: "100%",
  maxWidth: 560,
  borderRadius: 30,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.05)",
  padding: 40,
  backdropFilter: "blur(22px)",
  boxShadow: "0 20px 50px rgba(0,0,0,0.20)",
  textAlign: "center",
},
  page: {
    minHeight: "100vh",
    overflowX: "hidden",
    background: "#0d1117",
    color: "white",
    fontFamily: "Inter, system-ui, sans-serif",
    position: "relative",
  },
  progress: {
    position: "fixed",
    top: 0,
    left: 0,
    height: 3,
    width: "100%",
    background: "#f472b6",
    zIndex: 70,
  },
  backgroundBase: {
    position: "fixed",
    inset: 0,
    zIndex: -20,
    background: "linear-gradient(to bottom, #090b10, #0d1117, #11151d)",
  },
  orbLeft: {
    position: "fixed",
    left: -96,
    top: 0,
    zIndex: -10,
    width: 448,
    height: 448,
    borderRadius: "50%",
    background: "rgba(236,72,153,0.15)",
    filter: "blur(90px)",
  },
  orbRight: {
    position: "fixed",
    right: -96,
    top: 288,
    zIndex: -10,
    width: 480,
    height: 480,
    borderRadius: "50%",
    background: "rgba(217,70,239,0.10)",
    filter: "blur(90px)",
  },
  backgroundGlow: {
    position: "fixed",
    inset: 0,
    zIndex: -10,
    background:
      "radial-gradient(circle at top, rgba(236,72,153,0.14), transparent 28%), radial-gradient(circle at 80% 20%, rgba(217,70,239,0.10), transparent 18%)",
  },
  backgroundGrid: {
    position: "fixed",
    inset: 0,
    zIndex: -10,
    pointerEvents: "none",
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "70px 70px",
    maskImage: "radial-gradient(circle at center, black, transparent 88%)",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    borderBottom: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(13,17,23,0.70)",
    backdropFilter: "blur(20px)",
  },
  headerInner: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid rgba(244,114,182,0.30)",
    background: "rgba(244,114,182,0.10)",
    color: "#f9a8d4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(236,72,153,0.12)",
  },
  brandTop: {
    margin: 0,
    fontSize: 11,
    letterSpacing: "0.35em",
    textTransform: "uppercase",
    color: "#a8a29e",
  },
  brandBottom: {
    margin: "4px 0 0",
    fontSize: 14,
    fontWeight: 500,
    color: "#ffffff",
  },
  nav: {
    display: "flex",
    gap: 28,
    alignItems: "center",
  },
  navLink: {
    color: "#d6d3d1",
    textDecoration: "none",
    fontSize: 14,
  },
  contactButtonTop: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    background: "#f472b6",
    color: "#0f172a",
    textDecoration: "none",
    padding: "12px 20px",
    fontSize: 14,
    fontWeight: 600,
    boxShadow: "0 10px 30px rgba(236,72,153,0.20)",
  },
  heroSection: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    padding: "96px 24px",
  },
  heroGrid: {
    maxWidth: 1280,
    margin: "0 auto",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 48,
    alignItems: "end",
  },
  heroTag: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    border: "1px solid rgba(244,114,182,0.20)",
    background: "rgba(244,114,182,0.10)",
    color: "rgba(251,207,232,0.85)",
    padding: "10px 16px",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.35em",
    backdropFilter: "blur(8px)",
  },
  heroTitle: {
    margin: "28px 0 0",
    maxWidth: 820,
    fontSize: "clamp(3rem, 8vw, 5.5rem)",
    fontWeight: 600,
    lineHeight: 1.02,
    letterSpacing: "-0.04em",
  },
  heroText: {
    marginTop: 28,
    maxWidth: 680,
    fontSize: 18,
    lineHeight: 1.8,
    color: "rgba(214,211,209,0.85)",
  },
  heroButtons: {
    marginTop: 40,
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    background: "#f472b6",
    color: "#111827",
    textDecoration: "none",
    padding: "16px 24px",
    fontSize: 14,
    fontWeight: 600,
    boxShadow: "0 12px 30px rgba(236,72,153,0.20)",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "#ffffff",
    textDecoration: "none",
    padding: "16px 24px",
    fontSize: 14,
    fontWeight: 600,
    backdropFilter: "blur(8px)",
  },
  storyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 16,
  },
  glassCard: {
    borderRadius: 28,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.05)",
    padding: 24,
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.20)",
  },
  pinkCard: {
    borderRadius: 28,
    border: "1px solid rgba(244,114,182,0.20)",
    background: "rgba(244,114,182,0.10)",
    padding: 24,
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 50px rgba(236,72,153,0.10)",
  },
  glassCardLarge: {
    borderRadius: 30,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.05)",
    padding: 40,
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.20)",
  },
  pinkCardLarge: {
    borderRadius: 30,
    border: "1px solid rgba(244,114,182,0.20)",
    background: "rgba(244,114,182,0.10)",
    padding: 40,
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 50px rgba(236,72,153,0.10)",
  },
  scrollPill: {
    position: "absolute",
    left: "50%",
    bottom: 32,
    transform: "translateX(-50%)",
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.05)",
    color: "#d6d3d1",
    textDecoration: "none",
    padding: "10px 16px",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.28em",
    backdropFilter: "blur(8px)",
  },
  sectionWrap: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "96px 24px",
  },
  sectionAlt: {
    borderTop: "1px solid rgba(255,255,255,0.10)",
    borderBottom: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.03)",
    padding: "96px 24px",
  },
  sectionGoals: {
    position: "relative",
    overflow: "hidden",
    borderTop: "1px solid rgba(255,255,255,0.10)",
    borderBottom: "1px solid rgba(255,255,255,0.10)",
    padding: "96px 24px",
    background:
      "radial-gradient(circle at top right, rgba(236,72,153,0.12), transparent 32%)",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  eyebrow: {
    margin: 0,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.35em",
    color: "rgba(251,207,232,0.70)",
  },
  smallLabel: {
    margin: 0,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.35em",
    color: "rgba(251,207,232,0.70)",
  },
  sectionTitle: {
    margin: "16px 0 0",
    fontSize: "clamp(2rem, 4vw, 2.7rem)",
    fontWeight: 600,
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
  },
  sectionText: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 2,
    color: "rgba(214,211,209,0.80)",
    maxWidth: 760,
  },
  largeCopy: {
    marginTop: 20,
    fontSize: 18,
    lineHeight: 1.9,
    color: "rgba(231,229,228,0.86)",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    gap: 24,
    marginTop: 48,
  },
  cardGrid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 24,
    marginTop: 48,
  },
  darkCard: {
    height: "100%",
    borderRadius: 30,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(19,26,35,0.90)",
    padding: 32,
    backdropFilter: "blur(18px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.20)",
  },
  cardTitle: {
    margin: "16px 0 0",
    fontSize: 28,
    fontWeight: 600,
  },
  cardText: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 2,
    color: "rgba(214,211,209,0.80)",
  },
  cardLine: {
    marginTop: 32,
    height: 1,
    width: "100%",
    background:
      "linear-gradient(to right, rgba(244,114,182,0.50), rgba(251,207,232,0.20), transparent)",
  },
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: 16,
    marginTop: 48,
  },
  skillBox: {
    borderRadius: 24,
    border: "1px solid rgba(244,114,182,0.12)",
    background: "rgba(244,114,182,0.10)",
    padding: "20px 16px",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 500,
    color: "#fce7f3",
    backdropFilter: "blur(18px)",
    boxShadow: "0 10px 30px rgba(236,72,153,0.05)",
  },
  goalPanel: {
    borderRadius: 34,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.05)",
    padding: 48,
    backdropFilter: "blur(22px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.20)",
  },
  goalText: {
    maxWidth: 900,
    fontSize: 18,
    lineHeight: 2,
    color: "rgba(231,229,228,0.86)",
  },
  contactPanel: {
    borderRadius: 36,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.05)",
    padding: 48,
    backdropFilter: "blur(22px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.20)",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 32,
    alignItems: "end",
  },
  contactButtons: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
};
