//@ts-check

import { createComponent } from '../../../mobjs';
import { LinksMobJsFn } from './linksMobJs';
import { LinksMobJsButtonFn } from './linksMobJsButton';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const LinksMobJsButton = createComponent(
    /** @type{CreateComponentParams<import('./type').LinksMobJsButton>} */
    ({
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
    })
);

export const LinksMobJs = createComponent(
    /** @type{CreateComponentParams<import('./type').LinksMobJs>} */
    ({
        name: 'links-mobjs',
        component: LinksMobJsFn,
        child: [LinksMobJsButton],
        state: {
            data: () => ({
                value: [],
                type: Array,
            }),
            activeSection: () => ({
                value: '',
                type: String,
            }),
            hide: () => ({
                value: false,
                type: Boolean,
            }),
            shift: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
