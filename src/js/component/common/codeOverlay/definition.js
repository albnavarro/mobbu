import { createComponent } from '../../../mobjs';
import { CodeOverlay } from './codeOverlay';
import { CodeOverlayButton } from './codeOverlayButton';

/**
 * Overlay state
 */
export const codeOverlayDef = createComponent({
    name: 'CodeOverlay',
    component: CodeOverlay,
    isolateOnMount: true,
    isolateCreation: true,
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
export const codeOverlayButtonDef = createComponent({
    name: 'CodeOverlayButton',
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
