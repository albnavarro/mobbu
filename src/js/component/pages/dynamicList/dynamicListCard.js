import { mobCore } from '../../../mobCore';
import { useSlot } from '../../../mobjs';

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
 * @param {import('../../../mobjs/type').componentType}
 */
export const DynamicListCard = async ({
    getState,
    html,
    onMount,
    key,
    staticProps,
    bindProps,
    slotName,
    watchSync,
    id,
}) => {
    const { isFull } = getState();

    onMount(({ element }) => {
        const indexEl = element.querySelector('.index');
        const labelEl = element.querySelector('.label');
        const counterEl = element.querySelector('.counter');

        element.addEventListener('click', () => {
            element.classList.toggle('is-selected');
        });

        watchSync('index', (val) => {
            indexEl.textContent = updateContent('index', val);
        });

        watchSync('label', (val) => {
            labelEl.textContent = updateContent('label', val);
        });

        watchSync('counter', (val) => {
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
                <p>card content</p>
                <div class="id">id: ${id}</div>
                <div class="index"></div>
                <div class="label"></div>
                <div class="counter"></div>
                <mobjs-slot ${slotName('slot1')}></mobjs-slot>
                <div class="key">key: ${key.length > 0 ? key : 'no-key'}</div>
                <mobjs-slot
                    ${slotName('slot2')}
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
                        ${useSlot('empty-slot')}
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
