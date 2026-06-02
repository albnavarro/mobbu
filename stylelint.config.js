/** @type {import('stylelint').Config} */
export default {
    plugins: ['stylelint-use-logical'],
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-property-sort-order-smacss',
    ],
    rules: {
        'color-function-alias-notation': null,
        'csstools/use-logical': 'always',
    },
};
