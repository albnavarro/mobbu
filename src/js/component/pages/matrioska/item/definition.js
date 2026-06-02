//@ts-check

import { MobJs } from '@mobJs';
import { MatrioskaItemFn } from './matrioska-item';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const MatrioskaItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').MatrioskaItemType>} */
    ({
        tag: 'matrioska-item',
        component: MatrioskaItemFn,
        props: {
            level: {
                __value: '',
                __type: String,
            },
            key: {
                __value: '',
                __strict: true,
                __type: String,
            },
            index: {
                __value: 0,
                __strict: true,
                __type: Number,
            },
            value: {
                __value: '',
                __type: String,
            },
            counter: {
                __value: -1,
                __type: Number,
            },
        },
        state: {
            active: {
                __value: false,
                __type: Boolean,
            },
        },
        style: /* CSS */ `:host { display: block; } `,
        // connectedCallback: ({ context, params }) => {
        //     console.log(context, params);
        // },
    })
);
