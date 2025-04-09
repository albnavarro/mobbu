//@ts-check

import { MobJs } from '@mobJs';
import { MobMotionCore } from '@mobMotion';
import { AboutComponentFn } from './about';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const AboutComponent = MobJs.createComponent(
    /** @type{CreateComponentParams<import ('./type').About>} */
    ({
        name: 'about-component',
        component: AboutComponentFn,
        exportState: ['block_1', 'block_2', 'block_3', 'block_4', 'aboutSvg'],
        state: {
            block_1: () => ({
                value: {
                    titleTop: '',
                    titleBottom: '',
                },
                type: 'any',
            }),
            block_2: () => ({
                value: {
                    title: '',
                    copy: '',
                },
                type: 'any',
            }),
            block_3: () => ({
                value: {
                    title: '',
                    copy: '',
                },
                type: 'any',
            }),
            block_4: () => ({
                value: {
                    title: '',
                    items: [''],
                },
                type: 'any',
            }),
            aboutSvg: () => ({
                value: '',
                type: String,
            }),
            navItem: () => ({
                value: [{ index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }],
                type: Array,
            }),
            activenavItem: () => ({
                value: 1,
                type: Number,
                transform: (value) => {
                    return MobMotionCore.clamp(value, 1, 4);
                },
            }),
        },
        child: [],
    })
);
