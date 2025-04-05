//@ts-check

import { MobJs } from '../../../mob/mobjs';
import { AnyComponentFn } from './AnyComponent';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

export const AnyComponent = MobJs.createComponent(
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
