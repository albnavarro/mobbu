//@ts-check

import { MobJs } from '../../../mob/mobjs';
import { ScrollToButton } from './button/definition';
import { ScrollToFn } from './scrollTo';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

export const ScrollTo = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').ScrollTo>} */
    ({
        name: 'scroll-to',
        component: ScrollToFn,
        state: {
            activeLabel: () => ({
                value: '',
                type: String,
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
                        function (/** @type{any} */ a, /** @type{any} */ b) {
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
