// @ts-nocheck

import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
    {
        files: ['**/*.js', '**/*.d.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            globals: globals.browser,
            parserOptions: {
                requireConfigFile: true,
            },
        },
        plugins: {
            js,
            eslintConfigPrettier,
            eslintPluginUnicorn,
            importPlugin,
            tseslint,
        },
        extends: [
            'js/recommended',
            eslintPluginUnicorn.configs.recommended,
            eslintConfigPrettier,
            importPlugin.flatConfigs.recommended,
            tseslint.configs.recommended,
            tseslint.configs.stylistic,
        ],
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
    globalIgnores(['docs/snippets/**/*'], 'Ignore build directory'),
]);
