//@ts-check

import { MobJs } from '../../../mobjs';
import { DocTitleFn } from './docSide';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const DocTitle = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'doc-title',
        component: DocTitleFn,
        state: {},
    })
);
