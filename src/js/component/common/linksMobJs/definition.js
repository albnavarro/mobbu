//@ts-check

import { createComponent } from '../../../mobjs';
import { LinksMobJsFn } from './linksMobJs';
import { LinksMobJsButtonFn } from './linksMobJsButton';

export const LinksMobJsButton = createComponent({
    name: 'links-mobjs-button',
    component: LinksMobJsButtonFn,
    exportState: ['label', 'url'],
    state: {
        label: () => ({
            value: '',
            type: String,
        }),
        url: () => ({
            value: '',
            type: String,
        }),
    },
});

export const LinksMobJs = createComponent({
    name: 'links-mobjs',
    component: LinksMobJsFn,
    child: [LinksMobJsButton],
    exportState: ['active'],
    state: {
        section: () => ({
            value: '',
            type: String,
        }),
    },
});
