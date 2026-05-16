import { MobJs } from '@mobJs';
import { NavigationFn } from './navigation';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */
export const Navigation = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Navigation>} */
    ({
        tag: 'mob-navigation',
        component: NavigationFn,
        state: {
            currentAccordionId: {
                __value: -1,
                __type: Number,
                __skipEqual: false,
            },
        },
    })
);
