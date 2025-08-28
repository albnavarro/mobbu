import { MobJs } from '@mobJs';
import { ScrollToButton } from './button/definition';
import { ScrollToFn } from './scroll-to';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const ScrollTo = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').ScrollTo>} */
    ({
        tag: 'scroll-to',
        component: ScrollToFn,
        state: {
            activeLabel: () => ({
                value: '',
                type: String,
            }),
            updateAnchorOnWheel: () => ({
                value: false,
                type: Boolean,
            }),
            anchorItemsToBeComputed: () => ({
                value: [],
                type: Array,
            }),
            anchorItems: () => ({
                value: [],
                type: Array,
                transform: (value) => {
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
            }),
        },
        child: [ScrollToButton],
    })
);
