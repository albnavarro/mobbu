import { MobJs } from '@mobJs';
import { AnimationDescriptionFn } from './animation-description';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const AnimationDescription = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AnimationDescription>} */
    ({
        tag: 'animation-description',
        component: AnimationDescriptionFn,
        exportState: ['content'],
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
