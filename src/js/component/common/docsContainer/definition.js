//@ts-check

import { MobJs } from '../../../mobjs';
import { DocContainerFn } from './docContainer';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const DocContainer = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'doc-container',
        component: DocContainerFn,
    })
);
