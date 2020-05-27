module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier", "prettier"],
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: ["prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": ["error", {
      singleQuote: false,
      semi: true,
      useTabs: true,
      tabWidth: 2,
      trailingComma: 'all',
      printWidth: 80,
      bracketSpacing: true,
      arrowParens: 'avoid'
    }]
  }
};
