import { MobCore } from '@mobCore';
import { MobMotionCore } from '@mobMotion';

/**
 * @import {MobStoreParams} from '@mobStoreType'
 */

export const docContainerStore = MobCore.createStore(
    /** @type {MobStoreParams<import('./type').DocContainerStore>} */
    ({
        rightSidebarIsInert: {
            __value: true,
            __type: Boolean,
            __skipEqual: false,
        },
        rightSidebarIsVisible: {
            __value: MobMotionCore.mq('min', 'desktop') ? true : false,
            __type: Boolean,
            __skipEqual: false,
        },
        rightSidebarIsEmpty: {
            __value: true,
            __type: Boolean,
        },
        anchorIsEmpty: {
            __value: true,
            __type: Boolean,
        },
        linksIsEmpty: {
            __value: true,
            __type: Boolean,
        },
    })
);

/**
 * Hide off-canvas-control-button when right sidear has no content.
 */
docContainerStore.computed(
    'rightSidebarIsEmpty',
    ({ anchorIsEmpty, linksIsEmpty }) => {
        return anchorIsEmpty && linksIsEmpty;
    },
    ['anchorIsEmpty', 'linksIsEmpty']
);
