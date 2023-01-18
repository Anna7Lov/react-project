module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',   
    project: './tsconfig.json',
  },
  plugins: [
    'react'    
  ],
  rules: {
    '@typescript-eslint/semi': [2, 'always'],
    'semi': [2, 'always'],
    '@typescript-eslint/no-floating-promises': ['off'],
    '@typescript-eslint/strict-boolean-expressions': ['off'],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',          
        },
        singleline: {
          delimiter: 'semi',          
        }
      }
    ]
  }
}
