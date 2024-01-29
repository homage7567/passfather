module.exports = {
  'plugins': [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-declaration-strict-value'
  ],
  'extends': ['stylelint-config-standard'],
  'rules': {
    // Require (where possible) or disallow named colors
    // https://stylelint.io/user-guide/rules/color-named
    'color-named': 'never',

    // Require or disallow an empty line before declarations
    // https://stylelint.io/user-guide/rules/declaration-empty-line-before
    'declaration-empty-line-before': 'never',

    // Require or disallow an empty line before rules
    // https://stylelint.io/user-guide/rules/rule-empty-line-before
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment']
      }
    ],

    // Require or disallow quotes for attribute values
    // https://stylelint.io/user-guide/rules/selector-attribute-quotes
    'selector-attribute-quotes': 'always',

    // Limit the specificity of selectors
    // https://stylelint.io/user-guide/rules/selector-max-specificity
    'selector-max-specificity': '0,5,0',

    // Specify single or double colon notation for applicable pseudo-element selectors
    // https://stylelint.io/user-guide/rules/selector-pseudo-element-colon-notation
    'selector-pseudo-element-colon-notation': 'double',

    // Disallow unknown type selectors
    // https://stylelint.io/user-guide/rules/selector-type-no-unknown
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['/^/deep/']
      }
    ],

    // Specify lowercase or uppercase for keywords values
    // https://stylelint.io/user-guide/rules/value-keyword-case
    'value-keyword-case': 'lower',

    // Disallow vendor prefixes for values
    // https://stylelint.io/user-guide/rules/value-no-vendor-prefix
    'value-no-vendor-prefix': null,

    // Specify modern or legacy notation for color-functions
    // https://stylelint.io/user-guide/rules/color-function-notation
    'color-function-notation': 'legacy',

    // Specify percentage or number notation for alpha-values
    // https://stylelint.io/user-guide/rules/alpha-value-notation
    'alpha-value-notation': 'number',

    // Disallow unknown pseudo-element selectors
    // https://stylelint.io/user-guide/rules/selector-pseudo-element-no-unknown
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep']
      }
    ],

    // Specify string or URL notation for @import rules
    // https://stylelint.io/user-guide/rules/import-notation
    'import-notation': 'string'
  }
};
