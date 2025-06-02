// for time zones, see here: https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations#cite_note-18
// and see if you can scrape them to make a working parser.
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TimePrivate___dateInternal, _TimePrivate___ianaZone, _TimePrivate___cacheInfo;
/**
 * Millisecond is the base duration unit.
 */
export const Millisecond = 1;
/**
 * Second = 1000 * Millisecond
 */
export const Second = 1000 * Millisecond;
/**
 * Minute = 60 * Second
 */
export const Minute = 60 * Second;
/**
 * Hour = 60 * Minute
 */
export const Hour = 60 * Minute;
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
 * Local represents the system's local time zone.
 */
export const Local = String(Intl.DateTimeFormat().resolvedOptions().timeZone);
/**
 * UTC represents Universal Coordinated Time (UTC).
 */
export const UTC = "Etc/UTC";
/**
 * List available locations/IANA names.
 */
export function ListAvailableIANAs() {
    // @ts-ignore
    return Intl.supportedValuesOf("timeZone");
}
/**
 * A Month specifies a month of the year (January = 1, ...).
 */
export var Month;
(function (Month) {
    Month[Month["January"] = 1] = "January";
    Month[Month["February"] = 2] = "February";
    Month[Month["March"] = 3] = "March";
    Month[Month["April"] = 4] = "April";
    Month[Month["May"] = 5] = "May";
    Month[Month["June"] = 6] = "June";
    Month[Month["July"] = 7] = "July";
    Month[Month["August"] = 8] = "August";
    Month[Month["September"] = 9] = "September";
    Month[Month["October"] = 10] = "October";
    Month[Month["November"] = 11] = "November";
    Month[Month["December"] = 12] = "December";
})(Month || (Month = {}));
/**
 * FromJSDate to convert a javascript Date object to Time.
 */
export function FromJSDate(jsDate) {
    return new TimePrivate(jsDate.getTime());
}
/**
 * Now returns the current local time.
 */
export function Now() {
    return new TimePrivate(Date.now()).Local();
}
/**
 * Unix returns the local Time corresponding to the given Unix time,
 * sec seconds since January 1, 1970 UTC.
 */
export function Unix(seconds) {
    return new TimePrivate(seconds * 1000).In(Local);
}
/**
 * UnixMilli returns the local Time corresponding to the given Unix time,
 * msec milliseconds since January 1, 1970 UTC.
 */
export function UnixMilli(millis) {
    return new TimePrivate(millis).In(Local);
}
/**
 * Since returns the time elapsed since t. It is shorthand for
 * time.Now().Sub(t).
 */
export function Since(t) {
    return Now().Sub(t);
}
/**
 * Until returns the duration until t. It is shorthand for t.Sub(time.Now()).
 */
export function Until(t) {
    return t.Sub(Now());
}
/**
 * Replicates golangs time.Date(...) function for creating Time objects.
 * note that nanoseconds is replaced with milliseconds for javascript
 * and the name is DateAt (to avoid conflict with JS built-in Date).
 */
export function DateAt(year, month, day, hour, min, sec, milli, loc) {
    return _DateAt(year, month, day, hour, min, sec, milli, loc);
}
/**
 * ParseInLocation is like Parse but in the absence of time zone information,
 * Parse interprets a time as UTC and ParseInLocation interprets the time
 * as in the given location. Unlike go, no attempt is made to match an abbreviation
 * inside the given timezone. Location should be a valid IANA timezone identifier.
 */
export function ParseInLocation(layout, value, location) {
    return parseInternal(layout, value, location);
}
/**
 * Parse parses a formatted string and returns the time value it represents.
 * See the documentation for the constant called Layout to see how to represent
 * the format. The second argument must be parseable using the format string
 * (layout) provided as the first argument.
 */
export function Parse(layout, value) {
    return parseInternal(layout, value, UTC);
}
class TimePrivate {
    constructor(utcUnixMillis = 0) {
        _TimePrivate___dateInternal.set(this, void 0);
        _TimePrivate___ianaZone.set(this, UTC);
        _TimePrivate___cacheInfo.set(this, void 0);
        __classPrivateFieldSet(this, _TimePrivate___dateInternal, new Date(utcUnixMillis), "f");
    }
    _setTZoffset(sign, hr, min, sec) {
        const info = this._getIntlInfo();
        info.timeZoneOffset.negative = sign < 0;
        info.timeZoneOffset.hours = hr;
        info.timeZoneOffset.minutes = min;
        info.timeZoneOffset.seconds = sec;
    }
    _setTZAbbr(tzName) {
        this._getIntlInfo().timeZoneName = tzName;
    }
    _internalDate() {
        return __classPrivateFieldGet(this, _TimePrivate___dateInternal, "f");
    }
    // private
    _ianaZoneName() {
        return __classPrivateFieldGet(this, _TimePrivate___ianaZone, "f");
    }
    // file private
    _getIntlInfo() {
        if (__classPrivateFieldGet(this, _TimePrivate___cacheInfo, "f"))
            return __classPrivateFieldGet(this, _TimePrivate___cacheInfo, "f");
        const info = intlInfoFor(this);
        __classPrivateFieldSet(this, _TimePrivate___cacheInfo, info, "f");
        return info;
    }
    UnixMilli() {
        // returns milliseconds.
        return __classPrivateFieldGet(this, _TimePrivate___dateInternal, "f").getTime();
    }
    Add(d) {
        const t = new TimePrivate(this.UnixMilli() + d);
        __classPrivateFieldSet(t, _TimePrivate___ianaZone, __classPrivateFieldGet(this, _TimePrivate___ianaZone, "f"), "f");
        return t;
    }
    In(location) {
        const t = new TimePrivate(this.UnixMilli());
        __classPrivateFieldSet(t, _TimePrivate___ianaZone, location, "f");
        return t;
    }
    Clock() {
        const { hour, minute, second } = this._getIntlInfo();
        return { hour, minute, second };
    }
    Date() {
        const { year, month, day } = this._getIntlInfo();
        return { year, month, day };
    }
    YearDay() {
        const { year, month, day } = this.Date();
        return yearDay(year, month, day);
    }
    Year() {
        return this.Date().year;
    }
    Month() {
        return this.Date().month;
    }
    Day() {
        return this.Date().day;
    }
    Hour() {
        return this.Clock().hour;
    }
    Minute() {
        return this.Clock().minute;
    }
    Second() {
        return this.Clock().second;
    }
    Millisecond() {
        return this._getIntlInfo().fractionalSecond;
    }
    Zone() {
        const { timeZoneName, timeZoneOffset } = this._getIntlInfo();
        const { hours, minutes, seconds, negative } = timeZoneOffset;
        let offset = (hours * 60 + minutes) * 60 + seconds;
        if (negative)
            offset *= -1;
        return { name: timeZoneName, offset };
    }
    UTC() {
        return this.In(UTC);
    }
    Local() {
        return this.In(Local);
    }
    JSDate() {
        return new Date(this.UnixMilli());
    }
    String() {
        return this.Format("2006-01-02 15:04:05.999999999 -0700 MST");
    }
    Unix() {
        return Math.floor(this.UnixMilli() / 1000);
    }
    After(u) {
        return this.UnixMilli() > u.UnixMilli();
    }
    Before(u) {
        return this.UnixMilli() < u.UnixMilli();
    }
    Equal(u) {
        return this.UnixMilli() === u.UnixMilli();
    }
    Format(layout) {
        return formatInternal(this._getIntlInfo(), layout);
    }
    Sub(u) {
        return this.UnixMilli() - u.UnixMilli();
    }
}
_TimePrivate___dateInternal = new WeakMap(), _TimePrivate___ianaZone = new WeakMap(), _TimePrivate___cacheInfo = new WeakMap();
function _DateAt(year, month, day, hour, min, sec, milli, loc) {
    // 1. Build unix millis,
    // 2. create date,
    // 3. adjust based on locale.
    const utcUnixMs = Date.UTC(year, month - 1, day, hour, min, sec, milli);
    const t1 = new TimePrivate(utcUnixMs).In(loc);
    if (loc === UTC) {
        return t1;
    }
    const { offset: offset1 } = t1.Zone();
    const t2 = new TimePrivate(utcUnixMs - offset1 * 1000).In(loc);
    const { offset: offset2 } = t2.Zone();
    if (offset2 !== offset1) {
        return new TimePrivate(utcUnixMs - offset2 * 1000).In(loc);
    }
    return t2;
}
function isZero(d) {
    return d.hours === 0 && d.minutes === 0 && d.seconds === 0;
}
function parseGMTOffset(offsetStr) {
    let od = { negative: false, hours: 0, minutes: 0, seconds: 0 };
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
    }
    else if (signChar === "-") {
        od.negative = true;
    }
    else {
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
function _getOffsetTime(t) {
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
function intlInfoFor(t) {
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
    const infoParts = Object.fromEntries(intl
        .filter((item) => item.type !== "literal")
        .map((item) => [
        item.type,
        isValidNumber(item.value) ? Number(item.value) : item.value,
    ]));
    infoParts.timeZoneOffset = zoneOffset;
    return infoParts;
}
// function formatInternal(t: TimePrivate, layout: string): string {
function formatInternal(intlInfo, layout) {
    let out = [];
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
    const { month, hour, minute, fractionalSecond: millis, timeZoneOffset: zoneOffset, } = intlInfo;
    const monthIndex = month - 1;
    for (const p of parts) {
        if (typeof p === "string") {
            out.push(p);
            continue;
        }
        switch (65535 /* std.MaskLower */ & p) {
            case 0 /* std.LongMonth */:
                out.push(longMonthNames[monthIndex]);
                break;
            case 1 /* std.Month */:
                out.push(shortMonthNames[monthIndex]);
                break;
            case 2 /* std.NumMonth */:
                out.push(String(month));
                break;
            case 3 /* std.ZeroMonth */:
                out.push(String(month).padStart(2, "0"));
                break;
            case 4 /* std.LongWeekDay */:
                out.push(intlInfo.weekday);
                break;
            case 5 /* std.WeekDay */:
                out.push(intlInfo.weekday.substr(0, 3));
                break;
            case 6 /* std.Day */:
                out.push(String(intlInfo.day));
                break;
            case 7 /* std.UnderDay */:
                out.push(String(intlInfo.day).padStart(2, " "));
                break;
            case 8 /* std.ZeroDay */:
                out.push(String(intlInfo.day).padStart(2, "0"));
                break;
            case 9 /* std.UnderYearDay */:
                out.push(String(yearDay(intlInfo.year, month, intlInfo.day)).padStart(3, " "));
                break;
            case 10 /* std.ZeroYearDay */:
                out.push(String(yearDay(intlInfo.year, month, intlInfo.day)).padStart(3, "0"));
                break;
            case 11 /* std.Hour */:
                out.push(String(hour).padStart(2, "0"));
                break;
            case 12 /* std.Hour12 */:
                out.push(String(hour % 12 || 12));
                break;
            case 13 /* std.ZeroHour12 */:
                out.push(String(hour % 12 || 12).padStart(2, "0"));
                break;
            case 14 /* std.Minute */:
                out.push(String(minute));
                break;
            case 15 /* std.ZeroMinute */:
                out.push(String(minute).padStart(2, "0"));
                break;
            case 16 /* std.Second */:
                out.push(String(intlInfo.second));
                break;
            case 17 /* std.ZeroSecond */:
                out.push(String(intlInfo.second).padStart(2, "0"));
                break;
            case 18 /* std.LongYear */:
                out.push(String(intlInfo.year));
                break;
            case 19 /* std.Year */:
                out.push(String(intlInfo.year).substring(2));
                break;
            case 20 /* std.PM */:
                out.push(hour >= 12 ? "PM" : "AM");
                break;
            case 21 /* std.pm */:
                out.push(hour >= 12 ? "pm" : "am");
                break;
            case 22 /* std.TZ */:
                if (intlInfo.timeZoneName !== "") {
                    out.push(intlInfo.timeZoneName);
                }
                else {
                    // No time zone known for this time, but we must print one.
                    // Use the -0700 format.
                    out.push(zoneOffset.negative ? "-" : "+");
                    out.push(String(zoneOffset.hours).padStart(2, "0"));
                    out.push(String(zoneOffset.minutes).padStart(2, "0"));
                }
                break;
            case 23 /* std.ISO8601TZ */:
                if (isZero(zoneOffset)) {
                    out.push("Z");
                    break;
                }
            // fallthrough
            case 28 /* std.NumTZ */:
                out.push(zoneOffset.negative ? "-" : "+");
                out.push(String(zoneOffset.hours).padStart(2, "0"));
                out.push(String(zoneOffset.minutes).padStart(2, "0"));
                break;
            case 24 /* std.ISO8601SecondsTZ */:
                if (isZero(zoneOffset)) {
                    out.push("Z");
                    break;
                }
            // fallthrough
            case 29 /* std.NumSecondsTZ */:
                out.push(zoneOffset.negative ? "-" : "+");
                out.push(String(zoneOffset.hours).padStart(2, "0"));
                out.push(String(zoneOffset.minutes).padStart(2, "0"));
                out.push(String(zoneOffset.seconds).padStart(2, "0"));
                break;
            case 25 /* std.ISO8601ShortTZ */:
                if (isZero(zoneOffset)) {
                    out.push("Z");
                    break;
                }
            // fallthrough
            case 30 /* std.NumShortTZ */:
                out.push(zoneOffset.negative ? "-" : "+");
                out.push(String(zoneOffset.hours).padStart(2, "0"));
                break;
            case 26 /* std.ISO8601ColonTZ */:
                if (isZero(zoneOffset)) {
                    out.push("Z");
                    break;
                }
            // fallthrough
            case 31 /* std.NumColonTZ */:
                out.push(zoneOffset.negative ? "-" : "+");
                out.push(String(zoneOffset.hours).padStart(2, "0"));
                out.push(":");
                out.push(String(zoneOffset.minutes).padStart(2, "0"));
                break;
            case 27 /* std.ISO8601ColonSecondsTZ */:
                if (isZero(zoneOffset)) {
                    out.push("Z");
                    break;
                }
            //fallthroguh
            case 32 /* std.NumColonSecondsTZ */:
                out.push(zoneOffset.negative ? "-" : "+");
                out.push(String(zoneOffset.hours).padStart(2, "0"));
                out.push(":");
                out.push(String(zoneOffset.minutes).padStart(2, "0"));
                out.push(":");
                out.push(String(zoneOffset.seconds).padStart(2, "0"));
                break;
            case 33 /* std.FracSecond0 */:
                out.push(fracSecondsStr(p, millis));
                break;
            case 34 /* std.FracSecond9 */:
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
function parseInternal(layout, value, defaultLocation) {
    const parts = parseLayout(layout, true);
    // console.log(
    //   parts.map(p => {
    //     if (typeof p === "string") return p;
    //     return std[p & std.MaskLower];
    //   })
    // );
    let year = 0, month = -1, day = -1, yearday = -1, hour = 0, minute = 0, second = 0, milli = 0, pmSet = false, amSet = false, tzString = "", zone = null, zoneOffsetHr = 0, zoneOffsetMin = 0, zoneOffsetSec = 0, zoneOffsetSign = 1;
    let vi = 0;
    for (let partIndex = 0; partIndex < parts.length; partIndex++) {
        const p = parts[partIndex];
        if (typeof p === "string") {
            if (p === " ") {
                while (value[vi] === " ")
                    vi++;
            }
            else {
                vi += p.length;
            }
            continue;
        }
        const mP = p & 65535 /* std.MaskLower */;
        // console.log(std[mP], `'${value.substring(vi)}'`, vi);
        switch (mP) {
            case 1 /* std.Month */:
            // fallthrough
            case 0 /* std.LongMonth */:
                const [monthS, monthIndex] = (mP === 1 /* std.Month */ ? getShortMonthPrefix : getLongMonthPrefix)(value.substring(vi));
                month = monthIndex + 1;
                vi += monthS.length;
                break;
            case 2 /* std.NumMonth */:
            // fallthrough
            case 3 /* std.ZeroMonth */:
                const [nm, nml] = getnum(value.substring(vi), mP === 3 /* std.ZeroMonth */);
                if (nm <= 0 || nm > 12)
                    throw new Error(`invalid month ${nm}: ${value}`);
                month = nm;
                vi += nml;
                break;
            case 4 /* std.LongWeekDay */:
                vi += getLongDayPrefix(value.substring(vi))[0].length;
                break;
            case 5 /* std.WeekDay */:
                vi += getShortDayPrefix(value.substring(vi))[0].length;
                break;
            case 6 /* std.Day */:
            // fallthrough
            case 7 /* std.UnderDay */:
                if (value[vi] === " ")
                    vi++;
            // fallthrough
            case 8 /* std.ZeroDay */:
                const [dayVal, dayLength] = getnum(value.substring(vi), mP === 8 /* std.ZeroDay */);
                day = dayVal;
                vi += dayLength;
                break;
            case 9 /* std.UnderYearDay */:
            case 10 /* std.ZeroYearDay */: {
                for (let ydi = 0; ydi < 2; ydi++) {
                    if (mP === 9 /* std.UnderYearDay */ && vi < value.length && value[0] == " ") {
                        vi++;
                    }
                }
                const [yval, ylen] = getnum3(value.substring(vi), mP === 10 /* std.ZeroYearDay */);
                vi += ylen;
                yearday = yval;
                break;
            }
            case 11 /* std.Hour */: {
                const [hourNum, hourNumL] = getnum(value.substring(vi), false);
                if (hourNum < 0 || 24 <= hourNum)
                    throw new Error(`invalid hour ${hourNum}`);
                hour = hourNum;
                vi += hourNumL;
                break;
            }
            case 12 /* std.Hour12 */:
            // fallthrough
            case 13 /* std.ZeroHour12 */: {
                const [hourNum, hourNumL] = getnum(value.substring(vi), mP == 13 /* std.ZeroHour12 */);
                if (hourNum < 0 || 12 < hourNum)
                    throw new Error(`invalid hour12: ${hourNum}`);
                hour = hourNum;
                vi += hourNumL;
                break;
            }
            case 14 /* std.Minute */:
            // fallthrough
            case 15 /* std.ZeroMinute */:
                const [minNum, minNumL] = getnum(value.substring(vi), mP === 15 /* std.ZeroMinute */);
                if (minNum < 0 || minNum > 60)
                    throw new Error(`invalid minute: ${minNum}`);
                minute = minNum;
                vi += minNumL;
                break;
            case 16 /* std.Second */:
            case 17 /* std.ZeroSecond */: {
                const [secNum, setNumL] = getnum(value.substring(vi), mP === 17 /* std.ZeroSecond */);
                if (secNum < 0 || secNum > 60)
                    throw new Error(`invalid second: ${secNum}`);
                second = secNum;
                vi += setNumL;
                // Special case: do we have a fractional second but no
                // fractional second in the format?
                const subv = value.substring(vi);
                if (subv.length >= 2 && isCommaOrPeriod(subv[0]) && isDigit(subv[1])) {
                    const nextP = parts[partIndex + 1];
                    const nextMP = typeof nextP === "string" ? -1 : nextP & 65535 /* std.MaskLower */;
                    if (nextMP === 33 /* std.FracSecond0 */ || nextMP == 34 /* std.FracSecond9 */) {
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
            case 18 /* std.LongYear */:
            // fallthrough
            case 19 /* std.Year */:
                const yearS = value.substring(vi, vi + (mP === 19 /* std.Year */ ? 2 : 4));
                throwInvalidNumber(yearS, `year in '${value}'`);
                year = Number(yearS);
                if (mP === 19 /* std.Year */) {
                    if (year >= 69) {
                        year += 1900;
                    }
                    else {
                        year += 2000;
                    }
                }
                vi += yearS.length;
                break;
            case 20 /* std.PM */: {
                const pmS = value.substring(vi, vi + 2);
                if (pmS === "PM") {
                    pmSet = true;
                }
                else if (pmS == "AM") {
                    amSet = true;
                }
                else {
                    throw new Error(`invalid AM/PM: ${pmS}`);
                }
                vi += pmS.length;
                break;
            }
            case 21 /* std.pm */: {
                const pmS = value.substring(vi, vi + 2);
                if (pmS === "pm") {
                    pmSet = true;
                }
                else if (pmS == "am") {
                    amSet = true;
                }
                else {
                    throw new Error(`invalid AM/PM: ${pmS}`);
                }
                vi += pmS.length;
                break;
            }
            case 22 /* std.TZ */:
                tzString = parseTimeZoneStr(value.substring(vi));
                vi += tzString.length;
                if (tzString === "UTC")
                    zone = UTC;
                break;
            case 23 /* std.ISO8601TZ */:
            case 25 /* std.ISO8601ShortTZ */:
            case 26 /* std.ISO8601ColonTZ */:
            case 24 /* std.ISO8601SecondsTZ */:
            case 27 /* std.ISO8601ColonSecondsTZ */:
                if (value[vi] === "Z") {
                    zone = UTC;
                    vi++;
                    break;
                }
            case 28 /* std.NumTZ */:
            case 30 /* std.NumShortTZ */:
            case 31 /* std.NumColonTZ */:
            case 29 /* std.NumSecondsTZ */:
            case 32 /* std.NumColonSecondsTZ */:
                let zsign = "", zhour = "", zmin = "", zsec = "";
                const subv = value.substring(vi);
                const errTooShort = () => {
                    throw new Error(`tz too short: '${subv}'`);
                };
                if (mP === 26 /* std.ISO8601ColonTZ */ || mP === 31 /* std.NumColonTZ */) {
                    if (subv.length < 6)
                        errTooShort();
                    if (subv[3] !== ":")
                        throw new Error(`tz missing colon: ${subv[3]} (${subv} -- ${value})`);
                    zsign = subv[0];
                    zhour = subv.substring(1, 3);
                    zmin = subv.substring(4, 6);
                    zsec = "00";
                    vi += 6;
                }
                else if (mP === 30 /* std.NumShortTZ */ || mP == 25 /* std.ISO8601ShortTZ */) {
                    if (subv.length < 3)
                        errTooShort();
                    zsign = subv[0];
                    zhour = subv.substring(1, 3);
                    zmin = "00";
                    zsec = "00";
                    vi += 3;
                }
                else if (mP === 27 /* std.ISO8601ColonSecondsTZ */ ||
                    mP == 32 /* std.NumColonSecondsTZ */) {
                    if (subv.length < 9)
                        errTooShort();
                    if (subv[3] !== ":" || subv[6] !== ":")
                        throw new Error(`tz missing colo: ${subv[3]} ${subv[6]}`);
                    zsign = subv[0];
                    zhour = subv.substring(1, 3);
                    zmin = subv.substring(4, 6);
                    zsec = subv.substring(7, 9);
                    vi += 9;
                }
                else if (mP === 24 /* std.ISO8601SecondsTZ */ || mP === 29 /* std.NumSecondsTZ */) {
                    if (subv.length < 7)
                        errTooShort();
                    zsign = subv[0];
                    zhour = subv.substring(1, 3);
                    zmin = subv.substring(3, 5);
                    zsec = subv.substring(5, 7);
                    vi += 7;
                }
                else {
                    if (subv.length < 5)
                        errTooShort();
                    zsign = subv[0];
                    zhour = subv.substring(1, 3);
                    zmin = subv.substring(3, 5);
                    zsec = "00";
                    vi += 5;
                }
                const zhr = getnum(zhour, true)[0];
                const zmm = getnum(zmin, true)[0];
                const zss = getnum(zsec, true)[0];
                if (zhr > 24)
                    throw new Error(`invalid offset hour: ${zhr}`);
                if (zmm > 60)
                    throw new Error(`invalid offset minute: ${zmm}`);
                if (zss > 60)
                    throw new Error(`invalid offset second: ${zss}`);
                zoneOffsetHr = zhr;
                zoneOffsetMin = zmm;
                zoneOffsetSec = zss;
                if (zsign === "+") {
                    zoneOffsetSign = 1;
                }
                else if (zsign === "-") {
                    zoneOffsetSign = -1;
                }
                else {
                    throw new Error(`invalid zone sign: '${zsign}'`);
                }
                break;
            case 34 /* std.FracSecond9 */: {
                const subv = value.substring(vi);
                if (subv.length < 2)
                    break;
                if (!(isCommaOrPeriod(subv[0]) && isDigit(subv[1])))
                    break;
                let endIndex = 1;
                while (endIndex < subv.length && isDigit(subv[endIndex])) {
                    endIndex++;
                }
                const [millisV, millisL] = parseFracSeconds(subv.substring(0, endIndex));
                vi += millisL;
                milli = millisV;
                break;
            }
            case 33 /* std.FracSecond0 */: {
                const numDigits = (p >> 16) & 0xfff;
                const subv = value.substring(vi);
                // exact num digits.
                if (subv.length < numDigits + 1) {
                    throw new Error(`not enough digits ${subv}`);
                }
                const [millisV, millisL] = parseFracSeconds(subv.substring(0, numDigits + 1));
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
    }
    else if (amSet && hour == 12) {
        hour = 0;
    }
    if (yearday >= 0) {
        // console.log({ yearday });
        let monthTemp = 0, dayTemp = 0;
        if (isLeap(year)) {
            if (yearday === 31 + 29) {
                monthTemp = Month.February;
                dayTemp = 29;
            }
            else if (yearday > 31 + 29) {
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
    }
    else {
        if (month < 0)
            month = Month.January;
        if (day < 0)
            day = 1;
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
        const t = _DateAt(year, month, day, hour, minute, second, 
        // second - offsetSec,
        milli, UTC);
        t._setTZAbbr(tzString);
        t._setTZoffset(zoneOffsetSign, zoneOffsetHr, zoneOffsetMin, zoneOffsetSec);
        return t;
    }
    if (tzString.length > 0) {
        let t = _DateAt(year, month, day, hour, minute, second, milli, defaultLocation);
        if (tzString.length > 3 && tzString.substring(0, 3) === "GMT") {
            let offset = throwInvalidNumber(tzString.substring(3), tzString); // like GMT-8, GMT+8
            offset *= 3600;
            t = t.Add(offset * Second);
            const [oh, om, os] = secondsToHMS(Math.abs(offset));
            zoneOffsetHr = oh;
            zoneOffsetMin = om;
            zoneOffsetSec = os;
            if (offset < 0)
                zoneOffsetSign = -1;
            t._setTZoffset(zoneOffsetSign, zoneOffsetHr, zoneOffsetMin, zoneOffsetSec);
        }
        t._setTZAbbr(tzString);
        return t;
    }
    return _DateAt(year, month, day, hour, minute, second, milli, defaultLocation);
}
function secondsToHMS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds];
}
function daysBefore(m) {
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
const longDayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const shortDayNames = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];
const shortMonthNames = [
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
const longMonthNames = [
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
function getnum3(s, fixed) {
    let n = 0, i = 0;
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
function getnum(s, fixed) {
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
function _findPrefix(s, opts, typeName) {
    for (let i = 0; i < opts.length; i++) {
        const opt = opts[i];
        if (s.toLowerCase().startsWith(opt.toLowerCase())) {
            return [opt, i];
        }
    }
    throw new Error(`invalid ${typeName}: '${s}'`);
}
function getShortDayPrefix(s) {
    return _findPrefix(s, shortDayNames, "short day name");
}
function getLongDayPrefix(s) {
    return _findPrefix(s, longDayNames, "long day name");
}
function getShortMonthPrefix(s) {
    return _findPrefix(s, shortMonthNames, "short month name");
}
function getLongMonthPrefix(s) {
    return _findPrefix(s, longMonthNames, "long month name");
}
function parseSignedOffset(s) {
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
function parseTimeZoneStr(s) {
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
function parseFracSeconds(s) {
    if (!isCommaOrPeriod(s[0])) {
        throw new Error(`must start with comma or period '${s}'`);
    }
    let n = s.length;
    if (n > 10)
        n = 10;
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
function fracSecondsStr(code, millis) {
    const count = (code >> 16) & 0xfff;
    let padded = String(Math.floor(millis)).padStart(3, "0");
    if (count < padded.length) {
        padded = padded.substring(0, count);
    }
    switch (65535 /* std.MaskLower */ & code) {
        case 33 /* std.FracSecond0 */: // trailing zeroes included.
            return padded.padEnd(count, "0");
        case 34 /* std.FracSecond9 */: // trailing zeroes omitted
            return trimTrailingZeroes(padded);
        default:
            throw new Error(`invalid code for fractional seconds ${code}`);
    }
}
function trimTrailingZeroes(s) {
    const parts = [...s];
    let lastZero = s.length - 1;
    while (lastZero >= 0) {
        if (parts[lastZero] !== "0")
            break;
        lastZero--;
    }
    return parts.slice(0, lastZero + 1).join("");
}
const std0x = {
    "1": 3 /* std.ZeroMonth */,
    "2": 8 /* std.ZeroDay */,
    "3": 13 /* std.ZeroHour12 */,
    "4": 15 /* std.ZeroMinute */,
    "5": 17 /* std.ZeroSecond */,
    "6": 19 /* std.Year */,
};
function charsMatch(chars, startIndex, matchS) {
    const matchPoints = [...matchS];
    for (let i = 0; i < matchPoints.length; i++) {
        const c = chars[i + startIndex];
        if (!c)
            return false;
        const mC = matchPoints[i];
        if (mC !== c)
            return false;
    }
    return true;
}
// const layoutCache: Record<string, (std | string)[]> = {};
// here is a native date method to get local time offset vs. UTC.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
// internal function
function parseLayout(layout, forTimeParse) {
    // const cached = layoutCache[layout];
    // if (cached) return cached;
    // throw new GoTimeError(ErrorCode.ParseError, `bullshit layout: ${layout}`);
    const parts = [];
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
                    parts.push(0 /* std.LongMonth */);
                    i += 7;
                    continue;
                }
                if (charsMatch(chars, i, "Jan")) {
                    if (isLowercase(chars[i + 3])) {
                        break;
                    }
                    parts.push(1 /* std.Month */);
                    i += 3;
                    continue;
                }
                break;
            case "M": // Monday, Mon, MST
                if (charsMatch(chars, i, "Monday")) {
                    parts.push(4 /* std.LongWeekDay */);
                    i += 6;
                    continue;
                }
                if (charsMatch(chars, i, "Mon")) {
                    if (isLowercase(chars[i + 3])) {
                        break;
                    }
                    parts.push(5 /* std.WeekDay */);
                    i += 3;
                    continue;
                }
                if (charsMatch(chars, i, "MST")) {
                    parts.push(22 /* std.TZ */);
                    i += 3;
                    continue;
                }
                break;
            case "0": // 01, 02, 03, 04, 05, 06, 002
                if (charsMatch(chars, i, "002")) {
                    parts.push(10 /* std.ZeroYearDay */);
                    i += 3;
                    continue;
                }
                if (nC === void 0)
                    break;
                const m = std0x[nC];
                if (m === void 0)
                    break;
                parts.push(m);
                i += 2;
                continue;
            case "1": // 15, 1
                if (charsMatch(chars, i, "15")) {
                    parts.push(11 /* std.Hour */);
                    i += 2;
                    continue;
                }
                parts.push(2 /* std.NumMonth */);
                i++;
                continue;
            case "2": // 2006, 2
                if (charsMatch(chars, i, "2006")) {
                    parts.push(18 /* std.LongYear */);
                    i += 4;
                    continue;
                }
                parts.push(6 /* std.Day */);
                i++;
                continue;
            case "_": // _2, _2006, __2
                if (charsMatch(chars, i, "_2006")) {
                    // _2006 is really a literal _, followed by stdLongYear
                    parts.push("_");
                    parts.push(18 /* std.LongYear */);
                    i += 5;
                    continue;
                }
                if (charsMatch(chars, i, "__2")) {
                    parts.push(9 /* std.UnderYearDay */);
                    i += 3;
                    continue;
                }
                if (charsMatch(chars, i, "_2")) {
                    parts.push(7 /* std.UnderDay */);
                    i += 2;
                    continue;
                }
                break;
            case "3":
                parts.push(12 /* std.Hour12 */);
                i++;
                continue;
            case "4":
                parts.push(14 /* std.Minute */);
                i++;
                continue;
            case "5":
                parts.push(16 /* std.Second */);
                i++;
                continue;
            case "P": // PM
                if (charsMatch(chars, i, "PM")) {
                    parts.push(20 /* std.PM */);
                    i += 2;
                    continue;
                }
                break;
            case "p": // pm
                if (charsMatch(chars, i, "pm")) {
                    parts.push(21 /* std.pm */);
                    i += 2;
                    continue;
                }
                break;
            case "-": // -070000, -07:00:00, -0700, -07:00, -07
                if (charsMatch(chars, i, "-070000")) {
                    parts.push(29 /* std.NumSecondsTZ */);
                    i += 7;
                    continue;
                }
                if (charsMatch(chars, i, "-07:00:00")) {
                    parts.push(32 /* std.NumColonSecondsTZ */);
                    i += 9;
                    continue;
                }
                if (charsMatch(chars, i, "-0700")) {
                    parts.push(28 /* std.NumTZ */);
                    i += 5;
                    continue;
                }
                if (charsMatch(chars, i, "-07:00")) {
                    parts.push(31 /* std.NumColonTZ */);
                    i += 6;
                    continue;
                }
                if (charsMatch(chars, i, "-07")) {
                    parts.push(30 /* std.NumShortTZ */);
                    i += 3;
                    continue;
                }
                break;
            case "Z": // Z070000, Z07:00:00, Z0700, Z07:00,
                if (charsMatch(chars, i, "Z070000")) {
                    parts.push(24 /* std.ISO8601SecondsTZ */);
                    i += 7;
                    continue;
                }
                if (charsMatch(chars, i, "Z07:00:00")) {
                    parts.push(27 /* std.ISO8601ColonSecondsTZ */);
                    i += 9;
                    continue;
                }
                if (charsMatch(chars, i, "Z0700")) {
                    parts.push(23 /* std.ISO8601TZ */);
                    i += 5;
                    continue;
                }
                if (charsMatch(chars, i, "Z07:00")) {
                    parts.push(26 /* std.ISO8601ColonTZ */);
                    i += 6;
                    continue;
                }
                if (charsMatch(chars, i, "Z07")) {
                    parts.push(25 /* std.ISO8601ShortTZ */);
                    i += 3;
                    continue;
                }
                break;
            case ".": // // ,000, or .000, or ,999, or .999 - repeated digits for fractional seconds.
            /* fallthrough */
            case ",":
                if (nC === void 0)
                    break;
                if (nC !== "9" && nC !== "0")
                    break;
                let j = 1;
                while (i + j < chars.length && chars[i + j] === nC) {
                    j++;
                }
                if (isDigit(chars[i + j]))
                    break; // must not end with another digit.
                if (!forTimeParse)
                    parts.push(c); // push the comma or whatever.
                let stdCode = nC === "0" ? 33 /* std.FracSecond0 */ : 34 /* std.FracSecond9 */;
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
function isDigit(c) {
    if (c === void 0)
        return false;
    return c >= "0" && c <= "9";
}
function isLowercase(c) {
    if (c === void 0)
        return false;
    return c >= "a" && c <= "z";
}
function isCommaOrPeriod(c) {
    return c === "." || c === ",";
}
function isUppercase(c) {
    if (c === void 0)
        return false;
    return c >= "A" && c <= "Z";
}
function isLeap(year) {
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
function daysIn(m, year) {
    if (m === Month.February) {
        return isLeap(year) ? 29 : 28;
    }
    // 30 + ((m + (m >> 3)) & 1)
    return 30 + ((m + (m >> 3)) & 1);
}
function yearDay(year, month, day) {
    let yDay = 0;
    let m = Month.January;
    while (m < month) {
        yDay += daysIn(m, year);
        m++;
    }
    yDay += day;
    return yDay;
}
function isValidNumber(str) {
    if (str.trim() === "")
        return false; // reject empty or whitespace strings
    return !isNaN(Number(str));
}
function throwInvalidNumber(str, name) {
    if (!isValidNumber(str))
        throw new Error(`'${str}' not a valid number for ${name}`);
    return Number(str);
}
//# sourceMappingURL=Time.js.map