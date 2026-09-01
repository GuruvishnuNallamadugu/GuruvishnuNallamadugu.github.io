/**
 * Single source of truth for all site content.
 * Edit this file to update the portfolio — no component changes needed.
 */

export const profile = {
  name: "Guruvishnu Nallamadugu",
  shortName: "Guruvishnu",
  initials: "GN",
  role: "Mechanical Design & Manufacturing Engineer",
  tagline: "Aerospace · CAD & GD&T · Prototyping · Process Improvement",
  location: "Starkville, Mississippi, USA",
  email: "guruvishnu1922@gmail.com",
  // Phone is intentionally NOT published on the public site — it lives on the
  // resume PDF instead. Add it here only if you want it crawlable.
  linkedin: "https://www.linkedin.com/in/guruvishnunallamadugu/",
  github: "https://github.com/GuruvishnuNallamadugu",
  resumePath: "/assets/Guruvishnu_Nallamadugu_Resume.pdf",
  availability: "Open to Mechanical Design & Manufacturing Engineering roles",
} as const;

export const seo = {
  title: "Guruvishnu Nallamadugu | Mechanical Design & Manufacturing Engineer",
  description:
    "Mechanical Design & Manufacturing Engineer with 3+ years across aerospace and research equipment. CAD (Creo, NX, CATIA, SolidWorks), GD&T, DFM/DFA, rapid prototyping, and process improvement.",
  keywords: [
    "Mechanical Design Engineer",
    "Manufacturing Engineer",
    "Aerospace Engineer",
    "CAD",
    "GD&T",
    "DFM",
    "DFA",
    "Siemens NX",
    "SolidWorks",
    "Creo",
    "CATIA",
    "3D Printing",
    "Guruvishnu Nallamadugu",
  ],
} as const;

/* ------------------------------------------------------------------
   SUMMARY / ABOUT
   ------------------------------------------------------------------ */

export const summary = `Mechanical Design & Manufacturing Engineer with 3+ years of experience in mechanical design, manufacturing support, process improvement, and equipment development. Experienced in CAD design, GD&T, DFM/DFA, 3D printing, prototyping, BOMs, ECO/ECN, and root cause analysis.`;

export const aboutParagraphs = [
  `I design equipment that has to work outside the lab. My background runs from aerospace flight-control hardware at Tata Sikorsky, through cold-storage and HVAC manufacturing at Bharat Electronics, to my current role designing custom research instrumentation at Mississippi State University.`,
  `What connects those roles is a bias toward the practical end of engineering: taking a functional requirement, turning it into a 3D model that can actually be manufactured and assembled, printing it, testing it, and revising it. I work in Creo, Siemens NX, CATIA V5 and SolidWorks, and I lean hard on GD&T and tolerance stack-up analysis because most assembly problems are tolerance problems that nobody caught on the drawing.`,
  `On the manufacturing side, I've developed SOPs and run time studies that cut cycle time 25%, optimized aerospace part designs for automated production cells for an 8% cycle-time gain, and managed BOMs and ECO/ECN changes to keep configuration under control. I use RCA, 5-Why and DFMEA as everyday tools rather than paperwork.`,
  `I hold an M.S. and B.S. in Aerospace Engineering. Alongside the design work I run an ongoing research project modelling asteroid orbit transfers in Python with real JPL ephemeris data — the part of engineering where the math has to be right before any hardware exists.`,
];

/* ------------------------------------------------------------------
   METRICS — hero stat strip
   ------------------------------------------------------------------ */

export const metrics = [
  { value: "3+", label: "Years experience", detail: "Design, manufacturing & research" },
  { value: "25%", label: "Cycle time reduced", detail: "SOPs & time studies at BEL" },
  { value: "6-in-1", label: "Instrument assembly", detail: "Consolidated field system at MSU" },
  { value: "100+", label: "Students mentored", detail: "Per semester, 4 semesters" },
] as const;

/* ------------------------------------------------------------------
   EXPERIENCE
   ------------------------------------------------------------------ */

export interface Role {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  bullets: string[];
  stack: string[];
}

export const experience: Role[] = [
  {
    company: "Mississippi State University",
    title: "Design Engineer",
    location: "Starkville, MS",
    start: "Jan 2026",
    end: "Present",
    current: true,
    summary:
      "Designing custom research equipment and mechanical assemblies for laboratory and field deployment.",
    bullets: [
      "Design and develop custom research equipment and mechanical assemblies for laboratory and field applications, translating researchers' functional requirements into practical engineering solutions using 3D CAD modeling.",
      "Redesigned existing research equipment to reduce overall footprint, optimize space utilization and simplify field installation — including a compact 6-in-1 instrumentation assembly integrating multiple environmental and soil measurement devices into a single system.",
      "Apply DFM and DFA principles to component design, considering material selection, dimensions, tolerances, fastening methods, manufacturability, accessibility and ease of assembly.",
      "Develop functional prototypes using 3D printing to evaluate fit, form, component integration and functionality; iteratively refine CAD designs based on prototype testing, dimensional constraints and researcher feedback.",
      "Conduct field testing and design validation alongside research teams, comparing measurements from prototype integrated instruments against reference equipment to verify measurement consistency and confirm the mechanical design does not interfere with sensor accuracy.",
    ],
    stack: ["3D CAD", "DFM/DFA", "3D Printing", "Field Validation", "Prototyping"],
  },
  {
    company: "Mississippi State University",
    title: "Graduate Teaching Assistant",
    location: "Starkville, MS",
    start: "Jan 2024",
    end: "Dec 2025",
    summary:
      "Mechanics of Materials — four semesters of recitation, labs and mentoring.",
    bullets: [
      "Served as Graduate Teaching Assistant for Mechanics of Materials across 4 semesters, leading weekly recitation sessions and mentoring 100+ students each semester.",
      "Assisted students with laboratory experiments, connecting theoretical mechanics concepts to practical engineering applications and real-world problems.",
      "Supported exam preparation, proctoring and grading while providing guidance on problem-solving and course concepts.",
    ],
    stack: ["Mechanics of Materials", "Lab Instruction", "Mentoring"],
  },
  {
    company: "Tata Sikorsky",
    title: "CAD Designer",
    location: "India",
    start: "Dec 2021",
    end: "Dec 2022",
    summary:
      "Aerospace flight-control hardware — pulleys, guide brackets, tooling and tolerance analysis.",
    bullets: [
      "Designed flight control cable pulleys and mechanical guide brackets using Siemens NX and SolidWorks, supporting aerospace manufacturing and assembly requirements.",
      "Improved manufacturing cycle time by 8% by optimizing designs for automated production cells.",
      "Performed tolerance stack-up analysis (GD&T) to ensure manufacturability and eliminate assembly defects.",
      "Designed and evaluated tooling and fixtures to improve assembly efficiency and support production readiness.",
      "Collaborated with manufacturing and supplier teams, applying DFMEA/DFSS methods to improve product quality and reduce design and production risks.",
    ],
    stack: ["Siemens NX", "SolidWorks", "GD&T", "Tolerance Stack-Up", "DFMEA", "Tooling Design"],
  },
  {
    company: "Bharat Electronics Limited (BEL)",
    title: "Manufacturing Engineer",
    location: "India",
    start: "Dec 2020",
    end: "Nov 2021",
    summary:
      "Cold-storage chamber and HVAC manufacturing — SOPs, time studies, BOM and configuration control.",
    bullets: [
      "Supported manufacturing and assembly of cold-storage chambers and HVAC equipment, adapting component layouts to chamber design and space constraints.",
      "Developed SOPs and conducted time studies to identify production bottlenecks, contributing to a 25% reduction in manufacturing cycle time.",
      "Managed and interpreted BOMs and supported first-article validation, ensuring accurate product configuration and manufacturing documentation.",
      "Implemented ECO/ECN design changes, updating BOMs, drawings and manufacturing processes to support production readiness and configuration control.",
      "Performed RCA, 5-Why analysis and corrective actions to resolve manufacturing issues, reduce defects and improve equipment reliability.",
    ],
    stack: ["SOP Development", "Time Studies", "BOM Management", "ECO/ECN", "RCA", "5-Why"],
  },
];

/* ------------------------------------------------------------------
   EDUCATION
   ------------------------------------------------------------------ */

export interface Education {
  degree: string;
  field: string;
  school: string;
  location: string;
  end: string;
  detail?: string[];
}

export const education: Education[] = [
  {
    degree: "Master of Science",
    field: "Aerospace Engineering",
    school: "Mississippi State University",
    location: "Starkville, MS",
    end: "Dec 2025",
    detail: [
      "Graduate Teaching Assistant, Mechanics of Materials (4 semesters)",
      "Ongoing research: celestial-mechanics-based asteroid orbit optimization",
    ],
  },
  {
    degree: "Bachelor of Science",
    field: "Aerospace Engineering",
    school: "Chandigarh University",
    location: "India",
    end: "June 2022",
  },
];

/* ------------------------------------------------------------------
   SKILLS
   Levels: 3 = Expert · 2 = Proficient · 1 = Introduced
   ------------------------------------------------------------------ */

export type SkillLevel = 1 | 2 | 3;

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  title: string;
  code: string;
  description: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "CAD & Mechanical Design",
    code: "01",
    description:
      "Parametric modelling, assemblies and production drawings across four major CAD platforms.",
    skills: [
      { name: "Siemens NX", level: 3 },
      { name: "SolidWorks", level: 3 },
      { name: "GD&T", level: 3 },
      { name: "Tolerance Stack-Up", level: 3 },
      { name: "DFM / DFA", level: 3 },
      { name: "Creo", level: 2 },
      { name: "CATIA V5", level: 2 },
    ],
  },
  {
    title: "Prototyping & Testing",
    code: "02",
    description:
      "From first printed fit-check through instrumented field validation against reference equipment.",
    skills: [
      { name: "3D Printing", level: 3 },
      { name: "Prototype Development", level: 3 },
      { name: "Testing & Validation", level: 2 },
      { name: "Tooling & Fixture Design", level: 2 },
    ],
  },
  {
    title: "Quality & Problem Solving",
    code: "03",
    description:
      "Structured failure analysis used as a working method, not as after-the-fact paperwork.",
    skills: [
      { name: "Root Cause Analysis", level: 3 },
      { name: "5-Why Analysis", level: 3 },
      { name: "Troubleshooting", level: 3 },
      { name: "DFMEA", level: 2 },
    ],
  },
  {
    title: "Production & Configuration",
    code: "04",
    description:
      "Keeping what is built matched to what was designed — BOMs, change orders and documentation.",
    skills: [
      { name: "BOM Management", level: 3 },
      { name: "Manufacturing Documentation", level: 3 },
      { name: "ECO / ECN", level: 2 },
      { name: "Production Support", level: 2 },
    ],
  },
  {
    title: "Manufacturing & Process",
    code: "05",
    description:
      "Time studies, bottleneck analysis and standard work that measurably move cycle time.",
    skills: [
      { name: "Process Optimization", level: 3 },
      { name: "SOP Development", level: 3 },
      { name: "Assembly Process Improvement", level: 3 },
      { name: "Lean Manufacturing", level: 2 },
      { name: "Six Sigma", level: 2 },
    ],
  },
  {
    title: "Analysis & Programming",
    code: "06",
    description:
      "Simulation and numerical work supporting design decisions and orbital-mechanics research.",
    skills: [
      { name: "Python", level: 2 },
      { name: "MATLAB", level: 2 },
      { name: "ANSYS", level: 2 },
    ],
  },
];

export const levelLabels: Record<SkillLevel, string> = {
  1: "Introduced",
  2: "Proficient",
  3: "Expert",
};

/** Flat list for the marquee ticker. */
export const skillTicker = skillGroups.flatMap((g) => g.skills.map((s) => s.name));

/* ------------------------------------------------------------------
   NAVIGATION
   ------------------------------------------------------------------ */

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects/" },
  { label: "Experience", href: "/experience/" },
  { label: "Skills", href: "/skills/" },
  { label: "Research", href: "/research/" },
  { label: "Contact", href: "/contact/" },
] as const;
