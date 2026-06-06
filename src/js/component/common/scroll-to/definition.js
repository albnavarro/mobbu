import { MobJs } from '@mobJs';
import { ScrollToFn } from './scroll-to';
import { docContainerStore } from '@stores/doc-container';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const ScrollTo = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollTo>} */
    ({
        tag: 'scroll-to',
        component: ScrollToFn,
        bindStore: docContainerStore,
        state: {
            activeLabel: {
                __value: '',
                __type: String,
            },
            updateAnchorOnWheel: {
                __value: false,
                __type: Boolean,
            },
            anchorItemsToBeComputed: {
                __value: [],
                __type: Array,
            },
            anchorItems: {
                __value: [],
                __type: Array,
                __transform: (value) => {
                    return value.toSorted(
                        function (/** @type {any} */ a, /** @type {any} */ b) {
                            const { element: elementA } = a;
                            const { element: elementB } = b;
                            if (elementA === elementB || !elementA || !elementB)
                                return 0;
                            if (
                                elementA.compareDocumentPosition(elementB) & 2
                            ) {
                                // b comes before a
                                return 1;
                            }
                            return -1;
                        }
                    );
                },
            },
        },
    })
);
