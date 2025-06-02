import { TestFormat } from "./format_test.ts";
import {
  TestBackAndForthParse,
  TestGoGeneratedParse,
  TestFixedZoneParse,
} from "./parse_test.ts";
import { TestTimeLogic } from "./time_tests.ts";

function run(fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log("OK:", fn.name, String(Math.round(end - start)) + "ms");
}

run(TestBackAndForthParse);
run(TestFixedZoneParse);
run(TestGoGeneratedParse);
run(TestFormat);
run(TestTimeLogic);
