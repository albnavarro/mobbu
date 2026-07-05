import { htmlObject, MobJs } from '@mobJs';
import { refreshFilterList } from '../list/utils';
import { MobCore } from '@mobCore';

/**
 * @import {MobComponent} from '@mobJsType'
 */

/**
 * @param {object} [params]
 * @param {string} [params.testString]
 * @param {boolean} [params.setFocus]
 */
const refreshList = async ({ testString = '', setFocus = false } = {}) => {
    await MobJs.tick();
    refreshFilterList({ testString, setFocus });
};

/** @type {MobComponent<import('./type').DebugFilterHead>} */
export const DebugFilterHeadFunction = ({
    onMount,
    setRef,
    getRef,
    delegateEvents,
}) => {
    onMount(() => {
        /**
         * Update filter list on mount. No filter is applied here.
         *
         * - Applichiamo il focus sull' input non sul risultato della lista.
         */
        refreshList();
        MobCore.useNextLoop(() => {
            getRef().input.focus();
        });

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
                tag: 'label',
                className: 'title',
                content: 'Filter by tag',
                attributes: { for: 'filter-serach-list' },
            },
            {
                tag: 'input',
                attributes: {
                    type: 'text',
                    value: '',
                    name: 'filter-serach-list',
                    id: 'filter-serach-list',
                },
                modules: [
                    setRef('input'),
                    delegateEvents({
                        keydown: (/** @type {KeyboardEvent} */ event) => {
                            if (!(event?.code?.toLowerCase() === 'enter')) {
                                return;
                            }

                            event.preventDefault();
                            const testString = /** @type {HTMLInputElement} */ (
                                event.currentTarget
                            ).value;
                            refreshList({ testString, setFocus: true });
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
                        refreshList({ testString, setFocus: true });
                    },
                }),
                content: 'find',
            },
        ],
    });
};
