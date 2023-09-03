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
export const TestComponent2 = async ({
    getState,
    render,
    onMount,
    key,
    computed,
    staticProps,
    bindProps,
    slotName,
}) => {
    const { label, index, counter } = getState();

    onMount(({ element }) => {
        const labelEl = element.querySelector('.label');
        const counterEl = element.querySelector('.counter');
        const button = element.querySelector('button');

        button.addEventListener('click', () => {
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

        return () => {
            element.remove();
        };
    });

    await asyncTest();

    return render(/* HTML */ `
        <div class="c-test-comp__inner">
            <h4>t2</h4>
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
            <button class="c-test-comp__inner__btn" type="button">
                toggle
            </button>
            <TestComponent4></TestComponent4>
        </div>
    `);
};
