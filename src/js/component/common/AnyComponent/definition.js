//@ts-check

import { createComponent } from '../../../mobjs';
import { AnyComponentFn } from './AnyComponent';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const AnyComponent = createComponent(
    /** @type{CreateComponentParams<import('./type').AnyComponent>} */
    ({
        name: 'any-component',
        component: AnyComponentFn,
        exportState: ['content'],
        state: {
            content: () => ({
                value: '',
                type: String,
            }),
        },
    })
);
