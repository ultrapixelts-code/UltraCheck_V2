
import { rules } from "./rules.js";
export default function apply(d){
  return rules.map(r=>({code:r.code, ok:r.check(d), message:r.message}));
}
