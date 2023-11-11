import { html } from '../../../../mobjs';

function getRepeaterCard({
    sync,
    staticProps,
    bindProps,
    bindEvents,
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
 * @param {import('../../../../mobjs/type').componentType}
 */
export const DynamicListRepeater = ({
    getState,
    html,
    repeat,
    staticProps,
    bindProps,
    bindEvents,
    delegateEvents,
}) => {
    const { listId, key, clean, label } = getState();
    const keyParsed = key.length > 0 ? key : null;

    return html`
        <div class="dynamic-list-repeater">
            <h4 class="dynamic-list-repeater__title">${label}</h4>
            <p class="dynamic-list-repeater__new js-list"></p>
            <div class="dynamic-list-repeater__list">
                ${repeat({
                    watch: 'data',
                    clean,
                    key: keyParsed,
                    //beforeUpdate: ({ container, childrenId }) => {
                    //},
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
                            bindEvents,
                            delegateEvents,
                            listId,
                        });
                    },
                })}
            </div>
        </div>
    `;
};
