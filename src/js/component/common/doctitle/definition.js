//@ts-check

import { MobJs } from '../../../mob/mobjs';
import { DocTitleFn } from './docSide';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

export const DocTitle = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'doc-title',
        component: DocTitleFn,
        state: {},
    })
);
