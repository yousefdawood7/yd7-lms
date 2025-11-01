import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";

export const aj = arcjet
  .withRule(detectBot({ mode: "LIVE", allow: [] }))
  .withRule(fixedWindow({ mode: "LIVE", max: 10, window: "1m" }))
  .withRule(fixedWindow({ mode: "LIVE", max: 50, window: "1h" }));
