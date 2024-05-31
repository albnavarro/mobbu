import { mobCore } from '../../../../mobCore';

// function wait() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, 1000);
//     });
// }

function updateContent(label, val) {
    return `${label}: ${val}`;
}

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const DynamicListCard = ({
    getState,
    html,
    onMount,
    key,
    staticProps,
    bindProps,
    watch,
    id,
}) => {
    const { isFull, parentListId, index, label, counter } = getState();

    onMount(({ element, refs }) => {
        const { indexEl, labelEl, counterEl } = refs;

        element.addEventListener('click', () => {
            element.classList.toggle('is-selected');
        });

        watch('index', (val) => {
            indexEl.textContent = updateContent('index', val);
        });

        watch('label', (val) => {
            labelEl.textContent = updateContent('label', val);
        });

        watch('counter', (val) => {
            counterEl.textContent = updateContent('counter', val);
        });

        mobCore.useFrame(() => {
            element.classList.add('active');
        });
    });

    const isFullClass = isFull ? 'is-full' : '';

    return html`
        <div class="c-dynamic-card ${isFullClass}">
            <div class="c-dynamic-card__container">
                <p class="c-dynamic-card__title">card content</p>
                <div class="id">id: ${id}</div>
                <div class="parentId">list index: ${parentListId}</div>
                <div class="index" ref="indexEl">
                    ${updateContent('index', index)}
                </div>
                <div class="label" ref="labelEl">
                    ${updateContent('label', label)}
                </div>
                <div class="counter" ref="counterEl">
                    ${updateContent('counter', counter)}
                </div>
                <div class="key">key: ${key.length > 0 ? key : 'no-key'}</div>
                <mobjs-slot name="card-label-slot"></mobjs-slot>
                <mobjs-slot
                    name="card-slot"
                    ${staticProps({
                        staticFromSlot: `static prop from card`,
                    })}
                    ${bindProps({
                        bind: ['counter', 'label', 'index'],
                        props: () => {
                            return {
                                parentState: `${JSON.stringify(
                                    getState(),
                                    null,
                                    4
                                )}`,
                            };
                        },
                    })}
                ></mobjs-slot>
                <dynamic-list-empty>
                    <dynamic-list-counter
                        slot="empty-slot"
                        ${staticProps({
                            parentListId,
                        })}
                        ${bindProps({
                            bind: ['counter'],
                            props: ({ counter }) => {
                                return { counter };
                            },
                        })}
                    />
                </dynamic-list-empty>
            </div>
        </div>
    `;
};
