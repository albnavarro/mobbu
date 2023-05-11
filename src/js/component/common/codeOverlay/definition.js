import { createComponentDefinition } from '../../../mobjs';
import { CodeOverlay } from './codeOverlay';
import { CodeOverlayButton } from './codeOverlayButton';

/**
 * Drawer list.
 */
export const overlayDrawers = ['description', 'js', 'scss', 'component'];

/**
 * Create urls Object for overlay state.
 */
const urls = overlayDrawers.reduce((previous, current) => {
    return {
        ...previous,
        ...{
            [current]: () => ({
                value: '',
                type: String,
            }),
        },
    };
}, {});

/**
 * Overlay state
 */
export const codeOverlayDef = createComponentDefinition({
    name: 'CodeOverlay',
    component: CodeOverlay,
    props: {
        contents: [...overlayDrawers],
    },
    state: {
        urls,
        activeContent: () => ({
            value: '',
            type: String,
            skipEqual: false,
            validate: (val) => {
                return [...overlayDrawers, ''].includes(val);
            },
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
    props: {
        key: '',
        callback: () => {},
    },
    state: {
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
