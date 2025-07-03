import { MobJs } from '@mobJs';
import { DocTitleFn } from './doc-side';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DocTitle = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        tag: 'doc-title',
        component: DocTitleFn,
        state: {},
    })
);
