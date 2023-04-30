import { CodeButton } from './codeButton';

export const codeButtonComponentDef = {
    CodeButton: {
        componentFunction: CodeButton,
        componentParams: {
            props: {
                style: '',
                description: '',
                js: '',
                scss: '',
                html: '',
                // only test
                slotProps: 'no slot prop',
            },
        },
    },
};
