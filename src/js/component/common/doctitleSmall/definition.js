//@ts-check

import { MobJs } from '@mobJs';
import { DocTitleSmallFn } from './docSide';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const DocsTitleSmall = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'doc-title-small',
        component: DocTitleSmallFn,
        state: {},
    })
);
