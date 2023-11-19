import { createComponent } from '../../../mobjs';
import { CodeOverlay } from './codeOverlay';
import { CodeOverlayButton } from './codeOverlayButton';

/**
 * Overlay state
 */
export const codeOverlayDef = createComponent({
    name: 'code-overlay',
    component: CodeOverlay,
    isolateOnMount: true,
    isolateCreation: true,
    exportState: ['urls'],
    state: {
        urls: () => ({
            value: [],
            type: Array,
            skipEqual: false,
        }),
        activeContent: () => ({
            value: '',
            type: String,
            skipEqual: false,
        }),
        rawContent: () => ({
            value: '',
            type: String,
        }),
    },
});

/**
 * Button state ( each for every drawer ).
 */
export const codeOverlayButtonDef = createComponent({
    name: 'code-overlay-button',
    component: CodeOverlayButton,
    exportState: ['key', 'selected', 'disable'],
    state: {
        key: '',
        selected: () => ({
            value: false,
            type: Boolean,
        }),
        disable: () => ({
            value: true,
            type: Boolean,
        }),
    },
});
