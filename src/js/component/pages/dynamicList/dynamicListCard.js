import { core } from '../../../mobMotion';

function asyncTest() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 100);
    });
}

/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const DynamicListCard = async ({
    getState,
    render,
    onMount,
    key,
    computed,
    staticProps,
    bindProps,
    slotName,
}) => {
    const { isFull, label, index, counter } = getState();

    onMount(({ element }) => {
        const labelEl = element.querySelector('.label');
        const counterEl = element.querySelector('.counter');

        element.addEventListener('click', () => {
            element.classList.toggle('is-selected');
        });

        computed(
            'computedLabel',
            ['index', 'label', 'counter'],
            (index, label, counter) => {
                labelEl.textContent = `${label}-${index}`;
                counterEl.textContent = `${counter}`;

                return () => {};
            }
        );

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
                <div class="label">${label}-${index}</div>
                <div class="counter">${counter}</div>
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
