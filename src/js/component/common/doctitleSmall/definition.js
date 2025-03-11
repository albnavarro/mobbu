//@ts-check

import { MobJs } from '../../../mobjs';
import { DocTitleSmallFn } from './docSide';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const DocsTitleSmall = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'doc-title-small',
        component: DocTitleSmallFn,
        state: {},
    })
);
