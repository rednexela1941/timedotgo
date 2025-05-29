import { TestFormat } from "./format_test.ts";
import { TestBackAndForthParse, TestGoGeneratedParse } from "./parse_test.ts";
import { TestTimeLogic } from "./time_tests.ts";

function run(fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log("OK:", fn.name, end - start);
}

run(TestGoGeneratedParse);
run(TestFormat);
run(TestBackAndForthParse);
run(TestTimeLogic);
