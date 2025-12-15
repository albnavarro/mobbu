import { MobJs } from '@mobJs';
import { HeadernavFn } from './header-nav';
import { Search } from '@commonComponent/search/cta-search/definition';
import { HistoryCta } from '@commonComponent/custom-history/history-cta/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const HeaderNav = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        tag: 'mob-header-nav',
        component: HeadernavFn,
        child: [Search, HistoryCta],
    })
);
