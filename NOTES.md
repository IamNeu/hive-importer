# NOTES

## Input file
Template: InterNACHI Residential
Source: Spectora Template Center (free trial account)
Exported 14 Sep 2026 via Templates -> ... -> Export to spreadsheet -> Export HTML Text
Committed at: spectora-export/internachi-residential-2026-09-14.xls

## What the export actually looks like
- One sheet, 392 rows, 42 columns
- One row = one comment. Hierarchy is repeated on every row, not nested
- 13 sections, 69 items, 392 comments
- Comment types: 302 defect, 78 info, 12 limit
- Answer types: 315 boolean, 72 checkbox, 4 number, 1 text
- HTML in comment text: 244 <p>, 43 <a href>, 1 <strong>, 1 <div>

## Traps found in the export (the hard part)
1. File is named .xls but is really a modern XLSX zip. Parsers that
   dispatch on file extension reject it. Must sniff the bytes.
2. Section and item ORDER exists in no column. Only physical row order
   records it. Any sort or dict-keying silently destroys the customer's
   arrangement.
3. "Order (w/i item)" column is unreliable: has gaps (0,2,3,4) and
   duplicates (two comments both = 0). Must use row index as tiebreaker.
4. HTML entities are NOT decoded. Section name is stored literally as
   "Basement, Foundation, Crawlspace &amp; Structure".
5. 83 comments have a name but empty body text. A naive "skip empty
   rows" check would delete a fifth of the template.
6. Comment text contains non-breaking spaces and Windows line endings.

## Decisions made
(date - decision - why)

## Deliberately cut
(what I did not build, and why)

## Known limitations
(supported input vs unsupported)

## How I checked my work
(tests, counts, spot checks)

## Time spent
(rough hours per day)

## Credits
(starters, libraries, AI tools)
