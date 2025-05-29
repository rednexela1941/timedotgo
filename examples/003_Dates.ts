import * as time from "timedotgo";

// create a time
const christmas = time.DateAt(
  2025, // year
  12, // month
  25, // day
  7, // hour
  30, // minute
  15, // second
  928, // millisecond
  "America/New_York", // IANA location
);

// create a time from unix timestamp.
const unixZero = time.UnixMilli(0);

console.log(
  "It has been",
  time.Since(unixZero),
  "milliseconds since the creation of unix.",
);
console.log(
  "And we only have",
  time.Until(christmas),
  "milliseconds until Christmas morning.",
);
