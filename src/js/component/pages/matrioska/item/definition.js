//@ts-check

import { MobJs } from '@mobJs';
import { MatrioskaItemFn } from './matrioska-item';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const MatrioskaItem = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').MatrioskaItem>} */
    ({
        name: 'matrioska-item',
        component: MatrioskaItemFn,
        exportState: ['level', 'key', 'value', 'active', 'counter', 'index'],
        state: {
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
            active: () => ({
                value: false,
                type: Boolean,
            }),
            counter: () => ({
                value: -1,
                type: Number,
            }),
        },
        child: [],
        style: /* CSS */ `:host { display: block; } `,
        // connectedCallback: ({ context, params }) => {
        //     console.log(context, params);
        // },
    })
);
