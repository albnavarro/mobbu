import { createComponent } from '../../../mobjs';
import { htmlContentDef } from '../htmlContent/definition';
import { CodeOverlayFn } from './codeOverlay';
import { CodeOverlayButtonFn } from './codeOverlayButton';

/**
 * Button state ( each for every drawer ).
 */
export const CodeOverlayButton = createComponent({
    name: 'code-overlay-button',
    component: CodeOverlayButtonFn,
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

/**
 * Overlay state
 */
export const CodeOverlay = createComponent({
    name: 'code-overlay',
    component: CodeOverlayFn,
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
    child: [CodeOverlayButton, htmlContentDef],
});
