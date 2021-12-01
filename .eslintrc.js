module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    node: true,
    mocha: true,
    es6: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
  },
  plugins: ['react'],
  settings: {
    react: {
      version: require('./package.json').dependencies.react,
    },
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-var': 'error',
    'prefer-const': 'error',
    'react/prop-types': 2,
  },
}
