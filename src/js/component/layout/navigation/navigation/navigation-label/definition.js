import { MobJs } from '@mobJs';
import { NavigationLabelFn } from './navigation-label';
import { navigationStore } from '@stores/navigation';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const NavigationLabel = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').NavigationLabelType>} */
    ({
        tag: 'mob-navigation-label',
        component: NavigationLabelFn,
        bindStore: navigationStore,
        props: {
            label: {
                __value: '',
                __type: String,
            },
            sectioName: {
                __value: '',
                __type: String,
            },
            hide: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
