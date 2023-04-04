function asyncTest() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 100);
    });
}
/**
 * Create component
 */
export const TestComponent2 = async ({
    props,
    watch,
    render,
    onMount,
    emit,
    key,
    // watchParent,
}) => {
    const { label = () => {} } = props;

    onMount(({ element }) => {
        const counterEl = element.querySelector('.counter');
        const button = element.querySelector('button');
        button.addEventListener('click', () => emit('isRed'));
        watch('isRed', () => element.classList.toggle('is-red'));
        watch('index', (value) => {
            counterEl.textContent = value;
        });

        // watchParent('data', () => {
        //     const labelEl = element.querySelector('.label');
        //     labelEl.innerHTML = label?.();
        // });

        return () => {
            element.remove();
        };
    });

    await asyncTest();

    return render(/* HTML */ `
        <div class="c-test-comp__inner">
            <div>Label: <span class="label"> ${label()}</span></div>
            <slot data-slotname="slot1"></slot>
            <div>Id:<span class="counter"></span></div>
            <div class="key">key: ${key ?? ''}</div>
            <slot data-slotname="slot2"></slot>
            <button class="c-test-comp__inner__btn" type="button">
                toggle
            </button>
            <Codebutton></Codebutton>
        </div>
    `);
};
