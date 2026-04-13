import { htmlObject, MobJs } from '@mobJs';
import { refreshFilterList } from '../list/utils';

/**
 * @import {MobComponent} from "@mobJsType"
 */

const refreshList = async (testString = '') => {
    await MobJs.tick();
    refreshFilterList(testString);
};

/** @type {MobComponent<import('./type').DebugFilterHead>} */
export const DebugFilterHeadFn = ({
    onMount,
    setRef,
    getRef,
    delegateEvents,
}) => {
    onMount(() => {
        /**
         * Update filter list on mount. No filter is applied here.
         */
        refreshList();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {
            // Chorme leak memory with input, maintain reference.
            getRef()?.input.remove();
        };
    });

    return htmlObject({
        className: 'c-debug-filter-head',
        content: [
            {
                tag: 'span',
                className: 'title',
                content: 'Filter by tag',
            },
            {
                tag: 'input',
                attributes: { type: 'text', value: '', name: 'debug-filter' },
                modules: [
                    setRef('input'),
                    delegateEvents({
                        keydown: (/** @type {KeyboardEvent} */ event) => {
                            if (event.code.toLowerCase() === 'enter') {
                                event.preventDefault();

                                const testString =
                                    /** @type {HTMLInputElement} */ (
                                        event.currentTarget
                                    ).value;
                                refreshList(testString);
                            }
                        },
                    }),
                ],
            },
            {
                tag: 'button',
                attributes: { type: 'button' },
                modules: delegateEvents({
                    click: () => {
                        const { input } = getRef();
                        const testString = input.value;
                        refreshList(testString);
                    },
                }),
                content: 'find',
            },
        ],
    });
};
