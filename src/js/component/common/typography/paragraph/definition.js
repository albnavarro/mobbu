import { MobJs } from '@mobJs';
import { ParagraphFn } from './paragraph';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const Paragraph = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Paragraph>} */
    ({
        tag: 'mob-paragraph',
        component: ParagraphFn,
        props: {
            style: () => ({
                value: 'medium',
                type: String,
                validate: (val) => ['small', 'medium', 'big'].includes(val),
                strict: true,
            }),
            color: () => ({
                value: 'inherit',
                type: String,
                validate: (val) => {
                    return ['inherit', 'white', 'hightlight', 'black'].includes(
                        val
                    );
                },
            }),
            boxed: () => ({
                value: false,
                type: Boolean,
            }),
            note: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
