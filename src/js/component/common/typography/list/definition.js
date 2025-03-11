//@ts-check

import { MobJs } from '../../../../mobjs';
import { ListFn } from './list';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const List = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').List>} */
    ({
        name: 'mob-list',
        component: ListFn,
        exportState: ['style', 'color', 'items', 'dots', 'block'],
        state: {
            style: () => ({
                value: 'medium',
                type: String,
                validate: (val) => ['small', 'medium', 'big'].includes(val),
                strict: true,
            }),
            dots: () => ({
                value: true,
                type: Boolean,
            }),
            block: () => ({
                value: false,
                type: Boolean,
            }),
            color: () => ({
                value: 'black',
                type: String,
                validate: (val) => {
                    return ['white', 'black', 'grey', 'hightlight'].includes(
                        val
                    );
                },
            }),
            items: () => ({
                value: [],
                type: Array,
            }),
        },
    })
);
