// https://github.com/sverweij/dependency-cruiser
// npx depcruise src

import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import { importX } from 'eslint-plugin-import-x';

export default defineConfig([
    {
        files: ['**/*.js', '**/*.d.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            globals: globals.browser,
        },
        plugins: {
            js,
            eslintPluginUnicorn,
            'import-x': importX,
        },
        extends: [
            'js/recommended',
            eslintPluginUnicorn.configs.recommended,
            eslintConfigPrettier,
            importX.flatConfigs.recommended,
            // importPlugin.flatConfigs.recommended,
            tseslint.configs.recommended,
            tseslint.configs.stylistic,
        ],
        rules: {
            // TODO: Realign new rules from v70.
            'unicorn/name-replacements': 'off',
            'unicorn/consistent-boolean-name': 'off',
            'unicorn/no-top-level-assignment-in-function': 'off',
            'unicorn/no-top-level-side-effects': 'off',
            'unicorn/operator-assignment': 'off',
            'unicorn/prefer-await': 'off',
            'unicorn/prefer-minimal-ternary': 'off',
            'unicorn/prefer-number-coercion': 'off',
            'unicorn/no-useless-else': 'off',
            'unicorn/prefer-includes-over-repeated-comparisons': 'off',
            'unicorn/consistent-compound-words': 'off',
            'unicorn/require-array-sort-compare': 'off',
            'unicorn/no-declarations-before-early-exit': 'off',
            'unicorn/no-useless-template-literals': 'off',
            'unicorn/no-useless-spread': 'off',
            'unicorn/no-subtraction-comparison': 'off',
            'unicorn/no-break-in-nested-loop': 'off',
            'unicorn/no-unnecessary-global-this': 'off',
            'unicorn/no-unreadable-array-destructuring': 'off',
            'unicorn/prefer-else-if': 'off',
            'unicorn/prefer-smaller-scope': 'off',
            'unicorn/no-negated-comparison': 'off',
            'unicorn/prefer-boolean-return': 'off',
            'unicorn/no-late-event-control': 'off',
            'unicorn/no-this-outside-of-class': 'off',
            'unicorn/prefer-hoisting-branch-code': 'off',
            'unicorn/filename-case': 'off',
            'unicorn/no-unsafe-string-replacement': 'off',
            'unicorn/prefer-array-from-map': 'off',
            'unicorn/prefer-math-abs': 'off',
            'unicorn/prefer-scoped-selector': 'off',
            'unicorn/no-unreadable-for-of-expression': 'off',
            'unicorn/explicit-timer-delay': 'off',
            'unicorn/prefer-early-return': 'off',
            'unicorn/no-useless-delete-check': 'off',
            'unicorn/numeric-separators-style': 'off',
            'unicorn/prefer-type-literal-last': 'off',
            'unicorn/prefer-continue': 'off',
            'unicorn/prefer-split-limit': 'off',
            'unicorn/prefer-unary-minus': 'off',
            'unicorn/prefer-dom-node-replace-children': 'off',
            'unicorn/require-css-escape': 'off',
            'unicorn/prefer-direct-iteration': 'off',
            'unicorn/prefer-add-event-listener-options': 'off',
            'unicorn/prefer-set-has': 'off',
            'unicorn/no-useless-continue': 'off',
            'unicorn/prefer-object-define-properties': 'off',
            //
            'no-useless-assignment': 'off',
            'unicorn/template-indent': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/no-null': 'off',
            'import-x/no-unresolved': 'off',
            'import-x/no-cycle': 'error',
            'import-x/no-mutable-exports': 'error',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            'prefer-const': [
                'error',
                {
                    destructuring: 'any',
                    ignoreReadBeforeAssign: false,
                },
            ],
        },
    },
    globalIgnores(['docs/snippets/**/*'], 'Ignore build directory'),
]);
