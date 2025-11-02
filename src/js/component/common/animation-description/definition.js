import { MobJs } from '@mobJs';
import { AnimationDescriptionFn } from './animation-description';
import { navigationStore } from '@stores/navigation';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const AnimationDescription = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AnimationDescription>} */
    ({
        tag: 'animation-description',
        component: AnimationDescriptionFn,
        bindStore: navigationStore,
        props: {
            rawContent: () => ({
                value: '',
                type: String,
            }),
        },
        state: {
            content: () => ({
                value: '',
                type: String,
            }),
            visible: () => ({
                value: true,
                type: Boolean,
            }),
        },
    })
);
