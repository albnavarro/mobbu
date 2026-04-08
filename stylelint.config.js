/** @type {import('stylelint').Config} */
export default {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-property-sort-order-smacss',
    ],
    rules: {
        'color-function-alias-notation': null,
    },
};
