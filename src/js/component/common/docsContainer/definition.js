//@ts-check

import { MobJs } from '../../../mob/mobjs';
import { DocContainerFn } from './docContainer';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

export const DocContainer = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'doc-container',
        component: DocContainerFn,
    })
);
