import { MobJs } from '@mobJs';
import { DraggerFn } from './dragger';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const Dragger = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Dragger>} */
    ({
        tag: 'c-dragger',
        component: DraggerFn,
        props: {
            rootClass: () => ({
                value: '',
                type: String,
            }),
            childClass: () => ({
                value: '',
                type: String,
            }),
            initialZoom: () => ({
                value: 1,
                type: Number,
            }),
            ease: () => ({
                value: true,
                type: Boolean,
            }),
            align: () => ({
                value: 'CENTER',
                type: String,
            }),
        },
        state: {
            zoom: () => ({
                value: 1,
                type: Number,
            }),
        },
    })
);
