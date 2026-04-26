import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import {
  Presentation,
  PresentationFile,
  column,
  row,
  grid,
  panel,
  text,
  image,
  rule,
  fill,
  hug,
  fixed,
  wrap,
  grow,
  fr,
  auto,
} from "@oai/artifact-tool";

const runtimeRequire = createRequire(process.execPath);
const ROOT = path.resolve("../..");
const WORKSPACE = path.resolve(".");
const OUT = path.join(WORKSPACE, "output");
const SCRATCH = path.join(WORKSPACE, "scratch");
const PREVIEWS = path.join(SCRATCH, "previews");
const REPORTS = path.join(SCRATCH, "reports");
const ASSETS = path.join(SCRATCH, "assets");
const EXPORTS = path.join(SCRATCH, "exports");
const CONTACT_SHEET = path.join(SCRATCH, "contact-sheet.png");
const PDF_OUTPUT = path.join(EXPORTS, "output.pdf");

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(PREVIEWS, { recursive: true });
fs.mkdirSync(REPORTS, { recursive: true });
fs.mkdirSync(ASSETS, { recursive: true });
fs.mkdirSync(EXPORTS, { recursive: true });

const HERO_IMAGE = path.join(ASSETS, "soc_header.jpg");
const SOURCE_HERO_IMAGE = path.join(ROOT, "assets", "soc_header.png");
if (fs.existsSync(SOURCE_HERO_IMAGE)) {
  fs.copyFileSync(SOURCE_HERO_IMAGE, HERO_IMAGE);
}
const HERO_DATA_URL = fs.existsSync(HERO_IMAGE)
  ? `data:image/jpeg;base64,${fs.readFileSync(HERO_IMAGE).toString("base64")}`
  : null;

const W = 1920;
const H = 1080;
const theme = {
  ink: "#17202A",
  muted: "#52616B",
  bg: "#F7F5EF",
  paper: "#FFFDF8",
  green: "#0D7C66",
  teal: "#0B7285",
  amber: "#C98218",
  red: "#B42318",
  line: "#D8D2C4",
  dark: "#111827",
  white: "#FFFFFF",
  softGreen: "#E3F4EE",
  softAmber: "#F7E9D1",
  softTeal: "#DFF3F6",
  softRed: "#FBE5E1",
  blue: "#244C7A",
};

const agenda = [
  ["09:00", "Frame", "Outcomes, roles, repo map"],
  ["09:35", "Build", "Foundation, blueprint, architecture"],
  ["10:45", "Operate", "People, shift, tools, budget"],
  ["13:00", "Run", "Workflow, detection, IR"],
  ["15:00", "Govern", "Thai compliance and reporting"],
  ["15:35", "Apply", "Capstone and action plan"],
];

const sourceRefs = {
  fundamentals: "Repo: 00_Getting_Started, 01_SOC_Fundamentals",
  architecture: "Repo: SOC_Building_Roadmap, Infrastructure_Setup, Technology_Stack",
  operations: "Repo: 06_Operations_Management",
  detection: "Repo: 08_Detection_Engineering",
  ir: "Repo: 05_Incident_Response",
  compliance: "Repo: 07_Compliance_Privacy; NIST, MITRE, MDES, ETDA, GPPC/PDPC, ThaiCERT",
  reporting: "Repo: 11_Reporting_Templates",
  training: "Repo: 09_Simulation_Testing, 10_Training_Onboarding",
};

const moduleStage = {
  "Opening and Workshop Framing": ["FRAME", "Turn the repo into decisions, artifacts, and operating habits."],
  "SOC Foundations and Operating Models": ["BUILD", "Choose the SOC mission, scope, and target operating model."],
  "SOC Blueprint, Architecture, and Telemetry Flow": ["SEE", "Design the telemetry path that proves what happened."],
  "People, Roles, Staffing, and Shift Operations": ["STAFF", "Assign owners, coverage, shift rules, and escalation rights."],
  "Technology Stack, Selection Logic, and Budgeting": ["FUND", "Prioritize tools and budget by operating value, not tool hype."],
  "SOC Operations and Governance": ["RUN", "Convert alerts into disciplined workflow and governance evidence."],
  "Detection Engineering and Coverage Management": ["DETECT", "Manage coverage as a lifecycle, not a rule list."],
  "Incident Response, Runbooks, and Playbook Operations": ["RESPOND", "Make containment, evidence, and recovery decisions under pressure."],
  "Thai Compliance, Privacy, and Legal Operating Model": ["GOVERN", "Open the right legal checkpoint without turning SOC into Legal."],
  "Reporting, Executive Communication, and Board-Level Outputs": ["REPORT", "Translate technical evidence into executive decisions."],
  "Training, Simulation, and Continuous Improvement": ["IMPROVE", "Turn exercises and lessons learned into capability growth."],
  "Capstone Scenario and Close": ["APPLY", "Use the whole operating model on one realistic case."],
};

const scenarioThread = [
  [23, "A public customer portal is now in scope for the target SOC architecture."],
  [39, "Repeated failed logins start after business hours; shift coverage becomes material."],
  [55, "The team must decide which tools prove account abuse and data access."],
  [69, "A queue item becomes an investigation with multiple owners and open decisions."],
  [83, "The likely attack path is credential stuffing followed by valid-session abuse."],
  [97, "Successful logins and invoice downloads require containment and evidence handling."],
  [113, "Screenshots appear on social media; legal-impact checkpoints are opened."],
  [123, "Executives need facts, assumptions, decisions, and next review time."],
  [137, "Capstone: teams make the full architecture, staffing, detection, IR, legal, and reporting call."],
];

const artifactBlueprints = {
  socScope: {
    title: "SOC scope canvas",
    lanes: ["In scope", "Out of scope", "Decision rights", "Escalation"],
    fields: ["Assets", "Services", "Owners", "Evidence"],
    cue: "Use this to stop scope drift before tools and shifts are designed.",
  },
  serviceCatalog: {
    title: "SOC service catalog",
    lanes: ["Monitor", "Triage", "Respond", "Report"],
    fields: ["Service owner", "SLA", "Inputs", "Outputs"],
    cue: "A service is real only when owner, trigger, evidence, and handoff are named.",
  },
  shiftHandoff: {
    title: "Shift handoff board",
    lanes: ["Active cases", "Pending decisions", "Fragile services", "Watch list"],
    fields: ["Case", "Owner", "Next check", "Escalation"],
    cue: "The next shift should continue without rediscovering the same facts.",
  },
  alertTicket: {
    title: "Alert triage ticket",
    lanes: ["Signal", "Context", "Decision", "Route"],
    fields: ["Asset", "Identity", "Severity", "Closure reason"],
    cue: "A queue item becomes useful when it carries enough context to decide.",
  },
  detectionKanban: {
    title: "Detection backlog kanban",
    lanes: ["Idea", "Data ready", "Testing", "Production"],
    fields: ["Threat", "Telemetry", "Owner", "Validation"],
    cue: "Backlog quality is better than rule count.",
  },
  ruleSnippet: {
    title: "Detection rule snippet",
    lanes: ["Sigma", "YARA", "Test data", "Playbook"],
    fields: ["Technique", "Fields", "False positives", "Owner"],
    cue: "Portable rules still need local validation and response mapping.",
  },
  playbookCatalog: {
    title: "Playbook catalog card",
    lanes: ["Trigger", "Triage", "Contain", "Recover"],
    fields: ["PB ID", "Severity", "Owner", "Evidence"],
    cue: "Playbooks become operational when they connect trigger, decision, authority, and evidence.",
  },
  coverageHeatmap: {
    title: "Coverage heatmap",
    lanes: ["Threat", "Telemetry", "Detection", "Response"],
    fields: ["Covered", "Partial", "Missing", "Owner"],
    cue: "Coverage is not complete until telemetry, detection, playbook, and owner all exist.",
  },
  evidencePackage: {
    title: "Evidence package",
    lanes: ["Timeline", "Logs", "Artifacts", "Custody"],
    fields: ["Source", "Hash", "Collector", "Retention"],
    cue: "Evidence quality decides whether legal and executive decisions can be defended.",
  },
  decisionLog: {
    title: "Incident decision log",
    lanes: ["Decision", "Facts", "Approver", "Next review"],
    fields: ["Time", "Options", "Risk", "Rationale"],
    cue: "Separate what is known from what is assumed.",
  },
  legalEscalation: {
    title: "Thai legal checkpoint",
    lanes: ["Trigger", "SOC action", "Owner", "Notify?"],
    fields: ["PDPA", "Computer Crime", "Cybersecurity", "E-records"],
    cue: "SOC opens the checkpoint; Legal/DPO/CISO decides notification posture.",
  },
  executiveBrief: {
    title: "Executive brief",
    lanes: ["Facts", "Impact", "Decision", "Ask"],
    fields: ["Confirmed", "Assumed", "Open", "Next update"],
    cue: "Executives need the decision state, not analyst-level detail.",
  },
  trainingPath: {
    title: "Capability path",
    lanes: ["Onboard", "Shadow", "Handle", "Improve"],
    fields: ["Skill", "Evidence", "Coach", "Gate"],
    cue: "Training is ready when performance evidence exists.",
  },
};

const modules = [
  {
    title: "Opening and Workshop Framing",
    accent: theme.green,
    source: sourceRefs.fundamentals,
    slides: [
      "Title slide: 1-Day SOC Building and Operations Workshop",
      "Why this workshop exists",
      "Audience map by role",
      "Learning outcomes",
      "Full-day agenda",
      "How to use this deck during the workshop",
      "How this repo maps to the workshop",
      "Workshop rules: practical outputs, not theory only",
    ],
  },
  {
    title: "SOC Foundations and Operating Models",
    accent: theme.teal,
    source: sourceRefs.fundamentals,
    slides: [
      "What a SOC is and is not",
      "Business outcomes of a SOC",
      "SOC service boundaries",
      "SOC maturity stages",
      "In-house vs MSSP vs hybrid model",
      "When each operating model fails",
      "Minimum viable SOC vs mature SOC",
      "Core SOC services",
      "People, process, technology operating triangle",
      "Common early-stage mistakes",
      "Common scale-stage mistakes",
      "Reference slide: SOC maturity comparison matrix",
      "Reference slide: operating model comparison table",
      "Workshop block 1 instruction: define SOC scope and target state",
    ],
  },
  {
    title: "SOC Blueprint, Architecture, and Telemetry Flow",
    accent: theme.amber,
    source: sourceRefs.architecture,
    slides: [
      "What a practical SOC blueprint looks like",
      "High-level SOC architecture",
      "Telemetry pipeline overview",
      "Endpoint telemetry layer",
      "Identity and authentication telemetry layer",
      "Network telemetry layer",
      "Email and collaboration telemetry layer",
      "Cloud and SaaS telemetry layer",
      "Application and database telemetry layer",
      "Alerting and enrichment flow",
      "Case management and response flow",
      "Log-source prioritization model",
      "Trust boundaries and data sensitivity zones",
      "Reference slide: architecture pattern comparison",
      "Reference slide: telemetry coverage and blind spots",
      "Workshop block 1 worksheet: draft target-state architecture",
    ],
  },
  {
    title: "People, Roles, Staffing, and Shift Operations",
    accent: theme.green,
    source: "Repo: SOC_Team_Structure, SOC_Capacity_Planning, Shift_Handoff, Budget_Staffing",
    slides: [
      "SOC organization structure",
      "Role map: CISO to analyst",
      "Tier 1 responsibilities",
      "Tier 2 responsibilities",
      "Tier 3 / IR responsibilities",
      "Security engineering responsibilities",
      "SOC Manager responsibilities",
      "CISO responsibilities",
      "Skill matrix across roles",
      "Staffing model basics",
      "8x5 vs extended-hours vs 24x7",
      "Shift design patterns",
      "Shift handoff model",
      "Reference slide: staffing benchmark examples",
      "Reference slide: role-to-responsibility matrix",
      "Workshop block 2 instruction: design staffing and shift coverage",
    ],
  },
  {
    title: "Technology Stack, Selection Logic, and Budgeting",
    accent: theme.teal,
    source: "Repo: Technology_Stack, Budget_Staffing, Log_Source_Matrix, Vendor_Evaluation",
    slides: [
      "Core SOC tool categories",
      "SIEM: job and selection criteria",
      "EDR/XDR: job and selection criteria",
      "SOAR/automation: when it helps and when it hurts",
      "Threat intelligence platform and feeds",
      "Case management and knowledge base",
      "DLP, IAM, vulnerability, and supporting control data",
      "Tool integration sequence",
      "Build-vs-buy and complexity tradeoffs",
      "Budget categories: people, platform, content, operations",
      "Phased budget model by maturity stage",
      "Reference slide: tool evaluation scorecard",
      "Reference slide: budget allocation example",
      "Workshop block 2 worksheet: prioritize tools and budget",
    ],
  },
  {
    title: "SOC Operations and Governance",
    accent: theme.amber,
    source: sourceRefs.operations,
    slides: [
      "SOC operating model in production",
      "Service catalog and what the SOC owns",
      "Alert intake to triage flow",
      "Escalation path and authority boundaries",
      "Shift handoff operational pattern",
      "KPI model: MTTD, MTTR, quality, backlog",
      "Detection backlog management",
      "Telemetry onboarding lifecycle",
      "Alert tuning lifecycle",
      "Governance cadence: daily, weekly, monthly, quarterly",
      "Control ownership and accountability",
      "Reference slide: governance operating calendar",
      "Reference slide: service ownership / RACI example",
      "Workshop block 3 instruction: map your operating workflow",
    ],
  },
  {
    title: "Detection Engineering and Coverage Management",
    accent: theme.green,
    source: sourceRefs.detection,
    slides: [
      "Detection engineering mission",
      "Use case lifecycle",
      "Mapping to ATT&CK and business risk",
      "Telemetry dependency model",
      "Sigma and YARA in the operating model",
      "Detection content quality attributes",
      "False positive reduction loop",
      "Coverage matrix concept",
      "Prioritizing detections by threat and asset value",
      "Detection testing and validation",
      "Promotion workflow: idea to production",
      "Reference slide: sample use case hierarchy",
      "Reference slide: sample coverage matrix",
      "Workshop block 3 worksheet: identify coverage gaps",
    ],
  },
  {
    title: "Incident Response, Runbooks, and Playbook Operations",
    accent: theme.teal,
    source: sourceRefs.ir,
    slides: [
      "IR lifecycle overview",
      "Severity model and classification",
      "Decision authority in incidents",
      "Analyst-to-IR escalation model",
      "Runbooks vs playbooks",
      "Playbook operating pattern",
      "Containment decision logic",
      "Eradication and recovery logic",
      "Evidence handling and preservation",
      "Chain of custody basics",
      "Decision logging during incidents",
      "Crisis command / war room model",
      "Closure, PIR, and lessons learned",
      "Reference slide: severity matrix view",
      "Reference slide: evidence and decision chain",
      "Workshop block 3 debrief: alert-to-incident operating exercise",
    ],
  },
  {
    title: "Thai Compliance, Privacy, and Legal Operating Model",
    accent: theme.red,
    source: sourceRefs.compliance,
    slides: [
      "Why Thai compliance belongs in SOC operations",
      "PDPA operating checkpoint",
      "Computer-Related Crime Act operating checkpoint",
      "Cybersecurity Act operating checkpoint",
      "Electronic Transactions Act and evidentiary integrity",
      "NCSA / ThaiCERT coordination path",
      "Thai legal trigger-to-action model",
      "Notification decision and evidence package",
      "Reference slide: Thai legal escalation template in use",
      "Workshop block 4 instruction: legal-impact and escalation decisions",
    ],
  },
  {
    title: "Reporting, Executive Communication, and Board-Level Outputs",
    accent: theme.amber,
    source: sourceRefs.reporting,
    slides: [
      "Incident report structure",
      "Incident decision log structure",
      "Monthly SOC report structure",
      "Executive dashboard view",
      "Board-level decision pack view",
      "Communicating facts vs assumptions",
      "Reference slide: reporting template map",
      "Workshop block 4 worksheet: executive escalation brief",
    ],
  },
  {
    title: "Training, Simulation, and Continuous Improvement",
    accent: theme.green,
    source: sourceRefs.training,
    slides: [
      "SOC onboarding path",
      "Analyst development and cross-skilling",
      "Simulation and purple-team cadence",
      "Certification path and capability-building logic",
      "Lessons learned into operational improvement",
      "Reference slide: training and maturity alignment",
    ],
  },
  {
    title: "Capstone Scenario and Close",
    accent: theme.teal,
    source: "Repo: Tabletop_Exercises, Thai_Legal_Escalation_Template, Incident_Decision_Log",
    slides: [
      "Capstone scenario setup",
      "Team task: architecture, staffing, detection, IR, legal, reporting decisions",
      "Team task: evidence and escalation decisions",
      "Debrief framework by role",
      "30/60/90-day action plan output",
      "Final takeaways and repo re-entry map",
    ],
  },
];

const detail = {
  "Why this workshop exists": [
    "Most SOC failures are operating-model failures before they are tool failures.",
    "This workshop turns the SOP repo into decisions, artifacts, and working routines.",
    "Every section ends with something the team can reuse after class.",
  ],
  "Audience map by role": [
    "CISO owns risk appetite, funding, executive escalation, and external posture.",
    "SOC Manager owns workflow, staffing, quality, handoff, and service delivery.",
    "Analysts, engineers, and IR roles turn alerts into evidence-backed action.",
  ],
  "Learning outcomes": [
    "Design a SOC blueprint with scope, telemetry, tools, and ownership.",
    "Operate alert triage, detection engineering, playbooks, reporting, and governance.",
    "Make defensible legal, executive, and technical decisions during incidents.",
  ],
  "How this repo maps to the workshop": [
    "Build content comes from SOC fundamentals, budget, architecture, and technology guides.",
    "Run content comes from operations management, detection engineering, and IR playbooks.",
    "Govern content comes from compliance, reporting templates, and training modules.",
  ],
  "What a SOC is and is not": [
    "A SOC is an operating capability, not a room with dashboards.",
    "It detects, triages, investigates, escalates, coordinates, and learns.",
    "It is not a replacement for asset ownership, engineering hygiene, or business decisions.",
  ],
  "Business outcomes of a SOC": [
    "Reduce detection and response time for priority threats.",
    "Create reliable evidence for risk, legal, compliance, and executive decisions.",
    "Expose repeated weaknesses so remediation can be funded and tracked.",
  ],
  "SOC service boundaries": [
    "Define which assets, identities, services, cloud workloads, and data classes are in scope.",
    "Define what the SOC can do directly versus what it must request from system owners.",
    "Keep escalation paths explicit for containment, shutdown, notification, and public statements.",
  ],
  "SOC maturity stages": [
    "Foundation: scope, minimum telemetry, triage routine, and severity model.",
    "Operational: playbooks, ownership, tuning, reporting, and regular exercises.",
    "Mature: coverage management, automation, threat hunting, governance, and measurable improvement.",
  ],
  "In-house vs MSSP vs hybrid model": [
    "In-house maximizes control but requires staffing, management, and content maturity.",
    "MSSP extends coverage but cannot own internal business context alone.",
    "Hybrid works when internal owners handle decisions and the partner handles monitoring scale.",
  ],
  "When each operating model fails": [
    "In-house fails when coverage expands faster than staffing and process quality.",
    "MSSP fails when escalations lack asset owners, authority, and evidence standards.",
    "Hybrid fails when responsibilities are implied instead of contracted and rehearsed.",
  ],
  "Minimum viable SOC vs mature SOC": [
    "Minimum viable means critical logs, critical detections, triage, severity, and escalation.",
    "Mature means coverage lifecycle, response governance, engineering feedback, and board-ready reporting.",
    "Do not automate a workflow the team cannot explain manually.",
  ],
  "Core SOC services": [
    "Monitoring and triage: alert intake, enrichment, severity, and routing.",
    "Incident response coordination: containment, evidence, communication, and recovery tracking.",
    "Continuous improvement: tuning, detection backlog, telemetry onboarding, and exercises.",
  ],
  "People, process, technology operating triangle": [
    "People decide and execute; process makes decisions repeatable; technology provides evidence.",
    "Buying tools cannot compensate for unclear ownership or weak escalation.",
    "Strong SOC design balances all three before scaling volume.",
  ],
  "Common early-stage mistakes": [
    "Tool-first implementation without mission, scope, or log-source priorities.",
    "No severity matrix or decision owner for high-impact containment.",
    "Hiring analysts without runbooks, evidence standards, or escalation paths.",
  ],
  "Common scale-stage mistakes": [
    "Alert volume grows but tuning, coverage management, and handoff quality do not.",
    "Reporting becomes activity counts instead of risk and decision evidence.",
    "Lessons learned stop in PIR notes and never become remediation actions.",
  ],
  "What a practical SOC blueprint looks like": [
    "It shows systems, telemetry, tools, ownership, workflows, and escalation boundaries.",
    "It identifies what is monitored now, what is blind, and who owns each gap.",
    "It is simple enough for executives and specific enough for engineers.",
  ],
  "High-level SOC architecture": [
    "Telemetry sources feed collection, normalization, analytics, enrichment, case management, and response.",
    "The architecture must represent identities, endpoints, networks, email, cloud, applications, and data stores.",
    "Control outputs include tickets, containment actions, reports, and governance decisions.",
  ],
  "Telemetry pipeline overview": [
    "Collect only what has an investigation, compliance, or detection use case.",
    "Normalize time, identity, asset, and severity fields so evidence can be correlated.",
    "Monitor pipeline health because missing telemetry is a detection failure.",
  ],
  "Endpoint telemetry layer": [
    "Prioritize process execution, parent-child process chains, file writes, persistence, and isolation state.",
    "Endpoint context is central for malware, ransomware, credential dumping, and lateral movement.",
    "Define who can isolate, collect, reimage, and release endpoints back to service.",
  ],
  "Identity and authentication telemetry layer": [
    "Collect successful and failed login, MFA events, privilege changes, token activity, and risky sign-ins.",
    "Identity telemetry powers brute force, impossible travel, account takeover, and admin abuse detections.",
    "Tie identity evidence to HR, IAM, and business-owner escalation.",
  ],
  "Network telemetry layer": [
    "Network visibility supports C2, DNS tunneling, exfiltration, scanning, and lateral movement.",
    "Firewall, DNS, proxy, VPN, flow, and IDS logs each answer different questions.",
    "Do not treat packet capture as a substitute for asset and identity context.",
  ],
  "Email and collaboration telemetry layer": [
    "Email is the front door for phishing, BEC, malware delivery, and social engineering.",
    "Preserve message headers, URL clicks, attachment hashes, mailbox rules, and forwarding changes.",
    "Collaboration logs matter when investigation artifacts or personal data are shared internally.",
  ],
  "Cloud and SaaS telemetry layer": [
    "Cloud incidents often start as identity, API, storage exposure, or configuration events.",
    "Prioritize audit trails, administrative actions, storage permissions, IAM changes, and workload logs.",
    "Assign shared ownership across SOC, cloud platform, application, and data owners.",
  ],
  "Application and database telemetry layer": [
    "Application logs prove user action, transaction context, data access, and abuse patterns.",
    "Database access logs support insider, exfiltration, and regulated-data investigations.",
    "Instrument the systems that hold critical data before low-value infrastructure noise.",
  ],
  "Alerting and enrichment flow": [
    "Alert quality improves when enrichment adds asset criticality, identity role, vulnerability, and threat intel.",
    "Enrichment should shorten triage, not hide unclear detection logic.",
    "Every alert should route to a playbook, owner, and closure reason.",
  ],
  "Case management and response flow": [
    "The case record is the operational source of truth for decisions and evidence.",
    "Separate facts, assumptions, actions, approvals, and open questions.",
    "Design handoff so another shift can continue without re-investigating the same evidence.",
  ],
  "Log-source prioritization model": [
    "Start with identity, endpoint, firewall, email, cloud control plane, DNS, and proxy.",
    "Rank sources by threat coverage, asset criticality, investigation value, and retention need.",
    "Delay low-value logs until storage, parsing, ownership, and use case are clear.",
  ],
  "Trust boundaries and data sensitivity zones": [
    "Mark where personal data, regulated records, privileged admin paths, and third-party access live.",
    "Trust boundaries tell the SOC when evidence needs legal hold or privacy review.",
    "They also prevent response actions from breaking critical business services.",
  ],
  "SOC organization structure": [
    "Separate monitoring, engineering, IR, management, and executive decision ownership.",
    "Small teams can combine roles, but decision rights still need names.",
    "Document who owns triage, containment approval, detection quality, and reporting.",
  ],
  "Role map: CISO to analyst": [
    "CISO sets risk appetite, escalation expectations, funding, and executive commitments.",
    "SOC Manager turns strategy into staffing, process, quality control, and cadence.",
    "Analysts, engineers, and IR roles produce evidence and action in the incident lifecycle.",
  ],
  "Tier 1 responsibilities": [
    "Monitor queues, validate alert context, classify obvious false positives, and escalate confirmed risk.",
    "Capture initial facts with timestamps, source systems, affected assets, and confidence.",
    "Avoid high-impact containment unless the playbook and authority model allow it.",
  ],
  "Tier 2 responsibilities": [
    "Perform deeper investigation across identity, endpoint, network, cloud, and application evidence.",
    "Scope impact, recommend containment, and determine whether IR should lead.",
    "Improve runbooks and tuning based on repeat investigation patterns.",
  ],
  "Tier 3 / IR responsibilities": [
    "Lead complex incidents, containment strategy, eradication, recovery validation, and PIR.",
    "Maintain chain of custody and technical evidence quality when legal or regulator impact is possible.",
    "Coordinate crisis command when severity exceeds normal queue handling.",
  ],
  "Security engineering responsibilities": [
    "Own telemetry onboarding, parser quality, detection deployment, tuning, and automation guardrails.",
    "Translate repeated SOC friction into engineering backlog.",
    "Validate that controls work in production, not only on paper.",
  ],
  "SOC Manager responsibilities": [
    "Own workflow quality, staffing, escalation discipline, metrics, and service expectations.",
    "Keep handoffs, reviews, dashboards, and monthly governance grounded in evidence.",
    "Escalate repeated gaps when they need funding, ownership, or risk acceptance.",
  ],
  "CISO responsibilities": [
    "Own risk decisions, external posture, board visibility, and investment priorities.",
    "Approve or delegate authority for containment, shutdown, notification, and public statements.",
    "Use SOC reporting to make business risk visible and actionable.",
  ],
  "Skill matrix across roles": [
    "Analysts need triage, log reading, evidence notes, and escalation judgment.",
    "Engineers need telemetry, rule logic, testing, data quality, and automation awareness.",
    "Managers and executives need governance, risk communication, decision authority, and investment tradeoffs.",
  ],
  "Staffing model basics": [
    "Calculate coverage by seat-hours, not by job titles.",
    "One 24x7 seat needs about 5.25 FTE before overlap and supervision.",
    "Include time for training, tuning, reporting, leave, and improvement work.",
  ],
  "8x5 vs extended-hours vs 24x7": [
    "8x5 works when after-hours risk is accepted or covered externally.",
    "Extended-hours covers business-critical periods without full 24x7 cost.",
    "24x7 requires mature handoff, quality control, supervision, and backfill planning.",
  ],
  "Shift design patterns": [
    "Design shifts around alert volume, business hours, service criticality, and fatigue management.",
    "Each shift needs named lead, escalation path, and handoff artifact.",
    "Do not run 24x7 without enough people to cover leave and training.",
  ],
  "Shift handoff model": [
    "Handoff should transfer active incidents, pending decisions, fragile services, and open evidence requests.",
    "A good handoff separates completed work from assumptions and next actions.",
    "The incoming shift should know what to watch and when to escalate.",
  ],
  "Core SOC tool categories": [
    "SIEM centralizes searchable evidence and detection correlation.",
    "EDR/XDR provides endpoint investigation and response control.",
    "Case management, TI, SOAR, vulnerability, IAM, DLP, and data tools complete the operating picture.",
  ],
  "SIEM: job and selection criteria": [
    "The SIEM's job is searchable evidence, correlation, dashboards, and investigation continuity.",
    "Select by log source fit, query usability, retention cost, parser quality, and team skill.",
    "A SIEM is not useful if critical logs are missing or unreadable.",
  ],
  "EDR/XDR: job and selection criteria": [
    "Endpoint tooling must support process context, isolation, collection, and response audit trail.",
    "Select by coverage, response safety, telemetry fidelity, and analyst workflow fit.",
    "Define who can execute high-impact response actions before go-live.",
  ],
  "SOAR/automation: when it helps and when it hurts": [
    "Automation helps repeat enrichment, routing, evidence collection, and low-risk containment.",
    "Automation hurts when decision criteria, ownership, or rollback are unclear.",
    "Start with assisted workflows before autonomous actions.",
  ],
  "Threat intelligence platform and feeds": [
    "Threat intelligence should answer prioritized questions, not flood the SOC with indicators.",
    "Use feeds to enrich detections, hunts, watchlists, and external coordination.",
    "Track source confidence, relevance, expiration, and action taken.",
  ],
  "Case management and knowledge base": [
    "The case system preserves timeline, evidence, ownership, approvals, and closure rationale.",
    "The knowledge base keeps repeatable steps outside individual analyst memory.",
    "Both are required for shift handoff, audit, PIR, and training.",
  ],
  "DLP, IAM, vulnerability, and supporting control data": [
    "Supporting control data turns alerts into risk context.",
    "Vulnerability, IAM, DLP, asset, and data-classification systems help prioritize response.",
    "SOC ownership should include evidence use, not ownership of every control platform.",
  ],
  "Tool integration sequence": [
    "Connect identity, endpoint, network, email, and cloud before advanced automation.",
    "Add case management early so evidence and decisions do not live in chat.",
    "Introduce orchestration after playbooks and authority boundaries are stable.",
  ],
  "Build-vs-buy and complexity tradeoffs": [
    "Build when team skill, ownership, and maintenance capacity are real.",
    "Buy when time-to-value, support, and integration risk matter more than customization.",
    "Hybrid approaches still need internal process ownership.",
  ],
  "Budget categories: people, platform, content, operations": [
    "People costs usually dominate a sustainable SOC budget.",
    "Platform costs include licensing, storage, compute, support, and retention.",
    "Content and operations include detections, training, exercises, reporting, and improvement.",
  ],
  "Phased budget model by maturity stage": [
    "Foundation funds minimum people, critical telemetry, SIEM/EDR, and core SOPs.",
    "Operational funds shifts, tuning, playbooks, metrics, and service ownership.",
    "Mature funds automation, threat hunting, advanced analytics, and governance cadence.",
  ],
  "SOC operating model in production": [
    "Production SOC work is queue discipline, investigation quality, escalation, reporting, and improvement.",
    "The operating model must define what happens daily, weekly, monthly, and quarterly.",
    "Metrics should reveal both risk reduction and operational friction.",
  ],
  "Service catalog and what the SOC owns": [
    "The service catalog defines what the SOC monitors, responds to, reports, and improves.",
    "It also defines what the SOC does not own and where handoff occurs.",
    "Service clarity prevents expectation gaps during incidents.",
  ],
  "Alert intake to triage flow": [
    "Every alert needs source, confidence, affected asset, identity, severity, and routing.",
    "Triage should decide false positive, informational, investigation, or incident escalation.",
    "Closure reason quality is an input to tuning and detection engineering.",
  ],
  "Escalation path and authority boundaries": [
    "Escalation is about decision rights, not just notification.",
    "Containment, shutdown, legal notification, and public statement need explicit owners.",
    "Time-bound thresholds prevent incidents from sitting in uncertainty.",
  ],
  "Shift handoff operational pattern": [
    "Handoff transfers active work, fragile services, unresolved decisions, and monitoring priorities.",
    "Use a consistent artifact so each shift can audit what changed.",
    "Escalate gaps when incoming teams cannot continue without rework.",
  ],
  "KPI model: MTTD, MTTR, quality, backlog": [
    "Time metrics matter, but quality metrics show whether the work is trusted.",
    "Track true-positive rate, escalation quality, evidence completeness, and backlog health.",
    "Use metrics to decide changes, not to punish analysts.",
  ],
  "Detection backlog management": [
    "Backlog items need threat rationale, telemetry dependency, owner, priority, and validation plan.",
    "Prioritize by business risk, threat likelihood, exploitability, and detection gap.",
    "Retire content that cannot be maintained or no longer maps to a real risk.",
  ],
  "Telemetry onboarding lifecycle": [
    "Onboarding is request, owner approval, parsing, validation, use case mapping, and health monitoring.",
    "A source is not live until queries, detections, retention, and data quality are verified.",
    "Assign owners for source health and schema changes.",
  ],
  "Alert tuning lifecycle": [
    "Tuning starts from observed false positives and missed true positives.",
    "Record before/after logic, expected impact, test cases, and rollback path.",
    "Measure quality after deployment instead of assuming the change worked.",
  ],
  "Governance cadence: daily, weekly, monthly, quarterly": [
    "Daily manages active operations and incidents.",
    "Weekly reviews detection, telemetry, and remediation movement.",
    "Monthly and quarterly governance turn operational evidence into funding and risk decisions.",
  ],
  "Control ownership and accountability": [
    "Every control needs business owner, technical owner, evidence owner, and escalation owner.",
    "The SOC can observe control failure but may not own the fix.",
    "Accountability is strongest when evidence and decision records point to named owners.",
  ],
  "Detection engineering mission": [
    "Detection engineering converts risk hypotheses into tested, maintainable monitoring content.",
    "It ties telemetry, rule logic, validation, tuning, and playbooks together.",
    "Its output is reliable coverage, not just more rules.",
  ],
  "Use case lifecycle": [
    "Start with threat or business risk, then define data, logic, test, owner, and response.",
    "Promote only after validation with representative events and false-positive review.",
    "Review regularly for telemetry drift, attacker changes, and business changes.",
  ],
  "Mapping to ATT&CK and business risk": [
    "ATT&CK gives technique language; business risk gives prioritization.",
    "A detection should state which behavior it observes and why the organization cares.",
    "Coverage heatmaps are useful only when telemetry and response quality are also known.",
  ],
  "Telemetry dependency model": [
    "A detection is only as strong as the source, parser, retention, and context behind it.",
    "Document required fields and expected event volume before production.",
    "Missing telemetry should create an engineering backlog item, not silent failure.",
  ],
  "Sigma and YARA in the operating model": [
    "Sigma expresses log detections in a portable way; YARA expresses file or malware signatures.",
    "Both need local validation before production use.",
    "Rules should link to playbooks, severity, owner, and test cases.",
  ],
  "Detection content quality attributes": [
    "Good content is specific, explainable, testable, maintainable, and mapped to response.",
    "It includes tuning guidance, evidence fields, and known false positives.",
    "It avoids opaque logic that analysts cannot defend during incidents.",
  ],
  "False positive reduction loop": [
    "Classify why the alert fired and why it was not actionable.",
    "Tune with allowlists, thresholds, context, suppression, or logic changes.",
    "Re-test against true-positive scenarios before closing the tuning item.",
  ],
  "Coverage matrix concept": [
    "Coverage is a matrix of risk, technique, telemetry, detection, playbook, and owner.",
    "It reveals where monitoring exists but response is weak.",
    "It also reveals where response exists but telemetry is absent.",
  ],
  "Prioritizing detections by threat and asset value": [
    "Start with high-impact assets, likely attack paths, and recent incident lessons.",
    "Rank content by risk reduction, data availability, build effort, and analyst load.",
    "Avoid building low-signal detections because a framework cell looks empty.",
  ],
  "Detection testing and validation": [
    "Test with controlled simulations, historical data, and expected false-positive examples.",
    "Validate alert fields, severity, routing, playbook link, and evidence usefulness.",
    "Keep test evidence so auditors and managers can see coverage is real.",
  ],
  "Promotion workflow: idea to production": [
    "Idea, design, data validation, test, peer review, staged release, monitoring, and review.",
    "Every production rule needs owner and rollback path.",
    "Major logic changes should be reviewed like code changes.",
  ],
  "IR lifecycle overview": [
    "Use preparation, detection, analysis, containment, eradication, recovery, and lessons learned.",
    "Lifecycle language keeps technical work aligned with business and legal decisions.",
    "The lifecycle is iterative during complex incidents, not a single straight line.",
  ],
  "Severity model and classification": [
    "Severity should reflect business impact, data impact, spread, privilege, and service disruption.",
    "Classification determines response urgency, authority, and communication cadence.",
    "Reclassify when facts change; record why the severity changed.",
  ],
  "Decision authority in incidents": [
    "High-impact actions require named approvers before the incident occurs.",
    "Authority includes isolation, account disablement, shutdown, restore, notification, and public statements.",
    "Document decisions with facts reviewed, approver, time, and next review point.",
  ],
  "Analyst-to-IR escalation model": [
    "Escalate when scope expands, containment is needed, evidence may be legal, or severity exceeds queue handling.",
    "The escalation packet must include timeline, assets, users, evidence pointers, and open questions.",
    "Poor escalation quality creates response delay and duplicated investigation.",
  ],
  "Runbooks vs playbooks": [
    "Runbooks guide routine analyst actions by tier and workflow.",
    "Playbooks guide specific incident types from analysis to recovery.",
    "Both should connect to severity, evidence, escalation, and reporting templates.",
  ],
  "Playbook operating pattern": [
    "Trigger, triage, analysis, containment, eradication, recovery, communication, and closure.",
    "Each playbook should state evidence requirements and decision points.",
    "Related playbooks should be linked because incidents rarely stay in one category.",
  ],
  "Containment decision logic": [
    "Containment balances risk reduction against business disruption and evidence preservation.",
    "Decide temporary block, account disablement, host isolation, network change, or service shutdown.",
    "Record rationale and rollback path before high-impact action when time allows.",
  ],
  "Eradication and recovery logic": [
    "Eradication removes attacker access, persistence, malicious artifacts, and exploited weakness.",
    "Recovery validates clean state, monitoring, business acceptance, and return-to-service approval.",
    "Do not close before recurrence risk and monitoring exit criteria are handled.",
  ],
  "Evidence handling and preservation": [
    "Preserve logs, artifacts, screenshots, hashes, requests, and decision records early.",
    "Separate collection, analysis, custody, retention, and release decisions.",
    "Evidence quality determines whether legal, regulator, and executive decisions can be defended.",
  ],
  "Chain of custody basics": [
    "Record who collected, transferred, stored, accessed, and released each evidence item.",
    "Use hashes or integrity markers where practical.",
    "Legal hold should pause deletion or reimage when evidence may matter.",
  ],
  "Decision logging during incidents": [
    "Log what was known, what was assumed, who approved, and what happens next.",
    "Decision logs protect continuity across shifts and support later review.",
    "They also make executive and legal communication faster and safer.",
  ],
  "Crisis command / war room model": [
    "Activate when severity, service impact, external pressure, or uncertainty exceeds normal workflow.",
    "Name incident commander, scribe, technical lead, business owner, legal/DPO, and communications owner.",
    "Use update cadence and decision log to prevent unmanaged parallel work.",
  ],
  "Closure, PIR, and lessons learned": [
    "Closure needs technical recovery, monitoring exit, communications completion, and outstanding risk decisions.",
    "PIR should produce accountable remediation, not just observations.",
    "Recurring issues should move into governance and funding paths.",
  ],
  "Why Thai compliance belongs in SOC operations": [
    "SOC produces the facts needed for Legal, DPO, CISO, and executives to decide.",
    "Compliance handling starts with evidence, classification, and escalation timing.",
    "The SOC should not give legal advice, but it must open the right checkpoint.",
  ],
  "PDPA operating checkpoint": [
    "Open when personal data or sensitive personal data may be exposed, altered, destroyed, or accessed.",
    "Preserve affected systems, data types, subject estimate, timeline, and containment state.",
    "DPO/Legal decides notification posture; SOC supplies evidence.",
  ],
  "Computer-Related Crime Act operating checkpoint": [
    "Open when unauthorized access, data alteration, malicious tooling, disruption, or traffic-data requests are involved.",
    "Preserve authentication, network, endpoint, application, and traffic logs.",
    "Legal decides law-enforcement or authority response path.",
  ],
  "Cybersecurity Act operating checkpoint": [
    "Open when a cyber threat may affect critical service, public-facing service, or public safety.",
    "Prepare service impact, downtime, affected population, containment, and recovery evidence.",
    "CISO coordinates executive, regulator, NCSA, or sector path as needed.",
  ],
  "Electronic Transactions Act and evidentiary integrity": [
    "Electronic records may need integrity, authenticity, time source, and system-of-record proof.",
    "Preserve approval trails, digital messages, logs, and chain of custody.",
    "Do not alter or delete records that may support legal or regulator review.",
  ],
  "NCSA / ThaiCERT coordination path": [
    "Use when national or sectoral coordination, advisory response, IOC sharing, or major incident support is needed.",
    "Prepare sanitized IOC package, confidence, observed scope, and sharing approval.",
    "CISO and Legal approve external sharing and response content.",
  ],
  "Thai legal trigger-to-action model": [
    "Trigger identifies whether privacy, computer crime, cybersecurity, electronic evidence, or coordination path opens.",
    "SOC action preserves evidence and starts decision logging.",
    "Owner and notification checkpoint prevent unmanaged external communication.",
  ],
  "Notification decision and evidence package": [
    "Decision states notify, defer, or not required, with approver and next review time.",
    "Evidence package includes timeline, affected systems, data impact, logs, chain of custody, and draft message.",
    "Facts and assumptions must stay separate.",
  ],
  "Incident report structure": [
    "Report what happened, when detected, systems affected, evidence, impact, actions, and status.",
    "Separate confirmed facts, assumptions, decisions, and remaining work.",
    "Tie report sections to severity, legal checkpoints, and executive communication.",
  ],
  "Incident decision log structure": [
    "Capture decision, options considered, evidence reviewed, approver, time, and next review.",
    "Use for containment, shutdown, notification, external statements, and risk acceptance.",
    "Decision logs make post-incident review faster and more defensible.",
  ],
  "Monthly SOC report structure": [
    "Report incidents, alert quality, backlog, telemetry health, detection changes, and remediation movement.",
    "Use trends and decisions, not only activity counts.",
    "Connect operational findings to business risk and required action.",
  ],
  "Executive dashboard view": [
    "Executives need risk posture, trend, major incidents, open decisions, and resource needs.",
    "Use concise metrics with explanation of what changed and what decision is required.",
    "Avoid analyst-level detail unless it supports a business decision.",
  ],
  "Board-level decision pack view": [
    "Board material should show material risk, control gaps, accepted risk, funded actions, and progress.",
    "Summarize consequences of not acting.",
    "Link incidents and recurring findings to strategic investment needs.",
  ],
  "Communicating facts vs assumptions": [
    "Facts are observed and evidenced; assumptions are current interpretations that may change.",
    "Do not let draft statements outrun the investigation.",
    "Every external message needs approval path, audience, scope, and version control.",
  ],
  "SOC onboarding path": [
    "Onboarding should move from access and process awareness to shadowing, guided work, and independent handling.",
    "Competency should be checked through real triage, reports, escalation, and evidence quality.",
    "Training records support both readiness and audit needs.",
  ],
  "Analyst development and cross-skilling": [
    "Develop analysts from queue handling toward investigation, detection logic, and incident coordination.",
    "Cross-skill engineers and IR roles so workflow handoffs are understood.",
    "Map skills to role expectations and promotion criteria.",
  ],
  "Simulation and purple-team cadence": [
    "Simulations test people, process, telemetry, detections, playbooks, and reporting.",
    "Purple-team exercises close the loop between attacker behavior and defensive coverage.",
    "Capture findings as detection, telemetry, playbook, and training backlog items.",
  ],
  "Certification path and capability-building logic": [
    "Certifications support a skill path but do not replace hands-on operating practice.",
    "Match training to role: analyst fundamentals, engineering depth, IR practice, manager governance.",
    "Use practical assessment before independent production work.",
  ],
  "Lessons learned into operational improvement": [
    "Lessons learned should create owned actions with due dates and governance follow-up.",
    "Route detection gaps, telemetry gaps, process gaps, and control gaps to the right backlog.",
    "Measure whether the same weakness repeats.",
  ],
  "Capstone scenario setup": [
    "Scenario: credential stuffing on a public customer portal followed by successful logins and invoice downloads.",
    "Customer screenshots appear on social media; business asks whether regulators must be notified.",
    "Teams must make architecture, staffing, detection, IR, legal, and reporting decisions from incomplete facts.",
  ],
  "Team task: architecture, staffing, detection, IR, legal, reporting decisions": [
    "Identify missing telemetry, current owners, shift path, and required containment decision.",
    "Map detections and playbooks that should activate.",
    "Define who briefs executives and who owns next review.",
  ],
  "Team task: evidence and escalation decisions": [
    "List the first evidence package: timeline, accounts, IPs, user actions, data accessed, logs, and custody.",
    "Decide legal-impact checkpoint and notification status.",
    "Write assumptions separately from confirmed facts.",
  ],
  "Debrief framework by role": [
    "CISO: risk decision, executive message, and external posture.",
    "SOC Manager: workflow, staffing, handoff, and escalation quality.",
    "Analyst, engineer, and IR: evidence, detection, containment, and recovery actions.",
  ],
  "30/60/90-day action plan output": [
    "30 days: fix critical visibility, severity, handoff, and top playbooks.",
    "60 days: strengthen detection lifecycle, reporting, exercises, and ownership.",
    "90 days: mature governance cadence, metrics, training path, and roadmap funding.",
  ],
  "Final takeaways and repo re-entry map": [
    "Use the repo as the operating manual, not as a document archive.",
    "Start with scope, telemetry, people, workflow, and decision authority.",
    "Return to the right SOP whenever a workshop artifact becomes a real backlog item.",
  ],
};

const tables = {
  "Reference slide: SOC maturity comparison matrix": [
    ["Stage", "Operating signal", "Primary risk", "Next action"],
    ["Foundation", "Basic logs, triage, severity", "Blind spots", "Prioritize telemetry"],
    ["Operational", "Playbooks, handoff, metrics", "Quality drift", "Tune workflow"],
    ["Managed", "Coverage, governance, exercises", "Scaling friction", "Automate carefully"],
    ["Mature", "Threat-led, measured improvement", "Complacency", "Review strategy"],
  ],
  "Reference slide: operating model comparison table": [
    ["Model", "Strength", "Constraint", "Use when"],
    ["In-house", "Control and context", "Staffing cost", "Regulated or complex"],
    ["MSSP", "Coverage and speed", "Limited internal authority", "Small team"],
    ["Hybrid", "Balanced coverage", "Needs clear RACI", "Most practical start"],
  ],
  "Reference slide: architecture pattern comparison": [
    ["Pattern", "Best fit", "Watchout", "Minimum control"],
    ["Central SIEM", "Mixed environment", "Ingestion cost", "Source health"],
    ["Cloud-native", "Cloud-heavy org", "Provider blind spots", "API audit logs"],
    ["Hybrid MSSP", "Small teams", "Context handoff", "Escalation contract"],
  ],
  "Reference slide: telemetry coverage and blind spots": [
    ["Layer", "Must capture", "Common blind spot", "Owner"],
    ["Identity", "Auth, MFA, admin change", "Token/session abuse", "IAM"],
    ["Endpoint", "Process, file, isolation", "Unmanaged hosts", "Endpoint team"],
    ["Network", "DNS, proxy, flow, VPN", "East-west traffic", "Network team"],
    ["Cloud", "Control plane, storage, API", "SaaS admin logs", "Cloud owner"],
  ],
  "Reference slide: staffing benchmark examples": [
    ["Coverage", "Typical team", "Best fit", "Risk"],
    ["8x5", "2-3 FTE + on-call/MSSP", "Low-risk / small", "After-hours delay"],
    ["16x5", "5-6 FTE", "Moderate risk", "Weekend exposure"],
    ["24x7", "10-15+ FTE", "High-risk / regulated", "Cost and fatigue"],
  ],
  "Reference slide: role-to-responsibility matrix": [
    ["Role", "Owns", "Produces", "Escalates to"],
    ["Analyst", "Triage facts", "Ticket/evidence pointers", "Tier 2"],
    ["Engineer", "Telemetry/detection", "Rule/test/source health", "SOC Manager"],
    ["IR", "Complex response", "Evidence and recovery plan", "CISO/Legal"],
    ["CISO", "Risk decision", "Executive posture", "Board/Regulator"],
  ],
  "Reference slide: tool evaluation scorecard": [
    ["Criterion", "Question", "Weight", "Evidence"],
    ["Telemetry fit", "Can it ingest priority sources?", "High", "Parser test"],
    ["Workflow fit", "Can analysts work cases cleanly?", "High", "Triage demo"],
    ["Cost model", "Can retention scale?", "High", "Volume estimate"],
    ["Supportability", "Can team operate it?", "Medium", "Skill map"],
  ],
  "Reference slide: budget allocation example": [
    ["Bucket", "Foundation", "Operational", "Mature"],
    ["People", "Lead + T1/T2", "Shift + engineer", "24x7 + specialists"],
    ["Platform", "SIEM/EDR base", "Retention + case", "Automation + TI"],
    ["Content", "Top detections", "Playbook library", "Threat-led coverage"],
    ["Training", "Onboarding", "Role labs", "Purple-team cadence"],
  ],
  "Reference slide: governance operating calendar": [
    ["Cadence", "Meeting", "Core output", "Owner"],
    ["Daily", "Shift/incident review", "Queue and decision state", "SOC Lead"],
    ["Weekly", "Detection/telemetry review", "Backlog movement", "Engineers"],
    ["Monthly", "Governance review", "Risks and actions", "SOC Manager"],
    ["Quarterly", "Executive/board pack", "Funding/risk decisions", "CISO"],
  ],
  "Reference slide: service ownership / RACI example": [
    ["Service", "SOC", "Engineer", "Business", "CISO"],
    ["Monitoring", "R", "C", "I", "A"],
    ["Detection content", "C", "R", "I", "A"],
    ["Containment", "C", "R", "A/R", "A"],
    ["External comms", "I", "I", "C", "A"],
  ],
  "Reference slide: sample use case hierarchy": [
    ["Level", "Example", "Decision"],
    ["Risk", "Account takeover", "Why it matters"],
    ["Technique", "Brute force / token theft", "What behavior"],
    ["Detection", "Unusual login sequence", "What fires"],
    ["Playbook", "Account compromise", "What to do"],
  ],
  "Reference slide: sample coverage matrix": [
    ["Threat", "Telemetry", "Detection", "Playbook", "Gap"],
    ["Phishing", "Email, endpoint", "Attachment + URL", "PB-01", "User report flow"],
    ["Ransomware", "Endpoint, file", "Bulk rename", "PB-02", "Backup status"],
    ["Account takeover", "Identity", "Impossible travel", "PB-05", "SaaS logs"],
    ["Exfiltration", "Proxy, DLP", "Large upload", "PB-08", "Data class"],
  ],
  "Reference slide: severity matrix view": [
    ["Severity", "Signal", "Response", "Decision"],
    ["P1", "Material service/data impact", "War room", "CISO + exec"],
    ["P2", "Confirmed compromise", "IR lead", "Containment owner"],
    ["P3", "Limited incident", "SOC workflow", "SOC Manager"],
    ["P4", "Low-risk event", "Queue handling", "Analyst lead"],
  ],
  "Reference slide: evidence and decision chain": [
    ["Artifact", "Why it matters", "Owner"],
    ["Timeline", "Proves sequence", "SOC Manager"],
    ["Log bundle", "Supports analysis", "Engineer"],
    ["Custody trail", "Protects evidence", "IR"],
    ["Decision log", "Defends action", "CISO/Legal"],
  ],
  "Reference slide: Thai legal escalation template in use": [
    ["Checkpoint", "SOC provides", "Decision owner"],
    ["PDPA", "Data impact facts", "DPO/Legal"],
    ["Computer Crime", "Traffic/access logs", "Legal/CISO"],
    ["Cybersecurity", "Service impact", "CISO"],
    ["Electronic records", "Integrity/custody", "Legal/IR"],
  ],
  "Reference slide: reporting template map": [
    ["Template", "Use when", "Audience"],
    ["Incident report", "Case lifecycle", "SOC/IR/Legal"],
    ["Decision log", "Material decision", "CISO/Legal"],
    ["Monthly report", "Operating review", "SOC Manager"],
    ["Board pack", "Risk decision", "Executives/Board"],
  ],
  "Reference slide: training and maturity alignment": [
    ["Maturity", "Training focus", "Evidence"],
    ["Foundation", "Triage + SOP basics", "Checklist"],
    ["Operational", "Investigation + playbooks", "Lab results"],
    ["Managed", "Detection + IR exercises", "Simulation record"],
    ["Mature", "Threat-led improvement", "Purple-team findings"],
  ],
};

function fallbackPoints(title) {
  if (title.startsWith("Workshop block")) {
    return [
      "Work in teams and assign one owner for the artifact.",
      "Use placeholders and the repo templates rather than inventing a vendor-specific answer.",
      "End with a decision, an owner, missing facts, and a next action.",
    ];
  }
  if (title.includes("worksheet")) {
    return [
      "Complete the worksheet as if it will become a real workshop output.",
      "Write assumptions separately from confirmed facts.",
      "Prepare a three-minute debrief with owner, evidence, and next step.",
    ];
  }
  if (title.includes("Reference slide")) {
    return [
      "Use this as a decision aid during discussion and Q&A.",
      "Adapt the rows to your organization size, risk, and operating model.",
      "Do not treat the reference as policy until owners approve it.",
    ];
  }
  return [
    "Define the operating decision this topic must support.",
    "Identify the owner, evidence, workflow, and expected artifact.",
    "Capture the gap that becomes backlog after the workshop.",
  ];
}

function thaiNote(slideNo, moduleTitle, title, points, kind, interaction) {
  const activityCue =
    kind === "workshop" || kind === "worksheet"
      ? "ให้แบ่งกลุ่ม ทำ artifact จริง และบังคับให้ระบุ owner/evidence/next action"
      : interaction === "DECISION"
        ? "หยุดถาม decision point ก่อนอธิบายต่อ เพื่อให้ผู้เรียนคิดจากบริบทองค์กรจริง"
        : "เล่าเป็น operating pattern แล้วโยงไปยัง workshop output ที่ต้องได้";
  const timing =
    kind === "workshop" || kind === "worksheet"
      ? "เวลาแนะนำ: 3 นาทีตั้งโจทย์ / 10-15 นาทีทำกลุ่ม / 3 นาที debrief"
      : interaction === "DECISION"
        ? "เวลาแนะนำ: 4 นาทีอธิบาย / 2 นาทีถาม decision checkpoint"
        : "เวลาแนะนำ: 3-5 นาทีอธิบาย แล้วถามตัวอย่างจากองค์กรผู้เรียน";
  return [
    `สไลด์ ${slideNo}: ${title}`,
    `Module: ${moduleTitle}`,
    `โหมดการสอน: ${interaction}`,
    timing,
    `แนวทางผู้สอน: ${activityCue}`,
    "โยงกับบทบาท: CISO ตัดสินใจความเสี่ยง, SOC Manager คุม workflow, Analyst/Engineer/IR สร้าง evidence และ action",
    `ประเด็นหลัก: ${points[0] || title}`,
    "ถามผู้เรียน: ในองค์กรของคุณ owner, evidence และ next action คือใคร/อะไร",
    "จุดที่มักพลาด: ตอบเป็นชื่อ tool แทนที่จะตอบเป็น workflow, evidence, authority และ owner",
    "คำตอบที่คาดหวัง: ระบุ decision, owner, evidence path, missing facts และ next review",
    "ผลลัพธ์ที่ต้องได้: workshop output ที่เอาไปใช้ต่อได้ ไม่ใช่แค่ความเข้าใจเชิงทฤษฎี",
  ].join("\n");
}

function makeSlides() {
  let slideNo = 1;
  const out = [];
  for (const module of modules) {
    for (const [moduleIndex, title] of module.slides.entries()) {
      const tableRows = tables[title];
      const points = detail[title] || fallbackPoints(title);
      let kind = "content";
      if (slideNo === 1) kind = "cover";
      else if (title.startsWith("Workshop block")) kind = "workshop";
      else if (title.includes("worksheet") || title.includes("Team task") || title.includes("30/60/90")) kind = "worksheet";
      else if (title.includes("Reference slide")) kind = "reference";
      else if (title.includes("agenda")) kind = "agenda";
      const cleaned = cleanTitle(title);
      const interaction = interactionFor(title, kind);
      const artifactType = artifactTypeFor(cleaned);
      out.push({
        no: slideNo,
        title: cleaned,
        rawTitle: title,
        module: module.title,
        moduleStage: moduleStage[module.title] || ["OPERATE", module.title],
        isModuleStart: moduleIndex === 0 && slideNo !== 1,
        accent: module.accent,
        source: module.source,
        kind,
        artifactType,
        visual: visualModeFor(cleaned, kind, tableRows, moduleIndex === 0 && slideNo !== 1, artifactType),
        interaction,
        scenario: scenarioForSlide(slideNo),
        points,
        tableRows,
        notes: thaiNote(slideNo, module.title, cleaned, points, kind, interaction),
      });
      slideNo += 1;
    }
  }
  return out;
}

function cleanTitle(title) {
  return title
    .replace(/^Title slide:\s*/i, "")
    .replace(/^Reference slide:\s*/i, "")
    .replace(/^Workshop block \d+ instruction:\s*/i, "Workshop: ")
    .replace(/^Workshop block \d+ worksheet:\s*/i, "Worksheet: ");
}

function interactionFor(title, kind) {
  if (kind === "workshop" || kind === "worksheet" || title.includes("Team task")) return "EXERCISE";
  if (title.includes("Reference slide")) return "REFERENCE";
  if (/decision|authority|checkpoint|budget|priorit|notify|escalation/i.test(title)) return "DECISION";
  if (/scenario|debrief|capstone/i.test(title)) return "DEBRIEF";
  return "TEACH";
}

function scenarioForSlide(slideNo) {
  let current = null;
  for (const [start, text] of scenarioThread) {
    if (slideNo >= start) current = text;
  }
  return current;
}

function artifactTypeFor(title) {
  if (/service catalog|what the SOC owns/i.test(title)) return "serviceCatalog";
  if (/shift handoff/i.test(title)) return "shiftHandoff";
  if (/alert intake|triage flow/i.test(title)) return "alertTicket";
  if (/detection backlog|promotion workflow/i.test(title)) return "detectionKanban";
  if (/Sigma|YARA/i.test(title)) return "ruleSnippet";
  if (/Runbooks vs playbooks|Playbook operating pattern/i.test(title)) return "playbookCatalog";
  if (/coverage matrix|coverage gaps|coverage management/i.test(title)) return "coverageHeatmap";
  if (/evidence handling|chain of custody|evidence package/i.test(title)) return "evidencePackage";
  if (/decision log|decision logging/i.test(title)) return "decisionLog";
  if (/Thai legal|Notification decision|PDPA operating|Computer-Related|Cybersecurity Act|Electronic Transactions|NCSA|ThaiCERT/i.test(title)) {
    return "legalEscalation";
  }
  if (/Executive dashboard|Board-level|executive escalation brief|Incident report structure|Monthly SOC report/i.test(title)) return "executiveBrief";
  if (/onboarding path|Analyst development|Certification path|training/i.test(title)) return "trainingPath";
  if (/SOC service boundaries|SOC scope|target state/i.test(title)) return "socScope";
  return null;
}

function visualModeFor(title, kind, tableRows, isModuleStart, artifactType) {
  if (kind === "cover" || kind === "agenda") return kind;
  if (kind === "workshop" || kind === "worksheet") return "workshop";
  if (artifactType && !tableRows) return "specificArtifact";
  if (tableRows) return "table";
  if (/repo maps|repository|repo re-entry/i.test(title)) return "repoVisual";
  if (isModuleStart) return "module";
  if (/dashboard|KPI|budget|scorecard|calendar|metrics|allocation/i.test(title)) return "dashboard";
  if (/flow|lifecycle|path|pipeline|sequence|logic|pattern|model|triangle|architecture|coordination|escalation|handoff/i.test(title)) {
    return "flow";
  }
  if (/report|brief|template|evidence|catalog|structure|matrix|coverage|backlog|service|role|staffing|tool|onboarding|training|runbook|playbook/i.test(title)) {
    return "artifact";
  }
  return "standard";
}

function T(value, opts = {}) {
  return text(value, {
    width: opts.width || fill,
    height: opts.height || hug,
    name: opts.name,
    style: {
      fontFace: opts.fontFace || "Aptos",
      fontSize: opts.fontSize || 28,
      bold: opts.bold || false,
      color: opts.color || theme.ink,
      ...opts.style,
    },
  });
}

function bulletList(points, accent) {
  return column(
    { name: "bullet-list", width: fill, height: hug, gap: 20 },
    points.slice(0, 4).map((p, i) =>
      row({ width: fill, height: hug, gap: 18 }, [
        panel(
          {
            width: fixed(42),
            height: fixed(42),
            fill: i === 0 ? accent : theme.paper,
            stroke: i === 0 ? accent : theme.line,
            borderRadius: 12,
            padding: { x: 0, y: 4 },
          },
          T(String(i + 1), {
            width: fixed(42),
            fontSize: 20,
            bold: true,
            color: i === 0 ? theme.white : accent,
            style: { alignment: "center" },
          }),
        ),
        T(p, { width: fill, fontSize: 30, color: theme.ink }),
      ]),
    ),
  );
}

function footer(slide) {
  return row({ width: fill, height: hug, gap: 16 }, [
    T(`${String(slide.no).padStart(3, "0")} / 142`, {
      width: fixed(110),
      fontSize: 15,
      bold: true,
      color: slide.accent,
    }),
    T(slide.module, { width: fill, fontSize: 15, color: theme.muted }),
    T(shortSource(slide.source), { width: wrap(760), fontSize: 13, color: theme.muted }),
  ]);
}

function shortSource(source) {
  return source.replace(/^Repo:\s*/, "Source: ");
}

function interactionBadge(slide) {
  const palette = {
    TEACH: [theme.softTeal, theme.teal],
    DECISION: [theme.softAmber, theme.amber],
    EXERCISE: [theme.softGreen, theme.green],
    REFERENCE: ["#ECE7DA", theme.muted],
    DEBRIEF: [theme.softRed, theme.red],
  };
  const [bg, fg] = palette[slide.interaction] || palette.TEACH;
  return panel(
    {
      width: fixed(150),
      height: fixed(38),
      fill: bg,
      stroke: bg,
      borderRadius: 18,
      padding: { x: 12, y: 8 },
    },
    T(slide.interaction, {
      width: fill,
      fontSize: 14,
      bold: true,
      color: fg,
      style: { alignment: "center" },
    }),
  );
}

function scenarioRibbon(slide) {
  if (!slide.scenario) return null;
  return panel(
    {
      width: fill,
      height: fixed(54),
      fill: "#F1F6F4",
      stroke: "#C8DDD5",
      borderRadius: 12,
      padding: { x: 18, y: 12 },
    },
    row({ width: fill, height: hug, gap: 14 }, [
      T("CASE THREAD", { width: fixed(138), fontSize: 14, bold: true, color: slide.accent }),
      T(slide.scenario, { width: fill, fontSize: 18, color: theme.ink }),
    ]),
  );
}

function titleStack(slide, subtitle) {
  return column({ width: fill, height: hug, gap: 14 }, [
    grid({ width: fill, height: hug, columns: [fr(1), fixed(160)], columnGap: 16 }, [
      T(slide.title, {
        name: "slide-title",
        fontSize: slide.title.length > 54 ? 43 : 54,
        bold: true,
        color: theme.ink,
      }),
      interactionBadge(slide),
    ]),
    row({ width: fill, height: hug, gap: 18 }, [
      rule({ width: fixed(180), stroke: slide.accent, weight: 5 }),
      T(subtitle || slide.module, { width: fill, fontSize: 20, color: theme.muted }),
    ]),
  ]);
}

function heroImageBox({ width = fill, height = fill, radius = 18 } = {}) {
  if (!HERO_DATA_URL) {
    return panel(
      {
        width,
        height,
        fill: theme.ink,
        stroke: theme.ink,
        borderRadius: radius,
        padding: { x: 28, y: 24 },
      },
      T("SOC visual asset", { fontSize: 28, bold: true, color: theme.white }),
    );
  }
  return panel(
    {
      width,
      height,
      fill: theme.ink,
      stroke: theme.ink,
      borderRadius: radius,
      padding: { x: 0, y: 0 },
    },
    image({
      name: "repo-soc-header-image",
      dataUrl: HERO_DATA_URL,
      contentType: "image/jpeg",
      width: fill,
      height: fill,
      fit: "cover",
      alt: "SOC visual asset from the SOCSOP repository",
    }),
  );
}

function simpleTable(rows, accent) {
  const cols = rows[0].length;
  const widths = Array(cols).fill(fr(1));
  return column(
    { name: "table-main", width: fill, height: hug, gap: 0 },
    rows.map((r, idx) =>
      grid(
        {
          width: fill,
          height: hug,
          columns: widths,
          columnGap: 12,
          padding: { x: 0, y: idx === 0 ? 0 : 6 },
        },
        r.map((cell) =>
          panel(
            {
              width: fill,
              height: fixed(idx === 0 ? 58 : 72),
              fill: idx === 0 ? accent : theme.paper,
              stroke: idx === 0 ? accent : theme.line,
              borderRadius: idx === 0 ? 12 : 8,
              padding: { x: 16, y: 12 },
            },
            T(cell, {
              fontSize: idx === 0 ? 19 : 18,
              bold: idx === 0,
              color: idx === 0 ? theme.white : theme.ink,
            }),
          ),
        ),
      ),
    ),
  );
}

function standardSlide(presentation, slide) {
  const s = presentation.slides.add();
  const ribbon = scenarioRibbon(slide);
  s.compose(
    column(
      {
        name: "slide-root",
        width: fill,
        height: fill,
        padding: { x: 82, y: 58 },
        gap: ribbon ? 22 : 34,
      },
      [
        titleStack(slide),
        ...(ribbon ? [ribbon] : []),
        slide.tableRows
          ? simpleTable(slide.tableRows, slide.accent)
          : grid(
              {
                width: fill,
                height: grow(1),
                columns: slide.kind === "worksheet" || slide.kind === "workshop" ? [fr(0.95), fr(1.05)] : [fr(1.15), fr(0.85)],
                columnGap: 52,
              },
              [
                bulletList(slide.points, slide.accent),
                sideArtifact(slide),
              ],
            ),
        footer(slide),
      ],
    ),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
  s.speakerNotes.setText(slide.notes);
  return s;
}

function moduleOpenSlide(presentation, slide) {
  const s = presentation.slides.add();
  const [stage, promise] = slide.moduleStage;
  s.compose(
    grid(
      {
        name: "module-open-root",
        width: fill,
        height: fill,
        columns: [fr(0.72), fr(1.28)],
        columnGap: 54,
        padding: { x: 82, y: 58 },
      },
      [
        panel(
          {
            width: fill,
            height: fill,
            fill: theme.ink,
            stroke: theme.ink,
            borderRadius: 0,
            padding: { x: 42, y: 44 },
          },
          column({ width: fill, height: fill, gap: 28 }, [
            T(String(slide.no).padStart(3, "0"), { fontSize: 34, bold: true, color: slide.accent }),
            T(stage, { fontSize: stage.length > 7 ? 70 : 92, bold: true, color: theme.white }),
            rule({ width: fixed(260), stroke: slide.accent, weight: 8 }),
            T(promise, { fontSize: 28, color: "#DDE7E5" }),
            ...(slide.scenario
              ? [
                  panel(
                    {
                      width: fill,
                      height: fixed(174),
                      fill: "#20303A",
                      stroke: "#20303A",
                      borderRadius: 16,
                      padding: { x: 24, y: 20 },
                    },
                    column({ width: fill, height: hug, gap: 10 }, [
                      T("Scenario thread", { fontSize: 18, bold: true, color: slide.accent }),
                      T(slide.scenario, { fontSize: 24, color: theme.white }),
                    ]),
                  ),
                ]
              : []),
          ]),
        ),
        column({ width: fill, height: fill, gap: 30 }, [
          titleStack(slide, "Module opening decision"),
          T("Teaching job", { fontSize: 22, bold: true, color: slide.accent }),
          bulletList(slide.points, slide.accent),
          panel(
            {
              width: fill,
              height: fixed(118),
              fill: theme.paper,
              stroke: theme.line,
              borderRadius: 14,
              padding: { x: 26, y: 22 },
            },
            row({ width: fill, height: hug, gap: 26 }, [
              T("Output", { width: fixed(120), fontSize: 24, bold: true, color: slide.accent }),
              T("One decision, one owner, one evidence path, and one backlog item before moving on.", {
                fontSize: 25,
                color: theme.ink,
              }),
            ]),
          ),
          footer(slide),
        ]),
      ],
    ),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
  s.speakerNotes.setText(slide.notes);
  return s;
}

function flowSlide(presentation, slide) {
  const s = presentation.slides.add();
  const steps = slide.points.slice(0, 3);
  const ribbon = scenarioRibbon(slide);
  s.compose(
    column({ width: fill, height: fill, padding: { x: 82, y: 58 }, gap: ribbon ? 22 : 30 }, [
      titleStack(slide),
      ...(ribbon ? [ribbon] : []),
      grid({ width: fill, height: grow(1), columns: [fr(1.05), fr(0.95)], columnGap: 54 }, [
        column({ width: fill, height: fill, gap: 28 }, [
          T("Operating flow", { fontSize: 24, bold: true, color: slide.accent }),
          row(
            { width: fill, height: fixed(190), gap: 18 },
            ["Trigger", "Evidence", "Decision", "Action"].map((label, i) =>
              panel(
                {
                  width: fill,
                  height: fill,
                  fill: i === 2 ? theme.softAmber : theme.paper,
                  stroke: i === 2 ? "#E5C894" : theme.line,
                  borderRadius: 14,
                  padding: { x: 18, y: 20 },
                },
                column({ width: fill, height: hug, gap: 12 }, [
                  T(String(i + 1), { fontSize: 24, bold: true, color: slide.accent }),
                  T(label, { fontSize: 25, bold: true, color: theme.ink }),
                ]),
              ),
            ),
          ),
          panel(
            {
              width: fill,
              height: fixed(190),
              fill: "#F3F1EA",
              stroke: theme.line,
              borderRadius: 14,
              padding: { x: 26, y: 22 },
            },
            T(steps[0], { fontSize: 31, bold: true, color: theme.ink }),
          ),
        ]),
        column({ width: fill, height: fill, gap: 18 }, [
          T("Facilitator prompts", { fontSize: 24, bold: true, color: slide.accent }),
          ...steps.slice(1).map((p) =>
            panel(
              {
                width: fill,
                height: fixed(108),
                fill: theme.paper,
                stroke: theme.line,
                borderRadius: 12,
                padding: { x: 22, y: 18 },
              },
              T(p, { fontSize: 23, color: theme.ink }),
            ),
          ),
          panel(
            {
              width: fill,
              height: fixed(128),
              fill: theme.softGreen,
              stroke: "#B9DED2",
              borderRadius: 12,
              padding: { x: 22, y: 18 },
            },
            T("Ask: what fact would change the decision?", { fontSize: 26, bold: true, color: theme.green }),
          ),
        ]),
      ]),
      footer(slide),
    ]),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
  s.speakerNotes.setText(slide.notes);
  return s;
}

function dashboardSlide(presentation, slide) {
  const s = presentation.slides.add();
  const ribbon = scenarioRibbon(slide);
  s.compose(
    column({ width: fill, height: fill, padding: { x: 82, y: 58 }, gap: ribbon ? 22 : 30 }, [
      titleStack(slide),
      ...(ribbon ? [ribbon] : []),
      grid({ width: fill, height: grow(1), columns: [fr(0.9), fr(1.1)], columnGap: 42 }, [
        grid(
          { width: fill, height: hug, columns: [fr(1), fr(1)], columnGap: 16, rowGap: 16 },
          ["Risk", "Quality", "Backlog", "Decision"].map((label, i) =>
            panel(
              {
                width: fill,
                height: fixed(154),
                fill: [theme.softRed, theme.softTeal, theme.softAmber, theme.softGreen][i],
                stroke: theme.line,
                borderRadius: 14,
                padding: { x: 22, y: 18 },
              },
              column({ width: fill, height: hug, gap: 10 }, [
                T(label, { fontSize: 20, bold: true, color: [theme.red, theme.teal, theme.amber, theme.green][i] }),
                T(i === 0 ? "Trend" : i === 1 ? "Signal" : i === 2 ? "Owner" : "Ask", {
                  fontSize: 42,
                  bold: true,
                  color: theme.ink,
                }),
              ]),
            ),
          ),
        ),
        column({ width: fill, height: fill, gap: 16 }, [
          T("Decision board", { fontSize: 24, bold: true, color: slide.accent }),
          ...slide.points.slice(0, 3).map((p, i) =>
            panel(
              {
                width: fill,
                height: fixed(104),
                fill: i === 0 ? "#F3F1EA" : theme.paper,
                stroke: theme.line,
                borderRadius: 12,
                padding: { x: 22, y: 18 },
              },
              T(p, { fontSize: i === 0 ? 25 : 22, bold: i === 0, color: theme.ink }),
            ),
          ),
        ]),
      ]),
      footer(slide),
    ]),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
  s.speakerNotes.setText(slide.notes);
  return s;
}

function artifactSlide(presentation, slide) {
  const s = presentation.slides.add();
  const ribbon = scenarioRibbon(slide);
  s.compose(
    column({ width: fill, height: fill, padding: { x: 82, y: 58 }, gap: ribbon ? 22 : 30 }, [
      titleStack(slide),
      ...(ribbon ? [ribbon] : []),
      grid({ width: fill, height: grow(1), columns: [fr(1), fr(1)], columnGap: 48 }, [
        panel(
          {
            width: fill,
            height: fill,
            fill: theme.paper,
            stroke: theme.line,
            borderRadius: 14,
            padding: { x: 28, y: 26 },
          },
          column({ width: fill, height: fill, gap: 18 }, [
            row({ width: fill, height: hug, gap: 16 }, [
              T("Artifact", { width: fixed(128), fontSize: 22, bold: true, color: slide.accent }),
              rule({ width: fill, stroke: slide.accent, weight: 3 }),
            ]),
            ...["Decision", "Owner", "Evidence", "Escalation"].map((label, i) =>
              row({ width: fill, height: fixed(72), gap: 16 }, [
                panel(
                  {
                    width: fixed(42),
                    height: fixed(42),
                    fill: i === 0 ? slide.accent : theme.paper,
                    stroke: slide.accent,
                    borderRadius: 10,
                    padding: { x: 0, y: 6 },
                  },
                  T(String(i + 1), {
                    width: fixed(42),
                    fontSize: 18,
                    bold: true,
                    color: i === 0 ? theme.white : slide.accent,
                    style: { alignment: "center" },
                  }),
                ),
                T(label, { fontSize: 27, bold: true, color: theme.ink }),
              ]),
            ),
            T("Use this slide as the shape of the document, dashboard, queue, or checklist participants should create.", {
              fontSize: 21,
              color: theme.muted,
            }),
          ]),
        ),
        column({ width: fill, height: fill, gap: 18 }, [
          T("What participants should take away", { fontSize: 24, bold: true, color: slide.accent }),
          ...slide.points.slice(0, 3).map((p, i) =>
            panel(
              {
                width: fill,
                height: fixed(104),
                fill: i === 0 ? theme.softGreen : theme.paper,
                stroke: i === 0 ? "#B9DED2" : theme.line,
                borderRadius: 12,
                padding: { x: 22, y: 18 },
              },
              T(p, { fontSize: i === 0 ? 24 : 22, bold: i === 0, color: theme.ink }),
            ),
          ),
        ]),
      ]),
      footer(slide),
    ]),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
  s.speakerNotes.setText(slide.notes);
  return s;
}

function specificArtifactSlide(presentation, slide) {
  const s = presentation.slides.add();
  const ribbon = scenarioRibbon(slide);
  const blueprint = artifactBlueprints[slide.artifactType] || artifactBlueprints.serviceCatalog;
  const sampleRows = sampleRowsForArtifact(slide.artifactType);
  s.compose(
    column({ width: fill, height: fill, padding: { x: 82, y: 58 }, gap: ribbon ? 20 : 28 }, [
      titleStack(slide, "Workshop output visual"),
      ...(ribbon ? [ribbon] : []),
      grid({ width: fill, height: grow(1), columns: [fr(1.08), fr(0.92)], columnGap: 44 }, [
        panel(
          {
            width: fill,
            height: fill,
            fill: theme.paper,
            stroke: theme.line,
            borderRadius: 16,
            padding: { x: 26, y: 24 },
          },
          column({ width: fill, height: fill, gap: 16 }, [
            row({ width: fill, height: hug, gap: 16 }, [
              T(blueprint.title, { width: fill, fontSize: 28, bold: true, color: slide.accent }),
              T("Reusable SOC artifact", { width: wrap(230), fontSize: 15, bold: true, color: theme.muted }),
            ]),
            grid(
              { width: fill, height: fixed(132), columns: [fr(1), fr(1), fr(1), fr(1)], columnGap: 12 },
              blueprint.lanes.map((lane, i) =>
                panel(
                  {
                    width: fill,
                    height: fill,
                    fill: i === 0 ? theme.ink : i === 2 ? theme.softAmber : theme.paper,
                    stroke: i === 0 ? theme.ink : theme.line,
                    borderRadius: 12,
                    padding: { x: 14, y: 16 },
                  },
                  column({ width: fill, height: hug, gap: 8 }, [
                    T(String(i + 1), { fontSize: 18, bold: true, color: i === 0 ? theme.white : slide.accent }),
                    T(lane, { fontSize: 20, bold: true, color: i === 0 ? theme.white : theme.ink }),
                  ]),
                ),
              ),
            ),
            T("Example fields", { fontSize: 20, bold: true, color: theme.muted }),
            ...sampleRows.map((rowData, idx) =>
              grid(
                { width: fill, height: fixed(58), columns: [fixed(128), fr(1), fr(1), fr(1)], columnGap: 10 },
                rowData.map((cell, cellIdx) =>
                  panel(
                    {
                      width: fill,
                      height: fill,
                      fill: idx === 0 ? slide.accent : cellIdx === 0 ? "#F3F1EA" : theme.paper,
                      stroke: idx === 0 ? slide.accent : theme.line,
                      borderRadius: 8,
                      padding: { x: 12, y: 12 },
                    },
                    T(cell, {
                      fontSize: idx === 0 ? 15 : 16,
                      bold: idx === 0 || cellIdx === 0,
                      color: idx === 0 ? theme.white : theme.ink,
                    }),
                  ),
                ),
              ),
            ),
          ]),
        ),
        column({ width: fill, height: fill, gap: 16 }, [
          panel(
            {
              width: fill,
              height: fixed(132),
              fill: theme.softGreen,
              stroke: "#B9DED2",
              borderRadius: 14,
              padding: { x: 24, y: 20 },
            },
            column({ width: fill, height: hug, gap: 8 }, [
              T("Facilitator cue", { fontSize: 18, bold: true, color: theme.green }),
              T(blueprint.cue, { fontSize: 23, bold: true, color: theme.ink }),
            ]),
          ),
          T("Use this prompt", { fontSize: 22, bold: true, color: slide.accent }),
          ...slide.points.slice(0, 3).map((p, i) =>
            panel(
              {
                width: fill,
                height: fixed(96),
                fill: i === 0 ? "#F3F1EA" : theme.paper,
                stroke: theme.line,
                borderRadius: 12,
                padding: { x: 20, y: 16 },
              },
              T(p, { fontSize: i === 0 ? 22 : 20, bold: i === 0, color: theme.ink }),
            ),
          ),
          panel(
            {
              width: fill,
              height: fixed(106),
              fill: theme.softTeal,
              stroke: "#B9E0E8",
              borderRadius: 12,
              padding: { x: 20, y: 16 },
            },
            T(`Minimum output: ${blueprint.fields.join(" + ")}`, {
              fontSize: 21,
              bold: true,
              color: theme.teal,
            }),
          ),
        ]),
      ]),
      footer(slide),
    ]),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
  s.speakerNotes.setText(slide.notes);
  return s;
}

function sampleRowsForArtifact(type) {
  const rows = {
    socScope: [
      ["Area", "Included", "Excluded", "Owner"],
      ["Asset", "[SYSTEM]", "[LEGACY]", "[OWNER]"],
      ["Action", "Monitor", "No contain", "CISO"],
      ["Review", "Monthly", "By exception", "SOC Mgr"],
    ],
    serviceCatalog: [
      ["Service", "Trigger", "Output", "Owner"],
      ["Triage", "Alert", "Case decision", "SOC"],
      ["IR support", "P2+", "Evidence pack", "IR"],
      ["Reporting", "Monthly", "Decision pack", "SOC Mgr"],
    ],
    shiftHandoff: [
      ["Item", "Status", "Next check", "Owner"],
      ["Case-001", "P2 open", "14:00", "T2"],
      ["VIP login", "Watch", "Hourly", "T1"],
      ["Firewall", "Fragile", "On change", "NetOps"],
    ],
    alertTicket: [
      ["Field", "Example", "Decision use", "Owner"],
      ["Asset", "[SYSTEM]", "Severity", "T1"],
      ["Identity", "[USER]", "Scope", "T2"],
      ["Close reason", "Benign", "Tuning", "Engineer"],
    ],
    detectionKanban: [
      ["Backlog", "Data", "Test", "Owner"],
      ["ATO", "Identity", "Atomic", "Engineer"],
      ["Exfil", "Proxy/DLP", "Historical", "SOC"],
      ["Ransomware", "EDR", "Purple team", "IR"],
    ],
    ruleSnippet: [
      ["Rule", "Detection", "Test", "Playbook"],
      ["Sigma", "failed logins", "sample logs", "PB-04"],
      ["YARA", "suspicious file", "known sample", "PB-03"],
      ["Owner", "Engineer", "Peer review", "SOC Mgr"],
    ],
    playbookCatalog: [
      ["PB ID", "Trigger", "Evidence", "Owner"],
      ["PB-01", "Phishing", "Email + URL", "SOC"],
      ["PB-02", "Ransomware", "EDR + files", "IR"],
      ["PB-05", "Account takeover", "Identity logs", "T2"],
    ],
    coverageHeatmap: [
      ["Threat", "Telemetry", "Detection", "Response"],
      ["Phishing", "Ready", "Ready", "Partial"],
      ["ATO", "Ready", "Partial", "Ready"],
      ["Exfil", "Missing", "Missing", "Partial"],
    ],
    evidencePackage: [
      ["Evidence", "Source", "Integrity", "Owner"],
      ["Timeline", "Case system", "Versioned", "SOC"],
      ["Logs", "SIEM", "Retained", "Engineer"],
      ["Artifact", "Endpoint", "Hashed", "IR"],
    ],
    decisionLog: [
      ["Time", "Decision", "Evidence", "Approver"],
      ["10:30", "Disable acct", "auth logs", "SOC Mgr"],
      ["11:00", "Open PDPA", "data access", "Legal"],
      ["12:00", "Brief exec", "impact", "CISO"],
    ],
    legalEscalation: [
      ["Trigger", "SOC action", "Owner", "Decision"],
      ["PDPA", "Data facts", "DPO", "Notify?"],
      ["Crime Act", "Traffic logs", "Legal", "Report?"],
      ["Cyber Act", "Service impact", "CISO", "Coordinate?"],
    ],
    executiveBrief: [
      ["Section", "Content", "Confidence", "Owner"],
      ["Facts", "Observed", "High", "SOC"],
      ["Impact", "Estimated", "Medium", "Business"],
      ["Ask", "Decision", "High", "CISO"],
    ],
    trainingPath: [
      ["Stage", "Skill", "Evidence", "Gate"],
      ["Onboard", "SOP", "Checklist", "Lead"],
      ["Shadow", "Triage", "Cases", "T2"],
      ["Handle", "Escalate", "Review", "SOC Mgr"],
    ],
  };
  return rows[type] || rows.serviceCatalog;
}

function repoVisualSlide(presentation, slide) {
  const s = presentation.slides.add();
  const ribbon = scenarioRibbon(slide);
  const isClosing = slide.no === 142;
  const repoMap = [
    ["00-01", "Foundations", "scope, roadmap, budget, stack"],
    ["05", "IR", "framework, runbooks, 50+ playbooks"],
    ["06", "Operations", "handoff, metrics, governance, services"],
    ["08", "Detection", "coverage, Sigma, YARA, use cases"],
    ["07/11", "Govern", "compliance, reports, executive packs"],
    ["09/10", "Improve", "simulation, training, onboarding"],
  ];
  s.compose(
    column({ width: fill, height: fill, padding: { x: 82, y: 58 }, gap: ribbon ? 22 : 30 }, [
      titleStack(slide, "Visual repo anchor"),
      ...(ribbon ? [ribbon] : []),
      grid({ width: fill, height: grow(1), columns: [fr(0.88), fr(1.12)], columnGap: 46 }, [
        column({ width: fill, height: fill, gap: 14 }, [
          heroImageBox({ width: fill, height: fixed(500), radius: 18 }),
          T("Use visuals from the GitHub repo as proof that each module points back to a reusable SOP asset.", {
            fontSize: 21,
            color: theme.muted,
          }),
        ]),
        column({ width: fill, height: fill, gap: 14 }, [
          ...(isClosing
            ? [
                T("Final takeaways", { fontSize: 25, bold: true, color: slide.accent }),
                ...slide.points.slice(0, 3).map((p, i) =>
                  panel(
                    {
                      width: fill,
                      height: fixed(68),
                      fill: i === 0 ? theme.softGreen : theme.paper,
                      stroke: i === 0 ? "#B9DED2" : theme.line,
                      borderRadius: 12,
                      padding: { x: 18, y: 14 },
                    },
                    T(p, { fontSize: 20, bold: i === 0, color: theme.ink }),
                  ),
                ),
                T("Repo re-entry", { fontSize: 24, bold: true, color: slide.accent }),
              ]
            : [T("Repo-to-workshop map", { fontSize: 25, bold: true, color: slide.accent })]),
          ...repoMap.slice(0, isClosing ? 4 : repoMap.length).map(([code, name, desc]) =>
            grid(
              { width: fill, height: fixed(isClosing ? 58 : 72), columns: [fixed(86), fixed(190), fr(1)], columnGap: 16 },
              [
                panel(
                  {
                    width: fill,
                    height: fixed(isClosing ? 44 : 52),
                    fill: theme.ink,
                    stroke: theme.ink,
                    borderRadius: 12,
                    padding: { x: 10, y: isClosing ? 9 : 12 },
                  },
                  T(code, { fontSize: isClosing ? 15 : 17, bold: true, color: theme.white, style: { alignment: "center" } }),
                ),
                T(name, { fontSize: isClosing ? 21 : 24, bold: true, color: theme.ink }),
                T(desc, { fontSize: isClosing ? 19 : 22, color: theme.muted }),
              ],
            ),
          ),
          panel(
            {
              width: fill,
              height: fixed(100),
              fill: theme.softGreen,
              stroke: "#B9DED2",
              borderRadius: 12,
              padding: { x: 22, y: 18 },
            },
            T("Facilitator cue: point to the repo section participants should open after each exercise.", {
              fontSize: 24,
              bold: true,
              color: theme.green,
            }),
          ),
        ]),
      ]),
      footer(slide),
    ]),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
  s.speakerNotes.setText(slide.notes);
  return s;
}

function workshopSlide(presentation, slide) {
  const s = presentation.slides.add();
  const ribbon = scenarioRibbon(slide);
  s.compose(
    column({ width: fill, height: fill, padding: { x: 82, y: 58 }, gap: ribbon ? 18 : 26 }, [
      titleStack(slide, "Team work block"),
      ...(ribbon ? [ribbon] : []),
      grid({ width: fill, height: grow(1), columns: [fr(0.82), fr(1.18)], columnGap: 42 }, [
        column({ width: fill, height: fill, gap: 18 }, [
          panel(
            {
              width: fill,
              height: fixed(152),
              fill: theme.ink,
              stroke: theme.ink,
              borderRadius: 16,
              padding: { x: 26, y: 22 },
            },
            column({ width: fill, height: hug, gap: 8 }, [
              T("WORKSHOP OUTPUT", { fontSize: 16, bold: true, color: slide.accent }),
              T("Produce an artifact, not an opinion.", { fontSize: 34, bold: true, color: theme.white }),
            ]),
          ),
          bulletList(slide.points, slide.accent),
        ]),
        grid(
          { width: fill, height: hug, columns: [fr(1), fr(1)], columnGap: 16, rowGap: 16 },
          ["Decision", "Owner", "Evidence", "Missing facts", "Escalation", "Next action"].map((label, i) =>
            panel(
              {
                width: fill,
                height: fixed(112),
                fill: i === 0 ? theme.softAmber : theme.paper,
                stroke: i === 0 ? "#E5C894" : theme.line,
                borderRadius: 12,
                padding: { x: 20, y: 18 },
              },
              T(label, { fontSize: 24, bold: true, color: i === 0 ? theme.amber : theme.ink }),
            ),
          ),
        ),
      ]),
      footer(slide),
    ]),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
  s.speakerNotes.setText(slide.notes);
  return s;
}

function sideArtifact(slide) {
  if (slide.kind === "workshop" || slide.kind === "worksheet") {
    return column({ width: fill, height: fill, gap: 18 }, [
      T("Team output", { fontSize: 24, bold: true, color: slide.accent }),
      ...["Decision", "Owner", "Evidence", "Open gaps", "Next action"].map((label) =>
        panel(
          {
            width: fill,
            height: fixed(78),
            fill: theme.paper,
            stroke: theme.line,
            borderRadius: 10,
            padding: { x: 18, y: 16 },
          },
          T(label, { fontSize: 22, bold: true, color: theme.ink }),
        ),
      ),
      T("Use placeholders: [COMPANY], [SYSTEM], [OWNER], [YYYY-MM-DD]", {
        fontSize: 15,
        color: theme.muted,
      }),
    ]);
  }
  if (slide.kind === "reference") {
    return column({ width: fill, height: fill, gap: 20 }, [
      T("How to use", { fontSize: 24, bold: true, color: slide.accent }),
      T("Reference slides are embedded inside the teaching flow. Use them for discussion, not as policy without owner approval.", {
        fontSize: 26,
        color: theme.ink,
      }),
      panel(
        {
          width: fill,
          height: fixed(190),
          fill: theme.softAmber,
          stroke: "#E5C894",
          borderRadius: 12,
          padding: { x: 24, y: 22 },
        },
        T("Facilitator cue: ask which row best matches the participant's organization today.", {
          fontSize: 24,
          bold: true,
          color: "#5C3B0A",
        }),
      ),
    ]);
  }
  return column({ width: fill, height: fill, gap: 16 }, [
    T("Workshop Output", { fontSize: 24, bold: true, color: slide.accent }),
    panel(
      {
        width: fill,
        height: fixed(104),
        fill: theme.softGreen,
        stroke: "#B9DED2",
        borderRadius: 12,
        padding: { x: 22, y: 20 },
      },
      T("Decision-ready output", { fontSize: 27, bold: true, color: theme.green }),
    ),
    panel(
      {
        width: fill,
        height: fixed(104),
        fill: theme.softTeal,
        stroke: "#B9E0E8",
        borderRadius: 12,
        padding: { x: 22, y: 20 },
      },
      T("Named owner", { fontSize: 27, bold: true, color: theme.teal }),
    ),
    panel(
      {
        width: fill,
        height: fixed(104),
        fill: theme.softAmber,
        stroke: "#E5C894",
        borderRadius: 12,
        padding: { x: 22, y: 20 },
      },
      T("Evidence path", { fontSize: 27, bold: true, color: theme.amber }),
    ),
    T("The deck is designed as a workshop reference: each idea should become a workflow, worksheet, or backlog item.", {
      fontSize: 20,
      color: theme.muted,
    }),
  ]);
}

function coverSlide(presentation, slide) {
  const s = presentation.slides.add();
  s.compose(
    grid(
      {
        name: "cover-root",
        width: fill,
        height: fill,
        columns: [fr(1.1), fr(0.9)],
        columnGap: 56,
        padding: { x: 92, y: 72 },
      },
      [
        column({ width: fill, height: fill, gap: 28 }, [
          T("1-Day SOC Building and Operations Workshop", {
            fontSize: 72,
            bold: true,
            color: theme.ink,
          }),
          rule({ width: fixed(260), stroke: slide.accent, weight: 6 }),
          T("Build, run, detect, respond, govern, train, and report using the full SOCSOP repository.", {
            width: wrap(900),
            fontSize: 34,
            color: theme.muted,
          }),
          T("For CISO, SOC Manager, SOC Analyst, Security Engineer, and IR Engineer", {
            width: wrap(900),
            fontSize: 24,
            bold: true,
            color: theme.green,
          }),
          T("English slides with Thai facilitator notes", { fontSize: 20, color: theme.muted }),
        ]),
        column({ width: fill, height: fill, gap: 20 }, [
          heroImageBox({ width: fixed(560), height: fixed(560), radius: 28 }),
          T("Practical outputs, not theory only", { fontSize: 27, bold: true, color: theme.ink }),
          T("Visual asset source: SOCSOP GitHub repo / assets", { fontSize: 18, color: theme.muted }),
        ]),
      ],
    ),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
  s.speakerNotes.setText(slide.notes);
}

function agendaSlide(presentation, slide) {
  const s = presentation.slides.add();
  s.compose(
    column({ width: fill, height: fill, padding: { x: 82, y: 58 }, gap: 28 }, [
      titleStack(slide, "1-day teaching cadence with embedded workshop blocks"),
      column(
        { width: fill, height: grow(1), gap: 12 },
        agenda.map(([time, mode, topic]) =>
          grid(
            { width: fill, height: fixed(82), columns: [fixed(150), fixed(230), fr(1)], columnGap: 20 },
            [
              T(time, { fontSize: 27, bold: true, color: slide.accent }),
              T(mode, { fontSize: 28, bold: true, color: theme.ink }),
              T(topic, { fontSize: 27, color: theme.muted }),
            ],
          ),
        ),
      ),
      footer(slide),
    ]),
    { frame: { left: 0, top: 0, width: W, height: H }, baseUnit: 8 },
  );
  s.speakerNotes.setText(slide.notes);
}

async function exportPreview(presentation, slides) {
  for (const [idx, slide] of presentation.slides.items.entries()) {
    const blob = await slide.export({ format: "png" });
    fs.writeFileSync(
      path.join(PREVIEWS, `slide-${String(idx + 1).padStart(3, "0")}.png`),
      Buffer.from(await blob.arrayBuffer()),
    );
  }
  fs.writeFileSync(
    path.join(REPORTS, "slide-manifest.json"),
    `${JSON.stringify(slides.map((s) => ({ no: s.no, title: s.title, module: s.module, kind: s.kind, visual: s.visual, artifactType: s.artifactType })), null, 2)}\n`,
  );
}

async function exportPdfFromPreviews(slides) {
  const { PDFDocument } = runtimeRequire("pdf-lib");
  const pdf = await PDFDocument.create();
  for (let idx = 0; idx < slides.length; idx += 1) {
    const pngPath = path.join(PREVIEWS, `slide-${String(idx + 1).padStart(3, "0")}.png`);
    const png = await pdf.embedPng(fs.readFileSync(pngPath));
    const page = pdf.addPage([W, H]);
    page.drawImage(png, { x: 0, y: 0, width: W, height: H });
  }
  fs.writeFileSync(PDF_OUTPUT, await pdf.save());
}

async function exportContactSheet(slides) {
  const sharp = runtimeRequire("sharp");
  const cols = 8;
  const thumbW = 240;
  const thumbH = 135;
  const gap = 18;
  const labelH = 30;
  const pad = 32;
  const rows = Math.ceil(slides.length / cols);
  const sheetW = pad * 2 + cols * thumbW + (cols - 1) * gap;
  const sheetH = pad * 2 + rows * (thumbH + labelH) + (rows - 1) * gap;
  const composites = [];
  for (let i = 0; i < slides.length; i += 1) {
    const colIdx = i % cols;
    const rowIdx = Math.floor(i / cols);
    const left = pad + colIdx * (thumbW + gap);
    const top = pad + rowIdx * (thumbH + labelH + gap);
    const input = await sharp(path.join(PREVIEWS, `slide-${String(i + 1).padStart(3, "0")}.png`))
      .resize(thumbW, thumbH, { fit: "cover" })
      .png()
      .toBuffer();
    const label = Buffer.from(
      `<svg width="${thumbW}" height="${labelH}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#F7F5EF"/>
        <text x="0" y="21" font-family="Aptos, Arial, sans-serif" font-size="18" font-weight="700" fill="#17202A">${String(i + 1).padStart(3, "0")}</text>
        <text x="48" y="21" font-family="Aptos, Arial, sans-serif" font-size="13" fill="#52616B">${escapeXml(slides[i].interaction)} / ${escapeXml(slides[i].visual)}</text>
      </svg>`,
    );
    composites.push({ input, left, top });
    composites.push({ input: label, left, top: top + thumbH });
  }
  await sharp({
    create: {
      width: sheetW,
      height: sheetH,
      channels: 4,
      background: "#F7F5EF",
    },
  })
    .composite(composites)
    .png()
    .toFile(CONTACT_SHEET);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  const slides = makeSlides();
  if (slides.length !== 142) throw new Error(`Expected 142 slides, got ${slides.length}`);
  const presentation = Presentation.create({ slideSize: { width: W, height: H } });
  for (const slide of slides) {
    if (slide.kind === "cover") coverSlide(presentation, slide);
    else if (slide.kind === "agenda") agendaSlide(presentation, slide);
    else if (slide.visual === "module") moduleOpenSlide(presentation, slide);
    else if (slide.visual === "workshop") workshopSlide(presentation, slide);
    else if (slide.visual === "flow") flowSlide(presentation, slide);
    else if (slide.visual === "dashboard") dashboardSlide(presentation, slide);
    else if (slide.visual === "specificArtifact") specificArtifactSlide(presentation, slide);
    else if (slide.visual === "artifact") artifactSlide(presentation, slide);
    else if (slide.visual === "repoVisual") repoVisualSlide(presentation, slide);
    else standardSlide(presentation, slide);
  }
  const pptxBlob = await PresentationFile.exportPptx(presentation);
  await pptxBlob.save(path.join(OUT, "output.pptx"));
  await exportPreview(presentation, slides);
  await exportPdfFromPreviews(slides);
  await exportContactSheet(slides);
  fs.writeFileSync(
    path.join(REPORTS, "build-report.json"),
    `${JSON.stringify(
      {
        slide_count: slides.length,
        output: path.join(OUT, "output.pptx"),
        pdf: PDF_OUTPUT,
        previews: PREVIEWS,
        contact_sheet: CONTACT_SHEET,
        specific_artifact_slides: slides.filter((s) => s.visual === "specificArtifact").length,
        sources: Object.values(sourceRefs),
        generated_at: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
