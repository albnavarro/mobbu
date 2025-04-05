//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { ParagraphFn } from './paragraph';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const Paragraph = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').Paragraph>} */
    ({
        name: 'mob-paragraph',
        component: ParagraphFn,
        exportState: ['style', 'color', 'boxed', 'note'],
        state: {
            style: () => ({
                value: 'medium',
                type: String,
                validate: (val) => ['small', 'medium', 'big'].includes(val),
                strict: true,
            }),
            color: () => ({
                value: 'black',
                type: String,
                validate: (val) => {
                    return ['white', 'grey', 'black', 'highlight'].includes(
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
