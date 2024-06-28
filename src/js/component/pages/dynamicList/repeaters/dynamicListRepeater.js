import { html } from '../../../../mobjs';

/**
 * @param {object} param
 * @param {import('../../../../mobjs/type').BindProps<import('./type').DynamicListRepeater>} param.bindProps
 * @param {import('../../../../mobjs/type').DelegateEvents} param.delegateEvents
 */
function getRepeaterCard({
    sync,
    staticProps,
    bindProps,
    listId,
    delegateEvents,
}) {
    return html`
        <dynamic-list-card
            ${staticProps({
                parentListId: listId,
            })}
            ${bindProps({
                bind: ['counter', 'data'],
                props: ({ counter, _current, _index }) => {
                    return {
                        counter,
                        label: _current.label,
                        index: _index,
                    };
                },
            })}
            ${delegateEvents({
                mousedown: (_e, { current, index }) =>
                    console.log(current, index),
            })}
            ${sync}
        >
            <dynamic-slotted-label
                slot="card-label-slot"
                ${bindProps({
                    bind: ['label'],
                    forceParent: true,
                    props: ({ label }) => {
                        return {
                            label,
                        };
                    },
                })}
            >
            </dynamic-slotted-label>
        </dynamic-list-card>
    `;
}

function updateNewElement(id) {
    return `<strong>Current cards id:</strong> ${id
        .join(',')
        .replaceAll(',', ' | ')}`;
}

function afterUpdateList({ element, className, childrenId }) {
    const newElement = element.querySelector(className);
    newElement.textContent = '';
    newElement.insertAdjacentHTML('afterbegin', updateNewElement(childrenId));
}

/**
 * @type {import('../../../../mobjs/type').mobComponent<import('./type').DynamicListRepeater>}
 */
export const DynamicListRepeaterFn = ({
    getState,
    html,
    repeat,
    staticProps,
    bindProps,
    delegateEvents,
}) => {
    const { listId, key, clean, label } = getState();
    const keyParsed = key.length > 0 ? key : null;

    return html`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${label}</h4>
            <p class="c-dynamic-list-repeater__new js-list"></p>
            <div class="c-dynamic-list-repeater__list">
                ${repeat({
                    watch: 'data',
                    clean,
                    key: keyParsed,
                    afterUpdate: ({ childrenId, element }) => {
                        afterUpdateList({
                            className: `.js-list`,
                            childrenId,
                            element,
                        });
                    },
                    render: ({ sync }) => {
                        return getRepeaterCard({
                            sync,
                            staticProps,
                            bindProps,
                            delegateEvents,
                            listId,
                        });
                    },
                })}
            </div>
        </div>
    `;
};
