import { MobJs } from '@mobJs';
import { HeaderUtilsFn } from './header-utils';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const HeaderUtils = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        tag: 'mob-header-utils',
        component: HeaderUtilsFn,
    })
);
