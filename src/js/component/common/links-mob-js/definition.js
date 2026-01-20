import { MobJs } from '@mobJs';
import { LinksMobJsFn } from './links-mobjs';
import { LinksMobJsButton } from './links-mobjs-button/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const LinksMobJs = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').LinksMobJs>} */
    ({
        tag: 'links-mobjs',
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
                value: true,
                type: Boolean,
            }),
            shift: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
