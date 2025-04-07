//@ts-check

import { MobJs } from '@mobJs';
import { LinksMobJsFn } from './links-mobjs';
import { LinksMobJsButtonFn } from './links-mobjs-button';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const LinksMobJsButton = MobJs.createComponent(
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

export const LinksMobJs = MobJs.createComponent(
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
