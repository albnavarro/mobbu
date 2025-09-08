import { MobJs } from '@mobJs';
import { DocContainerFn } from './doc-container';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const DocContainer = MobJs.createComponent(
    /** @type {CreateComponentParams<any>} */
    ({
        tag: 'doc-container',
        component: DocContainerFn,
    })
);
