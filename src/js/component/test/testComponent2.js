/**
 * Create component
 */
export const TestComponent2 = ({ props, watchParent, render, onMount }) => {
    const { valueFromParent, i } = props;

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
            <div>
                index: ${i}
            </div>
            <div>
                counter*i from parent:
                <span class="counter">${valueFromParent()}</span>
            </div>
        </div>
    `);
};
