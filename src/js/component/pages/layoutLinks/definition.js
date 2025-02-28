//@ts-check

import { createComponent } from '../../../mobjs';
import { LayoutLinksFn } from './layoutLinks';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const LayoutLinks = createComponent(
    /** @type{CreateComponentParams<import ('./type').LayoutLinks>} */
    ({
        name: 'layout-links',
        component: LayoutLinksFn,
        exportState: ['title', 'items'],
        state: {
            title: () => ({
                value: '',
                type: String,
            }),
            items: () => ({
                value: [],
                type: Array,
            }),
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
            showControls: () => ({
                value: false,
                type: Boolean,
            }),
        },
        child: [],
    })
);
