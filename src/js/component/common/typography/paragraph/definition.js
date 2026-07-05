import { MobJs } from '@mobJs';
import { ParagraphFunction } from './paragraph';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const Paragraph = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Paragraph>} */
    ({
        tag: 'mob-paragraph',
        component: ParagraphFunction,
        props: {
            style: {
                __value: 'medium',
                __type: String,
                __validate: (val) => ['small', 'medium', 'big'].includes(val),
                __strict: true,
            },
            color: {
                __value: 'inherit',
                __type: String,
                __validate: (val) => {
                    return ['inherit', 'white', 'hightlight', 'black'].includes(
                        val
                    );
                },
            },
            boxed: {
                __value: false,
                __type: Boolean,
            },
            note: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
