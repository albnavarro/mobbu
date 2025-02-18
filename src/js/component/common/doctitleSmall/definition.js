//@ts-check

import { createComponent } from '../../../mobjs';
import { DocTitleSmallFn } from './docSide';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const DocsTitleSmall = createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'doc-title-small',
        component: DocTitleSmallFn,
        state: {},
    })
);
