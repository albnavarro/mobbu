import { MobJs } from '@mobJs';
import { TitleFunction } from './title';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const Title = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Title>} */
    ({
        tag: 'mob-title',
        component: TitleFunction,
        props: {
            tag: {
                __value: 'h1',
                __type: String,
            },
            color: {
                __value: 'inherit',
                __type: String,
                __validate: (val) => {
                    return ['inherit', 'white', 'black'].includes(val);
                },
            },
            isSection: {
                __value: false,
                __type: Boolean,
            },
            isBold: {
                __value: false,
                __type: Boolean,
            },
            index: {
                __value: '',
                __type: String,
            },
        },
    })
);
