# `timedotgo`

Golang's [time](https://pkg.go.dev/time) is excellent. This is a small, 
close-as-reasonable port of the API to typescript with full support
for time zone conversions, parsing and formatting.

- [GitHub](https://github.com/rednexela1941/timedotgo)
- [Documentation](https://rednexela1941.github.io/timedotgo/)


# Installation

`npm install timedotgo`

# Examples

## Formatting 

```ts
import * as time from "timedotgo";

// 0, 1, 2, 3, 4, 5, 6, 7 -- simple as.
const format = "Monday January 02 03:04:05.000 PM -07:00:00";

const now = time.Now();
const california = now.In("America/Los_Angeles");
const berlin = now.In("Europe/Berlin");

console.log("Right now, it is:");
console.log("Local:", now.Format(format));
console.log("UTC:", now.UTC().Format(format));
console.log("California:", california.Format(format));
console.log("Berlin:", berlin.Format(format));
```

### Output

```
Right now, it is:
Local: Tuesday June 03 12:15:03.191 PM -04:00:00
UTC: Tuesday June 03 04:15:03.191 PM +00:00:00
California: Tuesday June 03 09:15:03.191 AM -07:00:00
Berlin: Tuesday June 03 06:15:03.191 PM +02:00:00
```

## Parsing 

```ts
import * as time from "timedotgo";

const date_string = "Dec 31, 2025 17:30";
const format = "Jan 02, 2006 15:04";

const t = time.Parse(format, date_string);
const next_day = t.Add(24 * time.Hour);

console.log(`Happy New Year ${next_day.Year()}!`);

const t2 = time.ParseInLocation("2006-01-02", "2025-01-01", "America/Chicago");
console.log(t2.String());
```

### Output

```
Happy New Year 2026!
2025-01-01 00:00:00 -0600 CST
```

## Dates 

```ts
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
```

### Output

```
It has been 1748967303281 milliseconds since the creation of unix.
And we only have 17698512643 milliseconds until Christmas morning.
```

