import { DEFAULT_GAP_ARGS } from "../../core/gaps";
import { buildHealthReport } from "../../core/health";
import type { ResourceDef } from "./types";

export const healthResource: ResourceDef = {
  kind: "static",
  name: "kb-health",
  uri: "kb://health",
  title: "KB Health",
  description: "Maintenance, review, and coverage health for the knowledge base.",
  getData: () =>
    buildHealthReport({
      ...DEFAULT_GAP_ARGS,
      rebuildIfStale: true,
    }),
};
