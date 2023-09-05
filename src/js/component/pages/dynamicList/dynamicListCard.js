import { core } from '../../../mobMotion';

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
    render,
    onMount,
    key,
    staticProps,
    bindProps,
    slotName,
    watch,
}) => {
    const { isFull, label, index, counter } = getState();

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

        core.useFrame(() => {
            element.classList.add('active');
        });

        return () => {
            element.remove();
        };
    });

    // await asyncTest();

    const isFullClass = isFull ? 'is-full' : '';
    const tag = isFull ? 'div' : 'button';
    const typeButton = isFull ? '' : "type='button'";

    return render(/* HTML */ `
        <${tag} ${typeButton} class="dynamic-card ${isFullClass}">
            <div class="dynamic-card__container">
                <div class="index">${updateContent('index', index)}</div>
                <div class="label">${updateContent('label', label)}</div>
                <div class="counter">${updateContent('counter', counter)}</div>
                <slot ${slotName('slot1')}></slot>
                <div class="key">key: ${key ?? ''}</div>
                <slot
                    ${slotName('slot2')}
                    ${staticProps({
                        staticFromSlot: `static prop from slot`,
                    })}
                    ${bindProps({
                        bind: ['counter', 'label', 'index'],
                        props: ({ counter }) => {
                            return {
                                counter: `t2 counter from slot (reactive): ${counter}`,
                                parentState: `t2 state from slot (reactive): ${JSON.stringify(
                                    getState()
                                )}`,
                            };
                        },
                    })}
                ></slot>
                <dynamicListChildTest></dynamicListChildTest>
            </div>
        </${tag}>
    `);
};
