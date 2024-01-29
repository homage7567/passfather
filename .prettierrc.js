// https://prettier.io/docs/en/options.html

module.exports = {
  // Specify the line length that the printer will wrap on
  // https://prettier.io/docs/en/options.html#print-width
  printWidth: 120,

  // Specify the number of spaces per indentation-level
  // https://prettier.io/docs/en/options.html#tab-width
  tabWidth: 2,

  // Indent lines with tabs instead of spaces
  // https://prettier.io/docs/en/options.html#tabs
  useTabs: false,

  // Print semicolons at the ends of statements
  // https://prettier.io/docs/en/options.html#semicolons
  semi: true,

  // Use single quotes instead of double quotes
  // https://prettier.io/docs/en/options.html#quotes
  singleQuote: true,

  // Change when properties in objects are quoted
  // https://prettier.io/docs/en/options.html#quote-props
  quoteProps: 'as-needed',

  // Use single quotes instead of double quotes in JSX
  // https://prettier.io/docs/en/options.html#jsx-quotes
  jsxSingleQuote: true,

  // Print trailing commas wherever possible in multi-line comma-separated syntactic structures
  // https://prettier.io/docs/en/options.html#trailing-commas
  trailingComma: 'none',

  // Print spaces between brackets in object literals
  // https://prettier.io/docs/en/options.html#bracket-spacing
  bracketSpacing: true,

  // Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end
  // of the last line instead of being alone on the next line
  // https://prettier.io/docs/en/options.html#bracket-line
  bracketSameLine: false,

  // Include parentheses around a sole arrow function parameter
  // https://prettier.io/docs/en/options.html#arrow-function-parentheses
  arrowParens: 'avoid',

  // Backwards to the start of the first line containing the selected statement
  // https://prettier.io/docs/en/options.html#range
  rangeStart: 0,

  // Forwards to the end of the selected statement
  // https://prettier.io/docs/en/options.html#range
  rangeEnd: Infinity,

  // A file with the following as its first comment will be formatted when --require-pragma is supplied
  // https://prettier.io/docs/en/options.html#require-pragma
  requirePragma: false,

  // Wrap prose if it exceeds the print width
  // https://prettier.io/docs/en/options.html#prose-wrap
  proseWrap: 'always',

  // Specify the global whitespace sensitivity for HTML, Vue, Angular, and Handlebars
  // https://prettier.io/docs/en/options.html#html-whitespace-sensitivity
  htmlWhitespaceSensitivity: 'strict',

  // Line Feed only (\n), common on Linux and macOS as well as inside git repos
  // https://prettier.io/docs/en/options.html#end-of-line
  endOfLine: 'lf',

  // Enforce single attribute per line in HTML, Vue and JSX
  // https://prettier.io/docs/en/options.html#single-attribute-per-line
  singleAttributePerLine: true
};
