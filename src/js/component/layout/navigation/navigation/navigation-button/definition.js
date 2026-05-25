import { MobJs } from '@mobJs';
import { NavigationButtonFn } from './navigation-button';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const NavigationButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').NavigationButtonType>} */
    ({
        tag: 'mob-navigation-button',
        component: NavigationButtonFn,
        props: {
            label: {
                __value: '',
                __type: String,
            },
            url: {
                __value: '',
                __type: String,
            },
            arrowClass: {
                __value: '',
                __type: String,
            },
            subMenuClass: {
                __value: '',
                __type: String,
            },
            fireRoute: {
                __value: true,
                __type: Boolean,
            },
            callback: {
                __value: () => {},
                __type: Function,
            },
            isOpen: {
                __value: false,
                __type: Boolean,
            },
            scrollToSection: {
                __value: '',
                __type: String,
            },
            activeId: {
                __value: -1,
                __type: Number,
            },
            forceChildren: {
                __value: [],
                __type: Array,
            },
            ariaLabel: {
                __value: '',
                __type: String,
            },
            ariaId: {
                __value: '',
                __type: String,
            },
        },
        state: {
            isCurrent: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
