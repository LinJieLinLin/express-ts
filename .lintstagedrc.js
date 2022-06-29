module.exports = {
  './packages/**/src/**/*.{js,jsx,ts,tsx}': [
    'npx eslint --fix --max-warnings 0',
    'npx prettier --write',
  ],
  './packages/**/src/**/*.{css,less,scss}': ['npx prettier --write'],
  '*.{json,md}': ['npx prettier --write'],
}
