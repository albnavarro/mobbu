/**
 * Create component
 */
export const TestComponent2 = ({ props, watchParent, render, onMount }) => {
    const { valueFromParent } = props;

    onMount(({ element }) => {
        const counterEl = element.querySelector('.counter');
        const unwatchParent = watchParent('counter', () => {
            counterEl.innerHTML = valueFromParent();
        });

        return () => {
            unwatchParent();
            element.remove();
        };
    });

    return render(`
        <div class="c-test-comp__inner">
            <span class="counter">${valueFromParent()}</span>
        </div>
    `);
};
