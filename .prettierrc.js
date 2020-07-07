module.exports = {
  semi: true,
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.twig',
      options: {
        printWidth: 100,
      },
    },
    {
      files: '*.ts',
      options: {
        parser: 'typescript',
      },
    },
  ],
};
