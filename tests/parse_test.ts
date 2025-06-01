import * as time from "timedotgo";
import { assert } from "./utils.ts";
import generatedParseTests from "./generated_parse_test_data.json";

export function TestFixedZoneParse() {
	const input = "2025-05-17T18:48:00-06:00";
	const t = time.Parse(time.RFC3339, input);
	const {name , offset } = t.Zone();
	assert(name, "");
	assert(offset, -21600);
	assert(t.UTC().String(), "2025-05-18 00:48:00 +0000 UTC")

	assert(t.String(), "2025-05-17 18:48:00 -0600 -0600")
}

export function TestBackAndForthParse() {
  const now = time.Now();
  for (const format of parseTests) {
    const target = now.Format(format);
    const parseT = time.Parse(format, target);
    const out = parseT.Format(format);
    assert(target, out);
  }
}

export function TestGoGeneratedParse() {
  for (let i = 0; i < generatedParseTests.length; i++) {
    const ptr = generatedParseTests[i];
    const t = time.ParseInLocation(ptr.Format, ptr.ParseIn, ptr.LocationName);
    const args = [t.Format(ptr.FullFormat), ptr.FullValue, ptr];
    if (ptr.Year !== 0) {
      assert(t.Year(), ptr.Year, "YEAR", ...args);
    }
    assert(t.Month(), ptr.Month, "MONTH", ...args);
    assert(t.Day(), ptr.Day, "DAY", ...args);
    assert(t.Hour(), ptr.Hour, "HOUR", ...args);
    assert(t.Minute(), ptr.Minute, "MINUTE", ...args);
  }
}

const parseTests = [
  "Jan",
  "January",
  "Jan 2006",
  "Jan _2 '06",
  "03:04 PM",
  "03:04 pm",
  "January _2 03:04 PM MST",
  time.DateOnly,
  time.TimeOnly,
  time.DateTime,
  time.ANSIC,
  time.UnixDate,
  time.RubyDate,
  time.RFC822,
  time.RFC822Z,
  time.RFC850,
  time.RFC1123,
  time.RFC1123Z,
  time.RFC3339,
  time.RFC3339Nano,
  time.Kitchen,
  time.Stamp,
  time.StampMilli,
  time.StampMicro,
  time.StampNano,
];
