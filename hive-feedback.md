# Hive Inspect - notes while using the product

Observations from a trial account, written down as I hit them rather than
reconstructed afterwards. Direct, as requested.

## Signup and onboarding
- Signup requires email verification and a round trip to the inbox before you
  can reach the dashboard, and there is no Google sign-in option. For a free
  trial where the goal is getting someone into the product quickly, that break
  is a place people drop off. Spectora let me straight in.
- The setup checklist reads "4 of 6 done" on a brand new account, before the
  user has done anything. It is not clear what the four completed steps were.
- Completing the "Tell us about your business" form did not move that
  progress. The form says it helps tailor setup and import, but nothing
  visibly changed afterwards, so there is no signal the answers were used.

## Template editor
- Template list on the left, editing pane on the right. Simpler than
  Spectora's three-column layout and easier to follow.
- Good separation of content types: Section Title is a plain input, Section
  Description is rich text, plus Private Notes and a visibility toggle.
- The template overview shows counts up front (4 sections, 8 subsections,
  25 fields). That is a good trust signal.
- No visible Save button, so it appears to autosave, but nothing on screen
  confirms a change was stored. The user has to trust it silently worked.
  A brief "Saved" indicator would cost little.
- The demo template has 4 sections and 8 subsections. The Spectora export I
  imported has 13 sections and 69 items. A tree at that scale behaves
  differently, and it is worth testing the editor against a real imported
  template rather than a small demo.

## Template import
- Import asks you to choose the source platform first (Spectora, HIP,
  HomeGauge, Horizon) before uploading anything. Sensible for parser accuracy,
  but it is a decision before the user has done anything, and picking wrong
  presumably produces a confusing failure. Detecting the format from the file
  itself, with the picker as a fallback, would ask less of the user.
- The note that special PDF templates cannot be imported appears before you
  have chosen a source, so it may not land at the moment it becomes relevant.
- The counts shown on the template overview would be even more valuable
  immediately after an import, alongside a note of anything skipped. The
  moment a customer most needs to trust the import is the moment it finishes.

## Biggest single suggestion
An inspector switching from Spectora is handing over years of tuned content
and cannot tell by eye whether all of it arrived. Showing counts plus an
explicit list of anything not imported, at the point of import, is what turns
a hopeful migration into a verifiable one.
