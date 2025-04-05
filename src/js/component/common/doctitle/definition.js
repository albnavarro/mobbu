//@ts-check

import { MobJs } from '@mobJs';
import { DocTitleFn } from './docSide';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const DocTitle = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'doc-title',
        component: DocTitleFn,
        state: {},
    })
);
