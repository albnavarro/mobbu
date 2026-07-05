import { MobJs } from '@mobJs';
import { NavigationFunction } from './navigation';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */
export const Navigation = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Navigation>} */
    ({
        tag: 'mob-navigation',
        component: NavigationFunction,
        state: {
            currentAccordionId: {
                __value: -1,
                __type: Number,
                __skipEqual: false,
            },
        },
    })
);
