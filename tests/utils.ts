class AssertFailed extends Error {}

export function assert(A: any, B: any, ...messages: any[]) {
  if (A === B) return;

  const err = new AssertFailed(
    `\n\tA='${A}'\n\tB='${B}'\n` +
      messages.map((m) => JSON.stringify(m, null, 2)).join("\n"),
  );
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, assert); // Skip this function's stack frame
  }

  throw err;
}
