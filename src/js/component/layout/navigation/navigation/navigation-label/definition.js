import { MobJs } from '@mobJs';
import { NavigationLabelFn } from './navigation-label';
import { navigationStore } from '@stores/navigation';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const NavigationLabel = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').NavigationLabel>} */
    ({
        tag: 'mob-navigation-label',
        component: NavigationLabelFn,
        bindStore: navigationStore,
        props: {
            label: () => ({
                value: '',
                type: String,
            }),
            sectioName: () => ({
                value: '',
                type: String,
            }),
            hide: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
