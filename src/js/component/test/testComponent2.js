/**
 * Create component
 */
export const TestComponent2 = ({
    props,
    watch,
    setState,
    // watchParent,
    render,
    onMount,
}) => {
    const { valueFromParent } = props;

    onMount(({ element }) => {
        const counterEl = element.querySelector('.counter');

        element.addEventListener('click', () => {
            setState('isRed', (prev) => !prev);
        });

        const unwatchRed = watch('isRed', () => {
            element.classList.toggle('is-red');
        });

        /**
         * Listen to parent mutation.
         */
        // const unwatchParent = watchParent('counter', () => {
        //     setState('counter', valueFromParent());
        // });

        const unwatch = watch('label', (val) => {
            counterEl.innerHTML = val;
        });

        return () => {
            // unwatchParent();
            unwatch();
            unwatchRed();
            element.remove();
        };
    });

    return render(`
        <div class="c-test-comp__inner">
            <span class="counter">${valueFromParent}</span>
        </div>
    `);
};
