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
            'no-useless-assignment': 'off',
            'unicorn/template-indent': 'off',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/no-array-for-each': 'off',
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
