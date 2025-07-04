import { MobJs } from '@mobJs';
import { DocTitleSmallFn } from './doc-title-small';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DocsTitleSmall = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        tag: 'doc-title-small',
        component: DocTitleSmallFn,
        state: {},
    })
);
