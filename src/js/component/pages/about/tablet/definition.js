//@ts-check

import { MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { AboutComponentFunction } from './about';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const AboutComponent = MobJs.createComponent(
    /** @type{CreateComponentParams<import ('./type').About>} */
    ({
        tag: 'about-component',
        component: AboutComponentFunction,
        props: {
            block_1: {
                __value: {
                    titleTop: '',
                    titleBottom: '',
                },
                __type: 'any',
            },
            block_2: {
                __value: {
                    title: '',
                    copy: '',
                },
                __type: 'any',
            },
            block_3: {
                __value: {
                    title: '',
                    copy: '',
                },
                __type: 'any',
            },
            block_4: {
                __value: {
                    title: '',
                    items: [''],
                },
                __type: 'any',
            },
            svg: {
                __value: '',
                __type: String,
            },
        },
        state: {
            navItem: {
                __value: [
                    { index: 1, label: 'about' },
                    { index: 2, label: 'why' },
                    { index: 3, label: 'what' },
                    { index: 4, label: 'inspiration' },
                ],
                __type: Array,
            },
            activenavItem: {
                __value: 1,
                __type: Number,
                __transform: (value) => {
                    return MobMotionCore.clamp(value, 1, 4);
                },
            },
            isMounted: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
