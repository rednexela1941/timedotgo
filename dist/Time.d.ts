/**
 * Duration (milliseconds)
 */
export type Duration = number;
/**
 * Millisecond is the base duration unit.
 */
export declare const Millisecond: Duration;
/**
 * Second = 1000 * Millisecond
 */
export declare const Second: Duration;
/**
 * Minute = 60 * Second
 */
export declare const Minute: Duration;
/**
 * Hour = 60 * Minute
 */
export declare const Hour: Duration;
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
export declare const Layout = "01/02 03:04:05PM '06 -0700";
export declare const ANSIC = "Mon Jan _2 15:04:05 2006";
export declare const UnixDate = "Mon Jan _2 15:04:05 MST 2006";
export declare const RubyDate = "Mon Jan 02 15:04:05 -0700 2006";
export declare const RFC822 = "02 Jan 06 15:04 MST";
export declare const RFC822Z = "02 Jan 06 15:04 -0700";
export declare const RFC850 = "Monday, 02-Jan-06 15:04:05 MST";
export declare const RFC1123 = "Mon, 02 Jan 2006 15:04:05 MST";
export declare const RFC1123Z = "Mon, 02 Jan 2006 15:04:05 -0700";
export declare const RFC3339 = "2006-01-02T15:04:05Z07:00";
export declare const RFC3339Nano = "2006-01-02T15:04:05.999999999Z07:00";
export declare const Kitchen = "3:04PM";
export declare const Stamp = "Jan _2 15:04:05";
export declare const StampMilli = "Jan _2 15:04:05.000";
export declare const StampMicro = "Jan _2 15:04:05.000000";
export declare const StampNano = "Jan _2 15:04:05.000000000";
export declare const DateTime = "2006-01-02 15:04:05";
export declare const DateOnly = "2006-01-02";
export declare const TimeOnly = "15:04:05";
/**
 * IANA: eg. "America/New_York"
 * see here: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANA = string;
/**
 * Local represents the system's local time zone.
 */
export declare const Local: IANA;
/**
 * UTC represents Universal Coordinated Time (UTC).
 */
export declare const UTC: IANA;
/**
 * List available locations/IANA names.
 */
export declare function AvailableIANAs(): IANA[];
/**
 * A Month specifies a month of the year (January = 1, ...).
 */
export declare enum Month {
    January = 1,
    February = 2,
    March = 3,
    April = 4,
    May = 5,
    June = 6,
    July = 7,
    August = 8,
    September = 9,
    October = 10,
    November = 11,
    December = 12
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
    Clock(): {
        hour: number;
        minute: number;
        second: number;
    };
    /**
     * Date returns the year, month, and day in which t occurs.
     */
    Date(): {
        year: number;
        month: Month;
        day: number;
    };
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
    Zone(): {
        name: string;
        offset: number;
    };
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
export declare function FromJSDate(jsDate: Date): Time;
/**
 * Now returns the current local time.
 */
export declare function Now(): Time;
/**
 * Unix returns the local Time corresponding to the given Unix time,
 * sec seconds since January 1, 1970 UTC.
 */
export declare function Unix(seconds: number): Time;
/**
 * UnixMilli returns the local Time corresponding to the given Unix time,
 * msec milliseconds since January 1, 1970 UTC.
 */
export declare function UnixMilli(millis: number): Time;
/**
 * Replicates golangs time.Date(...) function for creating Time objects.
 * note that nanoseconds is replaced with milliseconds for javascript
 * and the name is DateAt (to avoid conflict with JS built-in Date).
 */
export declare function DateAt(year: number, month: Month, day: number, hour: number, min: number, sec: number, milli: number, loc: IANA): Time;
/**
 * ParseInLocation is like Parse but differs in two important ways. First,
 * in the absence of time zone information, Parse interprets a time as UTC;
 * ParseInLocation interprets the time as in the given location. Second,
 * when given a zone offset or abbreviation, Parse tries to match it against
 * the Local location; ParseInLocation uses the given location.
 */
export declare function ParseInLocation(layout: string, value: string, location: IANA): Time;
/**
 * Parse parses a formatted string and returns the time value it represents.
 * See the documentation for the constant called Layout to see how to represent
 * the format. The second argument must be parseable using the format string
 * (layout) provided as the first argument.
 */
export declare function Parse(layout: string, value: string): Time;
//# sourceMappingURL=Time.d.ts.map