import * as time from "timedotgo";

const date_string = "Dec 31, 2025 17:30";
const format = "Jan 02, 2006 15:04";

const t = time.Parse(format, date_string);
const next_day = t.Add(24 * time.Hour);

console.log(`Happy New Year ${next_day.Year()}!`);

const t2 = time.ParseInLocation("2006-01-02", "2025-01-01", "America/Chicago");
console.log(t2.String());
