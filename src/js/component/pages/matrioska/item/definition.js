//@ts-check

import { MobJs } from '@mobJs';
import { MatrioskaItemFn } from './matrioska-item';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const MatrioskaItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').MatrioskaItem>} */
    ({
        tag: 'matrioska-item',
        component: MatrioskaItemFn,
        props: {
            level: () => ({
                value: '',
                type: String,
            }),
            key: () => ({
                value: '',
                strict: true,
                type: String,
            }),
            index: () => ({
                value: 0,
                strict: true,
                type: Number,
            }),
            value: () => ({
                value: '',
                type: String,
            }),
            counter: () => ({
                value: -1,
                type: Number,
            }),
        },
        state: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
        style: /* CSS */ `:host { display: block; } `,
        // connectedCallback: ({ context, params }) => {
        //     console.log(context, params);
        // },
    })
);
