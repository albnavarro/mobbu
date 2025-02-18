//@ts-check

import { createComponent } from '../../../mobjs';
import { DocTitleFn } from './docSide';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const DocTitle = createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'doc-title',
        component: DocTitleFn,
        state: {},
    })
);
