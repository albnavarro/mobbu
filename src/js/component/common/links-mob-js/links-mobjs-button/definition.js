import { MobJs } from '@mobJs';
import { LinksMobJsButtonFn } from './links-mobjs-button';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const LinksMobJsButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').LinksMobJsButton>} */
    ({
        tag: 'links-mobjs-button',
        component: LinksMobJsButtonFn,
        props: {
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
