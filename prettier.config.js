/**
 * @type {import('prettier').Config}
 * @see https://prettier.io/docs/configuration
 */
const config = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    arrowParens: 'always',
    printWidth: 80,
    plugins: ['prettier-plugin-jsdoc'],
    jsdocPrintWidth: 120,
    jsdocCommentLineStrategy: 'keep',
};

export default config;
