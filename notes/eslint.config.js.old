// @ts-check

import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintConfigPrettier from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';
// @ts-ignore
import importPlugin from 'eslint-plugin-import';

export default [
    js.configs.recommended,
    importPlugin.flatConfigs.recommended,
    eslintConfigPrettier,
    eslintPluginUnicorn.configs['flat/all'],
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
    {
        files: ['**/*.js', '**/*.d.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                requireConfigFile: true,
            },
        },
        rules: {
            'unicorn/template-indent': 'off',
            'unicorn/filename-case': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/prefer-top-level-await': 'off',
            'unicorn/no-array-for-each': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/no-null': 'off',
            'unicorn/no-new-array': 'off',
            'unicorn/no-keyword-prefix': 'off',
            'import/no-unresolved': 'off',
            'import/no-cycle': 'error',
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
];
