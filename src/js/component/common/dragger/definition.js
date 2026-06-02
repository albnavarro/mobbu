import { MobJs } from '@mobJs';
import { DraggerFn } from './dragger';
import { DRAGGER_CENTER } from './constant';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const Dragger = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Dragger>} */
    ({
        tag: 'c-dragger',
        component: DraggerFn,
        props: {
            rootClass: {
                __value: '',
                __type: String,
            },
            childrenClass: {
                __value: '',
                __type: String,
            },
            containerClass: {
                __value: '',
                __type: String,
            },
            initialZoom: {
                __value: 1,
                __type: Number,
            },
            ease: {
                __value: true,
                __type: Boolean,
            },
            align: {
                __value: DRAGGER_CENTER,
                __type: String,
                __transform: (value) => {
                    return value.toUpperCase();
                },
            },
            usePrespective: {
                __value: true,
                __type: Boolean,
            },
            perspective: {
                __value: 600,
                __type: Number,
            },
            hideThreshold: {
                __value: 1,
                __type: Number,
            },
            depthFactor: {
                __value: 30,
                __type: Number,
            },
            maxLowDepth: {
                __value: -200,
                __type: Number,
            },
            maxHightDepth: {
                __value: 200,
                __type: Number,
            },
            afterInit: {
                __value: () => {},
                __type: Function,
            },
            onDepthChange: {
                __value: () => {},
                __type: Function,
            },
        },
    })
);
