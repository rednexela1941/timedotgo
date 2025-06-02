// usage:
// go run generate_fixed_zone_parse.go > generated_fixed_zone_data.json
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"
)

type TestOut struct {
	InputFormat   string
	Input         string
	UTCString     string
	DefaultString string
	ZoneOffset    int
	ZoneName      string
}

func main() {
	inputStr := "2025-05-17T18:48:00-06:00"
	t, err := time.Parse(time.RFC3339, inputStr)
	if err != nil {
		log.Fatal(err)
	}
	name, offset := t.Zone()

	out := TestOut{}
	out.InputFormat = time.RFC3339
	out.ZoneName = name
	out.ZoneOffset = offset
	out.Input = inputStr
	out.UTCString = t.UTC().String()
	out.DefaultString = t.String()

	data, err := json.MarshalIndent(&out, "", "\t")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string(data))
}
