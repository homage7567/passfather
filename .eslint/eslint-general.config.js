module.exports = {
  extends: ['eslint:recommended'],
  rules: {
    // Enforce return statements in callbacks of array methods
    // https://eslint.org/docs/latest/rules/array-callback-return
    'array-callback-return': ['error'],

    // Disallow expressions where the operation doesn't affect the value
    // https://eslint.org/docs/latest/rules/no-constant-binary-expression
    'no-constant-binary-expression': ['error'],

    // Disallow returning value from constructor
    // https://eslint.org/docs/latest/rules/no-constructor-return
    'no-constructor-return': ['error'],

    // Disallow duplicate module imports
    // https://eslint.org/docs/latest/rules/no-duplicate-imports
    'no-duplicate-imports': ['error'],

    // Disallow returning values from Promise executor functions
    // https://eslint.org/docs/latest/rules/no-promise-executor-return
    'no-promise-executor-return': ['error'],

    // Disallow comparisons where both sides are exactly the same
    // https://eslint.org/docs/latest/rules/no-self-compare
    'no-self-compare': ['error'],

    // Disallow template literal placeholder syntax in regular strings
    // https://eslint.org/docs/latest/rules/no-template-curly-in-string
    'no-template-curly-in-string': ['error'],

    // Disallow unused private class members
    // https://eslint.org/docs/latest/rules/no-unused-private-class-members
    'no-unused-private-class-members': ['error'],

    // Enforce consistent spacing inside array brackets
    // https://eslint.org/docs/latest/rules/array-bracket-spacing
    'array-bracket-spacing': ['error', 'never'],

    // Enforce consistent spacing inside computed property brackets
    // https://eslint.org/docs/latest/rules/computed-property-spacing
    'computed-property-spacing': ['error', 'never'],

    // Disallow assignment operators in return statements
    // https://eslint.org/docs/latest/rules/no-return-assign
    'no-return-assign': ['error', 'except-parens'],

    // Disallow empty block statements
    // https://eslint.org/docs/latest/rules/no-empty
    'no-empty': ['error', { allowEmptyCatch: true }],

    // Enforce consistent spacing after the // or /* in a comment
    // https://eslint.org/docs/latest/rules/spaced-comment
    'spaced-comment': ['error', 'always', { exceptions: ['*'] }],

    // Enforce a maximum depth that callbacks can be nested
    // https://eslint.org/docs/latest/rules/max-nested-callbacks
    'max-nested-callbacks': ['error', 4],

    // Disallow the use of variables before they are defined
    // https://eslint.org/docs/latest/rules/no-use-before-define
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: true
      }
    ],

    // Disallow unused variables
    // https://eslint.org/docs/latest/rules/no-unused-vars
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Disallow unused expressions
    // https://eslint.org/docs/latest/rules/no-unused-expressions
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ],

    // Enforce consistent spacing inside braces
    // https://eslint.org/docs/latest/rules/object-curly-spacing
    'object-curly-spacing': [
      'error',
      'always',
      {
        objectsInObjects: true
      }
    ],

    // Enforce the consistent use of either function declarations or expressions
    // https://eslint.org/docs/latest/rules/func-style
    'func-style': [
      'error',
      'declaration',
      {
        allowArrowFunctions: true
      }
    ],

    // Require or disallow an empty line between class members
    // https://eslint.org/docs/latest/rules/lines-between-class-members
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true }
    ],

    // Require var declarations be placed at the top of their containing scope
    // https://eslint.org/docs/latest/rules/vars-on-top
    'vars-on-top': 'warn',

    // Require let or const instead of var
    // https://eslint.org/docs/latest/rules/no-var
    'no-var': 'warn',

    // Disallow bitwise operators
    // https://eslint.org/docs/latest/rules/no-bitwise
    'no-bitwise': 'error',

    // Require return statements to either always or never specify values
    // https://eslint.org/docs/latest/rules/consistent-return
    'consistent-return': ['warn', { treatUndefinedAsUnspecified: true }],

    // Enforce a maximum number of classes per file
    // https://eslint.org/docs/latest/rules/max-classes-per-file
    'max-classes-per-file': ['error', 4],

    // Enforce a maximum number of statements allowed in function blocks
    // https://eslint.org/docs/latest/rules/max-statements
    'max-statements': ['error', 25],

    // Enforce a maximum cyclomatic complexity allowed in a program
    // https://eslint.org/docs/latest/rules/complexity
    complexity: ['error', { max: 10 }],

    // Enforce consistent brace style for all control statements
    // https://eslint.org/docs/latest/rules/curly
    curly: 'error',

    // Enforce default clauses in switch statements to be last
    // https://eslint.org/docs/latest/rules/default-case-last
    'default-case-last': 'error',

    // Enforce dot notation whenever possible
    // https://eslint.org/docs/latest/rules/dot-notation
    'dot-notation': 'error',

    // https://eslint.org/docs/latest/rules/eqeqeq
    // Require the use of === and !==
    'eqeqeq': 'error',

    // Require for-in loops to include an if statement
    // https://eslint.org/docs/latest/rules/guard-for-in
    'guard-for-in': 'error',

    // Disallow specified identifiers
    // https://eslint.org/docs/latest/rules/id-denylist
    'id-denylist': 'off',

    // Require identifiers to match a specified regular expression
    // https://eslint.org/docs/latest/rules/id-match
    'id-match': 'off',

    // Enforce a maximum number of lines per file
    // https://eslint.org/docs/latest/rules/max-lines
    'max-lines': ['error', 300],

    // Disallow the use of arguments.caller or arguments.callee
    // https://eslint.org/docs/latest/rules/no-caller
    'no-caller': 'error',

    // Disallow the use of console
    // https://eslint.org/docs/latest/rules/no-console
    'no-console': 'error',

    // Disallow the use of eval()
    // Disallow the use of eval()
    'no-eval': 'error',

    // Disallow multiple empty lines
    // https://eslint.org/docs/latest/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': 'error',

    // Disallow new operators with the Function object
    // https://eslint.org/docs/latest/rules/no-new-func
    'no-new-func': 'error',

    // Disallow new operators with the String, Number, and Boolean objects
    // https://eslint.org/docs/latest/rules/no-new-wrappers
    'no-new-wrappers': 'error',

    // Disallow unnecessary return await
    // https://eslint.org/docs/latest/rules/no-return-await
    'no-return-await': 'error',

    // Disallow comma operators
    // https://eslint.org/docs/latest/rules/no-sequences
    'no-sequences': 'error',

    // Disallow throwing literals as exceptions
    // https://eslint.org/docs/latest/rules/no-throw-literal
    'no-throw-literal': 'error',

    // Disallow initializing variables to undefined
    // https://eslint.org/docs/latest/rules/no-undef-init
    'no-undef-init': 'error',

    // Disallow dangling underscores in identifiers
    // https://eslint.org/docs/latest/rules/no-underscore-dangle
    'no-underscore-dangle': 'off',

    // Require or disallow newlines around variable declarations
    // https://eslint.org/docs/latest/rules/one-var-declaration-per-line
    'one-var': ['error', 'never'],

    // Require const declarations for variables that are never reassigned after declared
    // https://eslint.org/docs/latest/rules/prefer-const
    'prefer-const': 'error',

    // Disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead
    // https://eslint.org/docs/latest/rules/prefer-object-spread
    'prefer-object-spread': 'error',

    // Require template literals instead of string concatenation
    // https://eslint.org/docs/latest/rules/prefer-template
    'prefer-template': 'error',

    // Enforce the consistent use of the radix argument when using parseInt()
    // https://eslint.org/docs/latest/rules/radix
    radix: 'error',

    // Require or disallow an empty line after variable declarations
    // https://eslint.org/docs/latest/rules/newline-after-var
    'newline-after-var': ['error', 'always'],

    // Disallow else blocks after return statements in if statements
    // https://eslint.org/docs/latest/rules/no-else-return
    'no-else-return': 'error'
  }
};
