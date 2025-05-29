import * as time from "timedotgo";
import { assert } from "./utils.ts";

export function TestTimeLogic() {
  const t = time.Now();
  const d = 1 * time.Second;
  const before = t.Add(-1 * d);
  const after = t.Add(d);

  assert(true, t.After(before), "BEFORE");
  assert(false, before.After(t), "BEFORE 2");
  assert(true, after.After(t), "AFTER");
  assert(false, t.After(after), "AFTER 2");
  assert(true, t.Equal(t), "EQUAL");
  assert(false, t.Equal(after), "EQUAL 2");
  assert(true, t.Equal(t.UTC()), "EQUAL 3");
  assert(d, after.Sub(t), "SUB");
  assert(d, t.Sub(before), "SUB 2");
}
