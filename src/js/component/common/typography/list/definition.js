import { MobJs } from '@mobJs';
import { ListFn } from './list';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const List = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').List>} */
    ({
        tag: 'mob-list',
        component: ListFn,
        props: {
            style: {
                __value: 'medium',
                __type: String,
                __validate: (val) => ['small', 'medium', 'big'].includes(val),
                __strict: true,
            },
            dots: {
                __value: true,
                __type: Boolean,
            },
            links: {
                __value: false,
                __type: Boolean,
            },
            color: {
                __value: 'black',
                __type: String,
                __validate: (val) => {
                    return ['white', 'black', 'grey', 'hightlight'].includes(
                        val
                    );
                },
            },
            items: {
                __value: [],
                __type: Array,
            },
        },
    })
);
