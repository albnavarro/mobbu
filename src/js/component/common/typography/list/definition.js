import { MobJs } from '@mobJs';
import { ListFn } from './list';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const List = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').List>} */
    ({
        tag: 'mob-list',
        component: ListFn,
        exportState: ['style', 'color', 'items', 'dots', 'block', 'links'],
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
            links: () => ({
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
