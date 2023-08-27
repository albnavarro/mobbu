import { createComponentDefinition } from '../../../mobjs';
import { CodeButton } from './codeButton';

export const codeButtonComponentDef = createComponentDefinition({
    name: 'CodeButton',
    component: CodeButton,
    exportState: ['drawers', 'style'],
    state: {
        drawers: () => ({
            value: [],
            type: Array,
        }),
        style: () => ({
            value: '',
            type: 'String',
        }),
    },
});
