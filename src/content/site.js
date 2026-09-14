import { buildSite } from "./siteMeta.js";
import { en } from "../i18n/en.js";

/** English default for any non-React imports (e.g. case study title). */
export const site = buildSite(en);
