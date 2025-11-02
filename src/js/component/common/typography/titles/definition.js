import { MobJs } from '@mobJs';
import { TitleFn } from './title';
import { navigationStore } from '@stores/navigation';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const Title = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Title>} */
    ({
        tag: 'mob-title',
        component: TitleFn,
        bindStore: navigationStore,
        props: {
            tag: () => ({
                value: 'h1',
                type: String,
            }),
            color: () => ({
                value: 'inherit',
                type: String,
                validate: (val) => {
                    return ['inherit', 'white', 'hightlight', 'black'].includes(
                        val
                    );
                },
            }),
            isSection: () => ({
                value: false,
                type: Boolean,
            }),
            isBold: () => ({
                value: false,
                type: Boolean,
            }),
            index: () => ({
                value: '',
                type: String,
            }),
        },
    })
);
