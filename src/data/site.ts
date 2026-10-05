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
  tagline: "DFM Design Fixes · Assembly Improvement · On-site Installation · GD&T",
  location: "Starkville, MS (Willing to Relocate)",
  email: "guruvishnu1922@gmail.com",
  // No phone number anywhere on the site or in the public résumé PDF — by
  // the owner's choice. Do not add one.
  linkedin: "https://www.linkedin.com/in/guruvishnunallamadugu/",
  github: "https://github.com/GuruvishnuNallamadugu",
  // The ?v= query string is a cache-buster. Browsers and PDF viewers cache
  // PDFs aggressively, so a changed file at an unchanged URL keeps showing
  // the old version to anyone who opened it before. Bump the date whenever
  // the PDF changes and every link on the site points at a "new" URL.
  resumePath: "/assets/Guruvishnu_Nallamadugu_Resume.pdf?v=2026-10-04",
  availability: "Open to Mechanical Design & Manufacturing Engineering roles · Willing to relocate",
} as const;

export const seo = {
  title: "Guruvishnu Nallamadugu | Mechanical Design & Manufacturing Engineer",
  description:
    "Manufacturing engineer with nearly 3 years of industry experience in DFM design fixes, assembly improvement, and on-site installation. Creo, SolidWorks, Siemens NX. M.S. in Aerospace Engineering.",
  keywords: [
    "Mechanical Design Engineer",
    "Manufacturing Engineer",
    "Assembly Process Improvement",
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

export const summary = `Manufacturing engineer with nearly 3 years of industry experience in DFM design fixes, assembly improvement, and on-site installation. Cut cold room setup time by 25% across 42 installations at Bharat Electronics and monthly production time by 8% at Tata Sikorsky. Uses Creo, SolidWorks, and Siemens NX. M.S. in Aerospace Engineering.`;

export const aboutParagraphs = [
  `I'm a manufacturing engineer with nearly 3 years of industry experience in DFM design fixes, assembly improvement, and on-site installation — across aerospace parts at Tata Sikorsky, walk-in cold rooms at Bharat Electronics, and my current role as Mechanical Design Engineer at Mississippi State University.`,
  `My clearest design fix came at Tata Sikorsky. I designed flight-control cable pulleys and guide brackets in Creo and SolidWorks, and added edge radii to them. That removed a manual deburring step and cut monthly production time by 8%. I then updated the legacy designs in the company library with the same edge radii, so future designs started from the improved version. I also created the GD&T manufacturing drawings and ran tolerance stack-ups before release to production.`,
  `At Bharat Electronics I built 42 walk-in cold rooms — panels made to each site's dimensions, evaporator and condensing units assembled, and every room installed at the client's site. Finding an assembly bottleneck and coordinating with local civil engineers on site cut setup time per room by 25%, from 4 days to 3.`,
  `At Mississippi State I designed and built 40+ custom products for campus departments in Creo, SolidWorks, and Siemens NX, including custom equipment and fixtures. I hold an M.S. in Aerospace Engineering from Mississippi State, where I taught Mechanics of Materials recitations for four semesters, and I run an ongoing asteroid orbit research project in Python and Ansys STK.`,
];

/* ------------------------------------------------------------------
   METRICS — hero stat strip
   ------------------------------------------------------------------ */

export const metrics = [
  { value: "8%", label: "Production time cut", detail: "Edge radii removed deburring · Tata Sikorsky" },
  { value: "25%", label: "Setup time cut", detail: "4 days → 3 per cold room · BEL" },
  { value: "42", label: "Cold rooms built", detail: "Fabricated & installed at BEL" },
  { value: "40+", label: "Custom products built", detail: "For campus departments at MSU" },
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
      "Designed and built custom products, equipment and fixtures for campus departments.",
    bullets: [
      "Designed and built 40+ custom products for campus departments in Creo, SolidWorks, and Siemens NX.",
      "Designed a 3D-printed 6-in-1 field instrument (sensors, battery, fan) that replaced 6 separate instruments.",
      "Redesigned sample dryer racks: fixed warped frames, upgraded the mesh, and added insulated handles.",
      "Designed wall-mounted storage with adjustable dual-arm clamps that hold irregular tools off the floor.",
      "Tested and validated each design with the requesting department before final build.",
      "Reviewed designs with the campus machine shop and research staff before fabrication.",
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
    stack: ["Assembly Process Improvement", "On-site Installation", "Root Cause Analysis (5-Why)", "Time Studies"],
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
  start: string;
  end: string;
  detail?: string[];
}

export const education: Education[] = [
  {
    degree: "Master of Science",
    field: "Aerospace Engineering",
    school: "Mississippi State University",
    location: "Starkville, MS",
    start: "Jan 2023",
    end: "Dec 2025",
    detail: [
      "GPA: 3.5/4.0",
      "Graduate Teaching Assistant, Mechanics of Materials (4 semesters)",
      "Research: Asteroid Orbit Optimization (May 2024 – Present)",
    ],
  },
  {
    degree: "Bachelor of Engineering",
    field: "Aerospace Engineering",
    school: "Chandigarh University",
    location: "Punjab, India",
    start: "Jun 2018",
    end: "May 2022",
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
      { name: "Sheet Metal and Weldment Design", level: 2 },
    ],
  },
  {
    title: "Analysis",
    code: "03",
    description:
      "Hand calculations for design decisions; Python and Ansys STK for orbit research.",
    skills: [
      { name: "Ansys STK", level: 2 },
      { name: "Engineering Hand Calculations", level: 3 },
      { name: "MATLAB", level: 2 },
      { name: "Python", level: 2 },
    ],
  },
  {
    title: "Manufacturing",
    code: "04",
    description:
      "Design fixes for how parts are actually made, assembled and installed.",
    skills: [
      { name: "DFM/DFA", level: 3 },
      { name: "Assembly Process Improvement", level: 3 },
      { name: "3D Printing / Prototyping", level: 3 },
      { name: "Time Studies", level: 2 },
      { name: "Lean (5S, Kaizen)", level: 2 },
    ],
  },
  {
    title: "Quality & Documentation",
    code: "05",
    description:
      "Structured problem solving and the paperwork that keeps builds matched to designs.",
    skills: [
      { name: "Root Cause Analysis (5-Why)", level: 3 },
      { name: "DFMEA", level: 2 },
      { name: "First-Article Inspection", level: 2 },
      { name: "Bill of Materials (BOM)", level: 2 },
      { name: "ECO/ECN", level: 2 },
      { name: "SOPs and Work Instructions", level: 2 },
      { name: "Microsoft Excel", level: 2 },
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
