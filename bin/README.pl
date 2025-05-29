#!/usr/bin/env perl

use strict;
use warnings;
use v5.32;
use File::Slurp;

print <<HEADER;
# `timedotgo`

Golang's [time](https://pkg.go.dev/time) is excellent. This is a close-as-reasonable port of the API to typescript with full support for time zone conversions, parsing and formatting.

[Documentation](https://rednexela1941.github.io/timedotgo/)

# Installation


# Examples

HEADER

my $dir = "examples/";

opendir( my $dh, $dir ) or die "Can't open $dir: $!";
my @files = grep { /^(\d{3}_.*\.ts)$/ && -f "$dir/$_" } readdir($dh);
closedir($dh);

@files = sort @files;

foreach my $file (@files)
{
    my ($example_name) = $file =~ /^\d+_(.+)\.ts$/;
    my $path           = "$dir/$file";
    my $exec_path      = "./tests/out/$path";
    $exec_path =~ s/\.ts$/.js/;
    my $content = read_file($path);
    chomp $content;
    my $exec_out = qx[node $exec_path];
    chomp $exec_out;
    print <<EXAMPLE;
## $example_name 

```ts
$content
```

### Output

```
$exec_out
```

EXAMPLE
}
