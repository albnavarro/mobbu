//@ts-check

import { MobJs } from '@mobJs';
import { LayoutLinksFn } from './layout-links';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const LayoutLinks = MobJs.createComponent(
    /** @type{CreateComponentParams<import ('./type').LayoutLinks>} */
    ({
        tag: 'layout-links',
        component: LayoutLinksFn,
        props: {
            title: () => ({
                value: '',
                type: String,
            }),
            items: () => ({
                value: [],
                type: Array,
            }),
        },
        state: {
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
            showControls: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
