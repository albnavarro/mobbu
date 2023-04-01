/**
 * Create component
 */
export const TestComponent2 = ({
    props,
    watch,
    render,
    onMount,
    emit,
    key,
    // watchParent,
}) => {
    const { label } = props;

    onMount(({ element }) => {
        const counterEl = element.querySelector('.counter');
        element.addEventListener('click', () => emit('isRed'));
        watch('isRed', () => element.classList.toggle('is-red'));
        watch('index', (value) => (counterEl.innerHTML = value));

        // watchParent('data', () => {
        //     const labelEl = element.querySelector('.label');
        //     labelEl.innerHTML = label?.();
        // });

        return () => {
            element.remove();
        };
    });

    return render(`
        <div class="c-test-comp__inner">
            <div>
                Label: <span class="label"> ${label?.()}</span>
            </div>
            <div>
                Id:<span class="counter"></span>
            </div>
            <div class="key">key: ${key}</div>
        </div>
    `);
};
