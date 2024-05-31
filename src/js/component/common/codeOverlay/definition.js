import { createComponent } from '../../../mobjs';
import { CodeOverlay } from './codeOverlay';
import { CodeOverlayButton } from './codeOverlayButton';

/**
 * Overlay state
 */
export const codeOverlayDef = createComponent({
    name: 'code-overlay',
    component: CodeOverlay,
    exportState: ['urls', 'activeContent'],
    state: {
        urls: () => ({
            value: [],
            type: Array,
            skipEqual: false,
        }),
        activeContent: () => ({
            value: '',
            type: String,
            skipEqual: true,
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
