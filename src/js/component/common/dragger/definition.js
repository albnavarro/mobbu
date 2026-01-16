import { MobJs } from '@mobJs';
import { DraggerFn } from './dragger';
import { DRAGGER_CENTER } from './constant';

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
            childrenClass: () => ({
                value: '',
                type: String,
            }),
            containerClass: () => ({
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
                value: DRAGGER_CENTER,
                type: String,
                transform: (value) => {
                    return value.toUpperCase();
                },
            }),
            usePrespective: () => ({
                value: true,
                type: Boolean,
            }),
            perspective: () => ({
                value: 600,
                type: Number,
            }),
            depthFactor: () => ({
                value: 30,
                type: Number,
            }),
            maxLowDepth: () => ({
                value: -200,
                type: Number,
            }),
            maxHightDepth: () => ({
                value: 200,
                type: Number,
            }),
            afterInit: () => ({
                value: () => {},
                type: Function,
            }),
            onDepthChange: () => ({
                value: () => {},
                type: Function,
            }),
        },
    })
);
