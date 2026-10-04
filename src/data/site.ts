/**
 * Single source of truth for all site content.
 * Edit this file to update the portfolio — no component changes needed.
 *
 * Keep this file in step with the résumé PDF in public/assets: recruiters
 * click through from the résumé, and any number or title that differs
 * between the two reads as an inconsistency.
 */

export const profile = {
  name: "Guruvishnu Nallamadugu",
  shortName: "Guruvishnu",
  initials: "GN",
  role: "Mechanical Design & Manufacturing Engineer",
  tagline: "Tooling & Fixtures · DFM/DFA · GD&T · Assembly Process Improvement",
  location: "Starkville, Mississippi, USA (Willing to Relocate)",
  email: "guruvishnu1922@gmail.com",
  // Phone is intentionally NOT published on the public site — it lives on the
  // resume PDF instead. Add it here only if you want it crawlable.
  linkedin: "https://www.linkedin.com/in/guruvishnunallamadugu/",
  github: "https://github.com/GuruvishnuNallamadugu",
  // The ?v= query string is a cache-buster. Browsers and PDF viewers cache
  // PDFs aggressively, so a changed file at an unchanged URL keeps showing
  // the old version to anyone who opened it before. Bump the date whenever
  // the PDF changes and every link on the site points at a "new" URL.
  resumePath: "/assets/Guruvishnu_Nallamadugu_Resume.pdf?v=2026-10-03",
  availability: "Open to Mechanical Design & Manufacturing Engineering roles · Willing to relocate",
} as const;

export const seo = {
  title: "Guruvishnu Nallamadugu | Mechanical Design & Manufacturing Engineer",
  description:
    "Mechanical design and manufacturing engineer with nearly 3 years of industry experience in tooling and fixture design, DFM/DFA, GD&T and assembly process improvement. Creo, SolidWorks, Siemens NX. M.S. Aerospace Engineering.",
  keywords: [
    "Mechanical Design Engineer",
    "Manufacturing Engineer",
    "Tooling and Fixture Design",
    "CAD",
    "GD&T",
    "Tolerance Stack-Up",
    "DFM",
    "DFA",
    "Creo",
    "SolidWorks",
    "Siemens NX",
    "3D Printing",
    "Guruvishnu Nallamadugu",
  ],
} as const;

/* ------------------------------------------------------------------
   SUMMARY / ABOUT
   ------------------------------------------------------------------ */

export const summary = `Manufacturing engineer with nearly 3 years of industry experience in tooling and fixture design, DFM/DFA, and assembly process improvement. Cut cold room setup time by 25% across 42 installations at Bharat Electronics and monthly production time by 8% at Tata Sikorsky. Designs in Creo, SolidWorks, and Siemens NX. M.S. in Aerospace Engineering.`;

export const aboutParagraphs = [
  `I design parts and equipment that get built, installed and used — not just modelled. I have nearly 3 years of industry experience across cold-room manufacturing at Bharat Electronics, aerospace flight-control hardware at Tata Sikorsky, and my current role as Mechanical Design Engineer at Mississippi State University, where I've designed and built 40+ custom products for campus departments.`,
  `At Bharat Electronics I built 42 walk-in cold rooms — panels made to each site's dimensions, refrigeration units assembled, and everything installed at client sites. Finding an assembly bottleneck and working it out with local civil engineers cut on-site setup from 4 days to 3 per room.`,
  `At Tata Sikorsky I designed flight-control cable pulleys and guide brackets in Creo and SolidWorks. Adding edge radii removed a manual deburring step and cut monthly production time by 8%, and I pushed the same change into the company's legacy design library so future parts started from the improved version. I created the GD&T manufacturing drawings and ran the tolerance stack-ups before release.`,
  `My CAD work is mainly in Creo, SolidWorks and Siemens NX. I hold an M.S. in Aerospace Engineering from Mississippi State University, where I also taught Mechanics of Materials recitations for four semesters, and I run an ongoing Python research project on minimum-ΔV asteroid orbit transfers.`,
];

/* ------------------------------------------------------------------
   METRICS — hero stat strip
   ------------------------------------------------------------------ */

export const metrics = [
  { value: "40+", label: "Custom products built", detail: "For campus departments at MSU" },
  { value: "42", label: "Cold rooms built", detail: "Fabricated & installed at BEL" },
  { value: "25%", label: "Setup time cut", detail: "4 days → 3 per cold room" },
  { value: "8%", label: "Production time cut", detail: "Edge radii removed deburring" },
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
    title: "Mechanical Design Engineer",
    location: "Starkville, MS",
    start: "Jan 2026",
    end: "Present",
    current: true,
    summary:
      "Designing and building custom products, fixtures and equipment for campus departments.",
    bullets: [
      "Designed and built 40+ custom products for campus departments in Creo, SolidWorks, and Siemens NX.",
      "Designed a 3D-printed 6-in-1 field instrument (sensors, battery, fan) that replaced 6 separate instruments.",
      "Redesigned sample dryer racks: fixed warped frames, upgraded the mesh, and added insulated handles.",
      "Designed wall-mounted storage with adjustable dual-arm clamps that hold irregular tools off the floor.",
      "Test and validate each design with the requesting department before final build.",
      "Review designs with manufacturing and product development teams before fabrication.",
    ],
    stack: ["Creo", "SolidWorks", "Siemens NX", "3D Printing", "DFM/DFA", "Prototyping"],
  },
  {
    company: "Mississippi State University",
    title: "Graduate Teaching Assistant",
    location: "Starkville, MS",
    start: "Jan 2024",
    end: "Dec 2025",
    summary: "Mechanics of Materials recitations — four semesters.",
    bullets: [
      "Taught 2 weekly Mechanics of Materials recitations (50+ students each; 110–120 per semester) over 4 semesters.",
      "Held weekly office hours to re-explain missed concepts and help students one-on-one.",
    ],
    stack: ["Mechanics of Materials", "Teaching"],
  },
  {
    company: "Tata Sikorsky",
    title: "CAD Designer",
    location: "Hyderabad, India",
    start: "Dec 2021",
    end: "Dec 2022",
    summary:
      "Aerospace flight-control hardware — pulleys, guide brackets, GD&T drawings and tolerance stack-ups.",
    bullets: [
      "Designed flight-control cable pulleys and guide brackets to new dimensions in Creo and SolidWorks.",
      "Added edge radii to pulleys and brackets, removing manual deburring and cutting monthly production time 8%.",
      "Updated legacy designs in the company library with edge radii so future designs started from the improved version.",
      "Created manufacturing drawings with GD&T for machined, cast, and sheet metal parts.",
      "Ran tolerance stack-ups to catch fit problems before release to production.",
    ],
    stack: ["Creo", "SolidWorks", "GD&T", "Tolerance Stack-Up", "Manufacturing Drawings"],
  },
  {
    company: "Bharat Electronics Limited (BEL)",
    title: "Manufacturing Engineer",
    location: "Machilipatnam, India",
    start: "Dec 2020",
    end: "Nov 2021",
    summary:
      "Walk-in cold rooms — fabrication, assembly, on-site installation and service.",
    bullets: [
      "Built 42 walk-in cold rooms: made insulated wall, ceiling, and door panels to each site's dimensions, assembled evaporator and condensing units from sister-plant parts, and installed at client sites.",
      "Cut on-site setup time per cold room by 25%, from 4 days to 3, by finding an assembly bottleneck and coordinating with local civil engineers on site.",
      "Handled service calls after installation, troubleshooting and repairing panels, doors, evaporators, and condensing units.",
      "Fabricated and installed out-of-stock components on site with the team, keeping installations on schedule.",
      "Used root cause analysis and 5-Why to fix recurring assembly defects.",
    ],
    stack: ["Assembly", "Installation", "Process Improvement", "Root Cause Analysis", "5-Why"],
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
      "GPA 3.5 / 4.0",
      "Graduate Teaching Assistant, Mechanics of Materials (4 semesters)",
      "Research: asteroid orbit optimization (May 2024 – Present)",
    ],
  },
  {
    degree: "Bachelor of Science",
    field: "Aerospace Engineering",
    school: "Chandigarh University",
    location: "India",
    end: "May 2022",
    detail: ["GPA 3.0 / 4.0"],
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
    title: "CAD",
    code: "01",
    description:
      "Creo and SolidWorks day to day; Siemens NX for parts that call for it.",
    skills: [
      { name: "Creo", level: 3 },
      { name: "SolidWorks", level: 3 },
      { name: "Siemens NX", level: 2 },
      { name: "AutoCAD", level: 1 },
      { name: "CATIA V5", level: 1 },
    ],
  },
  {
    title: "Design & Drafting",
    code: "02",
    description:
      "Production drawings and the tolerance work that catches fit problems before release.",
    skills: [
      { name: "GD&T (ASME Y14.5)", level: 3 },
      { name: "Tolerance Stack-Up", level: 3 },
      { name: "2D Engineering Drawings", level: 3 },
      { name: "Sheet Metal & Weldment Design", level: 2 },
    ],
  },
  {
    title: "Manufacturing",
    code: "03",
    description:
      "Designing for how parts are actually made, assembled and installed.",
    skills: [
      { name: "DFM / DFA", level: 3 },
      { name: "Tooling & Fixture Design", level: 3 },
      { name: "3D Printing / Prototyping", level: 3 },
      { name: "Time Studies", level: 2 },
      { name: "Lean (5S, Kaizen)", level: 2 },
    ],
  },
  {
    title: "Quality & Documentation",
    code: "04",
    description:
      "Structured problem solving and the paperwork that keeps builds matched to designs.",
    skills: [
      { name: "Root Cause Analysis (5-Why)", level: 3 },
      { name: "DFMEA", level: 2 },
      { name: "First-Article Inspection", level: 2 },
      { name: "Bill of Materials (BOM)", level: 2 },
      { name: "ECO / ECN", level: 2 },
      { name: "SOPs & Work Instructions", level: 2 },
      { name: "Microsoft Excel", level: 2 },
    ],
  },
  {
    title: "Analysis",
    code: "05",
    description:
      "Hand calculations and simulation to back design decisions and research work.",
    skills: [
      { name: "Engineering Hand Calculations", level: 3 },
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
