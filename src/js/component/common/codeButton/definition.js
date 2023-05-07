import { createComponentDefinition } from '../../../mobjs';
import { CodeButton } from './codeButton';

export const codeButtonComponentDef = createComponentDefinition({
    name: 'CodeButton',
    component: CodeButton,
    props: {
        style: '',
        description: '',
        js: '',
        scss: '',
        html: '',
        // only test
        slotProps: 'no slot prop',
    },
});
