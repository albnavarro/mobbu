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
            'unicorn/consistent-boolean-name': 'off',
            'unicorn/no-top-level-assignment-in-function': 'off',
            'unicorn/prefer-await': 'off',
            'unicorn/prefer-number-coercion': 'off',
            'unicorn/consistent-compound-words': 'off',
            'unicorn/no-break-in-nested-loop': 'off',
            'unicorn/prefer-boolean-return': 'off',
            'unicorn/no-this-outside-of-class': 'off',
            'unicorn/filename-case': 'off',
            'unicorn/prefer-type-literal-last': 'off',
            //
            'unicorn/no-unreadable-array-destructuring': 'off',
            'unicorn/prefer-minimal-ternary': 'off',
            'unicorn/no-unnecessary-global-this': 'off',
            'no-useless-assignment': 'off',
            'unicorn/template-indent': 'off',
            'unicorn/name-replacements': 'off',
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
