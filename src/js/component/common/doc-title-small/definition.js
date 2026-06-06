import { MobJs } from '@mobJs';
import { DocTitleSmallFn } from './doc-title-small';
import { docContainerStore } from '@stores/doc-container';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const DocsTitleSmall = MobJs.createComponent(
    /** @type {CreateComponentParams<import('@stores/doc-container/type').DocContainerStore>} */
    ({
        tag: 'doc-title-small',
        component: DocTitleSmallFn,
        bindStore: docContainerStore,
    })
);
