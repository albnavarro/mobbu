import { createComponentDefinition } from '../../../mobjs';
import { CodeOverlay } from './codeOverlay';
import { CodeOverlayButton } from './codeOverlayButton';

/**
 * Overlay state
 */
export const codeOverlayDef = createComponentDefinition({
    name: 'CodeOverlay',
    component: CodeOverlay,
    exportState: ['urls', 'isOpen'],
    state: {
        urls: () => ({
            value: [],
            type: Array,
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
        isOpen: () => ({
            value: false,
            type: Boolean,
        }),
    },
});

/**
 * Button state ( each for every drawer ).
 */
export const codeOverlayButtonDef = createComponentDefinition({
    name: 'CodeOverlayButton',
    component: CodeOverlayButton,
    exportState: ['key', 'callback', 'selected', 'disable'],
    state: {
        key: '',
        callback: () => {},
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
