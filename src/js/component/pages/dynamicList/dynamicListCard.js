import { getLegendData } from '../../../data';
import { mobCore } from '../../../mobCore';

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
    watchImmediate,
    id,
}) => {
    const { isFull, label } = getState();

    onMount(({ element }) => {
        const indexEl = element.querySelector('.index');
        const labelEl = element.querySelector('.label');
        const counterEl = element.querySelector('.counter');

        element.addEventListener('click', () => {
            element.classList.toggle('is-selected');
        });

        watchImmediate('index', (val) => {
            indexEl.textContent = updateContent('index', val);
        });

        watchImmediate('label', (val) => {
            labelEl.textContent = updateContent('label', val);
        });

        watchImmediate('counter', (val) => {
            counterEl.textContent = updateContent('counter', val);
        });

        mobCore.useFrame(() => {
            element.classList.add('active');
        });

        return () => {};
    });

    // await asyncTest();

    const isFullClass = isFull ? 'is-full' : '';
    // const tag = isFull ? 'div' : 'button';
    const typeButton = isFull ? '' : "type='button'";

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    return html`
        <dynamic-list-card ${typeButton} class="dynamic-card ${isFullClass}">
            <div class="dynamic-card__container">
                <div class="id">id: ${id}</div>
                <div class="index"></div>
                <div class="label"></div>
                <div class="counter"></div>
                <slot ${slotName('slot1')}></slot>
                <div class="key">key: ${key ?? ''}</div>
                <slot
                    ${slotName('slot2')}
                    ${staticProps({
                        staticFromSlot: `static prop from slot`,
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
                ></slot>
                <dynamic-list-child-test>
                    <code-button
                        ${staticProps({
                            drawers: [
                                {
                                    label: 'description',
                                    source: label,
                                },
                                {
                                    label: 'definition',
                                    source: label,
                                },
                                {
                                    label: 'component',
                                    source: label,
                                },
                                {
                                    label: 'animation',
                                    source: label,
                                },
                            ],
                        })}
                    >
                    </code-button>
                </dynamic-list-child-test>
            </div>
        </dynamic-list-card>
    `;
};
