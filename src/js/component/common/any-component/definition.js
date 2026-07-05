import { MobJs } from '@mobJs';
import { AnyComponentFunction } from './any-component';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const AnyComponent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AnyComponent>} */
    ({
        tag: 'any-component',
        component: AnyComponentFunction,
        props: {
            content: {
                __value: '',
                __type: String,
            },
        },
    })
);
