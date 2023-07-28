import { createProps } from '../../../mobjs';

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
    watch,
    render,
    onMount,
    emit,
    key,
    computed,
}) => {
    const { label, index } = getState();

    onMount(({ element }) => {
        const labelEl = element.querySelector('.label');
        const button = element.querySelector('button');

        button.addEventListener('click', () => emit('isSelected'));

        watch('isSelected', () => element.classList.toggle('is-selected'));

        computed('computedLabel', ['index', 'label'], (index, label) => {
            labelEl.textContent = `${label}-${index}`;
        });

        return () => {
            element.remove();
        };
    });

    await asyncTest();

    return render(/* HTML */ `
        <div class="c-test-comp__inner">
            <div class="label">${label}-${index}</div>
            <slot data-slotname="slot1"></slot>
            <div class="key">key: ${key ?? ''}</div>
            <slot
                data-slotname="slot2"
                data-props="${createProps({ slotProps: 'slot props' })}"
            ></slot>
            <button class="c-test-comp__inner__btn" type="button">
                toggle
            </button>
            <Codebutton data-props="${createProps({ style: 'primary' })}">
            </Codebutton>
        </div>
    `);
};
