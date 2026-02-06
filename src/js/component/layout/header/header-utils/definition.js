import { MobJs } from '@mobJs';
import { HeaderUtilsFn } from './header-utils';
import { Search } from '@commonComponent/search/cta-search/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const HeaderUtils = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        tag: 'mob-header-utils',
        component: HeaderUtilsFn,
        child: [Search],
    })
);
