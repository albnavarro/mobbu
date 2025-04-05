//@ts-check

import { MobJs } from '../../../mob/mobjs';
import { DocTitleSmallFn } from './docSide';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

export const DocsTitleSmall = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'doc-title-small',
        component: DocTitleSmallFn,
        state: {},
    })
);
