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
}) => {
    const { label, index } = props;

    onMount(({ element }) => {
        const labelEl = element.querySelector('.label');
        const counterEl = element.querySelector('.counter');
        element.addEventListener('click', () => emit('isRed'));

        const unwatchRed = watch('isRed', () =>
            element.classList.toggle('is-red')
        );

        const unwatchLabel = watch(
            'label',
            (value) => (labelEl.innerHTML = value)
        );
        const unwatchIndex = watch(
            'index',
            (value) => (counterEl.innerHTML = value)
        );

        return () => {
            unwatchLabel();
            unwatchIndex();
            unwatchRed();
            element.remove();
        };
    });

    return render(`
        <div class="c-test-comp__inner">
            <div>
                Label: <span class="label"> ${label ?? ''}</span>
            </div>
            <div>
                Id:<span class="counter">${index ?? '0'}</span>
            </div>
            <div class="key">key: ${key}</div>
        </div>
    `);
};
