/**
 * Create component
 */
export const TestComponent2 = ({
    props,
    watch,
    setState,
    watchParent,
    render,
    onMount,
}) => {
    const { valueFromParent } = props;

    onMount(({ element }) => {
        const counterEl = element.querySelector('.counter');

        /**
         * Listen to parent mutation.
         */
        const unwatchParent = watchParent('counter', () => {
            setState('counter', valueFromParent());
        });

        /**
         * use internale store so update lement only if the is a mutation.
         */
        const unwatch = watch('counter', (val) => {
            counterEl.innerHTML = val;
        });

        return () => {
            unwatchParent();
            unwatch();
            element.remove();
        };
    });

    setState('counter', valueFromParent());

    return render(`
        <div class="c-test-comp__inner">
            <span class="counter">${valueFromParent()}</span>
        </div>
    `);
};
