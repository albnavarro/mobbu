//@ts-check

import { createComponent } from '../../../mobjs';
import { LinksMobJsFn } from './linksMobJs';
import { LinksMobJsButtonFn } from './linksMobJsButton';

export const LinksMobJsButton = createComponent({
    name: 'links-mobjs-button',
    component: LinksMobJsButtonFn,
    exportState: ['label', 'url', 'active'],
    state: {
        label: () => ({
            value: '',
            type: String,
        }),
        url: () => ({
            value: '',
            type: String,
        }),
        active: () => ({
            value: false,
            type: Boolean,
        }),
    },
});

export const LinksMobJs = createComponent({
    name: 'links-mobjs',
    component: LinksMobJsFn,
    child: [LinksMobJsButton],
    exportState: ['active'],
    state: {
        data: () => ({
            value: [],
            type: Array,
        }),
        activeSection: () => ({
            value: '',
            type: String,
        }),
    },
});
