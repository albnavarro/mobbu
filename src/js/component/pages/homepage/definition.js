//@ts-check

import { MobJs } from '../../../mobjs';
import { HomeComponentFn } from './home';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const HomeComponent = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').HomeComponent>} */
    ({
        name: 'home-component',
        component: HomeComponentFn,
        exportState: ['svg'],
        state: {
            svg: () => ({
                value: '',
                type: String,
            }),
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
        },
        child: [],
    })
);
