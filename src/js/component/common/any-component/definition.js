import { MobJs } from '@mobJs';
import { AnyComponentFn } from './any-component';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const AnyComponent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AnyComponent>} */
    ({
        tag: 'any-component',
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
