import { mobCore } from '../../../../mobCore';

// function asyncTest() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, 100);
//     });
// }

function updateContent(label, val) {
    return `${label}: ${val}`;
}

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const DynamicListCard = async ({
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

    onMount(({ element }) => {
        const indexEl = element.querySelector('.index');
        const labelEl = element.querySelector('.label');
        const counterEl = element.querySelector('.counter');

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

        return () => {};
    });

    // await asyncTest();

    const isFullClass = isFull ? 'is-full' : '';

    return html`
        <dynamic-list-card class="dynamic-card ${isFullClass}">
            <div class="dynamic-card__container">
                <p class="dynamic-card__title">card content</p>
                <div class="id">id: ${id}</div>
                <div class="parentId">list index: ${parentListId}</div>
                <div class="index">${updateContent('counter', index)}</div>
                <div class="label">${updateContent('counter', label)}</div>
                <div class="counter">${updateContent('counter', counter)}</div>
                <div class="key">key: ${key.length > 0 ? key : 'no-key'}</div>
                <mobjs-slot
                    name="card-slot"
                    ${staticProps({
                        staticFromSlot: `static prop from card`,
                    })}
                    ${bindProps({
                        bind: ['counter', 'label', 'index'],
                        props: () => {
                            return {
                                /* HTML */
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
        </dynamic-list-card>
    `;
};
