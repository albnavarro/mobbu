//@ts-check

import { MobJs } from '@mobJs';
import { DocContainerFn } from './doc-container';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const DocContainer = MobJs.createComponent(
    /** @type{CreateComponentParams<any>} */
    ({
        name: 'doc-container',
        component: DocContainerFn,
    })
);
