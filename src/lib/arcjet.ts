import "server-only";
import arcjet, { shield } from "@arcjet/next";

import { env } from "./env";

export {
  detectBot,
  fixedWindow,
  protectSignup,
  shield,
  slidingWindow,
} from "@arcjet/next";

export default arcjet({
  key: env.ARCJET_KEY,
  rules: [shield({ mode: "LIVE" })],
  characteristics: ["userId"],
});
