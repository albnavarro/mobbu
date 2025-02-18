//@ts-check

import { createComponent } from '../../../../mobjs';
import { ParagraphFn } from './paragraph';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const Paragraph = createComponent(
    /** @type{CreateComponentParams<import('./type').Paragraph>} */
    ({
        name: 'mob-paragraph',
        component: ParagraphFn,
        exportState: ['style', 'color'],
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
        },
    })
);
