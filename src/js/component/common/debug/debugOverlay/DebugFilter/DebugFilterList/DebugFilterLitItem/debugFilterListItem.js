//@ts-check

/**
 * @import { GetRef, MobComponent, UseMethodByName } from '../../../../../../../mobjs/type';
 **/

import { useMethodByName } from '../../../../../../../mobjs';
import { debugActiveComponentStore } from '../../../Store/DebugActiveComponent';

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.value
 * @param {GetRef} params.getRef
 * @returns {void}
 */
const setActiveItems = ({ id, value, getRef }) => {
    const { selected } = getRef();

    selected.classList.toggle('active', value === id);
};

/** @type{MobComponent<import('./type').DebugFilterListItem>} */
export const DebugFilterListItemFn = ({
    html,
    getState,
    delegateEvents,
    bindText,
    onMount,
    setRef,
    getRef,
}) => {
    const { id, name } = getState();

    onMount(() => {
        const { currentId } = debugActiveComponentStore.get();
        setActiveItems({ id, value: currentId, getRef });

        const unsubscribeActiveItem = debugActiveComponentStore.watch(
            'currentId',
            (value) => {
                setActiveItems({ id, value, getRef });
            }
        );

        return () => {
            unsubscribeActiveItem();
        };
    });

    return html`
        <div class="c-debug-filter-list-item">
            <span class="c-debug-filter-list-item__id">${id}</span> |
            <span class="c-debug-filter-list-item__tag"
                >${bindText`${'tag'}`}</span
            >
            |
            <span class="c-debug-filter-list-item__name">${name}</span>
            <button
                type="button"
                class="c-debug-filter-list-item__expand"
                ${delegateEvents({
                    click: () => {
                        /** @type{UseMethodByName<import('../../../DebugComponent/type').DebugComponent>} */
                        const methods = useMethodByName('debug_component');
                        methods?.updateId(id);
                    },
                })}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${setRef('selected')}
            ></span>
        </div>
    `;
};
