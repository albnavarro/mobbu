//@ts-check

import { createComponent } from '../../../mobjs';
import { DocContainerFn } from './docContainer';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const DocContainer = createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'doc-container',
        component: DocContainerFn,
    })
);
