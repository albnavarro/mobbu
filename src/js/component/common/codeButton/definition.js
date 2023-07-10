import { createComponentDefinition } from '../../../mobjs';
import { overlayDrawers } from '../codeOverlay/definition';
import { CodeButton } from './codeButton';

/**
 * Create one pros for every drawers in overlay component.
 */
const drawers = overlayDrawers.reduce((previous, current) => {
    return {
        ...previous,
        ...{ [current]: '' },
    };
}, {});

export const codeButtonComponentDef = createComponentDefinition({
    name: 'CodeButton',
    component: CodeButton,
    state: {
        drawers: () => ({
            value: drawers,
            type: 'Any',
        }),
        style: '',
        // only test
        slotProps: 'no slot prop',
    },
});
