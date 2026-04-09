import {
  type BuildContextArgs,
  buildContextPack,
  type ContextPack,
  type ContextPackNote,
} from "./context";

export interface BuildHandoffArgs extends BuildContextArgs {
  goal?: string;
}

export interface HandoffPacket {
  generatedAt: string;
  goal: string;
  query: string;
  queryTerms: string[];
  file?: string;
  themes: string[];
  readFirst: ContextPackNote[];
  supportingConcepts: ContextPackNote[];
  primarySources: string[];
  keyPoints: string[];
  tensions: string[];
  openQuestions: string[];
  suggestedNextSteps: string[];
}

function deriveGoal(args: BuildHandoffArgs, pack: ContextPack): string {
  return (
    args.goal?.trim() ||
    args.query?.trim() ||
    (args.file ? `Continue work on ${args.file}` : pack.query)
  );
}

function suggestedNextSteps(pack: ContextPack): string[] {
  const steps: string[] = [];
  const firstRead = pack.recommendedReadOrder[0];
  const firstConcept = pack.concepts[0];
  const firstSource = pack.sourcePaths[0];
  const firstTension = pack.tensions[0];
  const firstQuestion = pack.openQuestions[0];

  if (firstRead) {
    steps.push(`Read ${firstRead.path} first to align on the current compiled view.`);
  }
  if (firstConcept) {
    steps.push(
      `Use ${firstConcept.path} as the synthesis anchor before editing or drafting new notes.`,
    );
  }
  if (firstSource) {
    steps.push(`Verify important claims against the primary source ${firstSource}.`);
  }
  if (firstTension) {
    steps.push(`Resolve or explicitly preserve this tension: ${firstTension}`);
  }
  if (firstQuestion) {
    steps.push(`Answer or narrow this open question next: ${firstQuestion}`);
  }
  if (pack.concepts.length === 0 && pack.sources.length > 0) {
    steps.push(
      "There is source coverage without a strong concept layer; consider creating or expanding a concept page.",
    );
  }

  return [...new Set(steps)].slice(0, 6);
}

export function buildHandoffPacket(args: BuildHandoffArgs): HandoffPacket {
  const pack = buildContextPack(args);

  return {
    generatedAt: new Date().toISOString(),
    goal: deriveGoal(args, pack),
    query: pack.query,
    queryTerms: pack.queryTerms,
    file: pack.file,
    themes: pack.themes,
    readFirst: pack.recommendedReadOrder.slice(0, 4),
    supportingConcepts: pack.concepts.slice(0, 4),
    primarySources: pack.sourcePaths.slice(0, 10),
    keyPoints: pack.keyPoints.slice(0, 10),
    tensions: pack.tensions.slice(0, 6),
    openQuestions: pack.openQuestions.slice(0, 6),
    suggestedNextSteps: suggestedNextSteps(pack),
  };
}

export function formatHandoffPacket(packet: HandoffPacket): string {
  const sections = [
    `Handoff goal: ${packet.goal}`,
    `Query: ${packet.query}`,
    ...(packet.file ? [`File context: ${packet.file}`] : []),
    ...(packet.themes.length > 0 ? [`Themes: ${packet.themes.join(", ")}`] : []),
  ];

  const block = (title: string, lines: string[]) => {
    if (lines.length === 0) {
      return [];
    }
    return ["", title, ...lines];
  };

  return [
    ...sections,
    ...block(
      "Read First",
      packet.readFirst.map((note, index) => `${index + 1}. ${note.title} (${note.path})`),
    ),
    ...block(
      "Key Points",
      packet.keyPoints.map((item) => `- ${item}`),
    ),
    ...block(
      "Tensions",
      packet.tensions.map((item) => `- ${item}`),
    ),
    ...block(
      "Open Questions",
      packet.openQuestions.map((item) => `- ${item}`),
    ),
    ...block(
      "Primary Sources",
      packet.primarySources.map((path) => `- ${path}`),
    ),
    ...block(
      "Suggested Next Steps",
      packet.suggestedNextSteps.map((step) => `- ${step}`),
    ),
  ]
    .join("\n")
    .trim();
}
