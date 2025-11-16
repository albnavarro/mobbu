import { MobJs } from '@mobJs';
import { NavigationButtonFn } from './navigation-button';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const NavigationButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').NavigationButton>} */
    ({
        tag: 'mob-navigation-button',
        component: NavigationButtonFn,
        props: {
            label: () => ({
                value: '',
                type: String,
            }),
            url: () => ({
                value: '',
                type: String,
            }),
            arrowClass: () => ({
                value: '',
                type: String,
            }),
            subMenuClass: () => ({
                value: '',
                type: String,
            }),
            fireRoute: () => ({
                value: true,
                type: Boolean,
            }),
            callback: () => ({
                value: () => {},
                type: Function,
            }),
            isOpen: () => ({
                value: false,
                type: Boolean,
            }),
            scrollToSection: () => ({
                value: '',
                type: String,
            }),
            activeId: () => ({
                value: -1,
                type: Number,
            }),
            forceChildren: () => ({
                value: [],
                type: Array,
            }),
        },
        state: {
            isCurrent: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
