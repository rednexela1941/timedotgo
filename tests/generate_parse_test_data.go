package main

// usage:
// go run generate_parse_test_data.go  > generated_parse_test_data.json

import (
	"encoding/json"
	"fmt"
	"log"
	"time"
)

const (
	Loc1 = "Etc/UTC"
	Loc2 = "Africa/Cairo"
	Loc3 = "America/New_York"

	FullFormat = "2006/01/02 15:04:05.000 -07:00:00"
)

type ParseTestFull struct {
	Format       string
	ParseIn      string // value coming in.
	ParseOut     string // value when re-formatting with input format.
	YearDay      int
	Year         int
	Month        time.Month
	Day          int
	Hour         int
	Minute       int
	Second       int
	Millisecond  time.Duration
	TZOffset     int
	TZName       string
	FullFormat   string
	FullValue    string
	LocationName string
}

func main() {
	locNames := []string{Loc1, Loc2, Loc3}

	full := make([]ParseTestFull, 0, len(parseTests)*len(locNames))
	for _, locName := range locNames {
		loc, err := time.LoadLocation(locName)
		if err != nil {
			log.Fatal(err)
		}

		for _, pt := range parseTests {
			t, err := time.ParseInLocation(pt.Format, pt.Value, loc)
			if err != nil {
				log.Fatal(err)
			}

			name, offset := t.Zone()
			ptr := ParseTestFull{
				Format:       pt.Format,
				ParseIn:      pt.Value,
				ParseOut:     t.Format(pt.Format),
				YearDay:      t.YearDay(),
				Year:         t.Year(),
				Month:        t.Month(),
				Day:          t.Day(),
				Hour:         t.Hour(),
				Minute:       t.Minute(),
				Second:       t.Second(),
				Millisecond:  time.Duration(t.Nanosecond()) / time.Millisecond,
				TZOffset:     offset,
				TZName:       name,
				FullFormat:   FullFormat,
				FullValue:    t.Format(FullFormat),
				LocationName: locName,
			}
			full = append(full, ptr)
		}
	}

	data, err := json.MarshalIndent(full, "", "\t")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(data))
}

type ParseTest struct {
	Name       string
	Format     string
	Value      string
	HasTZ      bool // contains a time zone
	HasWD      bool // contains a weekday
	YearSign   int  // sign of year, -1 indicates the year is not present in the format
	FracDigits int  // number of digits of fractional second
}

var parseTests = []ParseTest{
	{"ANSIC", time.ANSIC, "Thu Feb  4 21:00:57 2010", false, true, 1, 0},
	{"UnixDate", time.UnixDate, "Thu Feb  4 21:00:57 PST 2010", true, true, 1, 0},
	{"RubyDate", time.RubyDate, "Thu Feb 04 21:00:57 -0800 2010", true, true, 1, 0},
	{"RFC850", time.RFC850, "Thursday, 04-Feb-10 21:00:57 PST", true, true, 1, 0},
	{"RFC1123", time.RFC1123, "Thu, 04 Feb 2010 21:00:57 PST", true, true, 1, 0},
	{"RFC1123", time.RFC1123, "Thu, 04 Feb 2010 22:00:57 PDT", true, true, 1, 0},
	{"RFC1123Z", time.RFC1123Z, "Thu, 04 Feb 2010 21:00:57 -0800", true, true, 1, 0},
	{"RFC3339", time.RFC3339, "2010-02-04T21:00:57-08:00", true, false, 1, 0},
	{"custom: \"2006-01-02 15:04:05-07\"", "2006-01-02 15:04:05-07", "2010-02-04 21:00:57-08", true, false, 1, 0},
	// Optional fractional seconds.
	{"ANSIC", time.ANSIC, "Thu Feb  4 21:00:57.0 2010", false, true, 1, 1},
	{"UnixDate", time.UnixDate, "Thu Feb  4 21:00:57.01 PST 2010", true, true, 1, 2},
	{"RubyDate", time.RubyDate, "Thu Feb 04 21:00:57.012 -0800 2010", true, true, 1, 3},
	{"RFC850", time.RFC850, "Thursday, 04-Feb-10 21:00:57.0123 PST", true, true, 1, 4},
	{"RFC1123", time.RFC1123, "Thu, 04 Feb 2010 21:00:57.01234 PST", true, true, 1, 5},
	{"RFC1123Z", time.RFC1123Z, "Thu, 04 Feb 2010 21:00:57.01234 -0800", true, true, 1, 5},
	{"RFC3339", time.RFC3339, "2010-02-04T21:00:57.012345678-08:00", true, false, 1, 9},
	{"custom: \"2006-01-02 15:04:05\"", "2006-01-02 15:04:05", "2010-02-04 21:00:57.0", false, false, 1, 0},
	// Amount of white space should not matter.
	{"ANSIC", time.ANSIC, "Thu Feb 4 21:00:57 2010", false, true, 1, 0},
	{"ANSIC", time.ANSIC, "Thu      Feb     4     21:00:57     2010", false, true, 1, 0},
	// Case should not matter
	{"ANSIC", time.ANSIC, "THU FEB 4 21:00:57 2010", false, true, 1, 0},
	{"ANSIC", time.ANSIC, "thu feb 4 21:00:57 2010", false, true, 1, 0},
	// Fractional seconds.
	{"millisecond:: dot separator", "Mon Jan _2 15:04:05.000 2006", "Thu Feb  4 21:00:57.012 2010", false, true, 1, 3},
	{"microsecond:: dot separator", "Mon Jan _2 15:04:05.000000 2006", "Thu Feb  4 21:00:57.012345 2010", false, true, 1, 6},
	{"nanosecond:: dot separator", "Mon Jan _2 15:04:05.000000000 2006", "Thu Feb  4 21:00:57.012345678 2010", false, true, 1, 9},
	{"millisecond:: comma separator", "Mon Jan _2 15:04:05,000 2006", "Thu Feb  4 21:00:57.012 2010", false, true, 1, 3},
	{"microsecond:: comma separator", "Mon Jan _2 15:04:05,000000 2006", "Thu Feb  4 21:00:57.012345 2010", false, true, 1, 6},
	{"nanosecond:: comma separator", "Mon Jan _2 15:04:05,000000000 2006", "Thu Feb  4 21:00:57.012345678 2010", false, true, 1, 9},

	// Leading zeros in other places should not be taken as fractional seconds.
	{"zero1", "2006.01.02.15.04.05.0", "2010.02.04.21.00.57.0", false, false, 1, 1},
	{"zero2", "2006.01.02.15.04.05.00", "2010.02.04.21.00.57.01", false, false, 1, 2},
	// Month and day names only match when not followed by a lower-case letter.
	{"Janet", "Hi Janet, the Month is January: Jan _2 15:04:05 2006", "Hi Janet, the Month is February: Feb  4 21:00:57 2010", false, true, 1, 0},

	// GMT with offset.
	{"GMT-8", time.UnixDate, "Fri Feb  5 05:00:57 GMT-8 2010", true, true, 1, 0},

	// Accept any number of fractional second digits (including none) for .999...
	// In Go 1, .999... was completely ignored in the format, meaning the first two
	// cases would succeed, but the next four would not. Go 1.1 accepts all six.
	// decimal "." separator.
	{"", "2006-01-02 15:04:05.9999 -0700 MST", "2010-02-04 21:00:57 -0800 PST", true, false, 1, 0},
	{"", "2006-01-02 15:04:05.999999999 -0700 MST", "2010-02-04 21:00:57 -0800 PST", true, false, 1, 0},
	{"", "2006-01-02 15:04:05.9999 -0700 MST", "2010-02-04 21:00:57.0123 -0800 PST", true, false, 1, 4},
	{"", "2006-01-02 15:04:05.999999999 -0700 MST", "2010-02-04 21:00:57.0123 -0800 PST", true, false, 1, 4},
	{"", "2006-01-02 15:04:05.9999 -0700 MST", "2010-02-04 21:00:57.012345678 -0800 PST", true, false, 1, 9},
	{"", "2006-01-02 15:04:05.999999999 -0700 MST", "2010-02-04 21:00:57.012345678 -0800 PST", true, false, 1, 9},
	// comma "," separator.
	{"", "2006-01-02 15:04:05,9999 -0700 MST", "2010-02-04 21:00:57 -0800 PST", true, false, 1, 0},
	{"", "2006-01-02 15:04:05,999999999 -0700 MST", "2010-02-04 21:00:57 -0800 PST", true, false, 1, 0},
	{"", "2006-01-02 15:04:05,9999 -0700 MST", "2010-02-04 21:00:57.0123 -0800 PST", true, false, 1, 4},
	{"", "2006-01-02 15:04:05,999999999 -0700 MST", "2010-02-04 21:00:57.0123 -0800 PST", true, false, 1, 4},
	{"", "2006-01-02 15:04:05,9999 -0700 MST", "2010-02-04 21:00:57.012345678 -0800 PST", true, false, 1, 9},
	{"", "2006-01-02 15:04:05,999999999 -0700 MST", "2010-02-04 21:00:57.012345678 -0800 PST", true, false, 1, 9},

	// issue 4502.
	{"", time.StampNano, "Feb  4 21:00:57.012345678", false, false, -1, 9},
	{"", "Jan _2 15:04:05.999", "Feb  4 21:00:57.012300000", false, false, -1, 4},
	{"", "Jan _2 15:04:05.999", "Feb  4 21:00:57.012345678", false, false, -1, 9},
	{"", "Jan _2 15:04:05.999999999", "Feb  4 21:00:57.0123", false, false, -1, 4},
	{"", "Jan _2 15:04:05.999999999", "Feb  4 21:00:57.012345678", false, false, -1, 9},

	// Day of year.
	{"", "2006-01-02 002 15:04:05", "2010-02-04 035 21:00:57", false, false, 1, 0},
	{"", "2006-01 002 15:04:05", "2010-02 035 21:00:57", false, false, 1, 0},
	{"", "2006-002 15:04:05", "2010-035 21:00:57", false, false, 1, 0},
	{"", "200600201 15:04:05", "201003502 21:00:57", false, false, 1, 0},
	{"", "200600204 15:04:05", "201003504 21:00:57", false, false, 1, 0},

	// Time zone offsets
	{"", "2006-01-02T15:04:05Z07", "2010-02-04T21:00:57Z", false, false, 1, 0},
	{"", "2006-01-02T15:04:05Z07", "2010-02-04T21:00:57+08", false, false, 1, 0},
	{"", "2006-01-02T15:04:05Z07", "2010-02-04T21:00:57-08", true, false, 1, 0},
	{"", "2006-01-02T15:04:05Z0700", "2010-02-04T21:00:57Z", false, false, 1, 0},
	{"", "2006-01-02T15:04:05Z0700", "2010-02-04T21:00:57+0800", false, false, 1, 0},
	{"", "2006-01-02T15:04:05Z0700", "2010-02-04T21:00:57-0800", true, false, 1, 0},
	{"", "2006-01-02T15:04:05Z07:00", "2010-02-04T21:00:57Z", false, false, 1, 0},
	{"", "2006-01-02T15:04:05Z07:00", "2010-02-04T21:00:57+08:00", false, false, 1, 0},
	{"", "2006-01-02T15:04:05Z07:00", "2010-02-04T21:00:57-08:00", true, false, 1, 0},
	{"", "2006-01-02T15:04:05Z070000", "2010-02-04T21:00:57Z", false, false, 1, 0},
	{"", "2006-01-02T15:04:05Z070000", "2010-02-04T21:00:57+080000", false, false, 1, 0},
	{"", "2006-01-02T15:04:05Z070000", "2010-02-04T21:00:57-080000", true, false, 1, 0},
	{"", "2006-01-02T15:04:05Z07:00:00", "2010-02-04T21:00:57Z", false, false, 1, 0},
	{"", "2006-01-02T15:04:05Z07:00:00", "2010-02-04T21:00:57+08:00:00", false, false, 1, 0},
	{"", "2006-01-02T15:04:05Z07:00:00", "2010-02-04T21:00:57-08:00:00", true, false, 1, 0},
}
