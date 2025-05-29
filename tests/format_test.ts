import * as time from "timedotgo";
import { assert } from "./utils.ts";

export function TestFormat(): boolean {
  const t = time.UnixMilli(1233810057012).In("America/Los_Angeles");
  const zName = "PST";
  const zOffset = -28800;
  const { name, offset } = t.Zone();
  assert(name, zName, "BAD ZONE NANE");
  assert(offset, zOffset, "BAD OFFSET");
  for (const item of formatTests) {
    const [name, layout, target] = item;
    // console.log(name, layout, target);
    const val = t.Format(layout);
    assert(val, target, `for layout: ${layout}`);
  }
}

const formatTests = [
  ["ANSIC", time.ANSIC, "Wed Feb  4 21:00:57 2009"],
  ["UnixDate", time.UnixDate, "Wed Feb  4 21:00:57 PST 2009"],
  ["RubyDate", time.RubyDate, "Wed Feb 04 21:00:57 -0800 2009"],
  ["RFC822", time.RFC822, "04 Feb 09 21:00 PST"],
  [
    "RFC850",
    "Monday, 02-Jan-06 15:04:05 MST",
    "Wednesday, 04-Feb-09 21:00:57 PST",
  ],
  ["RFC1123", time.RFC1123, "Wed, 04 Feb 2009 21:00:57 PST"],
  ["RFC1123Z", time.RFC1123Z, "Wed, 04 Feb 2009 21:00:57 -0800"],
  ["RFC3339", time.RFC3339, "2009-02-04T21:00:57-08:00"],
  ["RFC3339Nano", time.RFC3339Nano, "2009-02-04T21:00:57.012-08:00"],
  ["Kitchen", time.Kitchen, "9:00PM"],
  ["am/pm", "3pm", "9pm"],
  ["AM/PM", "3PM", "9PM"],
  ["two-digit year", "06 01 02", "09 02 04"],
  [
    "Janet",
    "Hi Janet, the Month is January",
    "Hi Janet, the Month is February",
  ],
  ["Stamp", time.Stamp, "Feb  4 21:00:57"],
  ["StampMilli", time.StampMilli, "Feb  4 21:00:57.012"],
  ["StampMicro", time.StampMicro, "Feb  4 21:00:57.012000"],
  ["StampNano", time.StampNano, "Feb  4 21:00:57.012000000"],
  ["DateTime", time.DateTime, "2009-02-04 21:00:57"],
  ["DateOnly", time.DateOnly, "2009-02-04"],
  ["TimeOnly", time.TimeOnly, "21:00:57"],
  ["YearDay", "Jan  2 002 __2 2", "Feb  4 035  35 4"],
  ["Year", "2006 6 06 _6 __6 ___6", "2009 6 09 _6 __6 ___6"],
  ["Month", "Jan January 1 01 _1", "Feb February 2 02 _2"],
  ["DayOfMonth", "2 02 _2 __2", "4 04  4  35"],
  ["DayOfWeek", "Mon Monday", "Wed Wednesday"],
  ["Hour", "15 3 03 _3", "21 9 09 _9"],
  ["Minute", "4 04 _4", "0 00 _0"],
  ["Second", "5 05 _5", "57 57 _57"],
  ["Layout", time.Layout, "02/04 09:00:57PM '09 -0800"],
];
