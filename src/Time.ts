// for time zones, see here: https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations#cite_note-18
// and see if you can scrape them to make a working parser.

/**
 * Duration (milliseconds)
 */
export type Duration = number;

/**
 * Millisecond is the base duration unit.
 */
export const Millisecond: Duration = 1;
/**
 * Second = 1000 * Millisecond
 */
export const Second: Duration = 1000 * Millisecond;
/**
 * Minute = 60 * Second
 */
export const Minute: Duration = 60 * Second;
/**
 * Hour = 60 * Minute
 */
export const Hour: Duration = 60 * Minute;

/**
 *  These are predefined layouts for use in Time.Format and time.Parse.
 *  The reference time used in these layouts is the specific time stamp:
 *
 *      01/02 03:04:05PM '06 -0700
 *
 *  (January 2, 15:04:05, 2006, in time zone seven hours west of GMT).
 *  That value is recorded as the constant named Layout, listed below. As a
 *  Unix time, this is 1136239445. Since MST is GMT-0700, the reference would be
 *  printed by the Unix date command as:
 *
 *      Mon Jan 2 15:04:05 MST 2006
 *
 *  It is a regrettable historic error that the date uses the American
 *  convention of putting the numerical month before the day.
 *
 *  The example for Time.Format demonstrates the working of the layout string in
 *  detail and is a good reference.
 *
 *  Note that the RFC822, RFC850, and RFC1123 formats should be applied only
 *  to local times. Applying them to UTC times will use "UTC" as the time zone
 *  abbreviation, while strictly speaking those RFCs require the use of "GMT"
 *  in that case. When using the RFC1123 or RFC1123Z formats for parsing,
 *  note that these formats define a leading zero for the day-in-month portion,
 *  which is not strictly allowed by RFC 1123. This will result in an error
 *  when parsing date strings that occur in the first 9 days of a given month.
 *  In general RFC1123Z should be used instead of RFC1123 for servers that
 *  insist on that format, and RFC3339 should be preferred for new protocols.
 *  RFC3339, RFC822, RFC822Z, RFC1123, and RFC1123Z are useful for formatting;
 *  when used with time.Parse they do not accept all the time formats permitted
 *  by the RFCs and they do accept time formats not formally defined. The
 *  RFC3339Nano format removes trailing zeros from the seconds field and thus
 *  may not sort correctly once formatted.
 *
 *  Most programs can use one of the defined constants as the layout passed
 *  to Format or Parse. The rest of this comment can be ignored unless you are
 *  creating a custom layout string.
 *
 *  To define your own format, write down what the reference time would look
 *  like formatted your way; see the values of constants like ANSIC, StampMicro
 *  or Kitchen for examples. The model is to demonstrate what the reference
 *  time looks like so that the Format and Parse methods can apply the same
 *  transformation to a general time value.
 *
 *  Here is a summary of the components of a layout string. Each element shows
 *  by example the formatting of an element of the reference time. Only these
 *  values are recognized. Text in the layout string that is not recognized as
 *  part of the reference time is echoed verbatim during Format and expected to
 *  appear verbatim in the input to Parse.
 *
 *      Year: "2006" "06"
 *      Month: "Jan" "January" "01" "1"
 *      Day of the week: "Mon" "Monday"
 *      Day of the month: "2" "_2" "02"
 *      Day of the year: "__2" "002"
 *      Hour: "15" "3" "03" (PM or AM)
 *      Minute: "4" "04"
 *      Second: "5" "05"
 *      AM/PM mark: "PM"
 *
 *  Numeric time zone offsets format as follows:
 *
 *      "-0700"     ±hhmm
 *      "-07:00"    ±hh:mm
 *      "-07"       ±hh
 *      "-070000"   ±hhmmss
 *      "-07:00:00" ±hh:mm:ss
 *
 *  Replacing the sign in the format with a Z triggers the ISO 8601 behavior of
 *  printing Z instead of an offset for the UTC zone. Thus:
 *
 *      "Z0700"      Z or ±hhmm
 *      "Z07:00"     Z or ±hh:mm
 *      "Z07"        Z or ±hh
 *      "Z070000"    Z or ±hhmmss
 *      "Z07:00:00"  Z or ±hh:mm:ss
 *
 *  Within the format string, the underscores in "_2" and "__2" represent spaces
 *  that may be replaced by digits if the following number has multiple digits,
 *  for compatibility with fixed-width Unix time formats. A leading zero
 *  represents a zero-padded value.
 *
 *  The formats __2 and 002 are space-padded and zero-padded three-character day
 *  of year; there is no unpadded day of year format.
 *
 *  A comma or decimal point followed by one or more zeros represents a
 *  fractional second, printed to the given number of decimal places. A comma or
 *  decimal point followed by one or more nines represents a fractional second,
 *  printed to the given number of decimal places, with trailing zeros removed.
 *  For example "15:04:05,000" or "15:04:05.000" formats or parses with
 *  millisecond precision.
 *
 *  Some valid layouts are invalid time values for time.Parse, due to formats
 *  such as _ for space padding and Z for zone information.
 */
export const Layout = "01/02 03:04:05PM '06 -0700"; // The reference time, in numerical order.
export const ANSIC = "Mon Jan _2 15:04:05 2006";
export const UnixDate = "Mon Jan _2 15:04:05 MST 2006";
export const RubyDate = "Mon Jan 02 15:04:05 -0700 2006";
export const RFC822 = "02 Jan 06 15:04 MST";
export const RFC822Z = "02 Jan 06 15:04 -0700"; // RFC822 with numeric zone
export const RFC850 = "Monday, 02-Jan-06 15:04:05 MST";
export const RFC1123 = "Mon, 02 Jan 2006 15:04:05 MST";
export const RFC1123Z = "Mon, 02 Jan 2006 15:04:05 -0700"; // RFC1123 with numeric zone
export const RFC3339 = "2006-01-02T15:04:05Z07:00";
export const RFC3339Nano = "2006-01-02T15:04:05.999999999Z07:00";
export const Kitchen = "3:04PM";
export const Stamp = "Jan _2 15:04:05";
export const StampMilli = "Jan _2 15:04:05.000";
export const StampMicro = "Jan _2 15:04:05.000000";
export const StampNano = "Jan _2 15:04:05.000000000";
export const DateTime = "2006-01-02 15:04:05";
export const DateOnly = "2006-01-02";
export const TimeOnly = "15:04:05";

/**
 * IANA: eg. "America/New_York"
 * see here: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANA = string;

/**
 * Local represents the system's local time zone.
 */
export const Local: IANA = String(
  Intl.DateTimeFormat().resolvedOptions().timeZone,
);
/**
 * UTC represents Universal Coordinated Time (UTC).
 */
export const UTC: IANA = "Etc/UTC";

/**
 * List available locations/IANA names.
 */
export function ListAvailableIANAs(): IANA[] {
  // @ts-ignore
  return Intl.supportedValuesOf("timeZone");
}

/**
 * A Month specifies a month of the year (January = 1, ...).
 */
export enum Month {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

/**
 * A Time represents an instant in time with millisecond precision.
 */
export interface Time {
  /**
   * In returns a copy of t representing the same time instant, but with the
   * copy's location information set to loc for display purposes.
   */
  In(location: IANA): Time;
  /**
   * Clock returns the hour, minute, and second within the day specified by t.
   */
  Clock(): { hour: number; minute: number; second: number };
  /**
   * Date returns the year, month, and day in which t occurs.
   */
  Date(): { year: number; month: Month; day: number };
  /**
   * YearDay returns the day of the year specified by t, in the range [1,365] for
   * non-leap years, and [1,366] in leap years.
   */
  YearDay(): number;
  /**
   * Year returns the year in which t occurs.
   */
  Year(): number;
  /**
   * Month returns the month of the year specified by t.
   */
  Month(): Month;
  /**
   * Day returns the day of the month specified by t.
   */
  Day(): number;
  /**
   * Hour returns the hour within the day specified by t, in the range [0, 23].
   */
  Hour(): number;
  /**
   * Minute returns the minute offset within the hour specified by t, in the
   * range [0, 59].
   */
  Minute(): number;
  /**
   * Second returns the second offset within the minute specified by t, in the
   * range [0, 59].
   */
  Second(): number;
  /**
   * Millisecond returns the millisecond offset within the second specified by t,
   * in the range [0, 1000].
   */
  Millisecond(): number;
  /**
   * Zone computes the time zone in effect at time t, returning the abbreviated
   * name of the zone (such as "CET") and its offset in seconds east of UTC.
   */
  Zone(): { name: string; offset: number };
  /**
   * UTC returns t with the location set to UTC.
   */
  UTC(): Time;
  /**
   * Local returns t with the location set to local time.
   */
  Local(): Time;
  /**
   * JSDate returns a javascript date object at time t.
   */
  JSDate(): Date;
  /**
   * String returns the time formatted using the format string
   *
   *     "2006-01-02 15:04:05.999999999 -0700 MST"
   *
   * The returned string is meant for debugging; for a stable serialized
   * representation, use t.Format with an explicit format string.
   */
  String(): string;
  UnixMilli(): number;
  /**
   * Unix returns t as a Unix time, the number of seconds elapsed since January
   * 1, 1970 UTC. The result does not depend on the location associated with t.
   */
  Unix(): number;
  /**
   * After reports whether the time instant t is after u.
   */
  After(u: Time): boolean;
  /**
   * Before reports whether the time instant t is before u.
   */
  Before(u: Time): boolean;
  /** Equal reports whether t and u represent the same time instant. Two times
   * can be equal even if they are in different locations. For example, 6:00
   * +0200 and 4:00 UTC are Equal.
   */
  Equal(u: Time): boolean;
  /**
   * Sub returns the duration t-u.
   */
  Sub(u: Time): Duration;
  /**
   * Add returns the time t+d.
   */
  Add(d: Duration): Time;
  /**
   * Format returns a textual representation of the time value formatted
   * according to the layout defined by the argument. See the documentation for
   * the constant called Layout to see how to represent the layout format.
   */
  Format(layout: string): string;
}

/**
 * FromJSDate to convert a javascript Date object to Time.
 */
export function FromJSDate(jsDate: Date): Time {
  return new TimePrivate(jsDate.getTime());
}

/**
 * Now returns the current local time.
 */
export function Now(): Time {
  return new TimePrivate(Date.now()).Local();
}

/**
 * Unix returns the local Time corresponding to the given Unix time,
 * sec seconds since January 1, 1970 UTC.
 */
export function Unix(seconds: number): Time {
  return new TimePrivate(seconds * 1000).In(Local);
}

/**
 * UnixMilli returns the local Time corresponding to the given Unix time,
 * msec milliseconds since January 1, 1970 UTC.
 */
export function UnixMilli(millis: number): Time {
  return new TimePrivate(millis).In(Local);
}

/**
 * Since returns the time elapsed since t. It is shorthand for
 * time.Now().Sub(t).
 */
export function Since(t: Time): Duration {
  return Now().Sub(t);
}

/**
 * Until returns the duration until t. It is shorthand for t.Sub(time.Now()).
 */
export function Until(t: Time): Duration {
  return t.Sub(Now());
}

/**
 * Replicates golangs time.Date(...) function for creating Time objects.
 * note that nanoseconds is replaced with milliseconds for javascript
 * and the name is DateAt (to avoid conflict with JS built-in Date).
 */
export function DateAt(
  year: number,
  month: Month,
  day: number,
  hour: number,
  min: number,
  sec: number,
  milli: number,
  loc: IANA,
): Time {
  return _DateAt(year, month, day, hour, min, sec, milli, loc);
}

/**
 * ParseInLocation is like Parse but in the absence of time zone information,
 * Parse interprets a time as UTC and ParseInLocation interprets the time
 * as in the given location. Unlike go, no attempt is made to match an abbreviation
 * inside the given timezone. Location should be a valid IANA timezone identifier.
 */
export function ParseInLocation(
  layout: string,
  value: string,
  location: IANA,
): Time {
  return parseInternal(layout, value, location);
}

/**
 * Parse parses a formatted string and returns the time value it represents.
 * See the documentation for the constant called Layout to see how to represent
 * the format. The second argument must be parseable using the format string
 * (layout) provided as the first argument.
 */
export function Parse(layout: string, value: string): Time {
  return parseInternal(layout, value, UTC);
}

class TimePrivate implements Time {
  readonly #__dateInternal: Date;
  #__ianaZone: IANA = UTC;
  #__cacheInfo?: intlInfo = void 0;

  constructor(utcUnixMillis: number = 0) {
    this.#__dateInternal = new Date(utcUnixMillis);
  }

  _setTZoffset(sign: number, hr: number, min: number, sec: number) {
    const info = this._getIntlInfo();
    info.timeZoneOffset.negative = sign < 0;
    info.timeZoneOffset.hours = hr;
    info.timeZoneOffset.minutes = min;
    info.timeZoneOffset.seconds = sec;
  }

  _setTZAbbr(tzName: string) {
    this._getIntlInfo().timeZoneName = tzName;
  }

  _internalDate(): Date {
    return this.#__dateInternal;
  }
  // private
  _ianaZoneName(): IANA {
    return this.#__ianaZone;
  }

  // file private
  _getIntlInfo(): intlInfo {
    if (this.#__cacheInfo) return this.#__cacheInfo;
    const info = intlInfoFor(this);
    this.#__cacheInfo = info;
    return info;
  }

  public UnixMilli(): number {
    // returns milliseconds.
    return this.#__dateInternal.getTime();
  }

  public Add(d: Duration): Time {
    const t = new TimePrivate(this.UnixMilli() + d);
    t.#__ianaZone = this.#__ianaZone;
    return t;
  }

  public In(location: IANA): Time {
    const t = new TimePrivate(this.UnixMilli());
    t.#__ianaZone = location;
    return t;
  }

  public Clock(): { hour: number; minute: number; second: number } {
    const { hour, minute, second } = this._getIntlInfo();
    return { hour, minute, second };
  }

  public Date(): { year: number; month: Month; day: number } {
    const { year, month, day } = this._getIntlInfo();
    return { year, month, day };
  }

  public YearDay(): number {
    const { year, month, day } = this.Date();
    return yearDay(year, month, day);
  }

  public Year(): number {
    return this.Date().year;
  }

  public Month(): Month {
    return this.Date().month;
  }

  public Day(): number {
    return this.Date().day;
  }

  public Hour(): number {
    return this.Clock().hour;
  }

  public Minute(): number {
    return this.Clock().minute;
  }

  public Second(): number {
    return this.Clock().second;
  }

  public Millisecond(): number {
    return this._getIntlInfo().fractionalSecond;
  }

  public Zone(): { name: string; offset: number } {
    const { timeZoneName, timeZoneOffset } = this._getIntlInfo();
    const { hours, minutes, seconds, negative } = timeZoneOffset;
    let offset = (hours * 60 + minutes) * 60 + seconds;
    if (negative) offset *= -1;
    return { name: timeZoneName, offset };
  }

  public UTC(): Time {
    return this.In(UTC);
  }

  public Local(): Time {
    return this.In(Local);
  }

  public JSDate(): Date {
    return new Date(this.UnixMilli());
  }

  public String(): string {
    return this.Format("2006-01-02 15:04:05.999999999 -0700 MST");
  }

  public Unix(): number {
    return Math.floor(this.UnixMilli() / 1000);
  }

  public After(u: Time): boolean {
    return this.UnixMilli() > u.UnixMilli();
  }

  public Before(u: Time): boolean {
    return this.UnixMilli() < u.UnixMilli();
  }

  public Equal(u: Time): boolean {
    return this.UnixMilli() === u.UnixMilli();
  }

  public Format(layout: string): string {
    return formatInternal(this._getIntlInfo(), layout);
  }

  public Sub(u: Time): Duration {
    return this.UnixMilli() - u.UnixMilli();
  }
}

function _DateAt(
  year: number,
  month: Month,
  day: number,
  hour: number,
  min: number,
  sec: number,
  milli: number,
  loc: IANA,
): TimePrivate {
  // 1. Build unix millis,
  // 2. create date,
  // 3. adjust based on locale.
  const utcUnixMs = Date.UTC(year, month - 1, day, hour, min, sec, milli);
  const t1 = new TimePrivate(utcUnixMs).In(loc) as TimePrivate;
  if (loc === UTC) {
    return t1;
  }
  const { offset: offset1 } = t1.Zone();
  const t2 = new TimePrivate(utcUnixMs - offset1 * 1000).In(loc) as TimePrivate;
  const { offset: offset2 } = t2.Zone();
  if (offset2 !== offset1) {
    return new TimePrivate(utcUnixMs - offset2 * 1000).In(loc) as TimePrivate;
  }
  return t2;
}

type offsetData = {
  hours: number;
  minutes: number;
  seconds: number;
  negative: boolean;
};

type intlInfo = {
  weekday: string;
  month: Month;
  day: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
  fractionalSecond: number;
  timeZoneName: string;
  timeZoneOffset: offsetData;
};

function isZero(d: offsetData): boolean {
  return d.hours === 0 && d.minutes === 0 && d.seconds === 0;
}

function parseGMTOffset(offsetStr: string): offsetData {
  let od: offsetData = { negative: false, hours: 0, minutes: 0, seconds: 0 };
  if (offsetStr === "GMT") {
    return od;
  }

  const subs = offsetStr.substring(3);

  const throwErr = () => {
    throw new Error(`invalid GMT offset format '${offsetStr}'`);
  };

  const signChar = subs[0];
  if (signChar === "+") {
    od.negative = false;
  } else if (signChar === "-") {
    od.negative = true;
  } else {
    throwErr();
  }
  let i = 1;

  const [hrs, hrsL] = getnum(subs.substring(i), true);
  i += hrsL;
  od.hours = hrs;

  if (subs[i] === ":") {
    i++;
    const [mins, minL] = getnum(subs.substring(i), true);
    od.minutes = mins;
    i += minL;
  }
  if (subs[i] == ":") {
    i++;
    const [secs, secL] = getnum(subs.substring(i), true);
    od.seconds = secs;
    i += secL;
  }

  return od;
}

function _getOffsetTime(t: TimePrivate): offsetData {
  const zoneName = t._ianaZoneName();
  const intl = new Intl.DateTimeFormat("en-US", {
    timeZone: zoneName,
    timeZoneName: "longOffset",
    // timeZoneName: "shortOffset",
  }).formatToParts(t._internalDate());
  for (const item of intl) {
    if (item.type === "timeZoneName") {
      return parseGMTOffset(item.value);
    }
  }
  throw new Error(`offset not found for: ${zoneName}`);
}

// TODO: write a fast version for common cases that skips the Intl call (slow).
function intlInfoFor(t: TimePrivate): intlInfo {
  const intl = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    minute: "numeric",
    hour: "numeric",
    second: "numeric",
    hourCycle: "h23",
    day: "numeric",
    timeZone: t._ianaZoneName(),
    timeZoneName: "short",
    // @ts-ignore
    fractionalSecondDigits: 3, // typescript doesn't know about this.
  }).formatToParts(t._internalDate());
  const zoneOffset = _getOffsetTime(t);

  const infoParts = Object.fromEntries(
    intl
      .filter((item) => item.type !== "literal")
      .map((item) => [
        item.type,
        isValidNumber(item.value) ? Number(item.value) : item.value,
      ]),
  ) as any;
  infoParts.timeZoneOffset = zoneOffset;
  return infoParts as intlInfo;
}

// function formatInternal(t: TimePrivate, layout: string): string {
function formatInternal(intlInfo: intlInfo, layout: string): string {
  let out: string[] = [];
  const parts = parseLayout(layout, false);
  // const intlInfo = t._getIntlInfo();
  // intlInfo:
  // {
  //   weekday: "Monday",
  //   month: 5,
  //   day: 26,
  //   year: 2025,
  //   hour: 23,
  //   minute: 46,
  //   second: 55,
  //   fractionalSecond: 257,
  //   timeZoneName: "UTC",
  //   timeZoneOffset: { negative: false, hours: 0, minutes: 0, seconds: 0 },
  // };

  const {
    month,
    hour,
    minute,
    fractionalSecond: millis,
    timeZoneOffset: zoneOffset,
  } = intlInfo;
  const monthIndex = month - 1;

  for (const p of parts) {
    if (typeof p === "string") {
      out.push(p);
      continue;
    }

    switch (std.MaskLower & p) {
      case std.LongMonth:
        out.push(longMonthNames[monthIndex]);
        break;
      case std.Month:
        out.push(shortMonthNames[monthIndex]);
        break;
      case std.NumMonth:
        out.push(String(month));
        break;
      case std.ZeroMonth:
        out.push(String(month).padStart(2, "0"));
        break;
      case std.LongWeekDay:
        out.push(intlInfo.weekday);
        break;
      case std.WeekDay:
        out.push(intlInfo.weekday.substr(0, 3));
        break;
      case std.Day:
        out.push(String(intlInfo.day));
        break;
      case std.UnderDay:
        out.push(String(intlInfo.day).padStart(2, " "));
        break;
      case std.ZeroDay:
        out.push(String(intlInfo.day).padStart(2, "0"));
        break;
      case std.UnderYearDay:
        out.push(
          String(yearDay(intlInfo.year, month, intlInfo.day)).padStart(3, " "),
        );
        break;
      case std.ZeroYearDay:
        out.push(
          String(yearDay(intlInfo.year, month, intlInfo.day)).padStart(3, "0"),
        );
        break;
      case std.Hour:
        out.push(String(hour).padStart(2, "0"));
        break;
      case std.Hour12:
        out.push(String(hour % 12 || 12));
        break;
      case std.ZeroHour12:
        out.push(String(hour % 12 || 12).padStart(2, "0"));
        break;
      case std.Minute:
        out.push(String(minute));
        break;
      case std.ZeroMinute:
        out.push(String(minute).padStart(2, "0"));
        break;
      case std.Second:
        out.push(String(intlInfo.second));
        break;
      case std.ZeroSecond:
        out.push(String(intlInfo.second).padStart(2, "0"));
        break;
      case std.LongYear:
        out.push(String(intlInfo.year));
        break;
      case std.Year:
        out.push(String(intlInfo.year).substring(2));
        break;
      case std.PM:
        out.push(hour >= 12 ? "PM" : "AM");
        break;
      case std.pm:
        out.push(hour >= 12 ? "pm" : "am");
        break;
      case std.TZ:
        if (intlInfo.timeZoneName !== "") {
          out.push(intlInfo.timeZoneName);
        } else {
          // No time zone known for this time, but we must print one.
          // Use the -0700 format.
          out.push(zoneOffset.negative ? "-" : "+");
          out.push(String(zoneOffset.hours).padStart(2, "0"));
          out.push(String(zoneOffset.minutes).padStart(2, "0"));
        }
        break;
      case std.ISO8601TZ:
        if (isZero(zoneOffset)) {
          out.push("Z");
          break;
        }
      // fallthrough
      case std.NumTZ:
        out.push(zoneOffset.negative ? "-" : "+");
        out.push(String(zoneOffset.hours).padStart(2, "0"));
        out.push(String(zoneOffset.minutes).padStart(2, "0"));
        break;
      case std.ISO8601SecondsTZ:
        if (isZero(zoneOffset)) {
          out.push("Z");
          break;
        }
      // fallthrough
      case std.NumSecondsTZ:
        out.push(zoneOffset.negative ? "-" : "+");
        out.push(String(zoneOffset.hours).padStart(2, "0"));
        out.push(String(zoneOffset.minutes).padStart(2, "0"));
        out.push(String(zoneOffset.seconds).padStart(2, "0"));
        break;
      case std.ISO8601ShortTZ:
        if (isZero(zoneOffset)) {
          out.push("Z");
          break;
        }
      // fallthrough
      case std.NumShortTZ:
        out.push(zoneOffset.negative ? "-" : "+");
        out.push(String(zoneOffset.hours).padStart(2, "0"));
        break;
      case std.ISO8601ColonTZ:
        if (isZero(zoneOffset)) {
          out.push("Z");
          break;
        }
      // fallthrough
      case std.NumColonTZ:
        out.push(zoneOffset.negative ? "-" : "+");
        out.push(String(zoneOffset.hours).padStart(2, "0"));
        out.push(":");
        out.push(String(zoneOffset.minutes).padStart(2, "0"));
        break;

      case std.ISO8601ColonSecondsTZ:
        if (isZero(zoneOffset)) {
          out.push("Z");
          break;
        }
      //fallthroguh
      case std.NumColonSecondsTZ:
        out.push(zoneOffset.negative ? "-" : "+");
        out.push(String(zoneOffset.hours).padStart(2, "0"));
        out.push(":");
        out.push(String(zoneOffset.minutes).padStart(2, "0"));
        out.push(":");
        out.push(String(zoneOffset.seconds).padStart(2, "0"));
        break;
      case std.FracSecond0 /* fallthrough */:
        out.push(fracSecondsStr(p, millis));
        break;
      case std.FracSecond9:
        const fracS = fracSecondsStr(p, millis);
        if (fracS.length === 0) {
          out.pop(); // remove the comma/period.
          break;
        }
        out.push(fracS);
        break;
      default:
        console.warn("UNHANDLED", p);
        break;
    }
  }

  return out.join("");
}

function parseInternal(
  layout: string,
  value: string,
  defaultLocation: IANA,
): TimePrivate {
  const parts = parseLayout(layout, true);
  // console.log(
  //   parts.map(p => {
  //     if (typeof p === "string") return p;
  //     return std[p & std.MaskLower];
  //   })
  // );

  let year = 0,
    month = -1,
    day = -1,
    yearday = -1,
    hour = 0,
    minute = 0,
    second = 0,
    milli = 0,
    pmSet = false,
    amSet = false,
    tzString = "",
    zone: IANA | null = null,
    zoneOffsetHr = 0,
    zoneOffsetMin = 0,
    zoneOffsetSec = 0,
    zoneOffsetSign = 1;

  let vi = 0;
  for (let partIndex = 0; partIndex < parts.length; partIndex++) {
    const p = parts[partIndex];
    if (typeof p === "string") {
      if (p === " ") {
        while (value[vi] === " ") vi++;
      } else {
        vi += p.length;
      }
      continue;
    }

    const mP = p & std.MaskLower;

    // console.log(std[mP], `'${value.substring(vi)}'`, vi);
    switch (mP) {
      case std.Month:
      // fallthrough
      case std.LongMonth:
        const [monthS, monthIndex] = (
          mP === std.Month ? getShortMonthPrefix : getLongMonthPrefix
        )(value.substring(vi));
        month = monthIndex + 1;
        vi += monthS.length;
        break;
      case std.NumMonth:
      // fallthrough
      case std.ZeroMonth:
        const [nm, nml] = getnum(value.substring(vi), mP === std.ZeroMonth);
        if (nm <= 0 || nm > 12)
          throw new Error(`invalid month ${nm}: ${value}`);
        month = nm;
        vi += nml;
        break;
      case std.LongWeekDay:
        vi += getLongDayPrefix(value.substring(vi))[0].length;
        break;
      case std.WeekDay:
        vi += getShortDayPrefix(value.substring(vi))[0].length;
        break;
      case std.Day:
      // fallthrough
      case std.UnderDay:
        if (value[vi] === " ") vi++;
      // fallthrough
      case std.ZeroDay:
        const [dayVal, dayLength] = getnum(
          value.substring(vi),
          mP === std.ZeroDay,
        );
        day = dayVal;
        vi += dayLength;
        break;
      case std.UnderYearDay:
      case std.ZeroYearDay: {
        for (let ydi = 0; ydi < 2; ydi++) {
          if (mP === std.UnderYearDay && vi < value.length && value[0] == " ") {
            vi++;
          }
        }
        const [yval, ylen] = getnum3(
          value.substring(vi),
          mP === std.ZeroYearDay,
        );
        vi += ylen;
        yearday = yval;
        break;
      }
      case std.Hour: {
        const [hourNum, hourNumL] = getnum(value.substring(vi), false);
        if (hourNum < 0 || 24 <= hourNum)
          throw new Error(`invalid hour ${hourNum}`);
        hour = hourNum;
        vi += hourNumL;
        break;
      }
      case std.Hour12:
      // fallthrough
      case std.ZeroHour12: {
        const [hourNum, hourNumL] = getnum(
          value.substring(vi),
          mP == std.ZeroHour12,
        );
        if (hourNum < 0 || 12 < hourNum)
          throw new Error(`invalid hour12: ${hourNum}`);
        hour = hourNum;
        vi += hourNumL;
        break;
      }
      case std.Minute:
      // fallthrough
      case std.ZeroMinute:
        const [minNum, minNumL] = getnum(
          value.substring(vi),
          mP === std.ZeroMinute,
        );
        if (minNum < 0 || minNum > 60)
          throw new Error(`invalid minute: ${minNum}`);
        minute = minNum;
        vi += minNumL;
        break;
      case std.Second:
      case std.ZeroSecond: {
        const [secNum, setNumL] = getnum(
          value.substring(vi),
          mP === std.ZeroSecond,
        );
        if (secNum < 0 || secNum > 60)
          throw new Error(`invalid second: ${secNum}`);

        second = secNum;
        vi += setNumL;

        // Special case: do we have a fractional second but no
        // fractional second in the format?
        const subv = value.substring(vi);
        if (subv.length >= 2 && isCommaOrPeriod(subv[0]) && isDigit(subv[1])) {
          const nextP = parts[partIndex + 1];
          const nextMP = typeof nextP === "string" ? -1 : nextP & std.MaskLower;

          if (nextMP === std.FracSecond0 || nextMP == std.FracSecond9) {
            // Fractional second in the layout; proceed normally
            break;
          }
          // No fractional second in the layout but we have one in the input.
          let n = 2;
          while (n < subv.length && isDigit(subv[n])) {
            n++;
          }
          const [millisV, millisL] = parseFracSeconds(subv.substring(0, n));
          milli = millisV;
          vi += millisL;
        }

        break;
      }
      case std.LongYear:
      // fallthrough
      case std.Year:
        const yearS = value.substring(vi, vi + (mP === std.Year ? 2 : 4));
        throwInvalidNumber(yearS, `year in '${value}'`);
        year = Number(yearS);
        if (mP === std.Year) {
          if (year >= 69) {
            year += 1900;
          } else {
            year += 2000;
          }
        }
        vi += yearS.length;
        break;
      case std.PM: {
        const pmS = value.substring(vi, vi + 2);
        if (pmS === "PM") {
          pmSet = true;
        } else if (pmS == "AM") {
          amSet = true;
        } else {
          throw new Error(`invalid AM/PM: ${pmS}`);
        }
        vi += pmS.length;
        break;
      }
      case std.pm: {
        const pmS = value.substring(vi, vi + 2);
        if (pmS === "pm") {
          pmSet = true;
        } else if (pmS == "am") {
          amSet = true;
        } else {
          throw new Error(`invalid AM/PM: ${pmS}`);
        }
        vi += pmS.length;
        break;
      }
      case std.TZ:
        tzString = parseTimeZoneStr(value.substring(vi));
        vi += tzString.length;
        if (tzString === "UTC") zone = UTC;
        break;
      case std.ISO8601TZ:
      case std.ISO8601ShortTZ:
      case std.ISO8601ColonTZ:
      case std.ISO8601SecondsTZ:
      case std.ISO8601ColonSecondsTZ:
        if (value[vi] === "Z") {
          zone = UTC;
          vi++;
          break;
        }
      case std.NumTZ:
      case std.NumShortTZ:
      case std.NumColonTZ:
      case std.NumSecondsTZ:
      case std.NumColonSecondsTZ:
        let zsign = "",
          zhour = "",
          zmin = "",
          zsec = "";
        const subv = value.substring(vi);
        const errTooShort = () => {
          throw new Error(`tz too short: '${subv}'`);
        };

        if (mP === std.ISO8601ColonTZ || mP === std.NumColonTZ) {
          if (subv.length < 6) errTooShort();
          if (subv[3] !== ":")
            throw new Error(
              `tz missing colon: ${subv[3]} (${subv} -- ${value})`,
            );
          zsign = subv[0];
          zhour = subv.substring(1, 3);
          zmin = subv.substring(4, 6);
          zsec = "00";
          vi += 6;
        } else if (mP === std.NumShortTZ || mP == std.ISO8601ShortTZ) {
          if (subv.length < 3) errTooShort();
          zsign = subv[0];
          zhour = subv.substring(1, 3);
          zmin = "00";
          zsec = "00";
          vi += 3;
        } else if (
          mP === std.ISO8601ColonSecondsTZ ||
          mP == std.NumColonSecondsTZ
        ) {
          if (subv.length < 9) errTooShort();
          if (subv[3] !== ":" || subv[6] !== ":")
            throw new Error(`tz missing colo: ${subv[3]} ${subv[6]}`);
          zsign = subv[0];
          zhour = subv.substring(1, 3);
          zmin = subv.substring(4, 6);
          zsec = subv.substring(7, 9);
          vi += 9;
        } else if (mP === std.ISO8601SecondsTZ || mP === std.NumSecondsTZ) {
          if (subv.length < 7) errTooShort();
          zsign = subv[0];
          zhour = subv.substring(1, 3);
          zmin = subv.substring(3, 5);
          zsec = subv.substring(5, 7);
          vi += 7;
        } else {
          if (subv.length < 5) errTooShort();
          zsign = subv[0];
          zhour = subv.substring(1, 3);
          zmin = subv.substring(3, 5);
          zsec = "00";
          vi += 5;
        }
        const zhr = getnum(zhour, true)[0];
        const zmm = getnum(zmin, true)[0];
        const zss = getnum(zsec, true)[0];
        if (zhr > 24) throw new Error(`invalid offset hour: ${zhr}`);
        if (zmm > 60) throw new Error(`invalid offset minute: ${zmm}`);
        if (zss > 60) throw new Error(`invalid offset second: ${zss}`);
        zoneOffsetHr = zhr;
        zoneOffsetMin = zmm;
        zoneOffsetSec = zss;

        if (zsign === "+") {
          zoneOffsetSign = 1;
        } else if (zsign === "-") {
          zoneOffsetSign = -1;
        } else {
          throw new Error(`invalid zone sign: '${zsign}'`);
        }
        break;
      case std.FracSecond9: {
        const subv = value.substring(vi);
        if (subv.length < 2) break;
        if (!(isCommaOrPeriod(subv[0]) && isDigit(subv[1]))) break;
        let endIndex = 1;
        while (endIndex < subv.length && isDigit(subv[endIndex])) {
          endIndex++;
        }

        const [millisV, millisL] = parseFracSeconds(
          subv.substring(0, endIndex),
        );
        vi += millisL;
        milli = millisV;
        break;
      }
      case std.FracSecond0: {
        const numDigits = (p >> 16) & 0xfff;
        const subv = value.substring(vi);
        // exact num digits.
        if (subv.length < numDigits + 1) {
          throw new Error(`not enough digits ${subv}`);
        }
        const [millisV, millisL] = parseFracSeconds(
          subv.substring(0, numDigits + 1),
        );
        vi += millisL;
        milli = millisV;
        break;
      }
      default:
        console.warn(`unhandled`, p);
        break;
    }
  }

  if (pmSet && hour < 12) {
    hour += 12;
  } else if (amSet && hour == 12) {
    hour = 0;
  }

  if (yearday >= 0) {
    // console.log({ yearday });
    let monthTemp = 0,
      dayTemp = 0;
    if (isLeap(year)) {
      if (yearday === 31 + 29) {
        monthTemp = Month.February;
        dayTemp = 29;
      } else if (yearday > 31 + 29) {
        yearday--;
      }
    }
    if (yearday < 1 || yearday > 365) {
      throw new Error(`invalid year day: ${yearday}`);
    }
    if (monthTemp === 0) {
      monthTemp = Math.trunc((yearday - 1) / 31) + 1;
      if (daysBefore(monthTemp + 1) < yearday) {
        monthTemp++;
      }
      dayTemp = yearday - daysBefore(monthTemp);
    }

    if (month >= 0 && month !== monthTemp) {
      throw new Error(`day-of-year does not match month`);
    }
    month = monthTemp;
    if (day >= 0 && day !== dayTemp) {
      throw new Error(`day-of-year does not match day`);
    }
    day = dayTemp;
  } else {
    if (month < 0) month = Month.January;
    if (day < 0) day = 1;
  }
  // console.log({ year, month, day, hour, minute, second, milli });
  if (day < 1 || day > daysIn(month, year)) {
    throw new Error(`day ${day} out of range for month+year`);
  }

  if (zone !== null) {
    // handles UTC
    return _DateAt(year, month, day, hour, minute, second, milli, zone);
  }

  if (zoneOffsetHr !== 0 || zoneOffsetMin !== 0 || zoneOffsetSec !== 0) {
    // const offsetSec =
    //   zoneOffsetSign * (zoneOffsetHr * 60 + zoneOffsetMin) * 60 + zoneOffsetSec;
    const t = _DateAt(
      year,
      month,
      day,
      hour,
      minute,
      second,
      // second - offsetSec,
      milli,
      UTC,
    );
    t._setTZAbbr(tzString);
    t._setTZoffset(zoneOffsetSign, zoneOffsetHr, zoneOffsetMin, zoneOffsetSec);
    return t;
  }

  if (tzString.length > 0) {
    let t = _DateAt(
      year,
      month,
      day,
      hour,
      minute,
      second,
      milli,
      defaultLocation,
    );
    if (tzString.length > 3 && tzString.substring(0, 3) === "GMT") {
      let offset = throwInvalidNumber(tzString.substring(3), tzString); // like GMT-8, GMT+8
      offset *= 3600;
      t = t.Add(offset * Second) as TimePrivate;
      const [oh, om, os] = secondsToHMS(Math.abs(offset));
      zoneOffsetHr = oh;
      zoneOffsetMin = om;
      zoneOffsetSec = os;
      if (offset < 0) zoneOffsetSign = -1;
      t._setTZoffset(
        zoneOffsetSign,
        zoneOffsetHr,
        zoneOffsetMin,
        zoneOffsetSec,
      );
    }
    t._setTZAbbr(tzString);
    return t;
  }

  return _DateAt(
    year,
    month,
    day,
    hour,
    minute,
    second,
    milli,
    defaultLocation,
  );
}

function secondsToHMS(
  totalSeconds: number,
): [hours: number, minutes: number, seconds: number] {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds];
}

function daysBefore(m: Month): number {
  let adj = 0;
  if (m >= Month.March) {
    adj = -2;
  }

  // With the -2 adjustment after February,
  // we need to compute the running sum of:
  //	0  31  30  31  30  31  30  31  31  30  31  30  31
  // which is:
  //	0  31  61  92 122 153 183 214 245 275 306 336 367
  // This is almost exactly 367/12×(m-1) except for the
  // occasonal off-by-one suggesting there may be an
  // integer approximation of the form (a×m + b)/c.
  // A brute force search over small a, b, c finds that
  // (214×m - 211) / 7 computes the function perfectly.
  // return (214*int(m)-211)/7 + adj
  return Math.trunc((214 * m - 211) / 7) + adj;
}

const longDayNames: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const shortDayNames: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const shortMonthNames: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const longMonthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getnum3(s: string, fixed: boolean): [val: number, length: number] {
  let n = 0,
    i = 0;
  while (i < 3 && isDigit(s[i])) {
    n = n * 10 + throwInvalidNumber(s[i], "year day");
    i++;
  }
  if (i === 0 || (fixed && i !== 3)) {
    throw new Error(`not enough digits: '${s}' ${fixed}`);
  }
  return [n, i];
}

// get 2 digit num
function getnum(s: string, fixed: boolean): [val: number, length: number] {
  if (!isDigit(s[0])) {
    throw new Error(`not a digit: '${s[0]}' (${s})`);
  }
  if (!isDigit(s[1])) {
    if (fixed) {
      throw new Error(`not a digit: '${s[1]}' (${s})`);
    }
    return [Number(s[0]), 1];
  }
  return [Number(s.substring(0, 2)), 2];
}

function _findPrefix(
  s: string,
  opts: string[],
  typeName: string,
): [match: string, index: number] {
  for (let i = 0; i < opts.length; i++) {
    const opt = opts[i];
    if (s.toLowerCase().startsWith(opt.toLowerCase())) {
      return [opt, i];
    }
  }
  throw new Error(`invalid ${typeName}: '${s}'`);
}

function getShortDayPrefix(s: string): [day: string, index: number] {
  return _findPrefix(s, shortDayNames, "short day name");
}

function getLongDayPrefix(s: string): [day: string, index: number] {
  return _findPrefix(s, longDayNames, "long day name");
}

function getShortMonthPrefix(s: string): [month: string, i: number] {
  return _findPrefix(s, shortMonthNames, "short month name");
}

function getLongMonthPrefix(s: string): [month: string, index: number] {
  return _findPrefix(s, longMonthNames, "long month name");
}

function parseSignedOffset(s: string): string {
  const sign = s[0];
  if (sign !== "+" && sign !== "-") {
    throw new Error(`bad signed tz offset ${s}`);
  }
  let i = 1;
  while (i < s.length && isDigit(s[i])) {
    i++;
  }
  return s.substring(0, i);
}

function parseTimeZoneStr(s: string): string {
  const _doThrow = () => {
    throw new Error(`invalid time zone: '${s}'`);
  };
  if (s.length < 3) {
    _doThrow();
  }
  const first3 = s.substring(0, 3);
  if (first3 === "UTC") {
    return first3;
  }

  // Special case 1: ChST and MeST are the only zones with a lower-case letter.
  const first4 = s.substring(0, 4);
  if (first4.length === 4 && (first4 === "ChST" || first4 === "MeST")) {
    return first4;
  }

  // Special case 2: GMT may have an hour offset; treat it specially.
  if (first3 === "GMT") {
    if (first4[3] === "+" || first4[3] === "-") {
      return first3 + parseSignedOffset(s.substring(3));
    }
    return first3;
  }

  if (s[0] === "+" || s[1] === "-") {
    return parseSignedOffset(s);
  }

  let nUpper = 0;
  while (nUpper < 6) {
    if (nUpper >= s.length) {
      break;
    }
    if (!isUppercase(s[nUpper])) {
      break;
    }
    nUpper++;
  }
  switch (nUpper) {
    case 0:
    case 1:
    case 2:
    case 6:
      _doThrow();
      break;
    case 5:
      if (s[4] === "T") {
        return s.substring(0, 5);
      }
      break;
    case 4:
      // Must end in T, except one special case.
      if (first4[3] === "T" || first4 === "WITA") {
        return first4;
      }
      break;
    case 3:
      return first3;
  }
  _doThrow();
  return "";
}

// module private.
const enum std {
  LongMonth, // "January"
  Month, // "Jan"
  NumMonth, // "1"
  ZeroMonth, // "01"
  LongWeekDay, // "Monday"
  WeekDay, // "Mon"
  Day, // "2"
  UnderDay, // "_2"
  ZeroDay, // "02"

  UnderYearDay, // "__2" (day of year)
  ZeroYearDay, // "002"

  // Time-related components
  Hour, // "15"
  Hour12, // "3"
  ZeroHour12, // "03"
  Minute, // "4"
  ZeroMinute, // "04"
  Second, // "5"
  ZeroSecond, // "05"

  LongYear, // "2006"
  Year, // "06"

  PM, // "PM"
  pm, // "pm"

  // Time zone formats
  TZ, // "MST"
  ISO8601TZ, // "Z0700"
  ISO8601SecondsTZ, // "Z070000"
  ISO8601ShortTZ, // "Z07"
  ISO8601ColonTZ, // "Z07:00"
  ISO8601ColonSecondsTZ, // "Z07:00:00"
  NumTZ, // "-0700"
  NumSecondsTZ, // "-070000"
  NumShortTZ, // "-07"
  NumColonTZ, // "-07:00"
  NumColonSecondsTZ, // "-07:00:00"

  // Fractional seconds
  FracSecond0, // ".0", ".00", ... (trailing zeros included)
  FracSecond9, // ".9", ".99", ... (trailing zeros omitted)

  MaskLower = 0xffff,
}

function parseFracSeconds(s: string): [millis: number, length: number] {
  if (!isCommaOrPeriod(s[0])) {
    throw new Error(`must start with comma or period '${s}'`);
  }
  let n = s.length;
  if (n > 10) n = 10;

  const numS = s.substring(1, n);
  const value = throwInvalidNumber(numS, "fractional seconds");
  if (value < 0) {
    throw new Error(`cannot be negative ${s}`);
  }

  let nano = value;
  for (let i = 0; i < 10 - n; i++) {
    nano *= 10;
  }
  const MILLI_TO_NANO = 1000000;
  const NANO_TO_MILLI = 1 / MILLI_TO_NANO;
  const millis = Math.round(nano * NANO_TO_MILLI);
  return [millis, n];
}

function fracSecondsStr(code: std, millis: number): string {
  const count = (code >> 16) & 0xfff;
  let padded = String(Math.floor(millis)).padStart(3, "0");
  if (count < padded.length) {
    padded = padded.substring(0, count);
  }

  switch (std.MaskLower & code) {
    case std.FracSecond0: // trailing zeroes included.
      return padded.padEnd(count, "0");
    case std.FracSecond9: // trailing zeroes omitted
      return trimTrailingZeroes(padded);
    default:
      throw new Error(`invalid code for fractional seconds ${code}`);
  }
}

function trimTrailingZeroes(s: string): string {
  const parts = [...s];
  let lastZero = s.length - 1;
  while (lastZero >= 0) {
    if (parts[lastZero] !== "0") break;
    lastZero--;
  }
  return parts.slice(0, lastZero + 1).join("");
}

const std0x: { [k: string]: std } = {
  "1": std.ZeroMonth,
  "2": std.ZeroDay,
  "3": std.ZeroHour12,
  "4": std.ZeroMinute,
  "5": std.ZeroSecond,
  "6": std.Year,
};

function charsMatch(
  chars: string[],
  startIndex: number,
  matchS: string,
): boolean {
  const matchPoints = [...matchS];
  for (let i = 0; i < matchPoints.length; i++) {
    const c = chars[i + startIndex];
    if (!c) return false;
    const mC = matchPoints[i];
    if (mC !== c) return false;
  }
  return true;
}

// const layoutCache: Record<string, (std | string)[]> = {};
// here is a native date method to get local time offset vs. UTC.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
// internal function

function parseLayout(layout: string, forTimeParse: boolean): (std | string)[] {
  // const cached = layoutCache[layout];
  // if (cached) return cached;
  // throw new GoTimeError(ErrorCode.ParseError, `bullshit layout: ${layout}`);

  const parts: (std | string)[] = [];
  const chars = [...layout];
  let i = 0;
  while (i < chars.length) {
    const c = chars[i];
    const nC = chars[i + 1];
    switch (c) {
      case "J": // January, Jan
        if (charsMatch(chars, i, "January")) {
          if (isLowercase(chars[i + 7])) {
            break;
          }
          parts.push(std.LongMonth);
          i += 7;
          continue;
        }
        if (charsMatch(chars, i, "Jan")) {
          if (isLowercase(chars[i + 3])) {
            break;
          }
          parts.push(std.Month);
          i += 3;
          continue;
        }
        break;
      case "M": // Monday, Mon, MST
        if (charsMatch(chars, i, "Monday")) {
          parts.push(std.LongWeekDay);
          i += 6;
          continue;
        }
        if (charsMatch(chars, i, "Mon")) {
          if (isLowercase(chars[i + 3])) {
            break;
          }
          parts.push(std.WeekDay);
          i += 3;
          continue;
        }
        if (charsMatch(chars, i, "MST")) {
          parts.push(std.TZ);
          i += 3;
          continue;
        }
        break;
      case "0": // 01, 02, 03, 04, 05, 06, 002
        if (charsMatch(chars, i, "002")) {
          parts.push(std.ZeroYearDay);
          i += 3;
          continue;
        }
        if (nC === void 0) break;
        const m = std0x[nC];
        if (m === void 0) break;
        parts.push(m);
        i += 2;
        continue;
      case "1": // 15, 1
        if (charsMatch(chars, i, "15")) {
          parts.push(std.Hour);
          i += 2;
          continue;
        }
        parts.push(std.NumMonth);
        i++;
        continue;
      case "2": // 2006, 2
        if (charsMatch(chars, i, "2006")) {
          parts.push(std.LongYear);
          i += 4;
          continue;
        }
        parts.push(std.Day);
        i++;
        continue;
      case "_": // _2, _2006, __2
        if (charsMatch(chars, i, "_2006")) {
          // _2006 is really a literal _, followed by stdLongYear
          parts.push("_");
          parts.push(std.LongYear);
          i += 5;
          continue;
        }
        if (charsMatch(chars, i, "__2")) {
          parts.push(std.UnderYearDay);
          i += 3;
          continue;
        }
        if (charsMatch(chars, i, "_2")) {
          parts.push(std.UnderDay);
          i += 2;
          continue;
        }
        break;
      case "3":
        parts.push(std.Hour12);
        i++;
        continue;
      case "4":
        parts.push(std.Minute);
        i++;
        continue;
      case "5":
        parts.push(std.Second);
        i++;
        continue;
      case "P": // PM
        if (charsMatch(chars, i, "PM")) {
          parts.push(std.PM);
          i += 2;
          continue;
        }
        break;
      case "p": // pm
        if (charsMatch(chars, i, "pm")) {
          parts.push(std.pm);
          i += 2;
          continue;
        }
        break;
      case "-": // -070000, -07:00:00, -0700, -07:00, -07
        if (charsMatch(chars, i, "-070000")) {
          parts.push(std.NumSecondsTZ);
          i += 7;
          continue;
        }
        if (charsMatch(chars, i, "-07:00:00")) {
          parts.push(std.NumColonSecondsTZ);
          i += 9;
          continue;
        }
        if (charsMatch(chars, i, "-0700")) {
          parts.push(std.NumTZ);
          i += 5;
          continue;
        }
        if (charsMatch(chars, i, "-07:00")) {
          parts.push(std.NumColonTZ);
          i += 6;
          continue;
        }
        if (charsMatch(chars, i, "-07")) {
          parts.push(std.NumShortTZ);
          i += 3;
          continue;
        }
        break;
      case "Z": // Z070000, Z07:00:00, Z0700, Z07:00,
        if (charsMatch(chars, i, "Z070000")) {
          parts.push(std.ISO8601SecondsTZ);
          i += 7;
          continue;
        }
        if (charsMatch(chars, i, "Z07:00:00")) {
          parts.push(std.ISO8601ColonSecondsTZ);
          i += 9;
          continue;
        }
        if (charsMatch(chars, i, "Z0700")) {
          parts.push(std.ISO8601TZ);
          i += 5;
          continue;
        }
        if (charsMatch(chars, i, "Z07:00")) {
          parts.push(std.ISO8601ColonTZ);
          i += 6;
          continue;
        }
        if (charsMatch(chars, i, "Z07")) {
          parts.push(std.ISO8601ShortTZ);
          i += 3;
          continue;
        }
        break;

      case ".": // // ,000, or .000, or ,999, or .999 - repeated digits for fractional seconds.
      /* fallthrough */
      case ",":
        if (nC === void 0) break;
        if (nC !== "9" && nC !== "0") break;
        let j = 1;
        while (i + j < chars.length && chars[i + j] === nC) {
          j++;
        }
        if (isDigit(chars[i + j])) break; // must not end with another digit.
        if (!forTimeParse) parts.push(c); // push the comma or whatever.

        let stdCode = nC === "0" ? std.FracSecond0 : std.FracSecond9;
        stdCode |= ((j - 1) & 0xfff) << 16;
        parts.push(stdCode);
        i += j;
        continue;
      default:
        break;
    }
    parts.push(c);
    i++;
  }

  return parts;
}

function isDigit(c: string): boolean {
  if (c === void 0) return false;
  return c >= "0" && c <= "9";
}

function isLowercase(c: string): boolean {
  if (c === void 0) return false;
  return c >= "a" && c <= "z";
}

function isCommaOrPeriod(c: string): boolean {
  return c === "." || c === ",";
}

function isUppercase(c: string): boolean {
  if (c === void 0) return false;
  return c >= "A" && c <= "Z";
}

function isLeap(year: number): boolean {
  // year%4 == 0 && (year%100 != 0 || year%400 == 0)
  // Bottom 2 bits must be clear.
  // For multiples of 25, bottom 4 bits must be clear.
  // Thanks to Cassio Neri for this trick.
  let mask = 0xf;
  if (year % 25 !== 0) {
    mask = 3;
  }
  return (year & mask) === 0;
}

function daysIn(m: Month, year: number): number {
  if (m === Month.February) {
    return isLeap(year) ? 29 : 28;
  }
  // 30 + ((m + (m >> 3)) & 1)
  return 30 + ((m + (m >> 3)) & 1);
}

function yearDay(year: number, month: Month, day: number): number {
  let yDay = 0;
  let m = Month.January;
  while (m < month) {
    yDay += daysIn(m, year);
    m++;
  }
  yDay += day;
  return yDay;
}

function isValidNumber(str: string): boolean {
  if (str.trim() === "") return false; // reject empty or whitespace strings
  return !isNaN(Number(str));
}

function throwInvalidNumber(str: string, name: string): number {
  if (!isValidNumber(str))
    throw new Error(`'${str}' not a valid number for ${name}`);
  return Number(str);
}
