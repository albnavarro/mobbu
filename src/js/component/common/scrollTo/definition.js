//@ts-check

import { createComponent } from '../../../mobjs';
import { ScrollToButton } from './button/definition';
import { ScrollToFn } from './scrollTo';

export const ScrollTo = createComponent({
    name: 'scroll-to',
    component: ScrollToFn,
    exportState: ['activeId'],
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
                // Order label by document position.
                return value.sort(
                    function (/** @type{any} */ a, /** @type{any} */ b) {
                        const { element: elementA } = a;
                        const { element: elementB } = b;
                        if (elementA === elementB || !elementA || !elementB)
                            return 0;
                        if (elementA.compareDocumentPosition(elementB) & 2) {
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
});
