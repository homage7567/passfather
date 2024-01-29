module.exports = {
  overrides: [
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility'
      ]
    },
    {
      files: ['*.ts'],
      extends: [
        'plugin:@angular-eslint/recommended',
        // This is required if you use inline templates in Components
        'plugin:@angular-eslint/template/process-inline-templates'
      ],
      rules: {
        '@angular-eslint/component-class-suffix': 'error',
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'pf',
            style: 'kebab-case'
          }
        ],
        '@angular-eslint/directive-class-suffix': 'error',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'pf',
            style: 'camelCase'
          }
        ],
        '@angular-eslint/no-conflicting-lifecycle': 'error',
        '@angular-eslint/no-host-metadata-property': 'error',
        '@angular-eslint/no-input-rename': 'error',
        '@angular-eslint/no-output-native': 'error',
        '@angular-eslint/no-output-on-prefix': 'error',
        '@angular-eslint/no-output-rename': 'error',
        '@angular-eslint/no-outputs-metadata-property': 'error',
        '@angular-eslint/use-lifecycle-interface': 'error',
        '@angular-eslint/use-pipe-transform-interface': 'error'
      }
    }
  ]
};
