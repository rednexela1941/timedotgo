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

/* OUTPUT:
 * Right now, it is:
 * Local: Thursday May 29 03:33 PM -04:00:00
 * UTC: Thursday May 29 07:33 PM +00:00:00
 * California: Thursday May 29 12:33 PM -07:00:00
 * Berlin: Thursday May 29 09:33 PM +02:00:00
 */
