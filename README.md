# Text Diff Tester

## Info

This page lets you evaluate the differences between 2 different text strings.

## Instructions

1. Paste the text strings for comparison into the first and second panels.
2. Differences will be displayed in the 3rd (Difference) panel.
3. You can change the test method using the select drop down at the top-right.

- By changing the test method you can compare based on individual Chars, Lines, etc.
- If you aren't seeing results formatted the way you're expecting, try changing the test method.

4. You can toggle the visibility on/off for each panel using the tab buttons at the top left.
5. The name (label) of each panel can be changed via the input fields at the bottom of each panel.

- The colored labels are in fact input text fields.

6. Your text strings, panel visibility, panel labels and test method are stored as query params int he URL, so you can share the URL or save it to review the differences later.

- Note: Each time you make changes to the text strings, panel visiblity, panel labels or test method the URL changes, so you will need to re-share or re-save it.

Note: This page leverages this package to handle difference testing: https://www.npmjs.com/package/diff

Created By Eben Maglic (2022)
