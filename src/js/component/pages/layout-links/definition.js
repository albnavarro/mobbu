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
            title: {
                __value: '',
                __type: String,
            },
            items: {
                __value: [],
                __type: Array,
            },
        },
        state: {
            isMounted: {
                __value: false,
                __type: Boolean,
            },
            showControls: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
