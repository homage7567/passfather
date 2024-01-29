module.exports = {
  '{apps, libs}/**/*.html': [
    'prettier --write',
    'stylelint --fix',
    'npm run eslint'
  ],
  '{apps, libs}/**/*.{css, scss}': [
    'prettier --write',
    'stylelint --fix'
  ],
  '{apps, libs}/**/*.{js,ts}': [
    'prettier --write',
    'npm run eslint'
  ],
  '{apps,libs}/**/*.{json,md}': ['prettier --write'],
  'apps/passfather/src/assets/i18n/*.json': ['transloco-validator']
};
