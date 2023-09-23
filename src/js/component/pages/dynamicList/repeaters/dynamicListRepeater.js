import { html } from '../../../../mobjs';

function getRepeaterCard({
    required,
    staticProps,
    bindProps,
    bindEvents,
    listId,
}) {
    return html`
        <dynamic-list-card
            ${staticProps({
                parentListId: listId,
            })}
            ${bindProps({
                bind: ['counter', 'data'],
                props: ({ counter }, { current, index }) => {
                    return {
                        counter,
                        label: current.label,
                        index,
                    };
                },
            })}
            ${bindEvents({
                mousedown: (_e, { current, index }) =>
                    console.log(current, index),
            })}
            ${required}
        >
        </dynamic-list-card>
    `;
}

function updateNewElement(id) {
    return `<strong>Current cards id:</strong> ${id
        .join(',')
        .replaceAll(',', ' | ')}`;
}

function afterUpdateList({ className, childrenId }) {
    const newElement = document.querySelector(className);
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
}) => {
    const { listId, key, clean, label } = getState();
    const keyParsed = key.length > 0 ? key : null;

    return html`
        <div class="dynamic-list__repeater">
            <h4 class="dynamic-list__title">${label}</h4>
            <p
                class="dynamic-list__newelements"
                id="repeater-legend-${listId}"
            ></p>
            <div class="dynamic-list__list">
                ${repeat({
                    watch: 'data',
                    clean,
                    key: keyParsed,
                    component: 'dynamic-list-card',
                    //beforeUpdate: ({ container, childrenId }) => {
                    //},
                    afterUpdate: ({ childrenId }) => {
                        afterUpdateList({
                            className: `#repeater-legend-${listId}`,
                            childrenId,
                        });
                    },
                    render: ({ required }) => {
                        return getRepeaterCard({
                            required,
                            staticProps,
                            bindProps,
                            bindEvents,
                            listId,
                        });
                    },
                })}
            </div>
        </div>
    `;
};
