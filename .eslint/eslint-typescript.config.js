module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      files: ['*.ts', '*.tsx'],
      rules: {
        // Disallow unused variables
        // https://typescript-eslint.io/rules/no-unused-vars
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
          }
        ],

        // Require a consistent member declaration order
        // https://typescript-eslint.io/rules/member-ordering
        '@typescript-eslint/member-ordering': [
          'off',
          {
            default: [
              'public-static-field',
              'protected-static-field',
              'private-static-field',
              'public-static-method',
              'protected-static-method',
              'private-static-method',
              'public-instance-field',
              'protected-instance-field',
              'private-instance-field',
              'constructor',
              'public-instance-method',
              'protected-instance-method',
              'private-instance-method'
            ]
          }
        ],

        // Disallow certain types
        // https://typescript-eslint.io/rules/ban-types
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              String: { message: 'Use string instead', fixWith: 'string' },
              Boolean: { message: 'Use boolean instead', fixWith: 'boolean' },
              Number: { message: 'Use number instead', fixWith: 'number' },
              Object: {
                message: 'Use Record<string, any> instead',
                fixWith: 'Record<string, any>'
              },
              object: {
                message: 'Use Record<string, any> instead',
                fixWith: 'Record<string, any>'
              }
            },
            extendDefaults: false
          }
        ],

        // Disallow classes used as namespaces
        // https://typescript-eslint.io/rules/no-extraneous-class
        '@typescript-eslint/no-extraneous-class': [
          'error',
          {
            allowWithDecorator: true,
            allowStaticOnly: true
          }
        ],

        // Enforce naming conventions for everything across a codebase
        // https://typescript-eslint.io/rules/naming-convention
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'default',
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow'
          },
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow'
          },
          {
            selector: 'enumMember',
            format: ['PascalCase', 'camelCase', 'snake_case', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow'
          },
          {
            selector: 'typeLike',
            format: ['PascalCase', 'UPPER_CASE']
          },
          {
            selector: 'property',
            format: ['camelCase', 'PascalCase']
          },
          {
            selector: 'classProperty',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: "allow"
          }
        ],

        // Disallow @ts-<directive> comments or require descriptions after directives
        // https://typescript-eslint.io/rules/ban-ts-comment
        '@typescript-eslint/ban-ts-comment': 'warn',

        // Disallow empty functions
        // https://typescript-eslint.io/rules/no-empty-function
        '@typescript-eslint/no-empty-function': 'warn',

        // Disallow unused expressions
        // https://typescript-eslint.io/rules/no-unused-expressions
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          {
            allowShortCircuit: true,
            allowTernary: true
          }
        ],

        // Disallow require statements except in import statements
        // https://typescript-eslint.io/rules/no-var-requires
        '@typescript-eslint/no-var-requires': 'warn',

        // Disallow TypeScript namespaces
        // https://typescript-eslint.io/rules/no-namespace
        '@typescript-eslint/no-namespace': 'off',

        // Disallow the use of variables before they are defined
        // https://typescript-eslint.io/rules/no-use-before-define
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: false,
            classes: false,
            variables: true,
            enums: true,
            typedefs: true
          }
        ],

        // Require explicit return and argument types on exported functions' and classes' public class methods
        // https://typescript-eslint.io/rules/explicit-module-boundary-types
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // Enforce consistent usage of type imports
        // https://typescript-eslint.io/rules/consistent-type-imports
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          {
            prefer: 'no-type-imports'
          }
        ],

        // Disallow variable declarations from shadowing variables declared in the outer scope
        // https://typescript-eslint.io/rules/no-shadow
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['warn']
      }
    }
  ]
};
